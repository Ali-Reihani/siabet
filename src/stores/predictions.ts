import { defineStore } from 'pinia'
import { ref } from 'vue'

export type PredictionLevel = 'high' | 'medium' | 'low'
export type PredictionChoice = 'YES' | 'NO'

export interface PredictionCondition {
  betId: number
  category: string
  level: PredictionLevel
  question: string
  choice: PredictionChoice
  coefficient: number
  outcome: boolean | null
}

export interface SavedPrediction {
  id: string
  playerId: string
  playerName: string
  shortName: string
  team: string
  teamShort: string
  league: string
  image: string
  stake: number
  totalCoefficient: number
  createdAt: string
  conditions: PredictionCondition[]
}

const STORAGE_KEY = 'frontofbet-my-predictions'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function isPredictionCondition(value: unknown): value is PredictionCondition {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.betId === 'number' &&
    typeof value.category === 'string' &&
    (value.level === 'high' || value.level === 'medium' || value.level === 'low') &&
    typeof value.question === 'string' &&
    (value.choice === 'YES' || value.choice === 'NO') &&
    typeof value.coefficient === 'number' &&
    (typeof value.outcome === 'boolean' || value.outcome === null)
  )
}

function isSavedPrediction(value: unknown): value is SavedPrediction {
  if (!isRecord(value)) {
    return false
  }

  return (
    typeof value.id === 'string' &&
    typeof value.playerId === 'string' &&
    typeof value.playerName === 'string' &&
    typeof value.shortName === 'string' &&
    typeof value.team === 'string' &&
    typeof value.teamShort === 'string' &&
    typeof value.league === 'string' &&
    typeof value.image === 'string' &&
    typeof value.stake === 'number' &&
    typeof value.totalCoefficient === 'number' &&
    typeof value.createdAt === 'string' &&
    Array.isArray(value.conditions) &&
    value.conditions.length === 6 &&
    value.conditions.every(isPredictionCondition)
  )
}

function loadPredictions(): SavedPrediction[] {
  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (!saved) {
    return []
  }

  try {
    const parsed: unknown = JSON.parse(saved)
    if (!Array.isArray(parsed)) {
      console.error('Saved predictions have an invalid format.')
      return []
    }

    const predictions = parsed.filter(isSavedPrediction)
    if (predictions.length !== parsed.length) {
      console.error('One or more saved predictions could not be loaded.')
    }
    return predictions
  } catch (error) {
    console.error('Could not parse saved predictions.', error)
    return []
  }
}

export const usePredictionsStore = defineStore('predictions', () => {
  const items = ref<SavedPrediction[]>(loadPredictions())

  function add(prediction: SavedPrediction) {
    const nextItems = [prediction, ...items.value]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems))
    items.value = nextItems
  }

  return { items, add }
})
