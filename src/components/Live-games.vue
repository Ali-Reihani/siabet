<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { language, t, type LanguageCode } from '@/i18n'

interface Team {
  name: string
  logo: string
}

interface GoalEvent {
  playerName: string
  minute: number | null
  extraMinute: number | null
  assistName: string
  team: 'home' | 'away' | null
  isOwnGoal: boolean
}

interface Match {
  id: string
  homeTeam: Team
  awayTeam: Team
  homeScore: number | null
  awayScore: number | null
  league: string
  leagueLogo: string
  kickoff: string
  status: string
  isLive: boolean
  isSample?: boolean
  goals?: GoalEvent[]
}

interface ApiResponse<T> {
  data: T
  updatedAt?: string
}

interface ApiStatus {
  configured: boolean
}

type MatchView = 'today' | 'week' | 'live'
type ConnectionState = 'checking' | 'connected' | 'not-configured' | 'error'

const localeByLanguage: Record<LanguageCode, string> = {
  en: 'en-GB',
  fa: 'fa-IR',
  tr: 'tr-TR',
  de: 'de-DE'
}

const selectedView = ref<MatchView>('today')
const connectionState = ref<ConnectionState>('checking')
const matches = ref<Match[]>([])
const liveMatches = ref<Match[]>([])
const isLoading = ref(false)
const hasLoaded = ref(false)
const lastUpdated = ref('')
const errorMessage = ref('')
const locale = computed(() => localeByLanguage[language.value])

let refreshTimer: ReturnType<typeof setInterval> | undefined
let activeController: AbortController | undefined

function localDateString(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function getDateRange() {
  const start = new Date()
  const end = new Date(start)
  end.setDate(end.getDate() + 6)
  return { start: localDateString(start), end: localDateString(end) }
}

function createSampleMatches(): Match[] {
  const today = new Date()
  const firstKickoff = new Date(today)
  firstKickoff.setHours(today.getHours() + 2, 0, 0, 0)

  const makeKickoff = (daysFromToday: number, hour: number) => {
    const kickoff = new Date(today)
    kickoff.setDate(kickoff.getDate() + daysFromToday)
    kickoff.setHours(hour, 0, 0, 0)
    return kickoff.toISOString()
  }

  return [
    {
      id: 'sample-1',
      homeTeam: { name: 'Arsenal', logo: '' },
      awayTeam: { name: 'Manchester City', logo: '' },
      homeScore: null,
      awayScore: null,
      league: 'Premier League',
      leagueLogo: '',
      kickoff: firstKickoff.toISOString(),
      status: '',
      isLive: false,
      isSample: true
    },
    {
      id: 'sample-2',
      homeTeam: { name: 'Real Madrid', logo: '' },
      awayTeam: { name: 'Barcelona', logo: '' },
      homeScore: null,
      awayScore: null,
      league: 'La Liga',
      leagueLogo: '',
      kickoff: makeKickoff(1, 18),
      status: '',
      isLive: false,
      isSample: true
    },
    {
      id: 'sample-3',
      homeTeam: { name: 'Bayern Munich', logo: '' },
      awayTeam: { name: 'Borussia Dortmund', logo: '' },
      homeScore: null,
      awayScore: null,
      league: 'Bundesliga',
      leagueLogo: '',
      kickoff: makeKickoff(3, 17),
      status: '',
      isLive: false,
      isSample: true
    },
    {
      id: 'sample-4',
      homeTeam: { name: 'Liverpool', logo: '' },
      awayTeam: { name: 'Chelsea', logo: '' },
      homeScore: null,
      awayScore: null,
      league: 'Premier League',
      leagueLogo: '',
      kickoff: makeKickoff(6, 16),
      status: '',
      isLive: false,
      isSample: true
    }
  ]
}

const sampleLiveMatch: Match = {
  id: 'sample-live',
  homeTeam: { name: 'Arsenal', logo: '' },
  awayTeam: { name: 'Manchester City', logo: '' },
  homeScore: 1,
  awayScore: 0,
  league: 'Premier League',
  leagueLogo: '',
  kickoff: new Date(Date.now() - 62 * 60_000).toISOString(),
  status: "62'",
  isLive: false,
  isSample: true,
  goals: [
    {
      playerName: 'Bukayo Saka',
      minute: 23,
      extraMinute: null,
      assistName: 'Martin Ødegaard',
      team: 'home',
      isOwnGoal: false
    }
  ]
}

const sampleMatches = [...createSampleMatches(), sampleLiveMatch]

async function fetchJson<T>(url: string, signal: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal })
  const body: unknown = await response.json()

  if (!response.ok) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof body.error === 'string'
        ? body.error
        : t('Could not load football data. Please try again.')
    throw new Error(message)
  }

  return body as T
}

async function loadMatches() {
  if (activeController) {
    return
  }

  const controller = new AbortController()
  activeController = controller
  isLoading.value = true
  errorMessage.value = ''

  try {
    const status = await fetchJson<ApiStatus>('/api/football/status', controller.signal)
    if (!status.configured) {
      connectionState.value = 'not-configured'
      matches.value = []
      liveMatches.value = []
      return
    }

    const range = getDateRange()
    const [fixturesResult, liveResult] = await Promise.all([
      fetchJson<ApiResponse<Match[]>>(
        `/api/football/fixtures?start=${range.start}&end=${range.end}`,
        controller.signal
      ),
      fetchJson<ApiResponse<Match[]>>('/api/football/live', controller.signal)
    ])

    matches.value = fixturesResult.data
    liveMatches.value = liveResult.data
    lastUpdated.value = liveResult.updatedAt || fixturesResult.updatedAt || ''
    connectionState.value = 'connected'
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      return
    }

    connectionState.value = 'error'
    errorMessage.value = 'Could not load football data. Please try again.'
  } finally {
    if (activeController === controller) {
      activeController = undefined
      isLoading.value = false
      hasLoaded.value = true
    }
  }
}

const allMatches = computed(() => {
  const byId = new Map(matches.value.map(match => [match.id, match]))
  for (const match of liveMatches.value) {
    byId.set(match.id, match)
  }
  return [...byId.values()]
})

const realTodayMatches = computed(() => {
  const today = localDateString(new Date())
  return allMatches.value.filter(
    match => match.kickoff && localDateString(new Date(match.kickoff)) === today
  )
})

const realWeekMatches = computed(() => {
  const start = new Date()
  start.setHours(0, 0, 0, 0)
  const end = new Date(start)
  end.setDate(end.getDate() + 7)

  return allMatches.value.filter(match => {
    if (!match.kickoff) {
      return false
    }
    const kickoff = new Date(match.kickoff)
    return kickoff >= start && kickoff < end
  })
})

const isShowingSamples = computed(
  () => hasLoaded.value && connectionState.value !== 'connected'
)
const liveMatchesForView = computed(() =>
  isShowingSamples.value ? [sampleLiveMatch] : liveMatches.value
)

const todayMatches = computed(() => {
  if (isShowingSamples.value) {
    const today = localDateString(new Date())
    return sampleMatches.filter(match => localDateString(new Date(match.kickoff)) === today)
  }
  return realTodayMatches.value
})

const weekMatches = computed(() =>
  isShowingSamples.value ? sampleMatches : realWeekMatches.value
)

const visibleMatches = computed(() => {
  if (isShowingSamples.value) {
    return selectedView.value === 'live'
      ? liveMatchesForView.value
      : selectedView.value === 'week'
        ? weekMatches.value
        : todayMatches.value
  }

  const selected =
    selectedView.value === 'live'
      ? liveMatchesForView.value
      : selectedView.value === 'week'
        ? weekMatches.value
        : todayMatches.value

  return [...selected].sort((first, second) => {
    const firstTime = Date.parse(first.kickoff)
    const secondTime = Date.parse(second.kickoff)
    return (
      (Number.isNaN(firstTime) ? Infinity : firstTime) -
      (Number.isNaN(secondTime) ? Infinity : secondTime)
    )
  })
})

function formatGoalMinute(goal: GoalEvent) {
  if (goal.minute === null) {
    return ''
  }
  return `${goal.minute}${goal.extraMinute === null ? '' : `+${goal.extraMinute}`}'`
}

function formatKickoff(value: string) {
  const date = new Date(value)
  if (!value || Number.isNaN(date.valueOf())) {
    return t('Scheduled')
  }
  return new Intl.DateTimeFormat(locale.value, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function formatLastUpdated(value: string) {
  const date = new Date(value)
  return Number.isNaN(date.valueOf())
    ? ''
    : new Intl.DateTimeFormat(locale.value, {
        hour: '2-digit',
        minute: '2-digit'
      }).format(date)
}

function hideBrokenLogo(event: Event) {
  if (event.currentTarget instanceof HTMLImageElement) {
    event.currentTarget.hidden = true
  }
}

onMounted(() => {
  void loadMatches()
  refreshTimer = setInterval(() => {
    void loadMatches()
  }, 30_000)
})

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
  }
  activeController?.abort()
})
</script>

<template>
  <Header />
  <Sidebar />

  <main class="live-page">
    <header class="page-heading">
      <div>
        <span class="eyebrow">{{ t('WORLDWIDE FOOTBALL') }}</span>
        <h1>{{ t('Worldwide football') }}</h1>
        <p>{{ t('Live scores and fixtures for the next seven days') }}</p>
      </div>

      <button class="refresh-button" type="button" :disabled="isLoading" @click="loadMatches">
        <i class="fa-solid fa-rotate" :class="{ spinning: isLoading }"></i>
        <span>{{ isLoading ? t('Refreshing...') : t('Refresh') }}</span>
      </button>
    </header>

    <section class="live-summary" aria-live="polite">
      <div class="summary-status">
        <span class="status-dot" :class="connectionState"></span>
        <span v-if="connectionState === 'connected'">{{ t('Live data connected') }}</span>
        <span v-else-if="connectionState === 'not-configured'">{{ t('Not connected') }}</span>
        <span v-else-if="connectionState === 'error'">{{ t('Connection error') }}</span>
        <span v-else>{{ t('Checking connection...') }}</span>
      </div>

      <span v-if="lastUpdated" class="updated-at">
        {{ t('Updated {time}', { time: formatLastUpdated(lastUpdated) }) }}
      </span>
    </section>

    <section
      v-if="connectionState === 'not-configured'"
      class="notice-card setup-notice"
      role="status"
    >
      <div class="notice-icon"><i class="fa-solid fa-plug-circle-exclamation"></i></div>
      <div>
        <h2>{{ t('Connect real football data') }}</h2>
        <p>
          {{ t('Live scores require a Sportmonks API token on the server. Add it to the server-side .env file. Do not put the token in frontend code or send it in chat.') }}
        </p>
        <small>{{ t('Your subscription determines which leagues are available.') }}</small>
        <a
          class="provider-link"
          href="https://my.sportmonks.com/register"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ t('Create a Sportmonks account') }}
          <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
        </a>
      </div>
    </section>

    <section v-else-if="connectionState === 'error'" class="notice-card error-notice" role="alert">
      <div class="notice-icon"><i class="fa-solid fa-triangle-exclamation"></i></div>
      <div>
        <h2>{{ t('Football data unavailable') }}</h2>
        <p>{{ t(errorMessage || 'Could not load football data. Please try again.') }}</p>
      </div>
      <button type="button" class="retry-button" @click="loadMatches">
        {{ t('Try again') }}
      </button>
    </section>

    <section class="matches-panel">
      <div class="panel-heading">
        <div>
          <span class="eyebrow">{{ t('MATCH CENTER') }}</span>
          <h2>{{ t('Football matches') }}</h2>
        </div>
        <span class="match-count">
          {{ visibleMatches.length }}
          {{ t(visibleMatches.length === 1 ? 'match' : 'matches') }}
        </span>
      </div>

      <div class="match-tabs" role="tablist" :aria-label="t('Match date filter')">
        <button
          type="button"
          role="tab"
          :aria-selected="selectedView === 'today'"
          :class="{ active: selectedView === 'today' }"
          @click="selectedView = 'today'"
        >
          {{ t('Today') }}
          <span>{{ todayMatches.length }}</span>
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="selectedView === 'week'"
          :class="{ active: selectedView === 'week' }"
          @click="selectedView = 'week'"
        >
          {{ t('Next 7 days') }}
          <span>{{ weekMatches.length }}</span>
        </button>
        <button
          type="button"
          role="tab"
          :aria-selected="selectedView === 'live'"
          :class="{ active: selectedView === 'live' }"
          @click="selectedView = 'live'"
        >
          <span class="tab-live-dot"></span>
          {{ t('Live now') }}
          <span>{{ liveMatchesForView.length }}</span>
        </button>
      </div>

      <div v-if="isShowingSamples" class="sample-disclaimer" role="note">
        <i class="fa-solid fa-circle-info"></i>
        <span>{{ t('These example matches, scores and goal events are for display only. They are not real fixtures or live scores.') }}</span>
      </div>

      <div v-if="isLoading && !hasLoaded" class="empty-state">
        <i class="fa-solid fa-futbol loading-ball"></i>
        <p>{{ t('Loading match data...') }}</p>
      </div>

      <div v-else-if="visibleMatches.length" class="match-list">
        <article v-for="match in visibleMatches" :key="match.id" class="match-card">
          <div class="match-meta">
            <div class="league-name">
              <img
                v-if="match.leagueLogo"
                :src="match.leagueLogo"
                :alt="match.league"
                @error="hideBrokenLogo"
              />
              <span>{{ match.league || t('Football matches') }}</span>
            </div>
            <span class="kickoff">{{ formatKickoff(match.kickoff) }}</span>
          </div>

          <div class="match-line">
            <div class="team team-home">
              <img
                v-if="match.homeTeam.logo"
                :src="match.homeTeam.logo"
                :alt="match.homeTeam.name"
                @error="hideBrokenLogo"
              />
              <span class="team-name">{{ match.homeTeam.name || t('Unknown team') }}</span>
            </div>

            <div class="score-block">
              <span v-if="match.isLive" class="live-label">{{ t('LIVE') }}</span>
              <span v-else-if="match.isSample" class="sample-label">{{ t('SAMPLE') }}</span>
              <span v-else-if="match.status" class="match-status">{{ match.status }}</span>
              <span v-if="match.status && (match.isLive || match.isSample)" class="match-status">
                {{ match.status }}
              </span>
              <strong v-if="match.homeScore !== null || match.awayScore !== null" class="score">
                {{ match.homeScore ?? '-' }} <i>:</i> {{ match.awayScore ?? '-' }}
              </strong>
              <strong v-else class="versus">- : -</strong>
            </div>

            <div class="team team-away">
              <span class="team-name">{{ match.awayTeam.name || t('Unknown team') }}</span>
              <img
                v-if="match.awayTeam.logo"
                :src="match.awayTeam.logo"
                :alt="match.awayTeam.name"
                @error="hideBrokenLogo"
              />
            </div>
          </div>

          <div v-if="match.goals?.length" class="goal-events" :aria-label="t('Goal scorers')">
            <div
              v-for="(goal, index) in match.goals"
              :key="`${match.id}-goal-${index}`"
              class="goal-event"
              :class="goal.team"
            >
              <i class="fa-solid fa-futbol" aria-hidden="true"></i>
              <span class="goal-scorer">{{ goal.playerName }}</span>
              <span v-if="formatGoalMinute(goal)" class="goal-minute">
                {{ formatGoalMinute(goal) }}
              </span>
              <span v-if="goal.isOwnGoal" class="own-goal-label">{{ t('Own goal') }}</span>
              <span v-if="goal.assistName" class="goal-assist">
                {{ t('Assist') }}: {{ goal.assistName }}
              </span>
            </div>
          </div>
        </article>
      </div>

      <div v-else-if="connectionState === 'connected'" class="empty-state">
        <div class="empty-icon"><i class="fa-regular fa-calendar-xmark"></i></div>
        <h3>{{ selectedView === 'live' ? t('No live matches right now.') : t('No matches in this period.') }}</h3>
        <p>{{ t('Match schedules are provided by Sportmonks and depend on your subscription.') }}</p>
      </div>
    </section>
  </main>
</template>

<style scoped>
.live-page {
  box-sizing: border-box;
  width: calc(100% - 220px);
  min-height: calc(100vh - 72px);
  margin-left: 220px;
  padding: 28px clamp(16px, 3vw, 42px) 48px;
  color: #f5f3fa;
  background:
    radial-gradient(circle at 82% 0, rgba(132, 75, 255, 0.1), transparent 34%),
    #09090b;
}

.page-heading,
.panel-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-heading {
  margin-bottom: 22px;
}

.eyebrow {
  color: #a778ff;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.14em;
}

.page-heading h1,
.panel-heading h2 {
  margin: 7px 0 0;
  font-size: clamp(22px, 2.5vw, 30px);
  font-weight: 700;
}

.page-heading p {
  margin: 7px 0 0;
  color: #96939f;
  font-size: 13px;
}

.refresh-button,
.retry-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  min-height: 42px;
  padding: 0 15px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  color: #f5f3fa;
  background: #14131a;
  cursor: pointer;
  transition: border-color 0.2s, background 0.2s;
}

.refresh-button:hover,
.retry-button:hover {
  border-color: rgba(167, 120, 255, 0.55);
  background: #1a1722;
}

.refresh-button:disabled {
  cursor: wait;
  opacity: 0.7;
}

.spinning {
  animation: spin 0.8s linear infinite;
}

.live-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 48px;
  margin-bottom: 16px;
  padding: 0 15px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  color: #aaa7b2;
  background: rgba(17, 16, 22, 0.82);
  font-size: 12px;
}

.summary-status {
  display: flex;
  align-items: center;
  gap: 9px;
}

.status-dot,
.tab-live-dot {
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  border-radius: 50%;
  background: #77727f;
}

.status-dot.connected,
.tab-live-dot {
  background: #fa5269;
  box-shadow: 0 0 11px rgba(250, 82, 105, 0.5);
}

.status-dot.not-configured {
  background: #e5a84d;
}

.status-dot.error {
  background: #fa5269;
}

.updated-at {
  color: #85818d;
}

.notice-card,
.matches-panel {
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(21, 19, 28, 0.96), rgba(13, 13, 17, 0.96));
}

.notice-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 18px;
  padding: 20px;
}

.notice-icon,
.empty-icon {
  display: grid;
  width: 42px;
  height: 42px;
  flex: 0 0 42px;
  place-items: center;
  border-radius: 13px;
  color: #bb91ff;
  background: rgba(155, 92, 255, 0.13);
  font-size: 17px;
}

.notice-card h2 {
  margin: 1px 0 8px;
  font-size: 16px;
}

.notice-card p {
  max-width: 760px;
  margin: 0;
  color: #b0acb8;
  font-size: 13px;
  line-height: 1.7;
}

.notice-card small {
  display: block;
  margin-top: 9px;
  color: #807b88;
  font-size: 11px;
}

.provider-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 13px;
  color: #c3a2ff;
  font-size: 12px;
  font-weight: 600;
  text-decoration: none;
}

.provider-link:hover {
  color: #e0ccff;
  text-decoration: underline;
}

.error-notice .notice-icon {
  color: #ff8291;
  background: rgba(250, 82, 105, 0.12);
}

.retry-button {
  flex: 0 0 auto;
  margin-inline-start: auto;
}

.matches-panel {
  overflow: hidden;
}

.panel-heading {
  padding: 20px 20px 17px;
}

.panel-heading h2 {
  font-size: 18px;
}

.match-count {
  padding: 6px 10px;
  border-radius: 20px;
  color: #c9a9ff;
  background: rgba(155, 92, 255, 0.12);
  font-size: 11px;
}

.match-tabs {
  display: flex;
  gap: 8px;
  overflow-x: auto;
  padding: 0 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.match-tabs button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 auto;
  min-height: 36px;
  padding: 0 12px;
  border: 1px solid transparent;
  border-radius: 10px;
  color: #96919f;
  background: #111116;
  cursor: pointer;
  font: inherit;
  font-size: 12px;
}

.match-tabs button.active {
  border-color: rgba(155, 92, 255, 0.35);
  color: #d7c2ff;
  background: rgba(155, 92, 255, 0.14);
}

.match-tabs button > span:not(.tab-live-dot) {
  color: #827d89;
  font-size: 10px;
}

.match-list {
  padding: 0 20px;
}

.sample-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 9px;
  margin: 14px 20px 2px;
  padding: 11px 12px;
  border: 1px solid rgba(229, 168, 77, 0.18);
  border-radius: 10px;
  color: #d3b77f;
  background: rgba(229, 168, 77, 0.07);
  font-size: 11px;
  line-height: 1.6;
}

.sample-disclaimer i {
  margin-top: 2px;
}

.match-card {
  padding: 17px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.055);
}

.match-card:last-child {
  border-bottom: 0;
}

.match-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
  color: #898591;
  font-size: 11px;
}

.league-name {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 8px;
  color: #b5b1bc;
}

.league-name img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.league-name span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.kickoff {
  flex: 0 0 auto;
  text-align: end;
}

.match-line {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 90px minmax(0, 1fr);
  align-items: center;
  gap: 12px;
}

.team {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.team-home {
  justify-content: flex-start;
}

.team-away {
  justify-content: flex-end;
  text-align: end;
}

.team img {
  width: 30px;
  height: 30px;
  flex: 0 0 30px;
  object-fit: contain;
}

.team-name {
  overflow: hidden;
  color: #efedf4;
  font-size: 13px;
  font-weight: 600;
  text-overflow: ellipsis;
}

.score-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.goal-events {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px 12px;
  margin-top: 13px;
}

.goal-event {
  display: flex;
  align-items: center;
  min-width: 0;
  gap: 6px;
  color: #b7b2c0;
  font-size: 11px;
}

.goal-event.away {
  justify-content: flex-end;
  text-align: end;
}

.goal-event > i {
  flex: 0 0 auto;
  color: #a979ff;
  font-size: 10px;
}

.goal-scorer {
  overflow: hidden;
  color: #e8e4ed;
  font-weight: 600;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.goal-minute {
  flex: 0 0 auto;
  color: #a79eaf;
  font-variant-numeric: tabular-nums;
}

.goal-assist,
.own-goal-label {
  overflow: hidden;
  color: #898391;
  font-size: 10px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.score,
.versus {
  color: #f8f6fc;
  font-size: 19px;
  font-variant-numeric: tabular-nums;
}

.score i {
  padding: 0 3px;
  color: #77727e;
  font-style: normal;
  font-size: 14px;
}

.versus {
  color: #8d8894;
}

.live-label {
  color: #ff7184;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.sample-label {
  color: #e5b967;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.match-status {
  max-width: 84px;
  overflow: hidden;
  color: #9a95a1;
  font-size: 9px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.empty-state {
  display: flex;
  min-height: 220px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  color: #8e8996;
  text-align: center;
}

.empty-state h3 {
  margin: 14px 0 5px;
  color: #dedbe4;
  font-size: 15px;
}

.empty-state p {
  margin: 7px 0 0;
  font-size: 12px;
  line-height: 1.6;
}

.empty-icon {
  width: 46px;
  height: 46px;
  color: #9b5cff;
}

.loading-ball {
  color: #a978ff;
  font-size: 22px;
  animation: spin 1.5s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 992px) {
  .live-page {
    width: calc(100% - 190px);
    margin-left: 190px;
    padding: 22px 18px 38px;
  }
}

@media (max-width: 768px) {
  .live-page {
    width: calc(100% - 70px);
    margin-left: 70px;
    padding: 18px 12px 30px;
  }

  .page-heading {
    align-items: flex-start;
  }

  .page-heading h1 {
    font-size: 22px;
  }

  .page-heading p {
    font-size: 11px;
    line-height: 1.6;
  }

  .refresh-button {
    min-height: 38px;
    padding: 0 10px;
    font-size: 11px;
  }

  .matches-panel {
    border-radius: 13px;
  }

  .panel-heading {
    padding: 16px 13px 14px;
  }

  .match-tabs {
    padding: 0 13px 13px;
  }

  .match-list {
    padding: 0 13px;
  }

  .match-line {
    grid-template-columns: minmax(0, 1fr) 62px minmax(0, 1fr);
    gap: 5px;
  }

  .team {
    gap: 6px;
  }

  .team img {
    width: 24px;
    height: 24px;
    flex-basis: 24px;
  }

  .team-name {
    font-size: 11px;
  }

  .goal-events {
    grid-template-columns: 1fr;
    gap: 6px;
    margin-top: 11px;
  }

  .goal-event.away {
    justify-content: flex-start;
    text-align: start;
  }

  .score,
  .versus {
    font-size: 16px;
  }

  .live-summary {
    padding: 0 11px;
    font-size: 10px;
  }

  .notice-card {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .live-page {
    padding: 14px 9px 24px;
  }

  .page-heading {
    gap: 8px;
  }

  .page-heading h1 {
    font-size: 19px;
  }

  .page-heading p {
    max-width: 220px;
    font-size: 10px;
  }

  .refresh-button {
    gap: 6px;
    min-height: 35px;
    padding: 0 8px;
  }

  .refresh-button span {
    display: none;
  }

  .live-summary {
    min-height: 42px;
  }

  .notice-card {
    gap: 10px;
    padding: 12px;
  }

  .notice-icon {
    width: 34px;
    height: 34px;
    flex-basis: 34px;
  }

  .notice-card h2 {
    font-size: 14px;
  }

  .notice-card p {
    font-size: 11px;
  }

  .retry-button {
    padding: 0 9px;
    font-size: 10px;
  }
}
</style>