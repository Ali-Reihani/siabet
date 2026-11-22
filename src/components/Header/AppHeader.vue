<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useWalletStore } from '@/stores/wallet'
import { t } from '@/i18n'

const router = useRouter()
const wallet = useWalletStore()

defineProps<{
  playerName?: string
  pageTitle?: string
}>()

function goBack() {
  router.back()
}

</script>


<template>

  <header class="top-header">

    <!-- LEFT -->

    <div class="header-left">

      <button
        class="back-button"
        @click="goBack"
        :aria-label="t('Go home')"
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>


      <div class="breadcrumb">

        <span>{{ t('Players') }}</span>
          <template v-if="playerName">


        <i class="fa-solid fa-chevron-right"></i>

        <strong>
        {{ playerName}}
        </strong>
        </template>

        <i class="fa-solid fa-chevron-right"></i>

        <strong>
            {{ pageTitle ? t(pageTitle) : '' }}
        </strong>

      </div>

    </div>


    <!-- RIGHT -->

    <div class="header-actions">

      <!-- Notification -->

      <button
        class="icon-button"
        :aria-label="t('Notifications')"
      >
        <i class="fa-regular fa-bell"></i>
      </button>


      <!-- Balance -->

      <div class="balance">

        <span>
          {{ t('Balance') }}
        </span>

        <strong>
          ${{ wallet.balance.toFixed(2) }}
        </strong>

      </div>


      <!-- Avatar -->

      <div class="avatar">
        A
      </div>

    </div>

  </header>

</template>


<style scoped>

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


/* ===============================
   LEFT
================================ */

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

  cursor: pointer;

  transition: .2s;
}


.back-button:hover {
  color: #fff;

  border-color: rgba(139,92,246,.5);

  background: rgba(139,92,246,.08);
}


/* ===============================
   BREADCRUMB
================================ */

.breadcrumb {
  display: flex;
  align-items: center;

  gap: 12px;

  color: #777;

  font-size: 14px;
}


.breadcrumb i {
  font-size: 12px;
}

.breadcrumb span {
  color: #777;
}

.breadcrumb .player-name {
  color: #777;
}

.breadcrumb strong {
  color: #ddd;
}


/* ===============================
   ACTIONS
================================ */

.header-actions {
  display: flex;
  align-items: center;

  gap: 18px;
}


/* ===============================
   NOTIFICATION
================================ */

.icon-button {
  width: 40px;
  height: 40px;

  border: 0;

  border-radius: 12px;

  background: #0c0e12;

  color: #aaa;

  cursor: pointer;

  font-size: 16px;

  transition: .2s;
}


.icon-button:hover {
  color: #fff;

  background: #111318;
}


/* ===============================
   BALANCE
================================ */

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


/* ===============================
   AVATAR
================================ */

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

  color: #fff;

  font-weight: 700;
}


/* ===============================
   MOBILE
================================ */

@media (max-width: 768px) {

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

  .breadcrumb {
    gap: 5px;
    font-size: 11px;
  }

  .breadcrumb i {
    display: block;
    font-size: 8px;
  }

  .breadcrumb {
  min-width: 0;
}

.breadcrumb .player-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

}

</style>