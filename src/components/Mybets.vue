<script setup lang="ts">
import { computed } from 'vue'
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { language, t } from '@/i18n'
import { usePredictionsStore, type PredictionCondition } from '@/stores/predictions'

const predictionStore = usePredictionsStore()

const totals = computed(() => {
  const conditions = predictionStore.items.flatMap(prediction => prediction.conditions)
  return {
    all: conditions.length,
    correct: conditions.filter(condition => isCorrect(condition)).length,
    incorrect: conditions.filter(condition => isIncorrect(condition)).length,
    pending: conditions.filter(condition => condition.outcome === null).length
  }
})

const locale = computed(() => ({
  en: 'en-GB',
  fa: 'fa-IR',
  tr: 'tr-TR',
  de: 'de-DE'
})[language.value])

function isCorrect(condition: PredictionCondition) {
  return condition.outcome !== null &&
    (condition.choice === 'YES') === condition.outcome
}

function isIncorrect(condition: PredictionCondition) {
  return condition.outcome !== null && !isCorrect(condition)
}

function conditionStatus(condition: PredictionCondition) {
  if (condition.outcome === null) {
    return 'pending'
  }
  return isCorrect(condition) ? 'correct' : 'incorrect'
}

function statusLabel(condition: PredictionCondition) {
  const status = conditionStatus(condition)
  return status === 'pending'
    ? 'Pending'
    : status === 'correct'
      ? 'Correct'
      : 'Incorrect'
}

function formatDate(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.valueOf())) {
    return value
  }

  return new Intl.DateTimeFormat(locale.value, {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(date)
}
</script>

<template>
  <Header />
  <Sidebar />

  <main class="my-bets-page">
    <header class="page-heading">
      <div>
        <span class="eyebrow">{{ t('MY BETS') }}</span>
        <h1>{{ t('Your predictions') }}</h1>
        <p>{{ t('Review every confirmed player prediction and all six selected conditions.') }}</p>
      </div>
      <div class="total-bets">
        <strong>{{ predictionStore.items.length }}</strong>
        <span>{{ t('My Bets') }}</span>
      </div>
    </header>

    <section v-if="predictionStore.items.length" class="summary-grid" aria-live="polite">
      <article class="summary-card">
        <span>{{ t('All 6 conditions') }}</span>
        <strong>{{ totals.all }}</strong>
      </article>
      <article class="summary-card correct">
        <span>{{ t('Correct picks') }}</span>
        <strong>{{ totals.correct }}</strong>
      </article>
      <article class="summary-card incorrect">
        <span>{{ t('Wrong picks') }}</span>
        <strong>{{ totals.incorrect }}</strong>
      </article>
      <article class="summary-card pending">
        <span>{{ t('Still pending') }}</span>
        <strong>{{ totals.pending }}</strong>
      </article>
    </section>

    <div v-if="predictionStore.items.length" class="data-notice" role="note">
      <i class="fa-solid fa-circle-info" aria-hidden="true"></i>
      <p>{{ t('The current football feed does not include player-level statistics, so results are not marked as correct or incorrect yet.') }}</p>
    </div>

    <section v-if="predictionStore.items.length" class="prediction-list">
      <article
        v-for="prediction in predictionStore.items"
        :key="prediction.id"
        class="prediction-card"
      >
        <header class="prediction-header">
          <div class="player-details">
            <img :src="prediction.image" :alt="prediction.playerName" />
            <div>
              <span class="eyebrow">{{ prediction.team }} · {{ prediction.league }}</span>
              <h2>{{ prediction.playerName }}</h2>
              <p>{{ t('Placed {date}', { date: formatDate(prediction.createdAt) }) }}</p>
            </div>
          </div>
          <div class="prediction-finance">
            <span>{{ t('Stake') }}</span>
            <strong>${{ prediction.stake.toFixed(2) }}</strong>
            <small>{{ t('Potential return') }} · ${{ (prediction.stake * prediction.totalCoefficient).toFixed(2) }}</small>
          </div>
        </header>

        <div class="condition-heading">
          <div>
            <h3>{{ t('All 6 conditions') }}</h3>
            <span>{{ prediction.conditions.length }}/6 {{ t('conditions') }}</span>
          </div>
          <span class="waiting-indicator">
            <i class="fa-regular fa-clock" aria-hidden="true"></i>
            {{ t('Waiting for live player statistics') }}
          </span>
        </div>

        <ol class="condition-list">
          <li
            v-for="(condition, index) in prediction.conditions"
            :key="`${prediction.id}-${condition.betId}`"
            class="condition-row"
            :class="conditionStatus(condition)"
          >
            <span class="condition-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <div class="condition-description">
              <div class="condition-tags">
                <span class="category-tag">{{ t(condition.category) }}</span>
                <span class="level-tag" :class="`level-${condition.level}`">{{ t(condition.level.toUpperCase()) }}</span>
              </div>
              <p>{{ t(condition.question) }}</p>
              <span class="condition-pick">
                {{ t('Your pick') }}:
                <strong :class="condition.choice === 'YES' ? 'positive' : 'negative'">
                  {{ t(condition.choice) }}
                </strong>
                <span>· {{ condition.coefficient.toFixed(2) }}</span>
              </span>
            </div>
            <div class="condition-result" :class="conditionStatus(condition)">
              <strong>{{ t(statusLabel(condition)) }}</strong>
              <small v-if="condition.outcome !== null">
                {{ t('Match outcome') }}: {{ t(condition.outcome ? 'YES' : 'NO') }}
              </small>
              <small v-else>{{ t('Waiting for live player statistics') }}</small>
            </div>
          </li>
        </ol>
      </article>
    </section>

    <section v-else class="empty-state">
      <div class="empty-icon"><i class="fa-solid fa-ticket" aria-hidden="true"></i></div>
      <h2>{{ t('No predictions yet') }}</h2>
      <p>{{ t('Your confirmed six-condition predictions will appear here.') }}</p>
      <RouterLink to="/market" class="market-link">{{ t('Explore players') }}</RouterLink>
    </section>
  </main>
</template>

<style scoped>
.my-bets-page {
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
.prediction-header,
.condition-heading {
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
  letter-spacing: 0.12em;
}

.page-heading h1 {
  margin: 7px 0 0;
  font-size: clamp(22px, 2.5vw, 30px);
}

.page-heading p,
.player-details p {
  margin: 7px 0 0;
  color: #96939f;
  font-size: 13px;
}

.total-bets {
  display: grid;
  gap: 3px;
  min-width: 88px;
  padding: 12px 16px;
  border: 1px solid rgba(167, 120, 255, 0.18);
  border-radius: 14px;
  text-align: center;
  background: rgba(155, 92, 255, 0.08);
}

.total-bets strong {
  color: #c4b5fd;
  font-size: 20px;
}

.total-bets span,
.summary-card span {
  color: #9793a2;
  font-size: 11px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 16px;
}

.summary-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 14px;
  background: #101015;
}

.summary-card strong {
  color: #e8e4f0;
  font-size: 21px;
}

.summary-card.correct strong,
.condition-result.correct strong {
  color: #4ade80;
}

.summary-card.incorrect strong,
.condition-result.incorrect strong {
  color: #fb7185;
}

.summary-card.pending strong,
.condition-result.pending strong {
  color: #fbbf24;
}

.data-notice {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  margin-bottom: 18px;
  padding: 13px 15px;
  border: 1px solid rgba(251, 191, 36, 0.18);
  border-radius: 12px;
  color: #e8c879;
  background: rgba(251, 191, 36, 0.06);
}

.data-notice i {
  margin-top: 2px;
}

.data-notice p {
  margin: 0;
  color: #c7b98e;
  font-size: 12px;
  line-height: 1.7;
}

.prediction-list {
  display: grid;
  gap: 18px;
}

.prediction-card {
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 18px;
  background: linear-gradient(145deg, rgba(20, 18, 27, 0.96), #0d0e12 70%);
}

.prediction-header {
  padding: 20px 22px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.player-details {
  display: flex;
  align-items: center;
  gap: 14px;
  min-width: 0;
}

.player-details img {
  width: 54px;
  height: 54px;
  flex: 0 0 auto;
  border: 2px solid rgba(167, 120, 255, 0.4);
  border-radius: 50%;
  object-fit: cover;
  background: #18151f;
}

.player-details h2 {
  margin: 4px 0 0;
  font-size: 18px;
}

.prediction-finance {
  display: grid;
  justify-items: end;
  gap: 3px;
  white-space: nowrap;
}

.prediction-finance span,
.prediction-finance small {
  color: #85818f;
  font-size: 11px;
}

.prediction-finance strong {
  color: #e8e4f0;
  font-size: 16px;
}

.condition-heading {
  padding: 17px 22px 12px;
}

.condition-heading h3 {
  margin: 0;
  font-size: 14px;
}

.condition-heading > div > span {
  display: inline-block;
  margin-top: 4px;
  color: #85818f;
  font-size: 11px;
}

.waiting-indicator {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #d7ae50;
  font-size: 11px;
}

.condition-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding: 0 14px 16px;
  list-style: none;
}

.condition-row {
  display: grid;
  grid-template-columns: 30px minmax(0, 1fr) minmax(120px, 185px);
  align-items: center;
  gap: 12px;
  padding: 13px 14px;
  border: 1px solid rgba(255, 255, 255, 0.045);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.018);
}

.condition-number {
  color: #6f6a78;
  font-size: 11px;
  font-variant-numeric: tabular-nums;
}

.condition-tags {
  display: flex;
  align-items: center;
  gap: 7px;
}

.category-tag,
.level-tag {
  padding: 3px 7px;
  border-radius: 6px;
  color: #b7b1c2;
  background: rgba(255, 255, 255, 0.055);
  font-size: 9px;
  font-weight: 700;
}

.level-tag {
  color: #c4b5fd;
  background: rgba(139, 92, 246, 0.14);
}

.level-medium {
  color: #93c5fd;
  background: rgba(59, 130, 246, 0.12);
}

.level-low {
  color: #86efac;
  background: rgba(34, 197, 94, 0.1);
}

.condition-description p {
  margin: 7px 0 5px;
  color: #e4e0ea;
  font-size: 13px;
  line-height: 1.6;
}

.condition-pick {
  color: #898592;
  font-size: 11px;
}

.condition-pick strong {
  margin: 0 3px;
}

.positive {
  color: #4ade80;
}

.negative {
  color: #fb7185;
}

.condition-result {
  display: grid;
  gap: 4px;
  justify-items: end;
  text-align: right;
}

.condition-result strong {
  color: #fbbf24;
  font-size: 12px;
}

.condition-result small {
  color: #827d89;
  font-size: 10px;
}

.empty-state {
  display: grid;
  justify-items: center;
  gap: 10px;
  margin-top: 30px;
  padding: 64px 20px;
  border: 1px dashed rgba(255, 255, 255, 0.12);
  border-radius: 18px;
  text-align: center;
  background: rgba(16, 16, 21, 0.65);
}

.empty-icon {
  display: grid;
  width: 54px;
  height: 54px;
  place-items: center;
  border-radius: 16px;
  color: #b99aff;
  background: rgba(155, 92, 255, 0.13);
  font-size: 21px;
}

.empty-state h2 {
  margin: 6px 0 0;
  font-size: 18px;
}

.empty-state p {
  margin: 0;
  color: #9994a2;
  font-size: 13px;
}

.market-link {
  margin-top: 7px;
  padding: 10px 15px;
  border-radius: 10px;
  color: #fff;
  background: #7441cf;
  font-size: 12px;
  text-decoration: none;
}

.market-link:hover {
  background: #8654df;
}

@media (max-width: 992px) {
  .my-bets-page {
    width: calc(100% - 190px);
    margin-left: 190px;
  }

  .condition-row {
    grid-template-columns: 26px minmax(0, 1fr) minmax(110px, 155px);
    gap: 9px;
    padding: 12px 10px;
  }
}

@media (max-width: 768px) {
  .my-bets-page {
    width: 100%;
    min-height: calc(100vh - 60px);
    margin-left: 0;
    padding: 22px 14px 36px;
  }

  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .condition-heading {
    align-items: flex-start;
    flex-direction: column;
    gap: 9px;
    padding-inline: 16px;
  }

  .condition-row {
    grid-template-columns: 25px minmax(0, 1fr);
  }

  .condition-result {
    grid-column: 2;
    justify-items: start;
    text-align: left;
  }
}

@media (max-width: 480px) {
  .page-heading,
  .prediction-header {
    align-items: flex-start;
    gap: 12px;
  }

  .page-heading p {
    max-width: 270px;
    line-height: 1.7;
  }

  .total-bets {
    min-width: 56px;
    padding: 9px;
  }

  .prediction-header {
    padding: 16px 14px;
  }

  .player-details {
    gap: 9px;
  }

  .player-details img {
    width: 42px;
    height: 42px;
  }

  .player-details h2 {
    font-size: 15px;
  }

  .player-details .eyebrow {
    font-size: 8px;
  }

  .prediction-finance small {
    max-width: 105px;
    white-space: normal;
    text-align: right;
  }

  .condition-list {
    padding-inline: 9px;
  }
}
</style>
