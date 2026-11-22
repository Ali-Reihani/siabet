import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export interface PlayerTrade {
  id: string
  name: string
  shortName: string
  team: string
  image: string
  price: number
}

export interface PlayerHolding extends PlayerTrade {
  shares: number
  averagePrice: number
}

export const MINIMUM_SELL_VALUE = 10
export const SELL_FEE_RATE = 0.05

type BuyResult =
  | { ok: true; gross: number; fee: number; total: number }
  | { ok: false; error: string }

type SellResult =
  | { ok: true; gross: number; fee: number; net: number }
  | { ok: false; error: string }

type ChargeResult =
  | { ok: true }
  | { ok: false; reason: 'invalid-amount' | 'insufficient-balance' }

export const useWalletStore = defineStore('wallet', () => {
  const balance = ref(500)
  const holdings = ref<PlayerHolding[]>([])

  const portfolioValue = computed(() =>
    holdings.value.reduce(
      (total, holding) => total + holding.shares * holding.price,
      0
    )
  )

  function buyShares(
    player: PlayerTrade,
    quantity: number,
    feeRate = 0.005
  ): BuyResult {
    if (!Number.isSafeInteger(quantity) || quantity <= 0) {
      return { ok: false, error: 'Enter a valid share quantity.' }
    }

    if (!Number.isFinite(player.price) || player.price <= 0) {
      return { ok: false, error: 'This player has an invalid share price.' }
    }

    const gross = quantity * player.price
    const fee = gross * feeRate
    const total = gross + fee

    if (total > balance.value) {
      return { ok: false, error: 'There is not enough wallet balance.' }
    }

    const holding = holdings.value.find(item => item.id === player.id)

    if (holding) {
      const previousCost = holding.shares * holding.averagePrice
      holding.shares += quantity
      holding.averagePrice = (previousCost + gross) / holding.shares
      holding.price = player.price
    } else {
      holdings.value.push({
        ...player,
        shares: quantity,
        averagePrice: player.price
      })
    }

    balance.value = Number((balance.value - total).toFixed(2))
    return { ok: true, gross, fee, total }
  }

  function sellShares(
    playerId: string,
    quantity: number,
    currentPrice: number
  ): SellResult {
    const holding = holdings.value.find(item => item.id === playerId)

    if (!holding || !Number.isSafeInteger(quantity) || quantity <= 0) {
      return { ok: false, error: 'Select shares you currently own.' }
    }

    if (quantity > holding.shares) {
      return { ok: false, error: 'The sale quantity exceeds your shares.' }
    }

    if (!Number.isFinite(currentPrice) || currentPrice <= 0) {
      return { ok: false, error: 'This player has an invalid share price.' }
    }

    const gross = quantity * currentPrice

    if (gross < MINIMUM_SELL_VALUE) {
      return {
        ok: false,
        error: `The minimum sale value is $${MINIMUM_SELL_VALUE.toFixed(2)}.`
      }
    }

    const fee = gross * SELL_FEE_RATE
    const net = gross - fee

    balance.value = Number((balance.value + net).toFixed(2))
    holding.shares -= quantity
    holding.price = currentPrice

    if (holding.shares === 0) {
      holdings.value = holdings.value.filter(item => item.id !== playerId)
    }

    return { ok: true, gross, fee, net }
  }

  function charge(amount: number): ChargeResult {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, reason: 'invalid-amount' }
    }

    if (amount > balance.value) {
      return { ok: false, reason: 'insufficient-balance' }
    }

    balance.value = Number((balance.value - amount).toFixed(2))
    return { ok: true }
  }

  return {
    balance,
    holdings,
    portfolioValue,
    buyShares,
    sellShares,
    charge
  }
})
