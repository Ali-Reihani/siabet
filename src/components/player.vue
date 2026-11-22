<script setup lang="ts">

import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/Header/AppHeader.vue'
import { t } from '@/i18n'
import {
  MINIMUM_SELL_VALUE,
  SELL_FEE_RATE,
  useWalletStore
} from '@/stores/wallet'
const route = useRoute()
const router = useRouter()
const wallet = useWalletStore()

import mbappeImage from '@/assets/Kilian-mbappe.jpg'
import haalandImage from '@/assets/erling-halland.webp'
import bellinghamImage from '@/assets/jude-bellingham.jpg'
import viniImage from '@/assets/vini-jr.webp'
import sakaImage from '@/assets/bukayo-saka.jpg'
import fodenImage from '@/assets/phil-foden.jpg'
import salahImage from '@/assets/mohamed-salah.jpg'
import kaneImage from '@/assets/harry-kane.jpg'

/* =========================================
   PLAYER DATA
========================================= */

const players = {
  haaland: {
    id: 'haaland',
    name: 'Erling Haaland',
    shortName: 'Haaland',
    team: 'Manchester City',
    teamShort: 'MC',
    league: 'Premier League',
    position: 'ST',
    number: 9,
    country: 'Norway',
    image:
        haalandImage,
    price: 3.24,
    change24h: 4.2,
    change7d: 8.7,
    change30d: 15.4,

    volume: 284920,
    marketActivity: 87,
    performanceIndex: 94,

    stats: {
      goals: 28,
      assists: 6,
      shots: 82,
      shotsOnTarget: 54,
      keyPasses: 24,
      minutes: 2418,
      cards: 2,
      matches: 31
    },

    form: ['goal', 'goal', 'assist', 'goal', 'miss'],

    opponent: 'Arsenal',
    opponentShort: 'ARS'
  },

  mbappe: {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    shortName: 'Mbappé',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    position: 'LW',
    number: 9,
    country: 'France',
    image:
            mbappeImage,
    price: 3.12,
    change24h: 5.1,
    change7d: 10.2,
    change30d: 18.6,

    volume: 321450,
    marketActivity: 92,
    performanceIndex: 96,

    stats: {
      goals: 25,
      assists: 8,
      shots: 91,
      shotsOnTarget: 61,
      keyPasses: 31,
      minutes: 2520,
      cards: 1,
      matches: 32
    },

    form: ['goal', 'assist', 'goal', 'goal', 'goal'],

    opponent: 'Barcelona',
    opponentShort: 'FCB'
  },

  bellingham: {
    id: 'bellingham',
    name: 'Jude Bellingham',
    shortName: 'Bellingham',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    position: 'CAM',
    number: 5,
    country: 'England',
    image:
                bellinghamImage,
    price: 2.86,
    change24h: 3.8,
    change7d: 7.4,
    change30d: 13.8,

    volume: 198740,
    marketActivity: 84,
    performanceIndex: 91,

    stats: {
      goals: 18,
      assists: 11,
      shots: 64,
      shotsOnTarget: 39,
      keyPasses: 48,
      minutes: 2670,
      cards: 4,
      matches: 34
    },

    form: ['assist', 'goal', 'assist', 'goal', 'goal'],

    opponent: 'Barcelona',
    opponentShort: 'FCB'
  },

  'vini-jr': {
    id: 'vini-jr',
    name: 'Vinícius Jr.',
    shortName: 'Viní Jr.',
    team: 'Real Madrid',
    teamShort: 'RM',
    league: 'La Liga',
    position: 'LW',
    number: 7,
    country: 'Brazil',
    image:
                    viniImage,
    price: 2.45,
    change24h: 2.9,
    change7d: 6.8,
    change30d: 11.2,

    volume: 176320,
    marketActivity: 79,
    performanceIndex: 89,

    stats: {
      goals: 17,
      assists: 9,
      shots: 72,
      shotsOnTarget: 44,
      keyPasses: 35,
      minutes: 2310,
      cards: 3,
      matches: 29
    },

    form: ['goal', 'assist', 'miss', 'goal', 'goal'],

    opponent: 'Barcelona',
    opponentShort: 'FCB'
  },

  saka: {
    id: 'saka',
    name: 'Bukayo Saka',
    shortName: 'Saka',
    team: 'Arsenal',
    teamShort: 'ARS',
    league: 'Premier League',
    position: 'RW',
    number: 7,
    country: 'England',
    image: sakaImage,
    price: 2.31,
    change24h: 1.7,
    change7d: 4.5,
    change30d: 9.1,
    volume: 110000,
    marketActivity: 76,
    performanceIndex: 87,
    stats: {
      goals: 16,
      assists: 9,
      shots: 62,
      shotsOnTarget: 36,
      keyPasses: 42,
      minutes: 2380,
      cards: 2,
      matches: 30
    },
    form: ['goal', 'assist', 'goal', 'miss', 'assist'],
    opponent: 'Manchester City',
    opponentShort: 'MCI'
  },

  foden: {
    id: 'foden',
    name: 'Phil Foden',
    shortName: 'Foden',
    team: 'Manchester City',
    teamShort: 'MCI',
    league: 'Premier League',
    position: 'CAM',
    number: 47,
    country: 'England',
    image: fodenImage,
    price: 2.18,
    change24h: 0.9,
    change7d: 2.7,
    change30d: 7.3,
    volume: 98000,
    marketActivity: 72,
    performanceIndex: 85,
    stats: {
      goals: 14,
      assists: 7,
      shots: 54,
      shotsOnTarget: 31,
      keyPasses: 38,
      minutes: 2140,
      cards: 1,
      matches: 29
    },
    form: ['assist', 'goal', 'miss', 'goal', 'assist'],
    opponent: 'Arsenal',
    opponentShort: 'ARS'
  },

  salah: {
    id: 'salah',
    name: 'Mohamed Salah',
    shortName: 'Salah',
    team: 'Liverpool',
    teamShort: 'LIV',
    league: 'Premier League',
    position: 'RW',
    number: 11,
    country: 'Egypt',
    image: salahImage,
    price: 2.74,
    change24h: -0.8,
    change7d: 1.9,
    change30d: 6.4,
    volume: 180000,
    marketActivity: 81,
    performanceIndex: 90,
    stats: {
      goals: 19,
      assists: 8,
      shots: 73,
      shotsOnTarget: 46,
      keyPasses: 35,
      minutes: 2290,
      cards: 2,
      matches: 28
    },
    form: ['goal', 'goal', 'assist', 'miss', 'goal'],
    opponent: 'Manchester City',
    opponentShort: 'MCI'
  },

  kane: {
    id: 'kane',
    name: 'Harry Kane',
    shortName: 'Kane',
    team: 'Bayern Munich',
    teamShort: 'BAY',
    league: 'Bundesliga',
    position: 'ST',
    number: 9,
    country: 'England',
    image: kaneImage,
    price: 2.63,
    change24h: 1.4,
    change7d: 3.8,
    change30d: 8.2,
    volume: 130000,
    marketActivity: 78,
    performanceIndex: 89,
    stats: {
      goals: 22,
      assists: 6,
      shots: 68,
      shotsOnTarget: 43,
      keyPasses: 29,
      minutes: 2260,
      cards: 2,
      matches: 28
    },
    form: ['goal', 'goal', 'assist', 'goal', 'miss'],
    opponent: 'Borussia Dortmund',
    opponentShort: 'BVB'
  }
}

/* =========================================
   CURRENT PLAYER
========================================= */

const playerId = computed(() => {
  return String(route.params.id || 'haaland')
})

const player = computed(() => {
  return (
    players[playerId.value as keyof typeof players] ||
    players.haaland
  )
})

/* =========================================
   UI STATE
========================================= */

const activeRange = ref('7D')

const isFollowing = ref(false)

const showBuy = ref(false)

const showSell = ref(false)

const buyQuantity = ref(20)

const sellQuantity = ref(1)
const tradeError = ref('')
const currentHolding = computed(() =>
  wallet.holdings.find(holding => holding.id === player.value.id)
)
const ownedShares = computed(() => currentHolding.value?.shares ?? 0)
const positionValue = computed(() => ownedShares.value * player.value.price)
const averageBuyPrice = computed(
  () => currentHolding.value?.averagePrice ?? 0
)
const positionProfit = computed(
  () => (player.value.price - averageBuyPrice.value) * ownedShares.value
)
const canSell = computed(() =>
  Number.isSafeInteger(sellQuantity.value) &&
  sellQuantity.value > 0 &&
  sellQuantity.value <= ownedShares.value &&
  sellQuantity.value * player.value.price >= MINIMUM_SELL_VALUE
)

/* =========================================
   CHART
========================================= */

const ranges = ['24H', '7D', '30D', '90D', '1Y']

const chartData: Record<string, number[]> = {
  '24H': [
    3.01,
    3.04,
    3.02,
    3.08,
    3.11,
    3.09,
    3.15,
    3.19,
    3.17,
    3.24
  ],

  '7D': [
    2.88,
    2.94,
    2.91,
    3.02,
    3.08,
    3.01,
    3.13,
    3.19,
    3.12,
    3.24
  ],

  '30D': [
    2.51,
    2.58,
    2.62,
    2.55,
    2.71,
    2.76,
    2.83,
    2.91,
    3.04,
    3.24
  ],

  '90D': [
    2.10,
    2.21,
    2.18,
    2.35,
    2.42,
    2.58,
    2.49,
    2.76,
    2.91,
    3.24
  ],

  '1Y': [
    1.42,
    1.58,
    1.71,
    1.65,
    1.92,
    2.08,
    2.32,
    2.54,
    2.91,
    3.24
  ]
}

const currentChart = computed(() => {
  return chartData[activeRange.value]
})

const chartPoints = computed(() => {
  const data = currentChart.value

  const min = Math.min(...data)

  const max = Math.max(...data)

  const width = 900

  const height = 300

  return data
    .map((value, index) => {
      const x =
        (index / (data.length - 1)) * width

      const y =
        height -
        ((value - min) / (max - min || 1)) *
          (height - 40) -
        20

      return `${x},${y}`
    })
    .join(' ')
})

const chartArea = computed(() => {
  return `${chartPoints.value} 900,300 0,300`
})

/* =========================================
   BUY CALCULATIONS
========================================= */

const buyTotal = computed(() => {
  return (
    buyQuantity.value *
    player.value.price
  )
})

const buyFee = computed(() => {
  return buyTotal.value * 0.005
})

const buyFinalTotal = computed(() => {
  return buyTotal.value + buyFee.value
})

/* =========================================
   SELL CALCULATIONS
========================================= */

const sellTotal = computed(() => {
  return (
    sellQuantity.value *
    player.value.price
  )
})

const sellFee = computed(() => {
  return sellTotal.value * SELL_FEE_RATE
})

const sellFinalTotal = computed(() => {
  return sellTotal.value - sellFee.value
})

/* =========================================
   FUNCTIONS
========================================= */

function toggleFollow() {
  isFollowing.value = !isFollowing.value
}

function increaseBuy() {
  buyQuantity.value++
}

function decreaseBuy() {
  if (buyQuantity.value > 1) {
    buyQuantity.value--
  }
}

function increaseSell() {
  if (sellQuantity.value < ownedShares.value) {
    sellQuantity.value++
  }
}

function decreaseSell() {
  if (sellQuantity.value > 1) {
    sellQuantity.value--
  }
}

function confirmBuy() {
  const result = wallet.buyShares(player.value, buyQuantity.value)

  if (!result.ok) {
    tradeError.value = result.error
    return
  }

  tradeError.value = ''
  showBuy.value = false
}

function confirmSell() {
  const result = wallet.sellShares(
    player.value.id,
    sellQuantity.value,
    player.value.price
  )

  if (!result.ok) {
    tradeError.value = result.error
    return
  }

  tradeError.value = ''
  showSell.value = false
}

function openBuy() {
  tradeError.value = ''
  showBuy.value = true
}

function openSell() {
  tradeError.value = ''
  sellQuantity.value = ownedShares.value
    ? Math.min(
        ownedShares.value,
        Math.max(1, Math.ceil(MINIMUM_SELL_VALUE / player.value.price))
      )
    : 0
  showSell.value = true
}

function goToPrediction() {
  router.push(`/player/${player.value.id}/prediction`)
}
</script>


<template>

  <div class="player-page">

    <!-- =====================================
         HEADER
    ====================================== -->

  <AppHeader 
        :player-name="player.name" 
        page-title="Overview"
        />


    <main class="container">

      <!-- =====================================
           PLAYER HERO
      ====================================== -->

      <section class="player-hero">

        <div class="player-main">

          <div class="player-image-wrapper">

            <img
              :src="player.image"
              :alt="player.name"
              class="player-image"
            />

            <div class="jersey-number">
              {{ player.number }}
            </div>

          </div>


          <div class="player-info">

            <div class="player-meta">

              <span class="position">
                {{ t(player.position) }}
              </span>

              <span>
                {{ player.league }}
              </span>

            </div>


            <h1>
              {{ player.name }}
            </h1>


            <div class="team">

              <div class="team-logo">
                {{ player.teamShort }}
              </div>

              <span>
                {{ player.team }}
              </span>

              <span class="dot"></span>

              <span>
                {{ player.country }}
              </span>

            </div>

          </div>

        </div>


        <div class="player-price">

          <span class="price-label">
            {{ t('Current Price') }}
          </span>

          <div class="price">
            ${{ player.price.toFixed(2) }}
          </div>

          <div class="price-change positive">

            <i class="fa-solid fa-arrow-trend-up"></i>

            +{{ player.change24h }}%

            <span>
              24h
            </span>

          </div>

        </div>

      </section>


      <!-- =====================================
           ACTION BAR
      ====================================== -->

      <section class="action-bar">

        <button
          class="follow-button"
          :class="{ following: isFollowing }"
          @click="toggleFollow"
        >

          <i
            :class="
              isFollowing
                ? 'fa-solid fa-star'
                : 'fa-regular fa-star'
            "
          ></i>

          {{ isFollowing ? t('Following') : t('Follow') }}

        </button>


        <div class="trade-actions">

          <button
            class="trade-button buy"
            @click="openBuy"
          >

            <i class="fa-solid fa-arrow-up"></i>

            {{ t('Buy') }}

          </button>


          <button
            class="trade-button sell"
            @click="openSell"
          >

            <i class="fa-solid fa-arrow-down"></i>

            {{ t('Sell') }}

          </button>


          <button class="trade-button swap">

            <i class="fa-solid fa-right-left"></i>

            {{ t('Swap') }}

          </button>


                        <button
  class="trade-button predict"
  @click="goToPrediction"
>
  <i class="fa-solid fa-bolt"></i>
  {{ t('Predict') }}
</button>

        </div>

      </section>


      <!-- =====================================
           MARKET STATS
      ====================================== -->

      <section class="market-stats">

        <div class="market-stat">

          <span>
            {{ t('24H Change') }}
          </span>

          <strong class="positive">
            +{{ player.change24h }}%
          </strong>

        </div>


        <div class="market-stat">

          <span>
            {{ t('7D Change') }}
          </span>

          <strong class="positive">
            +{{ player.change7d }}%
          </strong>

        </div>


        <div class="market-stat">

          <span>
            {{ t('30D Change') }}
          </span>

          <strong class="positive">
            +{{ player.change30d }}%
          </strong>

        </div>


        <div class="market-stat">

          <span>
            {{ t('Market Activity') }}
          </span>

          <strong>
            {{ player.marketActivity }}/100
          </strong>

        </div>


        <div class="market-stat">

          <span>
            {{ t('Performance') }}
          </span>

          <strong>
            {{ player.performanceIndex }}
          </strong>

        </div>

      </section>


      <!-- =====================================
           CONTENT GRID
      ====================================== -->

      <div class="content-grid">


        <!-- ===================================
             MAIN COLUMN
        ==================================== -->

        <div class="main-column">


          <!-- CHART -->

          <section class="card chart-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('PRICE PERFORMANCE') }}
                </span>

                <h2>
                  {{ t('Price History') }}
                </h2>

              </div>


              <div class="range-selector">

                <button
                  v-for="range in ranges"
                  :key="range"
                  :class="{
                    active:
                      activeRange === range
                  }"
                  @click="
                    activeRange = range
                  "
                >
                  {{ range }}
                </button>

              </div>

            </div>


            <div class="chart-summary">

              <div>

                <strong>
                  ${{ player.price.toFixed(2) }}
                </strong>

                <span class="positive">

                  +{{ player.change7d }}%

                </span>

              </div>


              <span>
                {{ t('Last') }} {{ activeRange }}
              </span>

            </div>


            <div class="chart">

              <svg
                viewBox="0 0 900 300"
                preserveAspectRatio="none"
              >

                <defs>

                  <linearGradient
                    id="chartGradient"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >

                    <stop
                      offset="0%"
                      stop-color="rgba(139,92,246,.25)"
                    />

                    <stop
                      offset="100%"
                      stop-color="rgba(139,92,246,0)"
                    />

                  </linearGradient>

                </defs>


                <polygon
                  :points="chartArea"
                  fill="url(#chartGradient)"
                />


                <polyline
                  :points="chartPoints"
                  fill="none"
                  stroke="#8b5cf6"
                  stroke-width="4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />

              </svg>


              <div class="chart-labels">

                <span>
                  Aug 28
                </span>

                <span>
                  Aug 30
                </span>

                <span>
                  Sep 01
                </span>

                <span>
                  Sep 03
                </span>

              </div>

            </div>

          </section>


          <!-- STATISTICS -->

          <section class="card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('PLAYER PERFORMANCE') }}
                </span>

                <h2>
                  {{ t('Statistics') }}
                </h2>

              </div>


              <button class="more-button">

                {{ t('Season 25/26') }}

                <i
                  class="fa-solid fa-chevron-down"
                ></i>

              </button>

            </div>


            <div class="stats-grid">

              <div class="stat-card">

                <span>
                  {{ t('Goals') }}
                </span>

                <strong>
                  {{ player.stats.goals }}
                </strong>

                <small>
                  +12% {{ t('vs last season') }}
                </small>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Assists') }}
                </span>

                <strong>
                  {{ player.stats.assists }}
                </strong>

                <small>
                  +8% {{ t('vs last season') }}
                </small>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Shots') }}
                </span>

                <strong>
                  {{ player.stats.shots }}
                </strong>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Shots on Target') }}
                </span>

                <strong>
                  {{ player.stats.shotsOnTarget }}
                </strong>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Key Passes') }}
                </span>

                <strong>
                  {{ player.stats.keyPasses }}
                </strong>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Minutes') }}
                </span>

                <strong>
                  {{ player.stats.minutes }}
                </strong>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Cards') }}
                </span>

                <strong>
                  {{ player.stats.cards }}
                </strong>

              </div>


              <div class="stat-card">

                <span>
                  {{ t('Matches') }}
                </span>

                <strong>
                  {{ player.stats.matches }}
                </strong>

              </div>

            </div>

          </section>


          <!-- CURRENT FORM -->

          <section class="card form-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('RECENT PERFORMANCE') }}
                </span>

                <h2>
                  {{ t('Current Form') }}
                </h2>

              </div>


              <span class="form-rating">
                {{ t('Excellent') }}
              </span>

            </div>


            <div class="form-list">

              <div
                v-for="(result, index) in player.form"
                :key="index"
                class="form-item"
              >

                <div
                  class="form-icon"
                  :class="result"
                >

                  <i
                    v-if="result === 'goal'"
                    class="fa-solid fa-futbol"
                  ></i>


                  <i
                    v-else-if="
                      result === 'assist'
                    "
                    class="fa-solid fa-hands-helping"
                  ></i>


                  <i
                    v-else
                    class="fa-solid fa-minus"
                  ></i>

                </div>


                <span>
                  {{ t('Match {number}', { number: index + 1 }) }}
                </span>

              </div>

            </div>

          </section>


          <!-- NEWS -->

          <section class="card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('LATEST') }}
                </span>

                <h2>
                  {{ t('{player} News', { player: player.shortName }) }}
                </h2>

              </div>


              <button class="view-all">

                {{ t('View all') }}

                <i
                  class="fa-solid fa-arrow-right"
                ></i>

              </button>

            </div>


            <div class="news-list">


              <article class="news-item">

                <div class="news-image">

                  <img
                    :src="player.image"
                    :alt="player.name"
                  />

                </div>


                <div>

                  <span class="news-category">
                    {{ player.league }}
                  </span>

                  <h3>
                    {{ player.shortName }}
                    {{ t('continues impressive scoring form') }}
                  </h3>

                  <p>
                    {{ player.team }} {{ t('forward remains one of the most important players in the league.') }}
                  </p>

                  <small>
                    2 {{ t('hours ago') }}
                  </small>

                </div>

              </article>


              <article class="news-item">

                <div class="news-image">

                  <img
                    :src="player.image"
                    :alt="player.name"
                  />

                </div>


                <div>

                  <span class="news-category">
                    {{ player.team }}
                  </span>

                  <h3>
                    {{ t('{team} prepare for another important fixture', { team: player.team }) }}
                  </h3>

                  <p>
                    {{ t('{player} is expected to start.', { player: player.shortName }) }}
                  </p>

                  <small>
                    {{ t('Yesterday') }}
                  </small>

                </div>

              </article>

            </div>

          </section>

        </div>


        <!-- ===================================
             SIDEBAR
        ==================================== -->

        <aside class="sidebar">


          <!-- POSITION -->

          <section class="card position-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('YOUR POSITION') }}
                </span>

                <h2>
                  {{ player.shortName }}
                </h2>

              </div>


              <i
                class="fa-solid fa-chart-line"
              ></i>

            </div>


            <div class="position-value">

              <span>
                {{ t('Current Value') }}
              </span>

              <strong>
                ${{ positionValue.toFixed(2) }}
              </strong>

              <small :class="positionProfit >= 0 ? 'positive' : 'negative'">
                {{ ownedShares
                  ? `${positionProfit >= 0 ? '+' : ''}$${positionProfit.toFixed(2)} P/L`
                  : t('No shares owned yet') }}
              </small>

            </div>


            <div class="position-details">

              <div>

                <span>
                  {{ t('Owned Shares') }}
                </span>

                <strong>
                  {{ ownedShares }}
                </strong>

              </div>


              <div>

                <span>
                  {{ t('Avg. Buy Price') }}
                </span>

                <strong>
                  ${{ averageBuyPrice.toFixed(2) }}
                </strong>

              </div>

            </div>


            <button
              class="full-button"
              @click="openSell"
            >
              {{ t('Manage Position') }}
            </button>

          </section>


          <!-- UPCOMING MATCH -->

          <section class="card match-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('UPCOMING MATCH') }}
                </span>

                <h2>
                  {{ t('Next Match') }}
                </h2>

              </div>

            </div>


            <div class="match-time">

              <span>
                SAT · 18:30
              </span>

              <strong>
                2d 04h
              </strong>

            </div>


            <div class="teams">


              <div class="team-match">

                <div class="team-circle">
                  {{ player.teamShort }}
                </div>

                <span>
                  {{ player.team }}
                </span>

              </div>


              <div class="vs">
                VS
              </div>


              <div class="team-match">

                <div class="team-circle opponent">
                  {{ player.opponentShort }}
                </div>

                <span>
                  {{ player.opponent }}
                </span>

              </div>

            </div>


            <div class="match-footer">

              <span>
                {{ t('Stadium') }}
              </span>

              <span>
                {{ player.league }}
              </span>

            </div>

          </section>


          <!-- PREDICTION -->

          <section class="card prediction-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('COMMUNITY') }}
                </span>

                <h2>
                  {{ t('Popular Prediction') }}
                </h2>

              </div>

            </div>


            <p class="prediction-question">

              {{ t('Will {player} score in the next match?', { player: player.shortName }) }}

            </p>


            <div class="prediction-options">

              <button class="prediction-option">

                <span>
                  {{ t('YES') }}
                </span>

                <strong>
                  72%
                </strong>

              </button>


              <button class="prediction-option">

                <span>
                  {{ t('NO') }}
                </span>

                <strong>
                  28%
                </strong>

              </button>

            </div>


            <button class="predict-button">

              <i
                class="fa-solid fa-bolt"
              ></i>

              {{ t('Make Prediction') }}

            </button>

          </section>


          <!-- MARKET ACTIVITY -->

          <section class="card activity-card">

            <div class="card-header">

              <div>

                <span class="eyebrow">
                  {{ t('LIVE MARKET') }}
                </span>

                <h2>
                  {{ t('Activity') }}
                </h2>

              </div>

              <span class="live-dot"></span>

            </div>


            <div class="activity-row">

              <div class="activity-user">

                <div class="mini-avatar">
                  JD
                </div>

                <div>

                  <strong>
                    John D.
                  </strong>

                  <span>
                    {{ t('Bought {quantity} shares', { quantity: 12 }) }}
                  </span>

                </div>

              </div>


              <strong class="positive">
                +$38.88
              </strong>

            </div>


            <div class="activity-row">

              <div class="activity-user">

                <div class="mini-avatar">
                  MK
                </div>

                <div>

                  <strong>
                    Mike K.
                  </strong>

                  <span>
                    {{ t('Bought {quantity} shares', { quantity: 8 }) }}
                  </span>

                </div>

              </div>


              <strong class="positive">
                +$25.92
              </strong>

            </div>


            <div class="activity-row">

              <div class="activity-user">

                <div class="mini-avatar">
                  AS
                </div>

                <div>

                  <strong>
                    Alex S.
                  </strong>

                  <span>
                    {{ t('Sold {quantity} shares', { quantity: 5 }) }}
                  </span>

                </div>

              </div>


              <strong class="negative">
                -$16.20
              </strong>

            </div>

          </section>

        </aside>

      </div>

    </main>


    <!-- =====================================
         MOBILE TRADE BAR
    ====================================== -->

    <div class="mobile-trade-bar">

      <button
        class="mobile-sell"
        @click="openSell"
      >
        {{ t('Sell') }}
      </button>


      <button
        class="mobile-buy"
        @click="openBuy"
      >
        {{ t('Buy {player}', { player: player.shortName }) }}
      </button>

    </div>


    <!-- =====================================
         BUY MODAL
    ====================================== -->

    <Teleport to="body">

      <div
        v-if="showBuy"
        class="modal-overlay"
        @click.self="
          showBuy = false
        "
      >

        <div class="trade-modal">


          <button
            class="modal-close"
            @click="
              showBuy = false
            "
          >

            <i
              class="fa-solid fa-xmark"
            ></i>

          </button>


          <span class="eyebrow">
            {{ t('BUY SHARES') }}
          </span>


          <h2>
            {{ t('Buy {player}', { player: player.shortName }) }}
          </h2>


          <div class="modal-price">

            <span>
              {{ t('Current Price') }}
            </span>

            <strong>
              ${{ player.price.toFixed(2) }}
            </strong>

          </div>


          <label>
            {{ t('Quantity') }}
          </label>


          <div class="quantity-input">

            <button
              @click="decreaseBuy"
            >
              -
            </button>


            <input
              v-model.number="buyQuantity"
              type="number"
              min="1"
            />


            <button
              @click="increaseBuy"
            >
              +
            </button>

          </div>


          <div class="order-summary">


            <div>

              <span>
                {{ t('Estimated Cost') }}
              </span>

              <strong>
                ${{ buyTotal.toFixed(2) }}
              </strong>

            </div>


            <div>

              <span>
                {{ t('Available Cash') }}
              </span>

              <strong>
                ${{ wallet.balance.toFixed(2) }}
              </strong>

            </div>


            <div>

              <span>
                {{ t('Fee') }}
              </span>

              <strong>
                ${{ buyFee.toFixed(2) }}
              </strong>

            </div>


            <div class="total">

              <span>
                {{ t('Total') }}
              </span>

              <strong>
                ${{ buyFinalTotal.toFixed(2) }}
              </strong>

            </div>

          </div>


          <button
            class="confirm-button"
            @click="confirmBuy"
          >
            {{ t('Confirm Buy') }}
          </button>
          <p v-if="tradeError" class="trade-error" role="alert">
            {{ t(tradeError) }}
          </p>

        </div>

      </div>

    </Teleport>


    <!-- =====================================
         SELL MODAL
    ====================================== -->

    <Teleport to="body">

      <div
        v-if="showSell"
        class="modal-overlay"
        @click.self="
          showSell = false
        "
      >

        <div class="trade-modal">


          <button
            class="modal-close"
            @click="
              showSell = false
            "
          >

            <i
              class="fa-solid fa-xmark"
            ></i>

          </button>


          <span class="eyebrow">
            {{ t('SELL SHARES') }}
          </span>


          <h2>
            {{ t('Sell {player}', { player: player.shortName }) }}
          </h2>


          <div class="owned-shares">

            <span>
              {{ t('Owned Shares') }}
            </span>

            <strong>
              {{ ownedShares }}
            </strong>

          </div>


          <label>
            {{ t('Quantity') }}
          </label>


          <div class="quantity-input">

            <button
              @click="decreaseSell"
            >
              -
            </button>


            <input
              v-model.number="sellQuantity"
              type="number"
              :min="ownedShares ? 1 : 0"
              :max="ownedShares"
            />


            <button
              @click="increaseSell"
            >
              +
            </button>

          </div>

          <p v-if="!ownedShares" class="trade-hint">
            {{ t('You do not own any shares of this player yet.') }}
          </p>
          <p v-else-if="sellTotal < MINIMUM_SELL_VALUE" class="trade-hint">
            {{ t('The minimum sale value is {amount}.', { amount: `$${MINIMUM_SELL_VALUE.toFixed(2)}` }) }}
          </p>

          <p v-if="tradeError" class="trade-error" role="alert">
            {{ t(tradeError) }}
          </p>

          <div class="order-summary">


            <div>

              <span>
                {{ t('Current Price') }}
              </span>

              <strong>
                ${{ player.price.toFixed(2) }}
              </strong>

            </div>


            <div>

              <span>
                {{ t('Estimated Value') }}
              </span>

              <strong>
                ${{ sellTotal.toFixed(2) }}
              </strong>

            </div>


            <div>

              <span>
                {{ t('Fee') }}
              </span>

              <strong>
                ${{ sellFee.toFixed(2) }}
              </strong>

            </div>


            <div class="total">

              <span>
                {{ t('Estimated Net') }}
              </span>

              <strong>
                ${{ sellFinalTotal.toFixed(2) }}
              </strong>

            </div>

          </div>


          <button
            class="confirm-button sell-confirm"
            :disabled="!canSell"
            @click="confirmSell"
          >
            {{ t('Confirm Sell') }}
          </button>

        </div>

      </div>

    </Teleport>

  </div>

</template>


<style scoped>

/* =========================================
   ROOT
========================================= */

.player-page {
  min-height: 100vh;
  background: #020305;
  color: #f5f5f7;
  padding-bottom: 40px;
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

  border-bottom: 1px solid rgba(255,255,255,.06);

  background: rgba(2,3,5,.92);

  backdrop-filter: blur(18px);

  position: sticky;
  top: 0;
  z-index: 50;
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

  border-radius: 12px;

  color: #aaa;

  background: #0c0e12;

  border: 1px solid rgba(255,255,255,.06);

  text-decoration: none;

  transition: .2s;
}


.back-button:hover {
  color: #fff;
  border-color: rgba(139,92,246,.5);
  background: rgba(139,92,246,.08);
}


.breadcrumb {
  display: flex;
  align-items: center;
  gap: 12px;

  color: #777;

  font-size: 14px;
}


.breadcrumb i {
  font-size: 10px;
}


.breadcrumb strong {
  color: #ddd;
}


/* =========================================
   HEADER ACTIONS
========================================= */

.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}


.icon-button {
  width: 40px;
  height: 40px;

  border: 0;

  border-radius: 12px;

  background: #0c0e12;

  color: #aaa;

  cursor: pointer;

  font-size: 16px;
}


.balance {
  display: flex;
  flex-direction: column;

  gap: 2px;

  text-align: right;
}


.balance span {
  font-size: 11px;
  color: #777;
}


.balance strong {
  font-size: 14px;
  color: #eee;
}


.avatar {
  width: 38px;
  height: 38px;

  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: linear-gradient(
    135deg,
    #8b5cf6,
    #6d28d9
  );

  font-weight: 700;
}


/* =========================================
   CONTAINER
========================================= */

.container {
  width: min(1380px, calc(100% - 80px));

  margin: 0 auto;
}


/* =========================================
   PLAYER HERO
========================================= */

.player-hero {
  margin-top: 32px;

  padding: 30px;

  border: 1px solid rgba(255,255,255,.07);

  border-radius: 22px;

  background:
    radial-gradient(
      circle at 15% 20%,
      rgba(139,92,246,.08),
      transparent 30%
    ),
    #090b0f;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 30px;
}


.player-main {
  display: flex;
  align-items: center;
  gap: 24px;
}


.player-image-wrapper {
  width: 120px;
  height: 120px;

  position: relative;

  flex-shrink: 0;
}


.player-image {
  width: 100%;
  height: 100%;

  object-fit: cover;

  border-radius: 20px;

  border: 1px solid rgba(255,255,255,.08);
}


.jersey-number {
  position: absolute;

  right: -8px;
  bottom: -8px;

  width: 34px;
  height: 34px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #8b5cf6;

  color: white;

  font-size: 13px;
  font-weight: 800;
}


.player-meta {
  display: flex;
  align-items: center;
  gap: 10px;

  color: #777;

  font-size: 12px;

  text-transform: uppercase;
  letter-spacing: .08em;
}


.position {
  padding: 5px 9px;

  border-radius: 7px;

  color: #c4b5fd;

  background: rgba(139,92,246,.12);

  border: 1px solid rgba(139,92,246,.18);
}


.player-info h1 {
  margin: 10px 0;

  font-size: 34px;

  line-height: 1.1;

  letter-spacing: -.04em;
}


.team {
  display: flex;
  align-items: center;
  gap: 9px;

  color: #aaa;

  font-size: 14px;
}


.team-logo {
  width: 28px;
  height: 28px;

  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 8px;

  background: #11141a;

  color: #ddd;

  font-size: 10px;

  font-weight: 800;
}


.dot {
  width: 4px;
  height: 4px;

  border-radius: 50%;

  background: #555;
}


/* =========================================
   PRICE
========================================= */

.player-price {
  text-align: right;
}


.price-label {
  display: block;

  margin-bottom: 6px;

  color: #777;

  font-size: 12px;
}


.price {
  font-size: 36px;

  font-weight: 800;

  letter-spacing: -.04em;
}


.price-change {
  margin-top: 5px;

  display: flex;
  align-items: center;
  justify-content: flex-end;

  gap: 5px;

  font-size: 13px;
  font-weight: 700;
}


.price-change span {
  color: #777;
  font-weight: 400;
}


.positive {
  color: #6ee7b7;
}


.negative {
  color: #fb7185;
}


/* =========================================
   ACTION BAR
========================================= */

.action-bar {
  margin-top: 16px;

  padding: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 16px;

  background: #090b0f;
}


.follow-button,
.trade-button {
  border: 0;

  cursor: pointer;

  transition: .2s;
}


.follow-button {
  padding: 11px 16px;

  display: flex;
  align-items: center;
  gap: 8px;

  border-radius: 10px;

  color: #bbb;

  background: #111318;
}


.follow-button:hover,
.follow-button.following {
  color: #c4b5fd;

  background: rgba(139,92,246,.1);
}


.trade-actions {
  display: flex;
  gap: 8px;
}


.trade-button {
  padding: 11px 17px;

  border-radius: 10px;

  font-weight: 700;

  color: #ddd;

  background: #111318;
}


.trade-button:hover {
  transform: translateY(-1px);
}


.trade-button.buy {
  background: #8b5cf6;
  color: #fff;
}


.trade-button.sell:hover {
  background: rgba(251,113,133,.1);
  color: #fb7185;
}


.trade-button.swap:hover {
  background: rgba(139,92,246,.1);
  color: #c4b5fd;
}


.trade-button.predict {
  background: rgba(139,92,246,.1);
  color: #c4b5fd;
}


/* =========================================
   MARKET STATS
========================================= */

.market-stats {
  margin-top: 16px;

  display: grid;

  grid-template-columns:
    repeat(5, 1fr);

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 16px;

  background: #090b0f;

  overflow: hidden;
}


.market-stat {
  padding: 18px 20px;

  border-right: 1px solid rgba(255,255,255,.05);
}


.market-stat:last-child {
  border-right: 0;
}


.market-stat span {
  display: block;

  margin-bottom: 7px;

  color: #666;

  font-size: 11px;
}


.market-stat strong {
  font-size: 17px;
}


/* =========================================
   CONTENT GRID
========================================= */

.content-grid {
  margin-top: 16px;

  display: grid;

  grid-template-columns:
    minmax(0, 1fr)
    360px;

  gap: 16px;
}


.main-column,
.sidebar {
  display: flex;

  flex-direction: column;

  gap: 16px;
}


/* =========================================
   CARD
========================================= */

.card {
  padding: 24px;

  border-radius: 18px;

  background: #090b0f;

  border: 1px solid rgba(255,255,255,.06);
}


.card-header {
  display: flex;

  align-items: flex-start;

  justify-content: space-between;

  gap: 20px;
}


.eyebrow {
  color: #666;

  font-size: 10px;

  font-weight: 800;

  letter-spacing: .12em;
}


.card h2 {
  margin: 5px 0 0;

  font-size: 19px;

  letter-spacing: -.02em;
}


/* =========================================
   CHART
========================================= */

.range-selector {
  display: flex;

  gap: 4px;

  padding: 4px;

  border-radius: 9px;

  background: #111318;
}


.range-selector button {
  padding: 7px 10px;

  border: 0;

  border-radius: 7px;

  color: #666;

  background: transparent;

  font-size: 11px;

  cursor: pointer;
}


.range-selector button.active {
  color: #fff;

  background: #8b5cf6;
}


.chart-summary {
  margin-top: 28px;

  display: flex;

  justify-content: space-between;

  align-items: center;
}


.chart-summary strong {
  margin-right: 10px;

  font-size: 26px;
}


.chart-summary span:last-child {
  color: #555;

  font-size: 11px;
}


.chart {
  margin-top: 18px;

  height: 280px;

  position: relative;
}


.chart svg {
  width: 100%;
  height: 100%;
}


.chart-labels {
  position: absolute;

  left: 0;
  right: 0;
  bottom: 0;

  display: flex;

  justify-content: space-between;

  color: #555;

  font-size: 10px;
}


/* =========================================
   STATS
========================================= */

.more-button,
.view-all {
  border: 0;

  color: #888;

  background: transparent;

  font-size: 12px;

  cursor: pointer;
}


.stats-grid {
  margin-top: 22px;

  display: grid;

  grid-template-columns:
    repeat(4, 1fr);

  gap: 10px;
}


.stat-card {
  padding: 16px;

  border-radius: 12px;

  background: #0e1015;

  border: 1px solid rgba(255,255,255,.04);
}


.stat-card span {
  display: block;

  color: #666;

  font-size: 11px;

  margin-bottom: 8px;
}


.stat-card strong {
  display: block;

  font-size: 24px;
}


.stat-card small {
  display: block;

  margin-top: 5px;

  color: #6ee7b7;

  font-size: 9px;
}


/* =========================================
   FORM
========================================= */

.form-rating {
  padding: 7px 10px;

  border-radius: 8px;

  color: #6ee7b7;

  background: rgba(110,231,183,.08);

  font-size: 11px;
}


.form-list {
  margin-top: 22px;

  display: flex;

  gap: 10px;
}


.form-item {
  flex: 1;

  padding: 14px;

  display: flex;

  align-items: center;

  gap: 9px;

  border-radius: 12px;

  background: #0e1015;

  color: #888;

  font-size: 11px;
}


.form-icon {
  width: 30px;
  height: 30px;

  flex-shrink: 0;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 8px;

  font-size: 11px;
}


.form-icon.goal {
  color: #6ee7b7;
  background: rgba(110,231,183,.08);
}


.form-icon.assist {
  color: #c4b5fd;
  background: rgba(139,92,246,.1);
}


.form-icon.miss {
  color: #777;
  background: #17191e;
}


/* =========================================
   NEWS
========================================= */

.news-list {
  margin-top: 22px;

  display: flex;

  flex-direction: column;

  gap: 16px;
}


.news-item {
  display: grid;

  grid-template-columns: 120px 1fr;

  gap: 16px;

  padding-bottom: 16px;

  border-bottom: 1px solid rgba(255,255,255,.05);
}


.news-item:last-child {
  border-bottom: 0;
  padding-bottom: 0;
}


.news-image {
  height: 90px;

  overflow: hidden;

  border-radius: 11px;
}


.news-image img {
  width: 100%;
  height: 100%;

  object-fit: cover;
}


.news-category {
  color: #a78bfa;

  font-size: 9px;

  font-weight: 800;

  letter-spacing: .08em;
}


.news-item h3 {
  margin: 5px 0;

  font-size: 14px;
}


.news-item p {
  margin: 0 0 6px;

  color: #666;

  font-size: 11px;

  line-height: 1.6;
}


.news-item small {
  color: #555;

  font-size: 10px;
}


/* =========================================
   POSITION
========================================= */

.position-value {
  margin-top: 24px;
}


.position-value span {
  display: block;

  color: #666;

  font-size: 11px;
}


.position-value strong {
  display: block;

  margin: 4px 0;

  font-size: 30px;
}


.position-value small {
  font-size: 11px;
}


.position-details {
  margin-top: 22px;

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 10px;
}


.position-details div {
  padding: 13px;

  border-radius: 11px;

  background: #0e1015;
}


.position-details span {
  display: block;

  margin-bottom: 5px;

  color: #666;

  font-size: 10px;
}


.position-details strong {
  font-size: 14px;
}


.full-button {
  width: 100%;

  margin-top: 16px;

  padding: 12px;

  border: 0;

  border-radius: 10px;

  color: #fff;

  background: #8b5cf6;

  font-weight: 700;

  cursor: pointer;
}


/* =========================================
   MATCH
========================================= */

.match-time {
  margin-top: 20px;

  display: flex;

  justify-content: space-between;

  align-items: center;
}


.match-time span {
  color: #777;

  font-size: 10px;
}


.match-time strong {
  color: #a78bfa;

  font-size: 12px;
}


.teams {
  margin: 24px 0;

  display: flex;

  align-items: center;

  justify-content: space-between;
}


.team-match {
  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 8px;

  max-width: 90px;

  text-align: center;
}


.team-match span {
  color: #aaa;

  font-size: 10px;
}


.team-circle {
  width: 48px;
  height: 48px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 14px;

  background: #12151b;

  color: #ddd;

  font-size: 10px;

  font-weight: 800;
}


.team-circle.opponent {
  background: #15171c;
}


.vs {
  color: #555;

  font-size: 10px;

  font-weight: 800;
}


.match-footer {
  padding-top: 15px;

  display: flex;

  justify-content: space-between;

  border-top: 1px solid rgba(255,255,255,.05);

  color: #555;

  font-size: 9px;
}


/* =========================================
   PREDICTION
========================================= */

.prediction-question {
  margin: 20px 0;

  color: #ccc;

  font-size: 13px;

  line-height: 1.6;
}


.prediction-options {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 8px;
}


.prediction-option {
  padding: 14px;

  border: 1px solid rgba(255,255,255,.06);

  border-radius: 11px;

  background: #0e1015;

  cursor: pointer;
}


.prediction-option span {
  display: block;

  margin-bottom: 4px;

  color: #666;

  font-size: 9px;
}


.prediction-option strong {
  color: #6ee7b7;

  font-size: 19px;
}


.predict-button {
  width: 100%;

  margin-top: 10px;

  padding: 12px;

  border: 0;

  border-radius: 10px;

  color: #c4b5fd;

  background: rgba(139,92,246,.1);

  font-weight: 700;

  cursor: pointer;
}


/* =========================================
   ACTIVITY
========================================= */

.live-dot {
  width: 7px;
  height: 7px;

  margin-top: 7px;

  border-radius: 50%;

  background: #6ee7b7;

  box-shadow:
    0 0 0 4px
    rgba(110,231,183,.08);
}


.activity-row {
  padding: 15px 0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-bottom: 1px solid rgba(255,255,255,.04);
}


.activity-row:last-child {
  border-bottom: 0;
}


.activity-user {
  display: flex;

  align-items: center;

  gap: 10px;
}


.mini-avatar {
  width: 32px;
  height: 32px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 9px;

  background: #15171c;

  color: #aaa;

  font-size: 9px;

  font-weight: 800;
}


.activity-user strong {
  display: block;

  color: #ddd;

  font-size: 11px;
}


.activity-user span {
  display: block;

  margin-top: 2px;

  color: #555;

  font-size: 9px;
}


.activity-row > strong {
  font-size: 10px;
}


/* =========================================
   MOBILE TRADE
========================================= */

.mobile-trade-bar {
  display: none;
}


/* =========================================
   MODAL
========================================= */

.modal-overlay {
  position: fixed;

  inset: 0;

  z-index: 100;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 20px;

  background: rgba(0,0,0,.72);

  backdrop-filter: blur(8px);
}


.trade-modal {
  width: min(440px, 100%);

  padding: 28px;

  position: relative;

  border-radius: 20px;

  background: #0b0d11;

  border: 1px solid rgba(255,255,255,.08);

  box-shadow:
    0 30px 80px rgba(0,0,0,.5);
}


.modal-close {
  position: absolute;

  top: 18px;
  right: 18px;

  width: 34px;
  height: 34px;

  border: 0;

  border-radius: 9px;

  background: #15171c;

  color: #888;

  cursor: pointer;
}


.trade-modal h2 {
  margin: 7px 0 24px;
  color: #6d28d9;

  font-size: 24px;
}


.modal-price {
  padding: 15px;

  margin-bottom: 20px;

  display: flex;

  justify-content: space-between;

  align-items: center;

  border-radius: 11px;

  background: #101218;
}


.modal-price span {
  color: #666;

  font-size: 11px;
}


.modal-price strong {
  font-size: 18px;
}


.trade-modal label {
  display: block;

  margin-bottom: 8px;

  color: #888;

  font-size: 11px;
}


.quantity-input {
  display: grid;

  grid-template-columns: 45px 1fr 45px;

  height: 48px;

  overflow: hidden;

  border-radius: 11px;

  border: 1px solid rgba(255,255,255,.07);

  background: #101218;
}


.quantity-input button {
  border: 0;

  color: #aaa;

  background: transparent;

  font-size: 20px;

  cursor: pointer;
}


.quantity-input input {
  width: 100%;

  border: 0;

  outline: 0;

  color: #fff;

  background: transparent;

  text-align: center;

  font-size: 16px;

  font-weight: 700;
}


.order-summary {
  margin-top: 20px;

  display: flex;

  flex-direction: column;

  gap: 10px;
}


.order-summary div {
  display: flex;

  justify-content: space-between;

  color: #777;

  font-size: 11px;
}


.order-summary strong {
  color: #ddd;
}


.order-summary .total {
  margin-top: 8px;

  padding-top: 14px;

  border-top: 1px solid rgba(255,255,255,.06);

  color: #aaa;

  font-size: 13px;
}


.order-summary .total strong {
  color: #fff;

  font-size: 17px;
}


.confirm-button {
  width: 100%;

  margin-top: 22px;

  padding: 14px;

  border: 0;

  border-radius: 11px;

  background: #8b5cf6;

  color: #fff;

  font-weight: 800;

  cursor: pointer;
}

.confirm-button:disabled {
  opacity: .45;
  cursor: not-allowed;
}

.trade-error,
.trade-hint {
  margin: 10px 0 0;
  font-size: 12px;
  line-height: 1.5;
}

.trade-error {
  color: #fb7185;
}

.trade-hint {
  color: #f0c16a;
}


.sell-confirm {
  background: #111318;

  color: #fb7185;

  border: 1px solid rgba(251,113,133,.18);
}


.owned-shares {
  margin-bottom: 20px;

  padding: 14px;

  display: flex;

  align-items: center;

  justify-content: space-between;

  border-radius: 11px;

  background: #101218;
}


.owned-shares span {
  color: #666;

  font-size: 11px;
}


.owned-shares strong {
  color: #fff;

  font-size: 17px;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .container {
    width: min(
      100% - 40px,
      1000px
    );
  }


  .content-grid {
    grid-template-columns: 1fr;
  }


  .sidebar {
    display: grid;

    grid-template-columns:
      repeat(2, 1fr);

    align-items: start;
  }


  .stats-grid {
    grid-template-columns:
      repeat(4, 1fr);
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .player-page {
    padding-bottom: 80px;
  }


  .top-header {
    height: 60px;

    padding: 0 16px;
  }


  .header-actions {
    gap: 8px;
  }


  .balance {
    display: none;
  }


  .breadcrumb span,
  .breadcrumb i {
    display: none;
  }


  .container {
    width: calc(100% - 24px);
  }


  .player-hero {
    margin-top: 16px;

    padding: 18px;

    flex-direction: column;

    align-items: flex-start;

    gap: 20px;
  }


  .player-main {
    width: 100%;

    gap: 15px;
  }


  .player-image-wrapper {
    width: 82px;
    height: 82px;
  }


  .player-info h1 {
    font-size: 24px;
  }


  .player-meta {
    font-size: 9px;
  }


  .team {
    font-size: 11px;
  }


  .player-price {
    width: 100%;

    text-align: left;
  }


  .price {
    font-size: 28px;
  }


  .price-change {
    justify-content: flex-start;
  }


  .action-bar {
    flex-direction: column;

    align-items: stretch;

    gap: 10px;
  }


  .follow-button {
    justify-content: center;
  }


  .trade-actions {
    display: grid;

    grid-template-columns:
      repeat(2, 1fr);
  }


  .trade-button {
    width: 100%;
  }


  .market-stats {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .market-stat {
    border-right: 0;

    border-bottom: 1px solid rgba(255,255,255,.05);
  }


  .market-stat:last-child {
    grid-column: span 2;
  }


  .content-grid {
    margin-top: 12px;
  }


  .card {
    padding: 18px;
  }


  .card-header {
    flex-direction: column;

    gap: 14px;
  }


  .range-selector {
    width: 100%;

    justify-content: space-between;
  }


  .range-selector button {
    flex: 1;
  }


  .chart {
    height: 220px;
  }


  .stats-grid {
    grid-template-columns:
      repeat(2, 1fr);
  }


  .form-list {
    display: grid;

    grid-template-columns:
      repeat(2, 1fr);
  }


  .form-item {
    flex: unset;
  }


  .sidebar {
    display: flex;
  }


  .news-item {
    grid-template-columns: 90px 1fr;
  }


  .news-image {
    height: 75px;
  }


  .mobile-trade-bar {
    position: fixed;

    left: 0;
    right: 0;
    bottom: 0;

    z-index: 80;

    display: grid;

    grid-template-columns: 90px 1fr;

    gap: 8px;

    padding: 10px 12px;

    background: rgba(5,6,8,.94);

    border-top: 1px solid rgba(255,255,255,.07);

    backdrop-filter: blur(18px);
  }


  .mobile-trade-bar button {
    height: 46px;

    border: 0;

    border-radius: 11px;

    font-weight: 800;

    cursor: pointer;
  }


  .mobile-sell {
    color: #fb7185;

    background: #111318;
  }


  .mobile-buy {
    color: #fff;

    background: #8b5cf6;
  }

  

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

  .player-main {
    align-items: flex-start;
  }


  .player-image-wrapper {
    width: 70px;
    height: 70px;
  }


  .player-info h1 {
    font-size: 20px;
  }


  .player-meta span:last-child {
    display: none;
  }


  .stats-grid {
    gap: 7px;
  }


  .stat-card {
    padding: 13px;
  }


  .stat-card strong {
    font-size: 20px;
  }


  .form-list {
    grid-template-columns: 1fr;
  }


  .news-item {
    grid-template-columns: 1fr;
  }


  .news-image {
    height: 140px;
  }


  .market-stat {
    padding: 14px;
  }


  .market-stat strong {
    font-size: 15px;
  }


  .trade-modal {
    padding: 22px;
  }

}

</style>