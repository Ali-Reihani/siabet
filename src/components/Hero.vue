<script setup>
import { useRouter } from 'vue-router'
import { t } from '@/i18n'

import mbappe from '@/assets/Kilian-mbappe.jpg'
import halland from '@/assets/erling-halland.webp'
import bellingham from '@/assets/jude-bellingham.jpg'
import vinijr from '@/assets/vini-jr.webp'

const router = useRouter()

function goToPlayer(id) {
  console.log('CLICK:', id)
  router.push(`/player/${id}`)
}
</script>


<template>
  <section class="hero">

    <!-- Hero Main -->
    <div class="hero-main">

      <div class="hero-content">

        <span class="live-badge">
          🔥 {{ t('LIVE BETTING') }}
        </span>

        <h1>
          {{ t('Bet on players.') }}
          <br>
          <span>{{ t('Not teams.') }}</span>
        </h1>

        <p>
          {{ t('More action. More control.') }}
          <br>
          {{ t('Make chance to win.') }}
        </p>

        <button class="start-btn">
          {{ t('Start Betting') }}
        </button>

      </div>

      <!-- Players -->
      <div class="players">

        <div class="player player-one">
          <img :src="halland" alt="Erling Haaland">
          <div class="odds">
            Haaland
            <strong>x1.82</strong>
          </div>
        </div>

        <div class="player player-two">
          <img :src="mbappe" alt="Kylian Mbappé">
          <div class="odds">
            Mbappé
            <strong>x2.15</strong>
          </div>
        </div>

      </div>

    </div>


    <!-- Trending Players -->
    <div class="section-header">
      <h3>{{ t('Trending Players') }}</h3>
      <a href="#">{{ t('View All') }}</a>
    </div>

    <div class="players-grid">

      <div
        class="player-card"
        @click="goToPlayer('mbappe')"
      >
        <div class="avatar">
          <img :src="mbappe" alt="Kylian Mbappé">
        </div>

        <span>K. Mbappé</span>

        <small>
          x2.15 <b>+15%</b>
        </small>
      </div>

      <div
        class="player-card"
        @click="goToPlayer('haaland')"
      >
        <div class="avatar">
          <img :src="halland" alt="Erling Haaland">
        </div>

        <span>E. Haaland</span>
        <small>x1.82 <b>+12%</b></small>
      </div>

      <div
  class="player-card"
  @click="goToPlayer('bellingham')"
>
  <div class="avatar">
    <img :src="bellingham" alt="Jude Bellingham">
  </div>

  <span>J. Bellingham</span>

  <small>
    x1.90 <b>+18%</b>
  </small>
</div>

      <div
          class="player-card"
          @click="goToPlayer('vini-jr')"
        >
          <div class="avatar">
            <img :src="vinijr" alt="Vinícius Jr.">
          </div>

          <span>Viní Jr.</span>

          <small>
            x2.45 <b>+9%</b>
          </small>
        </div>

    </div>
    <!-- Popular Markets -->
    <div class="section-header market-title">
      <h3>{{ t('Popular Markets') }}</h3>
    </div>

    <div class="markets">

      <RouterLink class="market-card" to="/markets/anytime-goal">
        <i class="fas fa-futbol"></i>
        <span>{{ t('Anytime Goal') }}</span>
      </RouterLink>

      <RouterLink class="market-card" to="/markets/first-goal">
        <i class="fas fa-bolt"></i>
        <span>{{ t('First Goal') }}</span>
      </RouterLink>

      <RouterLink class="market-card" to="/markets/assist">
        <i class="fas fa-bullseye"></i>
        <span>{{ t('Assist') }}</span>
      </RouterLink>

      <div class="market-card">
        <i class="fas fa-chart-line"></i>
        <span>{{ t('2+ Shots') }}</span>
      </div>

      <RouterLink class="market-card" to="/markets/yellow-card">
        <i class="fas fa-running"></i>
        <span>{{ t('Yellow Card') }}</span>
      </RouterLink>

      <RouterLink class="market-card" to="/markets/player-of-match">
        <i class="fas fa-user"></i>
        <span>{{ t('Player of Match') }}</span>
      </RouterLink>

    </div>

  </section>
</template>


<style scoped>

.hero {
  margin-left: 220px;
  width: calc(100% - 220px);

  min-height: calc(100vh - 72px);

  padding: 20px 22px 20px 12px;

  box-sizing: border-box;

  background:
    radial-gradient(
      circle at 70% 20%,
      rgba(110, 45, 255, 0.08),
      transparent 35%
    );

  color: #fff;

  overflow: hidden;
}


/* =========================
   MAIN HERO
========================= */

.hero-main {
  position: relative;

  width: 100%;
  height: 250px;

  border-radius: 12px;

  overflow: hidden;

  background:
    linear-gradient(
      100deg,
      #101116 0%,
      #101116 45%,
      #171522 100%
    );

  border: 1px solid rgba(255,255,255,0.06);
}


.hero-content {
  position: relative;
  z-index: 5;

  padding: 28px;
}


.live-badge {
  display: inline-block;

  font-size: 9px;
  font-weight: 600;

  color: #b98cff;

  margin-bottom: 8px;
}


.hero h1 {
  margin: 0;

  font-size: 25px;
  line-height: 1.15;

  font-weight: 700;
}


.hero h1 span {
  color: #9b5cff;
}


.hero-content p {
  margin: 10px 0 16px;

  color: #92929d;

  font-size: 10px;
  line-height: 1.6;
}


.start-btn {
  border: none;

  padding: 8px 14px;

  border-radius: 5px;

  background: #8b42f6;

  color: white;

  font-size: 9px;

  cursor: pointer;

  transition: 0.2s;
}


.start-btn:hover {
  background: #a15fff;

  transform: translateY(-1px);
}


/* =========================
   PLAYERS
========================= */

.players {
  position: absolute;

  right: 12px;
  bottom: 0;

  width: 55%;
  height: 100%;
  z-index: 1;
  pointer-events: none;
}

.player {
  position: absolute;

  bottom: 0;

  width: 180px;
  height: 100%;

  overflow: hidden;
}

.player img {
  display: block;
  width: 100%;
  height: 100%;

  object-fit: cover;
  object-position: center 20%;

  -webkit-mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
  mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
}

.player-one {
  right: 48%;
}

.player-two {
  right: 0;
}


.odds {
  position: absolute;

  bottom: 55px;

  padding: 7px 10px;

  background: rgba(15,15,22,.9);

  border: 1px solid rgba(255,255,255,.08);

  border-radius: 6px;

  font-size: 8px;

  color: #aaa;
}


.odds strong {
  display: block;

  color: white;

  margin-top: 2px;
}


/* =========================
   SECTION HEADER
========================= */

.section-header {
  display: flex;

  align-items: center;
  justify-content: space-between;

  margin: 18px 2px 9px;
}


.section-header h3 {
  margin: 0;

  font-size: 11px;

  font-weight: 600;
}


.section-header a {
  color: #8f4cff;

  text-decoration: none;

  font-size: 8px;
}


/* =========================
   TRENDING PLAYERS
========================= */

.players-grid {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 8px;
}


.player-card {
  height: 92px;

  padding: 10px;

  box-sizing: border-box;

  border-radius: 8px;

  background: #0f1015;

  border: 1px solid rgba(255,255,255,.05);

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

  transition: .2s;
  cursor: pointer;

}


.player-card:hover {
  border-color: rgba(140,70,255,.4);

  transform: translateY(-2px);
}



 .avatar {
  width: 38px;
  height: 38px;

  margin-bottom: 7px;

  border-radius: 50%;

  background: #191a21;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar img {
  width: 100%;
  height: 100%;

  object-fit: cover;

  display: block;
}

.player-card span {
  font-size: 8px;

  color: #ddd;
}


.player-card small {
  margin-top: 3px;

  font-size: 7px;

  color: #777;
}


.player-card b {
  color: #5ccf87;

  margin-left: 3px;
}


/* =========================
   MARKETS
========================= */

.market-title {
  margin-top: 16px;
}


.markets {
  display: grid;

  grid-template-columns: repeat(6, 1fr);

  gap: 7px;
}


.market-card {
  height: 62px;

  border-radius: 7px;

  background: #0f1015;

  border: 1px solid rgba(255,255,255,.05);

  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 7px;

  color: #777;

  transition: .2s;
  text-decoration: none;
}


.market-card:hover {
  color: #a05cff;

  border-color: rgba(140,70,255,.35);
}


.market-card i {
  font-size: 12px;

  color: #7d42df;
}


.market-card span {
  font-size: 7px;

  color: #888;
}



 /* =========================
   RESPONSIVE - 900px DOWN
========================= */

@media (max-width: 992px) {

  .hero {
    margin-left: 190px;
    width: calc(100% - 190px);

    padding: 18px 10px;
  }

  .hero-main {
    height: 250px;
  }

  .hero-content {
    padding: 22px;
  }

  .hero h1 {
    font-size: 23px;
  }

  .players {
    right: 0;
    width: 55%;
  }

  .player {
    width: 140px;
  }

  .player-one {
    right: 48%;
  }

  .players-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }

  .markets {
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }

}




/* =========================
   MOBILE - 768px DOWN
========================= */

@media (max-width: 768px) {

  .hero {
    margin-left: 70px;
    width: calc(100% - 70px);

    padding: 15px 12px;
  }

  .hero-main {
    height: 270px;
  }

  .hero-content {
    padding: 20px;
  }

  .hero h1 {
    font-size: 22px;
  }

  .hero-content p {
    font-size: 9px;
  }

  .players {
    opacity: .5;

    right: 0;
    width: 68%;
  }

  .player {
    width: 120px;
  }

  .player-one {
    right: 44%;
  }

  .players-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }

  .markets {
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }

}

/* =========================
   900px → 768px
========================= */

@media (max-width: 900px) and (min-width: 769px) {

  .hero {
    margin-left: 190px;
    width: calc(100% - 190px);

    padding: 16px 10px;

    box-sizing: border-box;
  }

  .hero-main {
    width: 100%;
    height: 240px;
  }

  .hero-content {
    padding: 20px;
  }

  .hero h1 {
    font-size: 21px;
  }

  .hero-content p {
    font-size: 9px;
  }

  .start-btn {
    padding: 7px 12px;
    font-size: 8px;
  }

  /* بازیکن‌ها کمتر وارد سمت چپ شوند */
  .players {
    right: 0;
    width: 55%;
  }

  .player {
    width: 125px;
  }

  .player-one {
    right: 48%;
  }

  /* کارت‌ها */
  .players-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 7px;
  }

  .markets {
    grid-template-columns: repeat(3, 1fr);
    gap: 7px;
  }
}


</style>
