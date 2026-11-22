<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import haalandImage from '@/assets/erling-halland.webp'
import mbappeImage from '@/assets/Kilian-mbappe.jpg'
import bellinghamImage from '@/assets/jude-bellingham.jpg'
import viniImage from '@/assets/vini-jr.webp'
import sakaImage from '@/assets/bukayo-saka.jpg'
import fodenImage from '@/assets/phil-foden.jpg'
import salahImage from '@/assets/mohamed-salah.jpg'
import kaneImage from '@/assets/harry-kane.jpg'
import AppHeader from '@/components/Header/AppHeader.vue'
import { t } from '@/i18n'

const router = useRouter()
const route = useRoute()


const playerId = computed(() => {
  return String(route.params.id || 'haaland')
})

const player = computed(() => {
  return (
    players.find(p => p.id === playerId.value) ||
    players[0]
  )
})

const walletBalance = ref(500)

/*
 * Mock stake.
 * Backend should validate the final order/prediction.
 */
const stake = ref(25)


/* =========================================
   TYPES
========================================= */

type Position = 'Forward' | 'Midfielder' | 'Winger'

interface Player {
  id: string
  name: string
  shortName: string
  team: string
  teamShort: string
  league: string
  position: Position
  number: number
  price: number
  change24h: number
  change7d: number
  volume: string
  image: string
  trending: boolean
}

/* =========================================
   MOCK DATA
========================================= */

const players: Player[] = [
  {
    id: 'haaland',
    name: 'Erling Haaland',
    shortName: 'Haaland',
    team: 'Manchester City',
    teamShort: 'MCI',
    league: 'Premier League',
    position: 'Forward',
    number: 9,
    price: 3.24,
    change24h: 4.2,
    change7d: 8.7,
    volume: '$2.4M',
    image: haalandImage,
    trending: true
  },

  {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    shortName: 'Mbappé',
    team: 'Real Madrid',
    teamShort: 'RMA',
    league: 'La Liga',
    position: 'Winger',
    number: 9,
    price: 3.12,
    change24h: 3.8,
    change7d: 7.4,
    volume: '$2.1M',
    image: mbappeImage,
    trending: true
  },

  {
    id: 'bellingham',
    name: 'Jude Bellingham',
    shortName: 'Bellingham',
    team: 'Real Madrid',
    teamShort: 'RMA',
    league: 'La Liga',
    position: 'Midfielder',
    number: 5,
    price: 2.86,
    change24h: 2.1,
    change7d: 5.9,
    volume: '$1.7M',
    image: bellinghamImage,
    trending: true
  },

  {
    id: 'vini-jr',
    name: 'Vinícius Jr.',
    shortName: 'Vinícius',
    team: 'Real Madrid',
    teamShort: 'RMA',
    league: 'La Liga',
    position: 'Winger',
    number: 7,
    price: 2.45,
    change24h: -1.2,
    change7d: 3.2,
    volume: '$1.4M',
    image: viniImage,
    trending: true
  },

  {
    id: 'saka',
    name: 'Bukayo Saka',
    shortName: 'Saka',
    team: 'Arsenal',
    teamShort: 'ARS',
    league: 'Premier League',
    position: 'Winger',
    number: 7,
    price: 2.31,
    change24h: 1.7,
    change7d: 4.5,
    volume: '$1.1M',
    image: sakaImage,
    trending: false
  },

  {
    id: 'foden',
    name: 'Phil Foden',
    shortName: 'Foden',
    team: 'Manchester City',
    teamShort: 'MCI',
    league: 'Premier League',
    position: 'Midfielder',
    number: 47,
    price: 2.18,
    change24h: 0.9,
    change7d: 2.7,
    volume: '$980K',
    image: fodenImage,
    trending: false
  },

  {
    id: 'salah',
    name: 'Mohamed Salah',
    shortName: 'Salah',
    team: 'Liverpool',
    teamShort: 'LIV',
    league: 'Premier League',
    position: 'Winger',
    number: 11,
    price: 2.74,
    change24h: -0.8,
    change7d: 1.9,
    volume: '$1.8M',
    image: salahImage,
    trending: false
  },

  {
    id: 'kane',
    name: 'Harry Kane',
    shortName: 'Kane',
    team: 'Bayern Munich',
    teamShort: 'BAY',
    league: 'Bundesliga',
    position: 'Forward',
    number: 9,
    price: 2.63,
    change24h: 1.4,
    change7d: 3.8,
    volume: '$1.3M',
    image: kaneImage,
    trending: false
  }
]

/* =========================================
   STATE
========================================= */

const searchQuery = ref('')
const activePosition = ref<'All' | Position>('All')
const sortBy = ref<'popular' | 'price' | 'change'>('popular')

const watchlist = ref<string[]>([
  'haaland',
  'mbappe'
])

/* =========================================
   FILTERS
========================================= */

const positions: Array<'All' | Position> = [
  'All',
  'Forward',
  'Midfielder',
  'Winger'
]

const filteredPlayers = computed(() => {
  let result = [...players]

  const query = searchQuery.value.trim().toLowerCase()

  if (query) {
    result = result.filter(player =>
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query) ||
      player.league.toLowerCase().includes(query)
    )
  }

  if (activePosition.value !== 'All') {
    result = result.filter(
      player => player.position === activePosition.value
    )
  }

  if (sortBy.value === 'price') {
    result.sort((a, b) => b.price - a.price)
  }

  if (sortBy.value === 'change') {
    result.sort((a, b) => b.change24h - a.change24h)
  }

  return result
})

const trendingPlayers = computed(() =>
  players.filter(player => player.trending)
)

/* =========================================
   WATCHLIST
========================================= */

function isWatched(playerId: string) {
  return watchlist.value.includes(playerId)
}

function toggleWatchlist(playerId: string) {
  if (watchlist.value.includes(playerId)) {
    watchlist.value = watchlist.value.filter(id => id !== playerId)
  } else {
    watchlist.value.push(playerId)
  }
}

/* =========================================
   NAVIGATION
========================================= */

function openPlayer(playerId: string) {
  router.push(`/player/${playerId}`)
}

function goToPrediction(playerId: string) {
  router.push(`/player/${playerId}/prediction`)
}

/* =========================================
   FORMATTERS
========================================= */

function formatPrice(price: number) {
  return `$${price.toFixed(2)}`
}

function formatChange(change: number) {
  return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`
}
</script>

<template>
  <div class="market-page">
    <!-- =====================================
         HEADER
    ====================================== -->
    <AppHeader
  page-title="Market"
/>
    <!-- =====================================
         SEARCH / FILTER BAR
    ====================================== -->

    <section class="market-controls">

      <div class="search-box">

        <i class="fa-solid fa-magnifying-glass"></i>

        <input
          v-model="searchQuery"
          type="text"
          :placeholder="t('Search players, teams or leagues...')"
        />

        <button
          v-if="searchQuery"
          class="clear-search"
          @click="searchQuery = ''"
        >
          <i class="fa-solid fa-xmark"></i>
        </button>

      </div>


      <div class="position-filters">

        <button
          v-for="position in positions"
          :key="position"
          class="filter-button"
          :class="{ active: activePosition === position }"
          @click="activePosition = position"
        >
          {{ t(position) }}
        </button>

      </div>


      <div class="sort-box">

        <i class="fa-solid fa-arrow-down-wide-short"></i>

        <select v-model="sortBy">
          <option value="popular">
            {{ t('Popular') }}
          </option>

          <option value="price">
            {{ t('Highest Price') }}
          </option>

          <option value="change">
            {{ t('Biggest Change') }}
          </option>
        </select>

      </div>

    </section>


    <!-- =====================================
         TRENDING PLAYERS
    ====================================== -->

    <section class="trending-section">

      <div class="section-heading">

        <div>
          <div class="section-kicker">
            <i class="fa-solid fa-fire"></i>
            {{ t('MARKET MOVERS') }}
          </div>

          <h2>
            {{ t('Trending Players') }}
          </h2>
        </div>

        <span class="section-count">
          {{ trendingPlayers.length }} {{ t('players') }}
        </span>

      </div>


      <div class="trending-grid">

        <article
          v-for="player in trendingPlayers"
          :key="player.id"
          class="trending-card"
          @click="openPlayer(player.id)"
        >

          <div class="card-top">

            <button
              class="watch-button"
              :class="{ active: isWatched(player.id) }"
              @click.stop="toggleWatchlist(player.id)"
            >
              <i
                :class="
                  isWatched(player.id)
                    ? 'fa-solid fa-star'
                    : 'fa-regular fa-star'
                "
              ></i>
            </button>

            <span
              class="movement"
              :class="player.change24h >= 0 ? 'positive' : 'negative'"
            >
              {{ formatChange(player.change24h) }}
            </span>

          </div>


          <div class="player-visual">

            <div class="player-glow"></div>

            <img
              :src="player.image"
              :alt="player.name"
            />

          </div>


          <div class="player-info">

            <span class="player-team">
              {{ player.team }}
            </span>

            <h3>
              {{ player.name }}
            </h3>

            <div class="player-price-row">

              <strong>
                {{ formatPrice(player.price) }}
              </strong>

              <span>
                / {{ t('share') }}
              </span>

            </div>

          </div>


          <div class="card-footer">

            <span>
              7D
              <strong
                :class="
                  player.change7d >= 0
                    ? 'positive'
                    : 'negative'
                "
              >
                {{ formatChange(player.change7d) }}
              </strong>
            </span>

            <button
              class="trade-link"
              @click.stop="goToPrediction(player.id)"
            >
              {{ t('Predict') }}
              <i class="fa-solid fa-arrow-right"></i>
            </button>

          </div>

        </article>

      </div>

    </section>


    <!-- =====================================
         ALL PLAYERS
    ====================================== -->

    <section class="players-section">

      <div class="section-heading all-heading">

        <div>
          <div class="section-kicker">
            <i class="fa-solid fa-chart-line"></i>
            {{ t('PLAYER MARKET') }}
          </div>

          <h2>
            {{ t('All Players') }}
          </h2>
        </div>

        <span class="section-count">
          {{ filteredPlayers.length }} {{ t('results') }}
        </span>

      </div>


      <!-- DESKTOP TABLE -->

      <div
        v-if="filteredPlayers.length"
        class="players-table"
      >

        <div class="table-head">

          <span>{{ t('PLAYER') }}</span>
          <span>{{ t('TEAM') }}</span>
          <span>{{ t('PRICE') }}</span>
          <span>24H</span>
          <span>7D</span>
          <span>{{ t('VOLUME') }}</span>
          <span></span>

        </div>


        <article
          v-for="player in filteredPlayers"
          :key="player.id"
          class="player-row"
          @click="openPlayer(player.id)"
        >

          <div class="table-player">

            <div class="table-player-image">
              <img
                :src="player.image"
                :alt="player.name"
              />
            </div>

            <div class="table-player-info">

              <strong>
                {{ player.name }}
              </strong>

              <span>
                {{ t(player.position) }}
              </span>

            </div>

          </div>


          <div class="team-cell">

            <strong>
              {{ player.teamShort }}
            </strong>

            <span>
              {{ player.team }}
            </span>

          </div>


          <div class="price-cell">
            {{ formatPrice(player.price) }}
          </div>


          <div
            class="change-cell"
            :class="
              player.change24h >= 0
                ? 'positive'
                : 'negative'
            "
          >
            {{ formatChange(player.change24h) }}
          </div>


          <div
            class="change-cell"
            :class="
              player.change7d >= 0
                ? 'positive'
                : 'negative'
            "
          >
            {{ formatChange(player.change7d) }}
          </div>


          <div class="volume-cell">
            {{ player.volume }}
          </div>


          <div class="row-actions">

            <button
              class="row-watch"
              :class="{ active: isWatched(player.id) }"
              @click.stop="toggleWatchlist(player.id)"
            >
              <i
                :class="
                  isWatched(player.id)
                    ? 'fa-solid fa-star'
                    : 'fa-regular fa-star'
                "
              ></i>
            </button>

            <button
              class="row-trade"
              @click.stop="openPlayer(player.id)"
            >
              {{ t('View') }}
              <i class="fa-solid fa-arrow-right"></i>
            </button>

          </div>

        </article>

      </div>


      <!-- EMPTY STATE -->

      <div
        v-else
        class="empty-state"
      >

        <div class="empty-icon">
          <i class="fa-solid fa-user-slash"></i>
        </div>

        <h3>
          {{ t('No players found') }}
        </h3>

        <p>
          {{ t('Try another player, team or position.') }}
        </p>

        <button
          @click="
            searchQuery = '';
            activePosition = 'All'
          "
        >
          {{ t('Clear filters') }}
        </button>

      </div>

    </section>

  </div>
</template>


<style scoped>
/* =========================================
   ROOT
========================================= */

.market-page {
  min-height: 100vh;
  background:
    radial-gradient(
      circle at 85% 5%,
      rgba(139, 92, 246, 0.08),
      transparent 25%
    ),
    #020305;
  color: #f8fafc;
  padding: 0px 30px 50px;
}


/* =========================================
   HEADER
========================================= */


/* =========================================
   CONTROLS
========================================= */

.market-controls {
  display: grid;
  grid-template-columns: minmax(260px, 1fr) auto auto;
  align-items: center;
  gap: 12px;
  margin-bottom: 42px;
}

.search-box {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 15px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 13px;
  background: #090b0f;
  transition: 0.2s ease;
}

.search-box:focus-within {
  border-color: rgba(139, 92, 246, 0.5);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.08);
}

.search-box > i {
  color: #626a78;
  font-size: 14px;
}

.search-box input {
  width: 100%;
  height: 100%;
  border: 0;
  outline: none;
  background: transparent;
  color: #f8fafc;
  font: inherit;
  font-size: 13px;
}

.search-box input::placeholder {
  color: #535b68;
}

.clear-search {
  width: 28px;
  height: 28px;
  border: 0;
  border-radius: 8px;
  background: #14171d;
  color: #8b94a3;
  cursor: pointer;
}

.position-filters {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 13px;
  background: #090b0f;
}

.filter-button {
  height: 38px;
  padding: 0 13px;
  border: 0;
  border-radius: 9px;
  background: transparent;
  color: #717887;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  transition: 0.2s ease;
}

.filter-button:hover {
  color: #d8dce5;
}

.filter-button.active {
  color: #fff;
  background: #8b5cf6;
  box-shadow: 0 5px 18px rgba(139, 92, 246, 0.2);
}

.sort-box {
  height: 48px;
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 0 13px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 13px;
  background: #090b0f;
}

.sort-box > i {
  color: #6d7480;
  font-size: 12px;
}

.sort-box select {
  border: 0;
  outline: none;
  background: transparent;
  color: #cbd1dc;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.sort-box select option {
  background: #090b0f;
}


/* =========================================
   SECTION HEADINGS
========================================= */

.section-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-kicker {
  display: flex;
  align-items: center;
  gap: 7px;
  margin-bottom: 7px;
  color: #697180;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.16em;
}

.section-kicker i {
  color: #8b5cf6;
}

.section-heading h2 {
  margin: 0;
  font-size: 21px;
  letter-spacing: -0.025em;
}

.section-count {
  color: #555d6b;
  font-size: 11px;
  font-weight: 600;
}


/* =========================================
   TRENDING
========================================= */

.trending-section {
  margin-bottom: 48px;
}

.trending-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.trending-card {
  position: relative;
  min-height: 290px;
  padding: 17px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 18px;
  background:
    linear-gradient(
      145deg,
      rgba(255, 255, 255, 0.035),
      transparent 45%
    ),
    #090b0f;
  cursor: pointer;
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.trending-card:hover {
  transform: translateY(-4px);
  border-color: rgba(139, 92, 246, 0.3);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
}

.card-top {
  position: relative;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.watch-button {
  width: 31px;
  height: 31px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 9px;
  background: rgba(255, 255, 255, 0.035);
  color: #626a78;
  cursor: pointer;
  transition: 0.2s ease;
}

.watch-button:hover,
.watch-button.active {
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.3);
  background: rgba(139, 92, 246, 0.08);
}

.movement {
  padding: 6px 8px;
  border-radius: 7px;
  font-size: 10px;
  font-weight: 800;
}

.positive {
  color: #6ee7b7;
}

.negative {
  color: #fb7185;
}

.movement.positive {
  background: rgba(110, 231, 183, 0.07);
}

.movement.negative {
  background: rgba(251, 113, 133, 0.07);
}

.player-visual {
  position: relative;
  height: 125px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-top: 4px;
}

.player-glow {
  position: absolute;
  width: 115px;
  height: 115px;
  border-radius: 50%;
  background: rgba(139, 92, 246, 0.13);
  filter: blur(28px);
}

.player-visual img {
  position: relative;
  z-index: 1;
  width: auto;
  height: 125px;
  max-width: 90%;
  object-fit: contain;
  object-position: bottom;
  filter: saturate(0.9);
}

.player-info {
  position: relative;
  z-index: 2;
  margin-top: 7px;
}

.player-team {
  display: block;
  margin-bottom: 4px;
  color: #646c79;
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.player-info h3 {
  margin: 0;
  color: #eef1f6;
  font-size: 15px;
  letter-spacing: -0.02em;
}

.player-price-row {
  display: flex;
  align-items: baseline;
  gap: 5px;
  margin-top: 6px;
}

.player-price-row strong {
  color: #fff;
  font-size: 18px;
}

.player-price-row span {
  color: #505866;
  font-size: 9px;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 13px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.055);
  color: #5e6673;
  font-size: 10px;
}

.card-footer strong {
  margin-left: 5px;
}

.trade-link {
  display: flex;
  align-items: center;
  gap: 6px;
  border: 0;
  background: transparent;
  color: #a78bfa;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}

.trade-link i {
  font-size: 9px;
  transition: transform 0.2s ease;
}

.trade-link:hover i {
  transform: translateX(3px);
}


/* =========================================
   TABLE
========================================= */

.players-section {
  margin-top: 8px;
}

.all-heading {
  margin-bottom: 16px;
}

.players-table {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 16px;
  background: #090b0f;
}

.table-head,
.player-row {
  display: grid;
  grid-template-columns:
    2.2fr
    1.5fr
    0.9fr
    0.8fr
    0.8fr
    1fr
    1.35fr;
  align-items: center;
}

.table-head {
  min-height: 44px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  color: #515966;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: 0.13em;
}

.player-row {
  min-height: 72px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.045);
  cursor: pointer;
  transition: background 0.2s ease;
}

.player-row:last-child {
  border-bottom: 0;
}

.player-row:hover {
  background: rgba(139, 92, 246, 0.035);
}

.table-player {
  display: flex;
  align-items: center;
  gap: 11px;
}

.table-player-image {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: end center;
  overflow: hidden;
  border-radius: 11px;
  background: #11141a;
}

.table-player-image img {
  width: auto;
  height: 39px;
  max-width: 100%;
  object-fit: contain;
}

.table-player-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.table-player-info strong {
  color: #e9edf4;
  font-size: 12px;
}

.table-player-info span {
  color: #5d6572;
  font-size: 9px;
}

.team-cell {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.team-cell strong {
  color: #cbd1dc;
  font-size: 11px;
}

.team-cell span {
  color: #555e6c;
  font-size: 9px;
}

.price-cell {
  color: #edf0f5;
  font-size: 12px;
  font-weight: 800;
}

.change-cell {
  font-size: 11px;
  font-weight: 800;
}

.volume-cell {
  color: #777f8c;
  font-size: 10px;
}

.row-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 7px;
}

.row-watch {
  width: 31px;
  height: 31px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 8px;
  background: transparent;
  color: #555e6b;
  cursor: pointer;
}

.row-watch:hover,
.row-watch.active {
  color: #a78bfa;
  border-color: rgba(139, 92, 246, 0.25);
}

.row-trade {
  height: 31px;
  padding: 0 11px;
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(139, 92, 246, 0.25);
  border-radius: 8px;
  background: rgba(139, 92, 246, 0.07);
  color: #b9a4ff;
  font-size: 9px;
  font-weight: 800;
  cursor: pointer;
}

.row-trade:hover {
  background: rgba(139, 92, 246, 0.14);
}


/* =========================================
   EMPTY STATE
========================================= */

.empty-state {
  padding: 70px 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  background: #090b0f;
}

.empty-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  margin-bottom: 15px;
  border-radius: 14px;
  background: rgba(139, 92, 246, 0.08);
  color: #8b5cf6;
}

.empty-state h3 {
  margin: 0;
  font-size: 15px;
}

.empty-state p {
  margin: 7px 0 18px;
  color: #606876;
  font-size: 11px;
}

.empty-state button {
  height: 35px;
  padding: 0 14px;
  border: 0;
  border-radius: 9px;
  background: #8b5cf6;
  color: #fff;
  font-size: 10px;
  font-weight: 800;
  cursor: pointer;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 1100px) {

  .market-page {
    padding: 28px 28px 70px;
  }

  .trending-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .market-controls {
    grid-template-columns: 1fr auto;
  }

  .search-box {
    grid-column: 1 / -1;
  }

  .position-filters {
    justify-content: flex-start;
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 760px) {

  .market-page {
    padding: 22px 16px 100px;
  }

  .market-header {
    align-items: flex-start;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 25px;
  }

  .page-heading h1 {
    font-size: 34px;
  }

  .page-heading p {
    max-width: 330px;
    line-height: 1.6;
  }

  .header-actions {
    width: 100%;
    justify-content: space-between;
  }

  .market-status {
    margin-right: auto;
  }

  .balance {
    align-items: flex-end;
  }

  .market-controls {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 9px;
    margin-bottom: 34px;
  }

  .search-box {
    width: 100%;
  }

  .position-filters {
    width: 100%;
    overflow-x: auto;
    scrollbar-width: none;
  }

  .position-filters::-webkit-scrollbar {
    display: none;
  }

  .filter-button {
    flex: 0 0 auto;
  }

  .sort-box {
    width: 100%;
  }

  .sort-box select {
    flex: 1;
  }

  .trending-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .trending-card {
    min-height: 245px;
    padding: 12px;
    border-radius: 14px;
  }

  .player-visual {
    height: 100px;
  }

  .player-visual img {
    height: 100px;
  }

  .player-info h3 {
    font-size: 13px;
  }

  .player-price-row strong {
    font-size: 15px;
  }

  .section-heading {
    align-items: flex-end;
  }

  .section-heading h2 {
    font-size: 18px;
  }

  .section-count {
    font-size: 9px;
  }

  /* Mobile cards instead of table */

  .players-table {
    border: 0;
    background: transparent;
    overflow: visible;
  }

  .table-head {
    display: none;
  }

  .player-row {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-areas:
      "player actions"
      "team actions";
    gap: 7px 10px;
    min-height: 74px;
    padding: 12px;
    margin-bottom: 8px;
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 13px;
    background: #090b0f;
  }

  .table-player {
    grid-area: player;
  }

  .team-cell {
    grid-area: team;
    padding-left: 51px;
    margin-top: -7px;
  }

  .team-cell strong {
    display: inline;
    margin-right: 5px;
  }

  .team-cell span {
    display: inline;
  }

  .price-cell {
    position: absolute;
    margin-left: 125px;
    margin-top: -4px;
    font-size: 11px;
  }

  .change-cell {
    display: none;
  }

  .volume-cell {
    display: none;
  }

  .row-actions {
    grid-area: actions;
  }

  .row-trade {
    width: 32px;
    padding: 0;
    justify-content: center;
    font-size: 0;
  }

  .row-trade i {
    font-size: 10px;
  }

  .row-watch {
    width: 32px;
  }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 430px) {

  .market-page {
    padding-left: 12px;
    padding-right: 12px;
  }

  .page-heading h1 {
    font-size: 31px;
  }

  .market-status {
    font-size: 10px;
  }

  .trending-grid {
    gap: 7px;
  }

  .trending-card {
    min-height: 230px;
    padding: 10px;
  }

  .watch-button {
    width: 28px;
    height: 28px;
  }

  .movement {
    padding: 5px 6px;
    font-size: 8px;
  }

  .player-visual {
    height: 88px;
  }

  .player-visual img {
    height: 88px;
  }

  .player-team {
    font-size: 8px;
  }

  .player-info h3 {
    font-size: 12px;
  }

  .player-price-row {
    margin-top: 4px;
  }

  .player-price-row strong {
    font-size: 14px;
  }

  .card-footer {
    margin-top: 9px;
    padding-top: 9px;
  }

  .card-footer > span {
    display: none;
  }

  .trade-link {
    width: 100%;
    justify-content: center;
  }

}
</style>