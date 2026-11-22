<template>
  <footer class="app-footer">

    <div class="footer-container">

      <!-- Brand -->
      <div class="footer-brand">

        <RouterLink to="/" class="footer-logo">
          <div class="footer-logo-icon">
            <i class="fas fa-futbol"></i>
          </div>

          <span>
            PLAY<span class="purple">BET</span>
          </span>
        </RouterLink>

        <p>
          {{ t('Football meets trading.') }}
          <br>
          {{ t('Track. Predict. Trade.') }}
        </p>

        <div class="footer-socials">

          <a href="#" aria-label="Instagram">
            <i class="fab fa-instagram"></i>
          </a>

          <a href="#" aria-label="Twitter">
            <i class="fab fa-x-twitter"></i>
          </a>

          <a href="#" aria-label="Telegram">
            <i class="fab fa-telegram"></i>
          </a>

        </div>

      </div>


      <!-- Platform -->
      <div class="footer-column">

        <h4>{{ t('PLATFORM') }}</h4>

        <RouterLink to="/">
          {{ t('Home') }}
        </RouterLink>

        <RouterLink to="/market">
          {{ t('Players') }}
        </RouterLink>

        <RouterLink to="/prediction">
          {{ t('Predictions') }}
        </RouterLink>

        <RouterLink to="/news">
          {{ t('News') }}
        </RouterLink>

      </div>


      <!-- Account -->
      <div class="footer-column">

        <h4>{{ t('ACCOUNT') }}</h4>

        <RouterLink to="/portfolio">
          {{ t('Portfolio') }}
        </RouterLink>

        <RouterLink to="/wallet">
          {{ t('Wallet') }}
        </RouterLink>

        <RouterLink to="/profile">
          {{ t('Profile') }}
        </RouterLink>

        <RouterLink to="/bets">
          {{ t('My Bets') }}
        </RouterLink>

      </div>


      <!-- Support -->
      <div class="footer-column">

        <h4>{{ t('SUPPORT') }}</h4>

        <RouterLink to="/help">
          {{ t('Help Center') }}
        </RouterLink>

        <RouterLink to="/faq">
          {{ t('FAQ') }}
        </RouterLink>

        <RouterLink to="/contact">
          {{ t('Contact') }}
        </RouterLink>

        <RouterLink to="/terms">
          {{ t('Terms') }}
        </RouterLink>

      </div>

    </div>


    <!-- Bottom -->
    <div class="footer-bottom">

      <span>
        © 2026 PlayBet. {{ t('All rights reserved.') }}
      </span>

      <div class="footer-legal">

        <RouterLink to="/privacy">
          {{ t('Privacy') }}
        </RouterLink>

        <RouterLink to="/terms">
          {{ t('Terms') }}
        </RouterLink>

        <RouterLink to="/cookies">
          {{ t('Cookies') }}
        </RouterLink>

      </div>

    </div>

  </footer>
</template>

<script setup>
import { t } from '@/i18n'
</script>

<style scoped>

.app-footer {

  /*
    مهم:
    100% + margin-left باعث horizontal scroll میشه.
    پس عرض رو از فضای Sidebar کم می‌کنیم.
  */

  width: calc(100% - 220px);

  margin-left: 220px;

  box-sizing: border-box;

  background: #09090d;

  border-top: 1px solid rgba(255,255,255,.05);

  color: #fff;
}


/* =========================================
   CONTAINER
========================================= */

.footer-container {

  width: 100%;

  max-width: 1400px;

  margin: 0 auto;

  padding: 60px 40px;

  box-sizing: border-box;

  display: grid;

  grid-template-columns: 2fr 1fr 1fr 1fr;

  gap: 50px;
}


/* =========================================
   LOGO
========================================= */

.footer-logo {

  display: flex;

  align-items: center;

  gap: 10px;

  color: white;

  text-decoration: none;

  font-size: 23px;

  font-weight: 700;
}


.footer-logo-icon {

  width: 34px;
  height: 34px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 50%;

  background:
    linear-gradient(
      135deg,
      #8B5CF6,
      #B026FF
    );

  color: white;

  font-size: 15px;
}


.purple {
  color: #9B5CFF;
}


/* =========================================
   DESCRIPTION
========================================= */

.footer-brand p {

  margin: 18px 0 24px;

  color: #777783;

  font-size: 13px;

  line-height: 1.8;
}


/* =========================================
   SOCIAL
========================================= */

.footer-socials {

  display: flex;

  gap: 9px;
}


.footer-socials a {

  width: 36px;
  height: 36px;

  display: flex;

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  background: #14141b;

  border: 1px solid rgba(255,255,255,.05);

  color: #858590;

  text-decoration: none;

  transition: .25s;
}


.footer-socials a:hover {

  color: white;

  background: rgba(139,92,246,.12);

  border-color: rgba(139,92,246,.35);

  transform: translateY(-2px);
}


/* =========================================
   COLUMNS
========================================= */

.footer-column {

  display: flex;

  flex-direction: column;

  align-items: flex-start;
}


.footer-column h4 {

  margin: 0 0 20px;

  color: #e5e5ea;

  font-size: 11px;

  font-weight: 700;

  letter-spacing: 1px;
}


.footer-column a {

  margin-bottom: 13px;

  color: #777783;

  font-size: 13px;

  text-decoration: none;

  transition: .2s;
}


.footer-column a:hover {

  color: #9B5CFF;
}


/* =========================================
   BOTTOM
========================================= */

.footer-bottom {

  width: 100%;

  box-sizing: border-box;

  padding: 20px 40px;

  border-top: 1px solid rgba(255,255,255,.05);

  display: flex;

  align-items: center;

  justify-content: space-between;

  color: #555560;

  font-size: 11px;
}


.footer-legal {

  display: flex;

  gap: 22px;
}


.footer-legal a {

  color: #666672;

  text-decoration: none;

  transition: .2s;
}


.footer-legal a:hover {

  color: #9B5CFF;
}


/* =========================================
   TABLET
========================================= */

@media (max-width: 992px) {

  .app-footer {

    width: calc(100% - 190px);

    margin-left: 190px;
  }


  .footer-container {

    grid-template-columns: 1.5fr 1fr 1fr;

    padding: 50px 30px;

    gap: 40px;
  }


  .footer-brand {

    grid-column: 1 / -1;
  }


  .footer-bottom {

    padding: 20px 30px;
  }

}


/* =========================================
   MOBILE
========================================= */

@media (max-width: 768px) {

  .app-footer {

    width: calc(100% - 70px);

    margin-left: 70px;
  }


  .footer-container {

    grid-template-columns: 1fr 1fr;

    padding: 45px 22px;

    gap: 35px 25px;
  }


  .footer-brand {

    grid-column: 1 / -1;
  }


  .footer-bottom {

    padding: 20px 22px;

    flex-direction: column;

    align-items: flex-start;

    gap: 14px;
  }


  .footer-legal {

    gap: 15px;
  }

}


/* =========================================
   SMALL MOBILE
========================================= */

@media (max-width: 480px) {

  .footer-container {

    grid-template-columns: 1fr;

    padding: 40px 18px;
  }


  .footer-brand {

    grid-column: auto;
  }


  .footer-bottom {

    padding: 18px;
  }

}

</style>