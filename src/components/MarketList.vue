<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/Header/AppHeader.vue'
import { t } from '@/i18n'

import haalandImage from '@/assets/erling-halland.webp'
import mbappeImage from '@/assets/Kilian-mbappe.jpg'
import bellinghamImage from '@/assets/jude-bellingham.jpg'
import viniImage from '@/assets/vini-jr.webp'
import sakaImage from '@/assets/bukayo-saka.jpg'
import fodenImage from '@/assets/phil-foden.jpg'
import salahImage from '@/assets/mohamed-salah.jpg'
import kaneImage from '@/assets/harry-kane.jpg'

type MarketType =
  | 'first-goal'
  | 'assist'
  | 'anytime-goal'
  | 'yellow-card'
  | 'player-of-match'

type PlayerId =
  | 'haaland'
  | 'mbappe'
  | 'bellingham'
  | 'vini-jr'
  | 'saka'
  | 'foden'
  | 'salah'
  | 'kane'

interface Player {
  id: PlayerId
  name: string
  team: string
  league: string
  image: string
  goals: number
  assists: number
  cards: number
  performance: number
}

const props = defineProps<{ marketType: MarketType }>()
const router = useRouter()
const searchQuery = ref('')

const players: Record<PlayerId, Player> = {
  haaland: {
    id: 'haaland',
    name: 'Erling Haaland',
    team: 'Manchester City',
    league: 'Premier League',
    image: haalandImage,
    goals: 28,
    assists: 6,
    cards: 2,
    performance: 94
  },
  mbappe: {
    id: 'mbappe',
    name: 'Kylian Mbappé',
    team: 'Real Madrid',
    league: 'La Liga',
    image: mbappeImage,
    goals: 25,
    assists: 8,
    cards: 1,
    performance: 96
  },
  bellingham: {
    id: 'bellingham',
    name: 'Jude Bellingham',
    team: 'Real Madrid',
    league: 'La Liga',
    image: bellinghamImage,
    goals: 18,
    assists: 11,
    cards: 4,
    performance: 91
  },
  'vini-jr': {
    id: 'vini-jr',
    name: 'Vinícius Jr.',
    team: 'Real Madrid',
    league: 'La Liga',
    image: viniImage,
    goals: 17,
    assists: 9,
    cards: 3,
    performance: 89
  },
  saka: {
    id: 'saka',
    name: 'Bukayo Saka',
    team: 'Arsenal',
    league: 'Premier League',
    image: sakaImage,
    goals: 16,
    assists: 9,
    cards: 2,
    performance: 87
  },
  foden: {
    id: 'foden',
    name: 'Phil Foden',
    team: 'Manchester City',
    league: 'Premier League',
    image: fodenImage,
    goals: 14,
    assists: 7,
    cards: 1,
    performance: 85
  },
  salah: {
    id: 'salah',
    name: 'Mohamed Salah',
    team: 'Liverpool',
    league: 'Premier League',
    image: salahImage,
    goals: 19,
    assists: 8,
    cards: 2,
    performance: 90
  },
  kane: {
    id: 'kane',
    name: 'Harry Kane',
    team: 'Bayern Munich',
    league: 'Bundesliga',
    image: kaneImage,
    goals: 22,
    assists: 6,
    cards: 2,
    performance: 89
  }
}

const marketTabs: Array<{ type: MarketType; title: string; icon: string }> = [
  { type: 'first-goal', title: 'First Goal', icon: 'fa-solid fa-bolt' },
  { type: 'assist', title: 'Assist', icon: 'fa-solid fa-bullseye' },
  { type: 'anytime-goal', title: 'Anytime Goal', icon: 'fa-solid fa-futbol' },
  { type: 'yellow-card', title: 'Yellow Card', icon: 'fa-solid fa-ticket' },
  { type: 'player-of-match', title: 'Player of Match', icon: 'fa-solid fa-star' }
]

const marketPlayerIds: Record<MarketType, PlayerId[]> = {
  'first-goal': [
    'haaland',
    'mbappe',
    'kane',
    'salah',
    'bellingham',
    'vini-jr',
    'saka',
    'foden'
  ],
  assist: [
    'bellingham',
    'vini-jr',
    'saka',
    'mbappe',
    'salah',
    'foden',
    'haaland',
    'kane'
  ],
  'anytime-goal': [
    'haaland',
    'mbappe',
    'kane',
    'salah',
    'vini-jr',
    'saka',
    'bellingham',
    'foden'
  ],
  'yellow-card': [
    'bellingham',
    'vini-jr',
    'saka',
    'haaland',
    'salah',
    'kane',
    'mbappe',
    'foden'
  ],
  'player-of-match': [
    'mbappe',
    'haaland',
    'bellingham',
    'salah',
    'vini-jr',
    'kane',
    'saka',
    'foden'
  ]
}

const currentMarket = computed(() =>
  marketTabs.find(market => market.type === props.marketType) ?? marketTabs[0]
)

const statLabel = computed(() => {
  if (props.marketType === 'assist') return 'Assists'
  if (props.marketType === 'yellow-card') return 'Cards'
  if (props.marketType === 'player-of-match') return 'Performance'
  return 'Goals'
})

const filteredPlayers = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return marketPlayerIds[props.marketType]
    .map(id => players[id])
    .filter(player =>
      !query ||
      player.name.toLowerCase().includes(query) ||
      player.team.toLowerCase().includes(query) ||
      player.league.toLowerCase().includes(query)
    )
})

function playerStat(player: Player) {
  if (props.marketType === 'assist') return player.assists
  if (props.marketType === 'yellow-card') return player.cards
  if (props.marketType === 'player-of-match') return player.performance
  return player.goals
}

function openPlayer(playerId: PlayerId) {
  router.push(`/player/${playerId}`)
}
</script>

<template>
  <div class="market-list-page">
    <AppHeader :page-title="currentMarket.title" />

    <main class="market-list-content">
      <nav class="market-tabs" :aria-label="t('Popular Markets')">
        <RouterLink
          v-for="market in marketTabs"
          :key="market.type"
          :to="`/markets/${market.type}`"
          class="market-tab"
          :class="{ active: props.marketType === market.type }"
        >
          <i :class="market.icon"></i>
          <span>{{ t(market.title) }}</span>
        </RouterLink>
      </nav>

      <section class="market-panel">
        <div class="panel-heading">
          <div>
            <span class="section-kicker">
              <i :class="currentMarket.icon"></i>
              {{ t('PLAYER MARKET') }}
            </span>
            <h1>{{ t(currentMarket.title) }}</h1>
          </div>
          <span class="player-count">
            {{ filteredPlayers.length }} {{ t('players') }}
          </span>
        </div>

        <label class="search-box">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input
            v-model="searchQuery"
            type="search"
            :placeholder="t('Search players, teams or leagues...')"
          >
        </label>

        <div v-if="filteredPlayers.length" class="player-list">
          <article
            v-for="player in filteredPlayers"
            :key="player.id"
            class="player-row"
          >
            <img class="player-image" :src="player.image" :alt="player.name">

            <div class="player-info">
              <span class="player-team">{{ player.team }} · {{ player.league }}</span>
              <h2>{{ player.name }}</h2>
            </div>

            <div class="player-stat">
              <span>{{ t(statLabel) }}</span>
              <strong>{{ playerStat(player) }}</strong>
            </div>

            <button class="view-button" @click="openPlayer(player.id)">
              {{ t('View') }}
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </article>
        </div>

        <div v-else class="empty-state">
          <i class="fa-solid fa-magnifying-glass"></i>
          <strong>{{ t('No players found') }}</strong>
          <span>{{ t('Try another player, team or position.') }}</span>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.market-list-page {
  min-height: 100vh;
  color: #f8fafc;
  background:
    radial-gradient(circle at 85% 5%, rgba(139, 92, 246, 0.09), transparent 26%),
    #020305;
}

.market-list-content {
  width: min(1120px, 100%);
  margin: 0 auto;
  padding: 28px 24px 64px;
  box-sizing: border-box;
}

.market-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
  overflow-x: auto;
  scrollbar-width: thin;
}

.market-tab {
  display: inline-flex;
  flex: 0 0 auto;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  color: #9696a3;
  background: #090b10;
  font-size: 13px;
  text-decoration: none;
  transition: 0.2s;
}

.market-tab:hover,
.market-tab.active {
  color: #fff;
  border-color: rgba(155, 92, 255, 0.45);
  background: rgba(139, 92, 246, 0.12);
}

.market-tab i {
  color: #9b5cff;
}

.market-panel {
  padding: 24px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  background: rgba(9, 11, 16, 0.92);
}

.panel-heading {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
}

.section-kicker {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #9b5cff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.panel-heading h1 {
  margin: 8px 0 0;
  color: #f8fafc;
  font-size: 28px;
}

.player-count {
  color: #858591;
  font-size: 13px;
  white-space: nowrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  max-width: 440px;
  height: 44px;
  margin-bottom: 16px;
  padding: 0 13px;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 10px;
  color: #858591;
  background: #06070a;
}

.search-box:focus-within {
  border-color: rgba(155, 92, 255, 0.55);
}

.search-box input {
  width: 100%;
  min-width: 0;
  border: 0;
  outline: 0;
  color: #eee;
  background: transparent;
  font: inherit;
  font-size: 13px;
}

.player-list {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.player-row {
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr) 110px 84px;
  align-items: center;
  gap: 14px;
  min-height: 82px;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
  background: rgba(14, 16, 22, 0.72);
  transition: background 0.2s;
}

.player-row:last-child {
  border-bottom: 0;
}

.player-row:hover {
  background: rgba(139, 92, 246, 0.07);
}

.player-image {
  width: 52px;
  height: 52px;
  border: 1px solid rgba(155, 92, 255, 0.28);
  border-radius: 50%;
  object-fit: cover;
}

.player-info {
  min-width: 0;
}

.player-team {
  display: block;
  overflow: hidden;
  color: #858591;
  font-size: 11px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-info h2 {
  overflow: hidden;
  margin: 5px 0 0;
  color: #f3f3f6;
  font-size: 15px;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.player-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
  color: #858591;
  font-size: 11px;
}

.player-stat strong {
  color: #e8dcff;
  font-size: 15px;
}

.view-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  min-height: 36px;
  border: 1px solid rgba(155, 92, 255, 0.28);
  border-radius: 8px;
  color: #d7c0ff;
  background: rgba(139, 92, 246, 0.1);
  font: inherit;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
}

.view-button:hover {
  color: #fff;
  border-color: #9b5cff;
  background: #7d3fe0;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 48px 16px;
  color: #858591;
  text-align: center;
}

.empty-state i {
  margin-bottom: 4px;
  color: #9b5cff;
  font-size: 22px;
}

.empty-state strong {
  color: #eee;
}

@media (max-width: 640px) {
  .market-list-content {
    padding: 18px 12px 44px;
  }

  .market-panel {
    padding: 16px 12px;
  }

  .panel-heading h1 {
    font-size: 22px;
  }

  .market-tab {
    padding: 9px 11px;
    font-size: 12px;
  }

  .player-row {
    grid-template-columns: 44px minmax(0, 1fr) 72px;
    gap: 10px;
    min-height: 72px;
    padding: 10px;
  }

  .player-image {
    width: 44px;
    height: 44px;
  }

  .player-info h2 {
    font-size: 13px;
  }

  .player-team {
    font-size: 10px;
  }

  .player-stat {
    grid-column: 2;
    grid-row: 2;
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }

  .player-row {
    grid-template-rows: auto auto;
  }

  .player-image {
    grid-row: 1 / 3;
  }

  .view-button {
    grid-column: 3;
    grid-row: 1 / 3;
    min-height: 34px;
    font-size: 11px;
  }

  .player-stat strong {
    font-size: 12px;
  }
}
</style>
