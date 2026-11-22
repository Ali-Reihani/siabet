import { createServer } from 'node:http'
import { env } from 'node:process'

const API_BASE_URL = 'https://api.sportmonks.com/v3/football'
const PORT = 3001
const MAX_FIXTURE_PAGES = 100
const LIVE_CACHE_MS = 20_000
const FIXTURE_CACHE_MS = 5 * 60_000
const apiToken = env.SPORTMONKS_API_TOKEN?.trim()
const cache = new Map()

class ProviderError extends Error {
  constructor(message, statusCode = 502) {
    super(message)
    this.statusCode = statusCode
  }
}

function isRecord(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

function sendJson(response, statusCode, data) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  })
  response.end(JSON.stringify(data))
}

function extractItems(payload) {
  if (!isRecord(payload) || payload.data === undefined || payload.data === null) {
    throw new ProviderError('Sportmonks returned an invalid response.')
  }

  if (Array.isArray(payload.data)) {
    return payload.data
  }

  if (isRecord(payload.data) && payload.data.id !== undefined) {
    return [payload.data]
  }

  return []
}

function normalizeTeam(participant) {
  if (!isRecord(participant)) {
    return { name: '', logo: '' }
  }

  return {
    name: typeof participant.name === 'string' ? participant.name : '',
    logo: typeof participant.image_path === 'string' ? participant.image_path : ''
  }
}

function normalizeFixture(fixture, isLive = false) {
  if (!isRecord(fixture) || fixture.id === undefined || fixture.id === null) {
    return null
  }

  const participants = Array.isArray(fixture.participants) ? fixture.participants : []
  const home = participants.find(
    participant => isRecord(participant) && participant.meta?.location === 'home'
  )
  const away = participants.find(
    participant => isRecord(participant) && participant.meta?.location === 'away'
  )
  const currentScores = Array.isArray(fixture.scores)
    ? fixture.scores.filter(
        score => isRecord(score) && String(score.description).toUpperCase() === 'CURRENT'
      )
    : []
  const goalEvents = Array.isArray(fixture.events)
    ? fixture.events
        .filter(
          event =>
            isRecord(event) &&
            [14, 15, 16].includes(event.type_id) &&
            typeof event.player_name === 'string'
        )
        .sort((first, second) => {
          const firstOrder = Number.isFinite(first.sort_order) ? first.sort_order : first.minute
          const secondOrder = Number.isFinite(second.sort_order) ? second.sort_order : second.minute
          return (firstOrder ?? 0) - (secondOrder ?? 0)
        })
        .map(event => ({
          playerName: event.player_name,
          minute: Number.isFinite(event.minute) ? event.minute : null,
          extraMinute: Number.isFinite(event.extra_minute) ? event.extra_minute : null,
          assistName: typeof event.related_player_name === 'string' ? event.related_player_name : '',
          team:
            event.participant_id === home?.id
              ? 'home'
              : event.participant_id === away?.id
                ? 'away'
                : null,
          isOwnGoal: event.type_id === 15
        }))
    : []

  function getGoals(location) {
    const entry = currentScores.find(
      score => isRecord(score.score) && score.score.participant === location
    )
    const goals = entry?.score?.goals
    return Number.isFinite(goals) ? goals : null
  }

  const state = isRecord(fixture.state) ? fixture.state : {}
  const league = isRecord(fixture.league) ? fixture.league : {}
  const kickoff =
    Number.isFinite(fixture.starting_at_timestamp)
      ? new Date(fixture.starting_at_timestamp * 1000).toISOString()
      : typeof fixture.starting_at === 'string'
        ? fixture.starting_at
        : ''

  return {
    id: String(fixture.id),
    homeTeam: normalizeTeam(home),
    awayTeam: normalizeTeam(away),
    homeScore: getGoals('home'),
    awayScore: getGoals('away'),
    league: typeof league.name === 'string' ? league.name : '',
    leagueLogo: typeof league.image_path === 'string' ? league.image_path : '',
    kickoff,
    status:
      (typeof state.short_name === 'string' && state.short_name) ||
      (typeof state.name === 'string' && state.name) ||
      (typeof state.developer_name === 'string' && state.developer_name) ||
      '',
    isLive,
    goals: goalEvents
  }
}

async function fetchProviderPage(url) {
  const response = await fetch(url, {
    headers: { Accept: 'application/json' },
    signal: AbortSignal.timeout(15_000)
  })

  if (!response.ok) {
    throw new ProviderError(`Sportmonks request failed (HTTP ${response.status}).`)
  }

  return response.json()
}

async function fetchAllPages(path, query, maxPages = MAX_FIXTURE_PAGES, includeEvents = false) {
  const items = []
  let cursor = ''

  for (let page = 0; page < maxPages; page += 1) {
    const url = new URL(`${API_BASE_URL}${path}`)
    url.searchParams.set('api_token', apiToken)
    url.searchParams.set(
      'include',
      includeEvents ? 'participants;scores;league;state;events' : 'participants;scores;league;state'
    )
    url.searchParams.set('per_page', '50')

    for (const [key, value] of Object.entries(query)) {
      url.searchParams.set(key, value)
    }

    if (cursor) {
      url.searchParams.set('cursor', cursor)
    }

    const payload = await fetchProviderPage(url)
    items.push(...extractItems(payload))

    const pagination = isRecord(payload.pagination) ? payload.pagination : {}
    if (pagination.has_more !== true) {
      return items
    }

    if (typeof pagination.next_cursor !== 'string' || pagination.next_cursor === cursor) {
      throw new ProviderError('Sportmonks returned invalid pagination data.')
    }

    cursor = pagination.next_cursor
  }

  throw new ProviderError('Too many fixtures to load for this date range.')
}

async function getCached(key, duration, load) {
  const now = Date.now()
  for (const [cacheKey, entry] of cache) {
    if (entry.expiresAt <= now) {
      cache.delete(cacheKey)
    }
  }

  const cached = cache.get(key)
  if (cached && cached.expiresAt > now) {
    return cached
  }

  const data = await load()
  const entry = {
    data,
    updatedAt: new Date().toISOString(),
    expiresAt: now + duration
  }
  cache.set(key, entry)
  return entry
}

function isValidDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value
}

function getDateRange(searchParams) {
  const start = searchParams.get('start')
  const end = searchParams.get('end')

  if (!isValidDate(start) || !isValidDate(end)) {
    return null
  }

  const days = (Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / 86_400_000
  return days >= 0 && days <= 6 ? { start, end } : null
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url ?? '/', 'http://127.0.0.1')

  if (request.method !== 'GET') {
    sendJson(response, 405, { error: 'Only GET requests are supported.' })
    return
  }

  if (requestUrl.pathname === '/api/football/status') {
    sendJson(response, 200, { configured: Boolean(apiToken) })
    return
  }

  if (requestUrl.pathname !== '/api/football/live' && requestUrl.pathname !== '/api/football/fixtures') {
    sendJson(response, 404, { error: 'Not found.' })
    return
  }

  const range =
    requestUrl.pathname === '/api/football/fixtures'
      ? getDateRange(requestUrl.searchParams)
      : null
  if (requestUrl.pathname === '/api/football/fixtures' && !range) {
    sendJson(response, 400, { error: 'Provide a valid date range of up to seven days.' })
    return
  }

  if (!apiToken) {
    sendJson(response, 503, { error: 'SPORTMONKS_API_TOKEN is not configured on the server.' })
    return
  }

  try {
    if (requestUrl.pathname === '/api/football/live') {
      const result = await getCached('live', LIVE_CACHE_MS, async () => {
        const items = await fetchAllPages('/livescores/inplay', {}, MAX_FIXTURE_PAGES, true)
        return items
          .map(fixture => normalizeFixture(fixture, true))
          .filter(Boolean)
      })

      sendJson(response, 200, result)
      return
    }

    const key = `fixtures:${range.start}:${range.end}`
    const result = await getCached(key, FIXTURE_CACHE_MS, async () => {
      const items = await fetchAllPages(`/fixtures/between/${range.start}/${range.end}`, {})
      return items
        .map(fixture => normalizeFixture(fixture))
        .filter(Boolean)
    })

    sendJson(response, 200, result)
  } catch (error) {
    if (error instanceof ProviderError) {
      sendJson(response, error.statusCode, { error: error.message })
      return
    }

    console.error('[football-api] Provider request failed:', error instanceof Error ? error.name : 'Unknown error')
    sendJson(response, 502, { error: 'Football data provider is temporarily unavailable.' })
  }
}

const server = createServer((request, response) => {
  void handleRequest(request, response)
})

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Football API proxy listening on http://127.0.0.1:${PORT}`)
})
