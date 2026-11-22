<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/Header/AppHeader.vue'
import { t } from '@/i18n'
import {
  MINIMUM_SELL_VALUE,
  SELL_FEE_RATE,
  useWalletStore
} from '@/stores/wallet'

const wallet = useWalletStore()
const route = useRoute()

const depositMethod = ref<'usdt' | 'bank'>('usdt')
const depositAmount = ref<number>(50)
const usdtNetwork = ref('TRC20')
const depositNotice = ref('')
const walletNotice = ref(
  route.query.notice === 'insufficient-balance'
    ? 'Insufficient balance. Please top up your wallet before confirming this prediction.'
    : ''
)
const walletNoticeValues = ref<Record<string, string | number>>({})

const showSellModal = ref(false)
const selectedHoldingId = ref<string | null>(null)
const sellQuantity = ref(1)
const sellError = ref('')

const selectedHolding = computed(() =>
  wallet.holdings.find(holding => holding.id === selectedHoldingId.value)
)
const sellGross = computed(
  () => (selectedHolding.value?.price ?? 0) * sellQuantity.value
)
const sellFee = computed(() => sellGross.value * SELL_FEE_RATE)
const sellNet = computed(() => sellGross.value - sellFee.value)
const canConfirmSale = computed(() =>
  selectedHolding.value !== undefined &&
  Number.isSafeInteger(sellQuantity.value) &&
  sellQuantity.value > 0 &&
  sellQuantity.value <= selectedHolding.value.shares &&
  sellGross.value >= MINIMUM_SELL_VALUE
)
const accountValue = computed(
  () => wallet.balance + wallet.portfolioValue
)

function formatUsd(amount: number) {
  return `$${amount.toFixed(2)}`
}

function requestDeposit() {
  depositNotice.value = ''

  if (!Number.isFinite(depositAmount.value) || depositAmount.value <= 0) {
    depositNotice.value = 'Please enter a valid amount greater than zero.'
    return
  }

  depositNotice.value =
    'Payment is not connected yet. No funds were transferred; do not send USDT or bank payments.'
}

function openSell(holdingId: string) {
  const holding = wallet.holdings.find(item => item.id === holdingId)

  if (!holding) {
    walletNotice.value = 'This holding is no longer available.'
    return
  }

  selectedHoldingId.value = holdingId
  sellQuantity.value = Math.min(
    holding.shares,
    Math.max(1, Math.ceil(MINIMUM_SELL_VALUE / holding.price))
  )
  sellError.value = ''
  showSellModal.value = true
}

function confirmSale() {
  if (!selectedHolding.value || !canConfirmSale.value) {
    sellError.value = 'A sale must be at least {amount}.'
    return
  }

  const result = wallet.sellShares(
    selectedHolding.value.id,
    sellQuantity.value,
    selectedHolding.value.price
  )

  if (!result.ok) {
    sellError.value = result.error
    return
  }

  walletNotice.value = 'Demo sale completed: {amount} added after the 5% fee.'
  walletNoticeValues.value = { amount: formatUsd(result.net) }
  showSellModal.value = false
  selectedHoldingId.value = null
}
</script>

<template>
  <div class="wallet-page">
    <AppHeader page-title="Wallet" />

    <main class="wallet-content">
      <header class="page-heading">
        <div>
          <span class="eyebrow">{{ t('ACCOUNT') }}</span>
          <h1>{{ t('Wallet') }}</h1>
          <p>{{ t('Manage your balance and player shares.') }}</p>
        </div>
      </header>

      <div class="demo-notice" role="note">
        <i class="fa-solid fa-circle-info"></i>
        <span>
          {{ t('Demo wallet: payments and trades are not connected to real money.') }}
        </span>
      </div>

      <section class="wallet-summary" :aria-label="t('Wallet summary')">
        <article class="summary-card balance-card">
          <span>{{ t('Available balance') }}</span>
          <strong>{{ formatUsd(wallet.balance) }}</strong>
          <small>USD</small>
        </article>

        <article class="summary-card">
          <span>{{ t('Player shares value') }}</span>
          <strong>{{ formatUsd(wallet.portfolioValue) }}</strong>
          <small>{{ wallet.holdings.length }} {{ t('players owned') }}</small>
        </article>

        <article class="summary-card">
          <span>{{ t('Total wallet value') }}</span>
          <strong>{{ formatUsd(accountValue) }}</strong>
          <small>{{ t('Balance + current share value') }}</small>
        </article>
      </section>

      <div class="wallet-panels">
        <section class="panel deposit-panel">
          <div class="section-heading">
            <div>
              <span class="eyebrow">{{ t('ADD FUNDS') }}</span>
              <h2>{{ t('Top up your wallet') }}</h2>
            </div>
            <i class="fa-solid fa-arrow-down-to-line section-icon"></i>
          </div>

          <div class="method-tabs" role="tablist" aria-label="Deposit method">
            <button
              type="button"
              :class="{ active: depositMethod === 'usdt' }"
              role="tab"
              :aria-selected="depositMethod === 'usdt'"
              @click="depositMethod = 'usdt'; depositNotice = ''"
            >
              <i class="fa-brands fa-bitcoin"></i>
              USDT
            </button>
            <button
              type="button"
              :class="{ active: depositMethod === 'bank' }"
              role="tab"
              :aria-selected="depositMethod === 'bank'"
              @click="depositMethod = 'bank'; depositNotice = ''"
            >
              <i class="fa-solid fa-building-columns"></i>
              {{ t('Bank payment') }}
            </button>
          </div>

          <form class="deposit-form" @submit.prevent="requestDeposit">
            <label for="deposit-amount">
              {{ t(depositMethod === 'usdt' ? 'Amount in USDT' : 'Amount in USD') }}
            </label>
            <div class="amount-input">
              <span>{{ depositMethod === 'usdt' ? '₮' : '$' }}</span>
              <input
                id="deposit-amount"
                v-model.number="depositAmount"
                type="number"
                min="1"
                step="1"
                inputmode="decimal"
                required
              />
            </div>

            <label v-if="depositMethod === 'usdt'" for="usdt-network">
              {{ t('Network') }}
            </label>
            <select
              v-if="depositMethod === 'usdt'"
              id="usdt-network"
              v-model="usdtNetwork"
            >
              <option value="TRC20">TRC20</option>
              <option value="ERC20">ERC20</option>
            </select>

            <p class="payment-warning">
              <i class="fa-solid fa-shield-halved"></i>
              {{
                depositMethod === 'usdt'
                  ? t('No {network} deposit address is configured. Do not send funds.', { network: usdtNetwork })
                  : t('Bank payments are unavailable until a payment provider is connected.')
              }}
            </p>

            <button class="primary-button" type="submit">
              {{ t(depositMethod === 'usdt' ? 'Continue with USDT' : 'Continue to payment') }}
            </button>

            <p v-if="depositNotice" class="form-notice" role="status">
              {{ t(depositNotice) }}
            </p>
          </form>
        </section>

        <section class="panel fee-panel">
          <div class="section-heading">
            <div>
              <span class="eyebrow">{{ t('SELLING SHARES') }}</span>
              <h2>{{ t('Clear fees') }}</h2>
            </div>
            <i class="fa-solid fa-percent section-icon"></i>
          </div>

          <div class="fee-detail">
            <span>{{ t('Minimum sale value') }}</span>
            <strong>{{ formatUsd(MINIMUM_SELL_VALUE) }}</strong>
          </div>
          <div class="fee-detail">
            <span>{{ t('Sale fee') }}</span>
            <strong>{{ (SELL_FEE_RATE * 100).toFixed(0) }}%</strong>
          </div>
          <p class="fee-example">
            {{ t('The fee is deducted from the sale value before proceeds are added to your available balance.') }}
          </p>
        </section>
      </div>

      <section class="holdings-section">
        <div class="section-heading holdings-heading">
          <div>
            <span class="eyebrow">{{ t('PORTFOLIO') }}</span>
            <h2>{{ t('Your player shares') }}</h2>
          </div>
          <RouterLink class="secondary-button" to="/market">
            <i class="fa-solid fa-plus"></i>
            {{ t('Find players') }}
          </RouterLink>
        </div>

        <p
          v-if="walletNotice"
          class="wallet-notice"
          :role="route.query.notice === 'insufficient-balance' ? 'alert' : 'status'"
        >
          {{ t(walletNotice, walletNoticeValues) }}
        </p>

        <div v-if="wallet.holdings.length" class="holdings-list">
          <article
            v-for="holding in wallet.holdings"
            :key="holding.id"
            class="holding-card"
          >
            <div class="holding-player">
              <img :src="holding.image" :alt="holding.name" />
              <div>
                <strong>{{ holding.name }}</strong>
                <span>{{ holding.team }}</span>
              </div>
            </div>

            <div class="holding-stat">
              <span>{{ t('Shares') }}</span>
              <strong>{{ holding.shares }}</strong>
            </div>
            <div class="holding-stat">
              <span>{{ t('Avg. buy') }}</span>
              <strong>{{ formatUsd(holding.averagePrice) }}</strong>
            </div>
            <div class="holding-stat">
              <span>{{ t('Current value') }}</span>
              <strong>{{ formatUsd(holding.shares * holding.price) }}</strong>
            </div>

            <button
              class="sell-button"
              type="button"
              :disabled="holding.shares * holding.price < MINIMUM_SELL_VALUE"
              @click="openSell(holding.id)"
            >
              {{ t('Sell shares') }}
            </button>
          </article>
        </div>

        <div v-else class="empty-state">
          <div class="empty-icon">
            <i class="fa-solid fa-chart-pie"></i>
          </div>
          <h3>{{ t('No player shares yet') }}</h3>
          <p>{{ t("Shares you buy from a player's page will appear here.") }}</p>
          <RouterLink class="primary-button" to="/market">
            {{ t('Explore players') }}
          </RouterLink>
        </div>
      </section>
    </main>

    <Teleport to="body">
      <div
        v-if="showSellModal && selectedHolding"
        class="modal-overlay"
        @click.self="showSellModal = false"
      >
        <section class="sell-modal" aria-labelledby="sell-title">
          <button
            class="modal-close"
            type="button"
            :aria-label="t('Close sale dialog')"
            @click="showSellModal = false"
          >
            <i class="fa-solid fa-xmark"></i>
          </button>

          <span class="eyebrow">{{ t('SELL SHARES') }}</span>
          <h2 id="sell-title">{{ selectedHolding.name }}</h2>
          <p class="modal-subtitle">
            {{ t('You own {shares} shares.', { shares: selectedHolding.shares }) }}
          </p>

          <label for="sell-quantity">{{ t('Quantity') }}</label>
          <input
            id="sell-quantity"
            v-model.number="sellQuantity"
            class="quantity-input"
            type="number"
            min="1"
            :max="selectedHolding.shares"
            step="1"
          />

          <p v-if="sellGross < MINIMUM_SELL_VALUE" class="minimum-warning">
            {{ t('Sale value must be at least {amount}.', { amount: formatUsd(MINIMUM_SELL_VALUE) }) }}
          </p>

          <div class="sale-summary">
            <div>
              <span>{{ t('Sale value') }}</span>
              <strong>{{ formatUsd(sellGross) }}</strong>
            </div>
            <div>
              <span>{{ t('Fee (5%)') }}</span>
              <strong>-{{ formatUsd(sellFee) }}</strong>
            </div>
            <div class="sale-net">
              <span>{{ t('You receive') }}</span>
              <strong>{{ formatUsd(sellNet) }}</strong>
            </div>
          </div>

          <p v-if="sellError" class="form-notice" role="alert">
            {{ t(sellError, { amount: formatUsd(MINIMUM_SELL_VALUE) }) }}
          </p>

          <button
            class="primary-button"
            type="button"
            :disabled="!canConfirmSale"
            @click="confirmSale"
          >
            {{ t('Confirm sale') }}
          </button>
        </section>
      </div>
    </Teleport>
  </div>
</template>

<style scoped>
.wallet-page {
  min-height: 100vh;
  background: #09090d;
  color: #f5f5f7;
}

.wallet-content {
  width: min(1240px, calc(100% - 48px));
  margin: 0 auto;
  padding: 32px 0 64px;
}

.page-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 20px;
}

.eyebrow {
  color: #9b5cff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
}

.page-heading h1 {
  margin: 8px 0 4px;
  font-size: 28px;
}

.page-heading p,
.modal-subtitle {
  margin: 0;
  color: #858591;
  font-size: 13px;
}

.demo-notice,
.wallet-notice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 14px;
  border: 1px solid rgba(155, 92, 255, .22);
  border-radius: 10px;
  background: rgba(125, 66, 223, .09);
  color: #c9b5f7;
  font-size: 12px;
}

.demo-notice {
  margin-bottom: 18px;
}

.wallet-summary {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.summary-card,
.panel,
.holdings-section {
  border: 1px solid rgba(255,255,255,.07);
  border-radius: 14px;
  background: #101116;
}

.summary-card {
  min-height: 112px;
  padding: 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.summary-card span,
.summary-card small,
.holding-stat span {
  color: #858591;
  font-size: 11px;
}

.summary-card strong {
  font-size: 24px;
  font-weight: 700;
}

.summary-card small {
  font-size: 10px;
}

.balance-card {
  background:
    radial-gradient(circle at 90% 15%, rgba(155,92,255,.2), transparent 40%),
    #12121a;
}

.wallet-panels {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(260px, .8fr);
  gap: 14px;
  margin-bottom: 24px;
}

.panel,
.holdings-section {
  padding: 20px;
}

.section-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 6px 0 0;
  font-size: 17px;
}

.section-icon {
  color: #9b5cff;
  font-size: 18px;
}

.method-tabs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-bottom: 18px;
}

.method-tabs button,
.secondary-button,
.sell-button {
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 9px;
  background: #171820;
  color: #c7c7d0;
  cursor: pointer;
  transition: .2s ease;
}

.method-tabs button {
  min-height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 12px;
}

.method-tabs button.active {
  border-color: rgba(155,92,255,.55);
  background: rgba(139,92,246,.13);
  color: #d7c3ff;
}

.deposit-form {
  display: flex;
  flex-direction: column;
  gap: 9px;
}

.deposit-form label,
.sell-modal label {
  color: #b7b7c2;
  font-size: 11px;
  font-weight: 600;
}

.amount-input,
.deposit-form select,
.quantity-input {
  height: 44px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 9px;
  background: #0c0d12;
  color: #f5f5f7;
}

.amount-input {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 12px;
}

.amount-input span {
  color: #9b5cff;
  font-weight: 700;
}

.amount-input input,
.deposit-form select,
.quantity-input {
  width: 100%;
  box-sizing: border-box;
  outline: none;
}

.amount-input input {
  height: 100%;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
}

.deposit-form select {
  padding: 0 12px;
}

.payment-warning {
  display: flex;
  gap: 8px;
  margin: 4px 0;
  color: #a0a0ac;
  font-size: 11px;
  line-height: 1.6;
}

.payment-warning i {
  color: #c19b53;
}

.primary-button,
.secondary-button,
.sell-button {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 14px;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.primary-button {
  border: 0;
  border-radius: 9px;
  background: linear-gradient(135deg, #8b5cf6, #a83cff);
  color: white;
  cursor: pointer;
  transition: .2s ease;
}

.primary-button:hover:not(:disabled) {
  filter: brightness(1.12);
  transform: translateY(-1px);
}

.primary-button:disabled,
.sell-button:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.form-notice,
.minimum-warning {
  margin: 4px 0 0;
  color: #f0c16a;
  font-size: 11px;
  line-height: 1.5;
}

.fee-panel {
  display: flex;
  flex-direction: column;
}

.fee-detail,
.sale-summary > div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid rgba(255,255,255,.06);
}

.fee-detail span,
.sale-summary span {
  color: #92929e;
  font-size: 12px;
}

.fee-detail strong {
  color: #f5f5f7;
  font-size: 13px;
}

.fee-example {
  margin: auto 0 0;
  padding-top: 16px;
  color: #777783;
  font-size: 11px;
  line-height: 1.7;
}

.holdings-section {
  padding: 20px;
}

.holdings-heading {
  margin-bottom: 16px;
}

.holdings-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.holding-card {
  display: grid;
  grid-template-columns: minmax(170px, 1.5fr) repeat(3, minmax(90px, .8fr)) auto;
  align-items: center;
  gap: 14px;
  padding: 12px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 11px;
  background: #0c0d12;
}

.holding-player {
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 11px;
}

.holding-player img {
  width: 42px;
  height: 42px;
  flex: 0 0 auto;
  border-radius: 50%;
  object-fit: cover;
  background: #1a1b22;
}

.holding-player div,
.holding-stat {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.holding-player strong,
.holding-stat strong {
  overflow: hidden;
  color: #eeeef2;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.holding-player span {
  color: #81818d;
  font-size: 10px;
}

.holding-stat strong {
  font-size: 11px;
}

.sell-button {
  min-height: 34px;
  padding: 0 11px;
  border-color: rgba(155,92,255,.24);
  color: #c7a8ff;
  white-space: nowrap;
}

.sell-button:hover:not(:disabled),
.secondary-button:hover {
  border-color: rgba(155,92,255,.55);
  color: white;
}

.secondary-button {
  min-height: 36px;
  padding: 0 12px;
  color: #c7c7d0;
}

.wallet-notice {
  margin: 0 0 12px;
}

.empty-state {
  min-height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.empty-icon {
  width: 46px;
  height: 46px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(139,92,246,.13);
  color: #a878ff;
}

.empty-state h3 {
  margin: 13px 0 5px;
  font-size: 15px;
}

.empty-state p {
  margin: 0 0 14px;
  color: #81818d;
  font-size: 11px;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 16px;
  background: rgba(0,0,0,.72);
}

.sell-modal {
  position: relative;
  width: min(420px, 100%);
  box-sizing: border-box;
  padding: 24px;
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 15px;
  background: #111219;
  box-shadow: 0 24px 70px rgba(0,0,0,.5);
}

.sell-modal h2 {
  margin: 8px 0 4px;
  font-size: 20px;
}

.sell-modal label {
  display: block;
  margin: 18px 0 7px;
}

.quantity-input {
  padding: 0 12px;
  font-size: 14px;
}

.sale-summary {
  margin: 16px 0;
  padding: 0 12px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 10px;
  background: #0c0d12;
}

.sale-summary strong {
  color: #eeeef2;
  font-size: 12px;
}

.sale-summary .sale-net {
  border-bottom: 0;
}

.sale-net strong {
  color: #c6a4ff;
  font-size: 14px;
}

.sell-modal > .primary-button {
  width: 100%;
  margin-top: 12px;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 8px;
  background: #1a1b22;
  color: #aaa;
  cursor: pointer;
}

@media (max-width: 900px) {
  .wallet-panels {
    grid-template-columns: minmax(0, 1fr);
  }

  .fee-panel {
    min-height: 190px;
  }

  .holding-card {
    grid-template-columns: minmax(150px, 1.4fr) repeat(3, minmax(75px, 1fr));
  }

  .holding-card .sell-button {
    grid-column: 1 / -1;
    justify-self: end;
  }
}

@media (max-width: 600px) {
  .wallet-content {
    width: calc(100% - 28px);
    padding-top: 22px;
  }

  .wallet-summary {
    grid-template-columns: minmax(0, 1fr);
    gap: 9px;
  }

  .summary-card {
    min-height: 94px;
  }

  .panel,
  .holdings-section {
    padding: 15px;
  }

  .holding-card {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px 10px;
  }

  .holding-player {
    grid-column: 1 / -1;
  }

  .holding-card .sell-button {
    grid-column: 1 / -1;
    justify-self: stretch;
  }

  .holdings-heading {
    align-items: flex-start;
  }

  .holdings-heading h2 {
    font-size: 15px;
  }

  .secondary-button {
    flex: 0 0 auto;
    padding: 0 9px;
    font-size: 10px;
  }
}
</style>