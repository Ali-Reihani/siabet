<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import mbappeImage from '@/assets/Kilian-mbappe.jpg'
import haalandImage from '@/assets/erling-halland.webp'
import bellinghamImage from '@/assets/jude-bellingham.jpg'
import viniImage from '@/assets/vini-jr.webp'
import sakaImage from '@/assets/bukayo-saka.jpg'
import fodenImage from '@/assets/phil-foden.jpg'
import salahImage from '@/assets/mohamed-salah.jpg'
import kaneImage from '@/assets/harry-kane.jpg'
import AppHeader from '@/components/Header/AppHeader.vue'
import { useWalletStore } from '@/stores/wallet'
import {
  usePredictionsStore,
  type PredictionCondition,
  type PredictionLevel,
  type SavedPrediction
} from '@/stores/predictions'
import { t } from '@/i18n'

/* =========================================
   ROUTE
========================================= */

const route = useRoute()
const router = useRouter()
const wallet = useWalletStore()
const predictionStore = usePredictionsStore()

/* =========================================
   TYPES
========================================= */

type PlayerId =
  | 'haaland'
  | 'mbappe'
  | 'bellingham'
  | 'vini-jr'
  | 'saka'
  | 'foden'
  | 'salah'
  | 'kane'

type BetLevel = 'high' | 'medium' | 'low'

interface Player {
  id: string
  name: string
  shortName: string
  team: string
  teamShort: string
  league: string
  image: string
  price: number
}

interface BetOption {
  label: string
  value: number
}

interface Bet {
  id: number
  question: string
  category: string
  options: BetOption[]
}

/* =========================================
   PLAYERS
========================================= */

const players: Record<PlayerId, Player> = {
  haaland: {
    id: 'haaland',
    name: 'Erling Haaland',
    shortName: 'Haaland',
    team: 'Manchester City',
    teamShort: 'MC',
    league: 'Premier League',
    image: haalandImage,
    price: 3.24
  },

  mbappe: {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    shortName: 'Mbappé',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    image: mbappeImage,
    price: 3.12
  },

  bellingham: {
    id: 'bellingham',
    name: 'Jude Bellingham',
    shortName: 'Bellingham',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    image: bellinghamImage,
    price: 2.86
  },

  'vini-jr': {
    id: 'vini-jr',
    name: 'Vinícius Jr.',
    shortName: 'Viní Jr.',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    image: viniImage,
    price: 2.45
  },

  saka: {
    id: 'saka',
    name: 'Bukayo Saka',
    shortName: 'Saka',
    team: 'Arsenal',
    teamShort: 'ARS',
    league: 'Premier League',
    image: sakaImage,
    price: 2.31
  },

  foden: {
    id: 'foden',
    name: 'Phil Foden',
    shortName: 'Foden',
    team: 'Manchester City',
    teamShort: 'MCI',
    league: 'Premier League',
    image: fodenImage,
    price: 2.18
  },

  salah: {
    id: 'salah',
    name: 'Mohamed Salah',
    shortName: 'Salah',
    team: 'Liverpool',
    teamShort: 'LIV',
    league: 'Premier League',
    image: salahImage,
    price: 2.74
  },

  kane: {
    id: 'kane',
    name: 'Harry Kane',
    shortName: 'Kane',
    team: 'Bayern Munich',
    teamShort: 'BAY',
    league: 'Bundesliga',
    image: kaneImage,
    price: 2.63
  }
}

/* =========================================
   CURRENT PLAYER
========================================= */

const playerId = computed<PlayerId>(() => {
  const id = String(route.params.id || 'haaland')

  if (id in players) {
    return id as PlayerId
  }

  return 'haaland'
})

const player = computed(() => players[playerId.value])

/* =========================================
   VIRTUAL WALLET
========================================= */

/*
 * Mock stake.
 * Backend should validate the final order/prediction.
 */
const stake = ref(25)

/* =========================================
   BET DATA
========================================= */

const highBets: Bet[] = [
  {
    id: 101,
    question: `Will ${player.value.shortName} score 2+ goals?`,
    category: 'GOALS',
    options: [
      { label: 'YES', value: 2.45 },
      { label: 'NO', value: 1.35 }
    ]
  },

  {
    id: 102,
    question: `Will ${player.value.shortName} score first?`,
    category: 'FIRST GOAL',
    options: [
      { label: 'YES', value: 2.85 },
      { label: 'NO', value: 1.30 }
    ]
  },

  {
    id: 103,
    question: `Will ${player.value.shortName} record 1+ assist?`,
    category: 'ASSISTS',
    options: [
      { label: 'YES', value: 2.15 },
      { label: 'NO', value: 1.40 }
    ]
  },

  {
    id: 104,
    question: `Will ${player.value.shortName} score before half-time?`,
    category: 'TIMING',
    options: [
      { label: 'YES', value: 2.65 },
      { label: 'NO', value: 1.30 }
    ]
  },

  {
    id: 105,
    question: `Will ${player.value.shortName} have 5+ shots?`,
    category: 'SHOTS',
    options: [
      { label: 'YES', value: 2.35 },
      { label: 'NO', value: 1.35 }
    ]
  },

  {
    id: 106,
    question: `Will ${player.value.shortName} score a hat-trick?`,
    category: 'SPECIAL',
    options: [
      { label: 'YES', value: 4.20 },
      { label: 'NO', value: 1.15 }
    ]
  }
]

const mediumBets: Bet[] = [
  {
    id: 201,
    question: `Will ${player.value.shortName} score 1+ goal?`,
    category: 'GOALS',
    options: [
      { label: 'YES', value: 1.65 },
      { label: 'NO', value: 1.55 }
    ]
  },

  {
    id: 202,
    question: `Will ${player.value.shortName} have 3+ shots?`,
    category: 'SHOTS',
    options: [
      { label: 'YES', value: 1.45 },
      { label: 'NO', value: 1.65 }
    ]
  },

  {
    id: 203,
    question: `Will ${player.value.shortName} have 1+ assist?`,
    category: 'ASSISTS',
    options: [
      { label: 'YES', value: 1.80 },
      { label: 'NO', value: 1.45 }
    ]
  },

  {
    id: 204,
    question: `Will ${player.value.shortName} get a card?`,
    category: 'CARDS',
    options: [
      { label: 'YES', value: 1.95 },
      { label: 'NO', value: 1.40 }
    ]
  },

  {
    id: 205,
    question: `Will ${player.value.shortName} score after 60'?`,
    category: 'TIMING',
    options: [
      { label: 'YES', value: 1.75 },
      { label: 'NO', value: 1.50 }
    ]
  },

  {
    id: 206,
    question: `Will ${player.value.shortName} make 2+ key passes?`,
    category: 'CREATION',
    options: [
      { label: 'YES', value: 1.55 },
      { label: 'NO', value: 1.55 }
    ]
  }
]

const lowBets: Bet[] = [
  {
    id: 301,
    question: `Will ${player.value.shortName} have a shot on target?`,
    category: 'SHOTS ON TARGET',
    options: [
      { label: 'YES', value: 1.20 },
      { label: 'NO', value: 1.85 }
    ]
  },

  {
    id: 302,
    question: `Will ${player.value.shortName} play 70+ minutes?`,
    category: 'MINUTES',
    options: [
      { label: 'YES', value: 1.15 },
      { label: 'NO', value: 2.10 }
    ]
  },

  {
    id: 303,
    question: `Will ${player.value.shortName} make 1+ key pass?`,
    category: 'CREATION',
    options: [
      { label: 'YES', value: 1.25 },
      { label: 'NO', value: 1.75 }
    ]
  },

  {
    id: 304,
    question: `Will ${player.value.shortName} complete 1+ dribble?`,
    category: 'DRIBBLES',
    options: [
      { label: 'YES', value: 1.18 },
      { label: 'NO', value: 1.90 }
    ]
  },

  {
    id: 305,
    question: `Will ${player.value.shortName} make 1+ tackle?`,
    category: 'DEFENCE',
    options: [
      { label: 'YES', value: 1.30 },
      { label: 'NO', value: 1.70 }
    ]
  },

  {
    id: 306,
    question: `Will ${player.value.shortName} win 1+ duel?`,
    category: 'DUELS',
    options: [
      { label: 'YES', value: 1.22 },
      { label: 'NO', value: 1.80 }
    ]
  }
]

/* =========================================
   SELECTION STATE
========================================= */

const selections = ref<
  Record<number, BetOption | null>
>({
  101: null,
  102: null,
  103: null,
  104: null,
  105: null,
  106: null,

  201: null,
  202: null,
  203: null,
  204: null,
  205: null,
  206: null,

  301: null,
  302: null,
  303: null,
  304: null,
  305: null,
  306: null
})

/* =========================================
   UI STATE
========================================= */

const showSlip = ref(false)
const submitted = ref(false)

/* =========================================
   SELECTION HELPERS
========================================= */

const selectedHigh = computed(() => {
  return highBets.filter(
    bet => selections.value[bet.id]
  )
})

const selectedMedium = computed(() => {
  return mediumBets.filter(
    bet => selections.value[bet.id]
  )
})

const selectedLow = computed(() => {
  return lowBets.filter(
    bet => selections.value[bet.id]
  )
})

const totalSelected = computed(() => {
  return (
    selectedHigh.value.length +
    selectedMedium.value.length +
    selectedLow.value.length
  )
})

const isComplete = computed(() => {
  return (
    selectedHigh.value.length === 3 &&
    selectedMedium.value.length === 2 &&
    selectedLow.value.length === 1
  )
})

/* =========================================
   TOTAL MULTIPLIER
========================================= */

const totalMultiplier = computed(() => {
  const selected = [
    ...selectedHigh.value,
    ...selectedMedium.value,
    ...selectedLow.value
  ]

  return selected.reduce((sum, bet) => {
    const option = selections.value[bet.id]

    return sum + (option?.value || 0)
  }, 0)
})

/* =========================================
   WALLET IMPACT
========================================= */

const walletImpact = computed(() => {
  /*
   * This is a UI/mock representation only.
   * The backend must be authoritative.
   */
  return stake.value * totalMultiplier.value
})

const projectedBalance = computed(() => {
  return wallet.balance + walletImpact.value
})

const isPositive = computed(() => {
  return totalMultiplier.value >= 0
})

/* =========================================
   SELECTION
========================================= */

function selectOption(
  bet: Bet,
  option: BetOption,
  level: BetLevel
) {
  const currentSelection = selections.value[bet.id]

  /*
   * Clicking selected option again removes it.
   */
  if (
    currentSelection &&
    currentSelection.value === option.value
  ) {
    selections.value[bet.id] = null

    return
  }

  const selectedCount =
    level === 'high'
      ? selectedHigh.value.length
      : level === 'medium'
        ? selectedMedium.value.length
        : selectedLow.value.length

  const limit =
    level === 'high'
      ? 3
      : level === 'medium'
        ? 2
        : 1

  /*
   * If this bet already has a selection,
   * changing YES -> NO doesn't increase count.
   */
  if (!currentSelection && selectedCount >= limit) {
    return
  }

  selections.value[bet.id] = option
}

/* =========================================
   BET STATE
========================================= */

function isSelected(
  betId: number,
  option: BetOption
) {
  const selected = selections.value[betId]

  return (
    selected &&
    selected.value === option.value
  )
}

function isBetLocked(
  bet: Bet,
  level: BetLevel
) {
  if (selections.value[bet.id]) {
    return false
  }

  const selectedCount =
    level === 'high'
      ? selectedHigh.value.length
      : level === 'medium'
        ? selectedMedium.value.length
        : selectedLow.value.length

  const limit =
    level === 'high'
      ? 3
      : level === 'medium'
        ? 2
        : 1

  return selectedCount >= limit
}

/* =========================================
   FORMAT
========================================= */

function formatMultiplier(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(2)}`
}

function formatMoney(value: number) {
  return `$${Math.abs(value).toFixed(2)}`
}

/* =========================================
   RESET
========================================= */

function resetSelections() {
  Object.keys(selections.value).forEach(key => {
    selections.value[Number(key)] = null
  })

  submitted.value = false
}

/* =========================================
   SUBMIT
========================================= */

async function submitPrediction() {
  if (!isComplete.value || submitted.value) {
    return
  }

  const chargeResult = wallet.charge(stake.value)

  if (!chargeResult.ok) {
    if (chargeResult.reason === 'insufficient-balance') {
      await router.push({
        path: '/wallet',
        query: { notice: 'insufficient-balance' }
      })
    }
    return
  }

  /*
   * Mock API payload.
   *
   * Replace this with:
   *
   * await predictionService.create(...)
   *
   * The backend should validate:
   * - wallet
   * - stake
   * - selected bets
   * - limits
   * - final coefficients
   */
  const toCondition = (
    bet: Bet,
    level: PredictionLevel
  ): PredictionCondition | null => {
    const option = selections.value[bet.id]
    if (!option || (option.label !== 'YES' && option.label !== 'NO')) {
      return null
    }

    return {
      betId: bet.id,
      category: bet.category,
      level,
      question: bet.question,
      choice: option.label,
      coefficient: option.value,
      outcome: null
    }
  }

  const conditions = [
    ...selectedHigh.value.map(bet => toCondition(bet, 'high')),
    ...selectedMedium.value.map(bet => toCondition(bet, 'medium')),
    ...selectedLow.value.map(bet => toCondition(bet, 'low'))
  ].filter((condition): condition is PredictionCondition => condition !== null)

  const payload = {
    playerId: player.value.id,
    stake: stake.value,
    selections: conditions.map(condition => ({
      betId: condition.betId,
      question: condition.question,
      option: condition.choice,
      coefficient: condition.coefficient
    })),
    totalCoefficient: totalMultiplier.value
  }

  console.log('Prediction payload:', payload)

  const savedPrediction: SavedPrediction = {
    id: `${Date.now()}-${player.value.id}`,
    playerId: player.value.id,
    playerName: player.value.name,
    shortName: player.value.shortName,
    team: player.value.team,
    teamShort: player.value.teamShort,
    league: player.value.league,
    image: player.value.image,
    stake: stake.value,
    totalCoefficient: totalMultiplier.value,
    createdAt: new Date().toISOString(),
    conditions
  }
  predictionStore.add(savedPrediction)
  submitted.value = true
}

/* =========================================
   BACK
========================================= */

function goBack() {
  window.history.back()
}
</script>

<template>

  <div class="prediction-page">

    <!-- =====================================
         HEADER
    ====================================== -->

<AppHeader
        :player-name="player.name"
        page-title="Prediction"
        />


    <main class="container">

      <!-- =====================================
           PLAYER HERO
      ====================================== -->

      <section class="prediction-hero">

        <div class="player-block">

          <div class="player-image-wrapper">

            <img
              :src="player.image"
              :alt="player.name"
            />

          </div>


          <div class="player-info">

            <span class="eyebrow">
              {{ t('PLAYER PREDICTION') }}
            </span>

            <h1>
              {{ player.name }}
            </h1>

            <div class="team">

              <span class="team-logo">
                {{ player.teamShort }}
              </span>

              <span>
                {{ player.team }}
              </span>

              <span class="dot"></span>

              <span>
                {{ player.league }}
              </span>

            </div>

          </div>

        </div>


        <div class="hero-right">

          <div class="match-label">
            {{ t('NEXT MATCH') }}
          </div>

          <strong>
            {{ player.teamShort }}
            <span>VS</span>
            FCB
          </strong>

          <small>
            SAT · 18:30
          </small>

        </div>

      </section>


      <!-- =====================================
           PROGRESS
      ====================================== -->

      <section class="selection-progress">

        <div class="progress-header">

          <div>

            <span class="eyebrow">
              {{ t('BET BUILDER') }}
            </span>

            <h2>
              {{ t('Build Your Prediction') }}
            </h2>

          </div>


          <div class="selection-counter">

            <strong>
              {{ totalSelected }}/6
            </strong>

            <span>
              {{ t('selections') }}
            </span>

          </div>

        </div>


        <div class="progress-track">

          <div
            class="progress-fill"
            :style="{
              width:
                `${(totalSelected / 6) * 100}%`
            }"
          ></div>

        </div>


        <div class="rules">

          <div
            :class="{
              done:
                selectedHigh.length === 3
            }"
          >
            <span>{{ t('HIGH') }}</span>
            <strong>
              {{ selectedHigh.length }}/3
            </strong>
          </div>


          <div
            :class="{
              done:
                selectedMedium.length === 2
            }"
          >
            <span>{{ t('MEDIUM') }}</span>
            <strong>
              {{ selectedMedium.length }}/2
            </strong>
          </div>


          <div
            :class="{
              done:
                selectedLow.length === 1
            }"
          >
            <span>{{ t('LOW') }}</span>
            <strong>
              {{ selectedLow.length }}/1
            </strong>
          </div>

        </div>

        <p
          v-if="!isComplete"
          class="selection-error"
          role="alert"
        >
          {{ t('You must select exactly 3 High Odds, 2 Medium Odds, and 1 Low Odds prediction before confirming.') }}
        </p>

      </section>


      <!-- =====================================
           CONTENT
      ====================================== -->

      <div class="prediction-layout">

        <!-- ===================================
             BETS
        ==================================== -->

        <div class="bets-column">


          <!-- =================================
               HIGH
          ================================== -->

          <section class="bet-section">

            <div class="section-heading">

              <div class="level-icon high-icon">
                <i class="fa-solid fa-fire"></i>
              </div>

              <div>

                <div class="level-title">

                  <h2>
                    {{ t('High Odds') }}
                  </h2>

                  <span class="level-badge high">
                    {{ t('HIGH RISK') }}
                  </span>

                </div>

                <p>
                  {{ t('Choose 3 predictions from 6') }}
                </p>

              </div>

              <div class="section-count">
                {{ selectedHigh.length }}/3
              </div>

            </div>


            <div class="bets-grid">

              <article
                v-for="bet in highBets"
                :key="bet.id"
                class="bet-card"
                :class="{
                  selected:
                    selections[bet.id],
                  locked:
                    isBetLocked(bet, 'high')
                }"
              >

                <div class="bet-top">

                  <span class="bet-category">
                    {{ t(bet.category) }}
                  </span>

                  <span class="bet-number">
                    #{{ bet.id - 100 }}
                  </span>

                </div>


                <h3>
                  {{ t(bet.question) }}
                </h3>


                <div class="option-buttons">

                  <button
                    v-for="option in bet.options"
                    :key="option.label"
                    class="option-button"
                    :class="[
                      option.label === 'YES'
                        ? 'yes'
                        : 'no',
                      {
                        active:
                          isSelected(
                            bet.id,
                            option
                          )
                      }
                    ]"
                    :disabled="
                      isBetLocked(
                        bet,
                        'high'
                      )
                    "
                    @click="
                      selectOption(
                        bet,
                        option,
                        'high'
                      )
                    "
                  >

                    <span>
                      {{ t(option.label) }}
                    </span>

                    <strong>
                      {{ formatMultiplier(option.value) }}
                    </strong>

                  </button>

                </div>


                <div
                  v-if="selections[bet.id]"
                  class="selected-indicator"
                >

                  <i class="fa-solid fa-check"></i>

                  {{ t('Selected') }}
                  {{
                    t(selections[bet.id]?.label || '')
                  }}

                </div>

              </article>

            </div>

          </section>


          <!-- =================================
               MEDIUM
          ================================== -->

          <section class="bet-section">

            <div class="section-heading">

              <div class="level-icon medium-icon">
                <i class="fa-solid fa-bolt"></i>
              </div>

              <div>

                <div class="level-title">

                  <h2>
                    {{ t('Medium Odds') }}
                  </h2>

                  <span class="level-badge medium">
                    {{ t('BALANCED') }}
                  </span>

                </div>

                <p>
                  {{ t('Choose 2 predictions from 6') }}
                </p>

              </div>

              <div class="section-count">
                {{ selectedMedium.length }}/2
              </div>

            </div>


            <div class="bets-grid">

              <article
                v-for="bet in mediumBets"
                :key="bet.id"
                class="bet-card"
                :class="{
                  selected:
                    selections[bet.id],
                  locked:
                    isBetLocked(
                      bet,
                      'medium'
                    )
                }"
              >

                <div class="bet-top">

                  <span class="bet-category">
                    {{ t(bet.category) }}
                  </span>

                  <span class="bet-number">
                    #{{ bet.id - 200 }}
                  </span>

                </div>


                <h3>
                  {{ t(bet.question) }}
                </h3>


                <div class="option-buttons">

                  <button
                    v-for="option in bet.options"
                    :key="option.label"
                    class="option-button"
                    :class="[
                      option.label === 'YES'
                        ? 'yes'
                        : 'no',
                      {
                        active:
                          isSelected(
                            bet.id,
                            option
                          )
                      }
                    ]"
                    :disabled="
                      isBetLocked(
                        bet,
                        'medium'
                      )
                    "
                    @click="
                      selectOption(
                        bet,
                        option,
                        'medium'
                      )
                    "
                  >

                    <span>
                      {{ t(option.label) }}
                    </span>

                    <strong>
                      {{ formatMultiplier(option.value) }}
                    </strong>

                  </button>

                </div>


                <div
                  v-if="selections[bet.id]"
                  class="selected-indicator"
                >

                  <i class="fa-solid fa-check"></i>

                  {{ t('Selected') }}
                  {{
                    t(selections[bet.id]?.label || '')
                  }}

                </div>

              </article>

            </div>

          </section>


          <!-- =================================
               LOW
          ================================== -->

          <section class="bet-section">

            <div class="section-heading">

              <div class="level-icon low-icon">
                <i class="fa-solid fa-shield"></i>
              </div>

              <div>

                <div class="level-title">

                  <h2>
                    {{ t('Low Odds') }}
                  </h2>

                  <span class="level-badge low">
                    {{ t('LOW RISK') }}
                  </span>

                </div>

                <p>
                  {{ t('Choose 1 prediction from 6') }}
                </p>

              </div>

              <div class="section-count">
                {{ selectedLow.length }}/1
              </div>

            </div>


            <div class="bets-grid">

              <article
                v-for="bet in lowBets"
                :key="bet.id"
                class="bet-card"
                :class="{
                  selected:
                    selections[bet.id],
                  locked:
                    isBetLocked(
                      bet,
                      'low'
                    )
                }"
              >

                <div class="bet-top">

                  <span class="bet-category">
                    {{ t(bet.category) }}
                  </span>

                  <span class="bet-number">
                    #{{ bet.id - 300 }}
                  </span>

                </div>


                <h3>
                  {{ t(bet.question) }}
                </h3>


                <div class="option-buttons">

                  <button
                    v-for="option in bet.options"
                    :key="option.label"
                    class="option-button"
                    :class="[
                      option.label === 'YES'
                        ? 'yes'
                        : 'no',
                      {
                        active:
                          isSelected(
                            bet.id,
                            option
                          )
                      }
                    ]"
                    :disabled="
                      isBetLocked(
                        bet,
                        'low'
                      )
                    "
                    @click="
                      selectOption(
                        bet,
                        option,
                        'low'
                      )
                    "
                  >

                    <span>
                      {{ t(option.label) }}
                    </span>

                    <strong>
                      {{ formatMultiplier(option.value) }}
                    </strong>

                  </button>

                </div>


                <div
                  v-if="selections[bet.id]"
                  class="selected-indicator"
                >

                  <i class="fa-solid fa-check"></i>

                  {{ t('Selected') }}
                  {{
                    t(selections[bet.id]?.label || '')
                  }}

                </div>

              </article>

            </div>

          </section>

        </div>


        <!-- ===================================
             PREDICTION SLIP
        ==================================== -->

        <aside class="prediction-slip">

          <div class="slip-header">

            <div>

              <span class="eyebrow">
                {{ t('YOUR PREDICTION') }}
              </span>

              <h2>
                {{ t('Prediction Slip') }}
              </h2>

            </div>

            <button
              class="reset-button"
              @click="resetSelections"
            >
              {{ t('Reset') }}
            </button>

          </div>


          <!-- SLIP PLAYER -->

          <div class="slip-player">

            <img
              :src="player.image"
              :alt="player.name"
            />

            <div>

              <strong>
                {{ player.shortName }}
              </strong>

              <span>
                {{ player.team }}
              </span>

            </div>

            <div class="slip-price">
              ${{ player.price.toFixed(2) }}
            </div>

          </div>


          <!-- SELECTED BETS -->

          <div class="selected-bets">

            <div
              v-if="totalSelected === 0"
              class="empty-slip"
            >

              <div class="empty-icon">
                <i class="fa-solid fa-layer-group"></i>
              </div>

              <strong>
                {{ t('No selections yet') }}
              </strong>

              <span>
                {{ t('Select 3 High, 2 Medium and') }}
                {{ t('1 Low prediction.') }}
              </span>

            </div>


            <template v-else>

              <div
                v-for="bet in [
                  ...selectedHigh,
                  ...selectedMedium,
                  ...selectedLow
                ]"
                :key="bet.id"
                class="slip-item"
              >

                <div class="slip-item-main">

                  <span>
                    {{ t(selections[bet.id]?.label || '') }}
                  </span>

                  <p>{{ t(bet.question) }}</p>

                </div>

                <strong
                  :class="
                    (selections[bet.id]?.value || 0)
                      >= 0
                      ? 'positive'
                      : 'negative'
                  "
                >
                  {{
                    formatMultiplier(
                      selections[bet.id]?.value || 0
                    )
                  }}
                </strong>

              </div>

            </template>

          </div>


          <!-- TOTAL -->

          <div class="slip-total">

            <div>

              <span>
                {{ t('Total Coefficient') }}
              </span>

              <strong
                :class="
                  isPositive
                    ? 'positive'
                    : 'negative'
                "
              >
                {{
                  formatMultiplier(
                    totalMultiplier
                  )
                }}
              </strong>

            </div>


            <div>

              <span>
                {{ t('Stake') }}
              </span>

              <div class="stake-input">

                <button
                  @click="
                    stake = Math.max(
                      5,
                      stake - 5
                    )
                  "
                >
                  −
                </button>

                <span>
                  ${{ stake.toFixed(0) }}
                </span>

                <button
                  @click="
                    stake = Math.min(
                      wallet.balance,
                      stake + 5
                    )
                  "
                >
                  +
                </button>

              </div>

            </div>


            <div
              class="impact-row"
              :class="
                isPositive
                  ? 'impact-positive'
                  : 'impact-negative'
              "
            >

              <div>

                <span>
                  {{ t('Wallet Impact') }}
                </span>

                <strong>
                  {{
                    walletImpact >= 0
                      ? '+'
                      : '-'
                  }}${{
                    Math.abs(
                      walletImpact
                    ).toFixed(2)
                  }}
                </strong>

              </div>

              <i
                :class="
                  isPositive
                    ? 'fa-solid fa-arrow-trend-up'
                    : 'fa-solid fa-arrow-trend-down'
                "
              ></i>

            </div>


            <div class="projected">

              <span>
                {{ t('Projected Balance') }}
              </span>

              <strong>
                ${{
                  projectedBalance.toFixed(2)
                }}
              </strong>

            </div>

          </div>


          <!-- SUBMIT -->

          <button
            class="submit-button"
            :class="{
              ready: isComplete
            }"
            :disabled="!isComplete || submitted"
            @click="submitPrediction"
          >

            <template v-if="!isComplete">

              <i class="fa-solid fa-lock"></i>

              {{ t('Complete') }}
              {{ totalSelected }}/6
              {{ t('Selections') }}

            </template>


            <template v-else-if="!submitted">

              <i class="fa-solid fa-bolt"></i>

              {{ t('Confirm Prediction') }}

            </template>


            <template v-else>

              <i class="fa-solid fa-check"></i>

              {{ t('Prediction Submitted') }}

            </template>

          </button>


          <p class="disclaimer">

            {{ t('Virtual balance only.') }}
            {{ t('Final prediction validation must be handled by the backend.') }}

          </p>

        </aside>

      </div>

    </main>


    <!-- =====================================
         MOBILE STICKY SUMMARY
    ====================================== -->

    <div class="mobile-slip-bar">

      <div>

        <span>
          {{ totalSelected }}/6 {{ t('selections') }}
        </span>

        <strong
          :class="
            isPositive
              ? 'positive'
              : 'negative'
          "
        >
          {{ formatMultiplier(totalMultiplier) }}
        </strong>

      </div>


      <button
        @click="showSlip = true"
      >

        {{ t('View Slip') }}

        <i class="fa-solid fa-chevron-up"></i>

      </button>

    </div>


    <!-- =====================================
         MOBILE SLIP DRAWER
    ====================================== -->

    <Teleport to="body">

      <div
        v-if="showSlip"
        class="mobile-overlay"
        @click.self="showSlip = false"
      >

        <div class="mobile-drawer">

          <div class="drawer-handle"></div>


          <div class="drawer-header">

            <div>

              <span class="eyebrow">
                {{ t('YOUR PREDICTION') }}
              </span>

              <h2>
                {{ t('Prediction Slip') }}
              </h2>

            </div>


            <button
              @click="showSlip = false"
            >
              <i class="fa-solid fa-xmark"></i>
            </button>

          </div>


          <div class="drawer-content">

            <div
              v-for="bet in [
                ...selectedHigh,
                ...selectedMedium,
                ...selectedLow
              ]"
              :key="bet.id"
              class="drawer-item"
            >

              <div>

                <span>
                  {{ t(selections[bet.id]?.label || '') }}
                </span>

                <p>{{ t(bet.question) }}</p>

              </div>

              <strong
                :class="
                  (selections[bet.id]?.value || 0)
                    >= 0
                    ? 'positive'
                    : 'negative'
                "
              >
                {{
                  formatMultiplier(
                    selections[bet.id]?.value || 0
                  )
                }}
              </strong>

            </div>


            <div class="drawer-total">

              <span>
                {{ t('Total Coefficient') }}
              </span>

              <strong
                :class="
                  isPositive
                    ? 'positive'
                    : 'negative'
                "
              >
                {{
                  formatMultiplier(
                    totalMultiplier
                  )
                }}
              </strong>

            </div>


            <button
              class="submit-button ready"
              :disabled="!isComplete"
              @click="
                submitPrediction();
                showSlip = false
              "
            >

              <i class="fa-solid fa-bolt"></i>

              {{ t('Confirm Prediction') }}

            </button>

          </div>

        </div>

      </div>

    </Teleport>

  </div>

</template>


<style scoped>

/* =========================================
   ROOT
========================================= */

.prediction-page {
  min-height: 100vh;
  padding-bottom: 50px;

  background: #020305;

  color: #f5f5f7;
}


/* =========================================
   HEADER
========================================= */

.top-header {
  height: 72px;

  padding: 0 40px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  z-index: 50;

  background: rgba(2,3,5,.92);

  border-bottom:
    1px solid rgba(255,255,255,.06);

  backdrop-filter: blur(18px);
}


.header-left {
  display: flex;
  align-items: center;

  gap: 18px;
}


.back-button {
  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 12px;

  background: #0c0e12;

  color: #aaa;

  cursor: pointer;

  transition: .2s;
}


.back-button:hover {
  color: #fff;

  border-color:
    rgba(139,92,246,.5);

  background:
    rgba(139,92,246,.08);
}


.breadcrumb {
  display: flex;
  align-items: center;

  gap: 11px;

  color: #666;

  font-size: 13px;
}


.breadcrumb i {
  font-size: 9px;
}


.breadcrumb strong {
  color: #ddd;
}


.header-actions {
  display: flex;
  align-items: center;

  gap: 16px;
}


.icon-button {
  width: 40px;
  height: 40px;

  border: 0;

  border-radius: 11px;

  background: #0c0e12;

  color: #aaa;

  cursor: pointer;
}


.balance {
  display: flex;
  flex-direction: column;

  gap: 2px;

  text-align: right;
}


.balance span {
  color: #666;

  font-size: 10px;
}


.balance strong {
  color: #eee;

  font-size: 14px;
}


.avatar {
  width: 38px;
  height: 38px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #8b5cf6,
      #6d28d9
    );

  font-weight: 800;
}


/* =========================================
   CONTAINER
========================================= */

.container {
  width: min(
    1380px,
    calc(100% - 80px)
  );

  margin: 0 auto;
}


/* =========================================
   HERO
========================================= */

.prediction-hero {
  margin-top: 28px;

  padding: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(255,255,255,.07);

  border-radius: 20px;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(139,92,246,.10),
      transparent 32%
    ),
    #090b0f;
}


.player-block {
  display: flex;
  align-items: center;

  gap: 18px;
}


.player-image-wrapper {
  width: 82px;
  height: 82px;

  overflow: hidden;

  border-radius: 17px;

  border:
    1px solid rgba(255,255,255,.08);
}


.player-image-wrapper img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}


.player-info h1 {
  margin: 5px 0 8px;

  font-size: 28px;

  letter-spacing: -.04em;
}


.eyebrow {
  color: #666;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: .12em;
}


.team {
  display: flex;
  align-items: center;

  gap: 8px;

  color: #888;

  font-size: 12px;
}


.team-logo {
  width: 26px;
  height: 26px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: #12151b;

  color: #ddd;

  font-size: 9px;

  font-weight: 800;
}


.dot {
  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: #555;
}


.hero-right {
  padding: 14px 18px;

  min-width: 190px;

  text-align: right;

  border-radius: 13px;

  background: #0e1015;
}


.match-label {
  margin-bottom: 7px;

  color: #555;

  font-size: 9px;

  font-weight: 800;

  letter-spacing: .1em;
}


.hero-right strong {
  display: block;

  font-size: 14px;
}


.hero-right strong span {
  margin: 0 6px;

  color: #555;

  font-size: 9px;
}


.hero-right small {
  display: block;

  margin-top: 5px;

  color: #777;

  font-size: 10px;
}


/* =========================================
   PROGRESS
========================================= */

.selection-progress {
  margin-top: 14px;

  padding: 22px;

  border-radius: 18px;

  background: #090b0f;

  border:
    1px solid rgba(255,255,255,.06);
}


.progress-header {
  display: flex;

  align-items: center;
  justify-content: space-between;
}


.progress-header h2 {
  margin-top: 5px;

  font-size: 20px;

  letter-spacing: -.03em;
}


.selection-counter {
  display: flex;
  align-items: flex-end;

  gap: 6px;
}


.selection-counter strong {
  color: #c4b5fd;

  font-size: 22px;
}


.selection-counter span {
  margin-bottom: 3px;

  color: #555;

  font-size: 10px;
}


.progress-track {
  height: 5px;

  margin-top: 18px;

  overflow: hidden;

  border-radius: 10px;

  background: #15171c;
}


.progress-fill {
  height: 100%;

  border-radius: inherit;

  background:
    linear-gradient(
      90deg,
      #6d28d9,
      #a78bfa
    );

  transition: width .3s ease;
}


.rules {
  margin-top: 16px;

  display: grid;

  grid-template-columns:
    repeat(3, 1fr);

  gap: 8px;
}


.rules div {
  padding: 10px 12px;

  display: flex;
  justify-content: space-between;

  border-radius: 10px;

  background: #0e1015;

  border:
    1px solid rgba(255,255,255,.04);
}


.rules span {
  color: #666;

  font-size: 9px;

  font-weight: 800;
}


.rules strong {
  color: #888;

  font-size: 11px;
}


.selection-error {
  margin: 14px 0 0;

  color: #fb7185;

  font-size: 12px;
  line-height: 1.5;
}


.rules .done {
  border-color:
    rgba(110,231,183,.15);

  background:
    rgba(110,231,183,.05);
}


.rules .done strong {
  color: #6ee7b7;
}


/* =========================================
   LAYOUT
========================================= */

.prediction-layout {
  margin-top: 14px;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    360px;

  gap: 14px;

  align-items: start;
}


.bets-column {
  display: flex;
  flex-direction: column;

  gap: 14px;
}


/* =========================================
   BET SECTION
========================================= */

.bet-section {
  padding: 22px;

  border-radius: 18px;

  background: #090b0f;

  border:
    1px solid rgba(255,255,255,.06);
}


.section-heading {
  display: grid;

  grid-template-columns:
    42px 1fr auto;

  gap: 12px;

  align-items: center;
}


.level-icon {
  width: 42px;
  height: 42px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  font-size: 15px;
}


.high-icon {
  color: #fb7185;

  background:
    rgba(251,113,133,.09);
}


.medium-icon {
  color: #fbbf24;

  background:
    rgba(251,191,36,.08);
}


.low-icon {
  color: #6ee7b7;

  background:
    rgba(110,231,183,.08);
}


.level-title {
  display: flex;
  align-items: center;

  gap: 8px;
}


.level-title h2 {
  margin: 0;

  font-size: 17px;
}


.level-badge {
  padding: 4px 7px;

  border-radius: 6px;

  font-size: 8px;

  font-weight: 800;
}


.level-badge.high {
  color: #fb7185;

  background:
    rgba(251,113,133,.08);
}


.level-badge.medium {
  color: #fbbf24;

  background:
    rgba(251,191,36,.08);
}


.level-badge.low {
  color: #6ee7b7;

  background:
    rgba(110,231,183,.08);
}


.section-heading p {
  margin: 4px 0 0;

  color: #555;

  font-size: 10px;
}


.section-count {
  padding: 7px 10px;

  border-radius: 8px;

  background: #111318;

  color: #aaa;

  font-size: 11px;

  font-weight: 800;
}


/* =========================================
   BET GRID
========================================= */

.bets-grid {
  margin-top: 18px;

  display: grid;

  grid-template-columns:
    repeat(2, 1fr);

  gap: 9px;
}


.bet-card {
  min-height: 165px;

  padding: 16px;

  position: relative;

  border-radius: 13px;

  background: #0e1015;

  border:
    1px solid rgba(255,255,255,.05);

  transition:
    border-color .2s,
    transform .2s,
    opacity .2s;
}


.bet-card:hover {
  transform: translateY(-1px);

  border-color:
    rgba(139,92,246,.20);
}


.bet-card.selected {
  border-color:
    rgba(139,92,246,.55);

  background:
    linear-gradient(
      145deg,
      rgba(139,92,246,.09),
      #0e1015 50%
    );
}


.bet-card.locked {
  opacity: .42;
}


.bet-top {
  display: flex;

  align-items: center;
  justify-content: space-between;
}


.bet-category {
  color: #a78bfa;

  font-size: 8px;

  font-weight: 800;

  letter-spacing: .08em;
}


.bet-number {
  color: #444;

  font-size: 9px;
}


.bet-card h3 {
  min-height: 42px;

  margin: 11px 0 14px;

  color: #ddd;

  font-size: 12px;

  line-height: 1.55;
}


/* =========================================
   OPTIONS
========================================= */

.option-buttons {
  display: grid;

  grid-template-columns:
    1fr 1fr;

  gap: 7px;
}


.option-button {
  height: 43px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 11px;

  border: 1px solid rgba(255,255,255,.05);

  border-radius: 9px;

  background: #12151b;

  color: #888;

  cursor: pointer;

  transition: .2s;
}


.option-button span {
  font-size: 10px;

  font-weight: 800;
}


.option-button strong {
  font-size: 12px;
}


.option-button.yes:hover,
.option-button.yes.active {
  color: #6ee7b7;

  border-color:
    rgba(110,231,183,.30);

  background:
    rgba(110,231,183,.08);
}


.option-button.no:hover,
.option-button.no.active {
  color: #fb7185;

  border-color:
    rgba(251,113,133,.30);

  background:
    rgba(251,113,133,.08);
}


.option-button:disabled {
  cursor: not-allowed;
}


.selected-indicator {
  margin-top: 8px;

  color: #a78bfa;

  font-size: 8px;

  font-weight: 700;
}


/* =========================================
   SLIP
========================================= */

.prediction-slip {
  position: sticky;

  top: 88px;

  padding: 20px;

  border-radius: 18px;

  background: #090b0f;

  border:
    1px solid rgba(255,255,255,.07);
}


.slip-header {
  display: flex;

  align-items: flex-start;
  justify-content: space-between;
}


.slip-header h2 {
  margin-top: 5px;

  font-size: 18px;
}


.reset-button {
  border: 0;

  color: #666;

  background: transparent;

  font-size: 10px;

  cursor: pointer;
}


.reset-button:hover {
  color: #a78bfa;
}


/* =========================================
   SLIP PLAYER
========================================= */

.slip-player {
  margin-top: 18px;

  padding: 11px;

  display: flex;

  align-items: center;

  gap: 10px;

  border-radius: 11px;

  background: #0e1015;
}


.slip-player img {
  width: 38px;
  height: 38px;

  object-fit: cover;

  border-radius: 9px;
}


.slip-player div:nth-child(2) {
  flex: 1;
}


.slip-player strong {
  display: block;

  color: #eee;

  font-size: 11px;
}


.slip-player span {
  display: block;

  margin-top: 2px;

  color: #555;

  font-size: 9px;
}


.slip-price {
  color: #aaa;

  font-size: 11px;

  font-weight: 700;
}


/* =========================================
   SELECTED BETS
========================================= */

.selected-bets {
  margin-top: 16px;

  max-height: 300px;

  overflow-y: auto;

  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

.selected-bets::-webkit-scrollbar {
  width: 6px;
}

.selected-bets::-webkit-scrollbar-track {
  border-radius: 999px;
  background: transparent;
}

.selected-bets::-webkit-scrollbar-thumb {
  border: 1px solid transparent;
  border-radius: 999px;
  background: transparent;
  background-clip: padding-box;
  transition: background 0.2s ease;
}

.selected-bets:hover,
.selected-bets:focus-within {
  scrollbar-color: #9b5cff rgba(255, 255, 255, 0.035);
}

.selected-bets:hover::-webkit-scrollbar-track,
.selected-bets:focus-within::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.035);
}

.selected-bets:hover::-webkit-scrollbar-thumb,
.selected-bets:focus-within::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #c4b5fd, #7c3aed);
  background-clip: padding-box;
}


.empty-slip {
  min-height: 150px;

  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;

  text-align: center;
}


.empty-icon {
  width: 40px;
  height: 40px;

  margin-bottom: 10px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 12px;

  background: #111318;

  color: #555;
}


.empty-slip strong {
  color: #aaa;

  font-size: 11px;
}


.empty-slip span {
  max-width: 190px;

  margin-top: 5px;

  color: #555;

  font-size: 9px;

  line-height: 1.6;
}


.slip-item {
  padding: 10px 0;

  display: flex;

  align-items: flex-start;
  justify-content: space-between;

  gap: 10px;

  border-bottom:
    1px solid rgba(255,255,255,.04);
}


.slip-item-main {
  min-width: 0;
}


.slip-item-main span {
  display: inline-block;

  margin-bottom: 4px;

  padding: 3px 5px;

  border-radius: 4px;

  background: #15171c;

  color: #aaa;

  font-size: 8px;

  font-weight: 800;
}


.slip-item-main p {
  margin: 0;

  color: #777;

  font-size: 9px;

  line-height: 1.5;
}


.slip-item > strong {
  flex-shrink: 0;

  font-size: 10px;
}


.positive {
  color: #6ee7b7;
}


.negative {
  color: #fb7185;
}


/* =========================================
   SLIP TOTAL
========================================= */

.slip-total {
  margin-top: 15px;

  padding-top: 15px;

  border-top:
    1px solid rgba(255,255,255,.07);
}


.slip-total > div {
  margin-bottom: 12px;

  display: flex;

  align-items: center;
  justify-content: space-between;
}


.slip-total span {
  color: #666;

  font-size: 10px;
}


.slip-total strong {
  font-size: 13px;
}


.stake-input {
  display: flex;
  align-items: center;

  overflow: hidden;

  border-radius: 8px;

  background: #111318;
}


.stake-input button {
  width: 27px;
  height: 28px;

  border: 0;

  background: transparent;

  color: #aaa;

  cursor: pointer;
}


.stake-input span {
  min-width: 38px;

  color: #ddd;

  text-align: center;

  font-size: 10px;
}


.impact-row {
  padding: 11px;

  border-radius: 10px;

  border: 1px solid transparent;
}


.impact-row > div {
  display: flex;
  flex-direction: column;

  gap: 3px;
}


.impact-row strong {
  font-size: 15px;
}


.impact-row i {
  font-size: 15px;
}


.impact-positive {
  background:
    rgba(110,231,183,.05);

  border-color:
    rgba(110,231,183,.10);
}


.impact-negative {
  background:
    rgba(251,113,133,.05);

  border-color:
    rgba(251,113,133,.10);
}


.projected {
  padding-top: 13px;

  border-top:
    1px solid rgba(255,255,255,.04);
}


.projected strong {
  color: #fff;

  font-size: 15px;
}


/* =========================================
   SUBMIT
========================================= */

.submit-button {
  width: 100%;

  height: 48px;

  border: 0;

  border-radius: 11px;

  background: #111318;

  color: #555;

  font-size: 12px;

  font-weight: 800;

  cursor: not-allowed;

  transition: .2s;
}


.submit-button.ready {
  color: #fff;

  background:
    linear-gradient(
      135deg,
      #8b5cf6,
      #6d28d9
    );

  cursor: pointer;

  box-shadow:
    0 10px 30px
    rgba(109,40,217,.20);
}


.submit-button.ready:hover {
  transform: translateY(-1px);
}


.disclaimer {
  margin: 12px 4px 0;

  color: #444;

  font-size: 8px;

  line-height: 1.5;

  text-align: center;
}


/* =========================================
   MOBILE BAR
========================================= */

.mobile-slip-bar {
  display: none;
}


/* =========================================
   MOBILE DRAWER
========================================= */

.mobile-overlay {
  display: none;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .container {
    width:
      calc(100% - 40px);
  }


  .prediction-layout {
    grid-template-columns: 1fr;
  }


  .prediction-slip {
    display: none;
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .prediction-page {
    padding-bottom: 90px;
  }


  .top-header {
    height: 60px;

    padding: 0 16px;
  }


  .breadcrumb span {
    display: none;
  }


  .breadcrumb i {
    display: none;
  }


  .breadcrumb strong {
    font-size: 12px;
  }


  .header-actions {
    gap: 7px;
  }


  .balance {
    display: none;
  }


  .container {
    width:
      calc(100% - 24px);
  }


  .prediction-hero {
    margin-top: 14px;

    padding: 17px;

    flex-direction: column;

    align-items: stretch;

    gap: 15px;
  }


  .player-image-wrapper {
    width: 66px;
    height: 66px;
  }


  .player-info h1 {
    font-size: 21px;
  }


  .hero-right {
    min-width: 0;

    text-align: left;
  }


  .selection-progress {
    padding: 17px;
  }


  .progress-header h2 {
    font-size: 17px;
  }


  .rules {
    gap: 5px;
  }


  .rules div {
    padding: 9px;
  }


  .bet-section {
    padding: 16px;
  }


  .section-heading {
    grid-template-columns:
      38px 1fr auto;

    gap: 9px;
  }


  .level-icon {
    width: 38px;
    height: 38px;
  }


  .level-title h2 {
    font-size: 14px;
  }


  .level-badge {
    display: none;
  }


  .bets-grid {
    grid-template-columns: 1fr;
  }


  .bet-card {
    min-height: auto;

    padding: 14px;
  }


  .mobile-slip-bar {
    position: fixed;

    left: 0;
    right: 0;
    bottom: 0;

    z-index: 80;

    height: 68px;

    padding: 9px 12px;

    display: flex;

    align-items: center;
    justify-content: space-between;

    background:
      rgba(5,6,8,.95);

    border-top:
      1px solid rgba(255,255,255,.07);

    backdrop-filter: blur(18px);
  }


  .mobile-slip-bar > div {
    display: flex;
    flex-direction: column;

    gap: 3px;
  }


  .mobile-slip-bar span {
    color: #666;

    font-size: 9px;
  }


  .mobile-slip-bar strong {
    font-size: 15px;
  }


  .mobile-slip-bar button {
    height: 43px;

    padding: 0 15px;

    border: 0;

    border-radius: 10px;

    color: #fff;

    background: #8b5cf6;

    font-size: 11px;

    font-weight: 800;

    cursor: pointer;
  }


  .mobile-slip-bar button i {
    margin-left: 5px;

    font-size: 9px;
  }


  .mobile-overlay {
    position: fixed;

    inset: 0;

    z-index: 200;

    display: flex;

    align-items: flex-end;

    background: rgba(0,0,0,.7);

    backdrop-filter: blur(6px);
  }


  .mobile-drawer {
    width: 100%;

    max-height: 88vh;

    overflow-y: auto;

    padding: 10px 18px 25px;

    border-radius:
      22px 22px 0 0;

    background: #0a0c10;

    border-top:
      1px solid rgba(255,255,255,.08);
  }


  .drawer-handle {
    width: 38px;
    height: 4px;

    margin: 3px auto 18px;

    border-radius: 10px;

    background: #2a2d34;
  }


  .drawer-header {
    display: flex;

    align-items: flex-start;
    justify-content: space-between;
  }


  .drawer-header h2 {
    margin-top: 5px;

    font-size: 19px;
  }


  .drawer-header button {
    width: 34px;
    height: 34px;

    border: 0;

    border-radius: 9px;

    background: #15171c;

    color: #aaa;
  }


  .drawer-content {
    margin-top: 18px;
  }


  .drawer-item {
    padding: 12px 0;

    display: flex;

    align-items: flex-start;
    justify-content: space-between;

    gap: 15px;

    border-bottom:
      1px solid rgba(255,255,255,.05);
  }


  .drawer-item span {
    display: inline-block;

    margin-bottom: 4px;

    color: #a78bfa;

    font-size: 9px;

    font-weight: 800;
  }


  .drawer-item p {
    margin: 0;

    color: #888;

    font-size: 10px;

    line-height: 1.5;
  }


  .drawer-item strong {
    flex-shrink: 0;

    font-size: 11px;
  }


  .drawer-total {
    margin: 18px 0;

    padding: 15px;

    display: flex;

    justify-content: space-between;

    border-radius: 11px;

    background: #111318;
  }


  .drawer-total span {
    color: #666;

    font-size: 10px;
  }


  .drawer-total strong {
    font-size: 15px;
  }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

  .player-block {
    gap: 12px;
  }


  .player-info h1 {
    font-size: 19px;
  }


  .team {
    font-size: 10px;
  }


  .selection-counter span {
    display: none;
  }


  .section-heading p {
    font-size: 9px;
  }


  .bet-card h3 {
    font-size: 11px;
  }


  .option-button {
    height: 41px;

    padding: 0 10px;
  }

}

</style>