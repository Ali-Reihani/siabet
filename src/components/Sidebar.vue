<template>
  <aside class="sidebar">

    <!-- Home -->
    <RouterLink to="/" class="sidebar-item" exact-active-class="active">
      <i class="fas fa-home"></i>
      <span>{{ t('Home') }}</span>
    </RouterLink>

    <!-- Live -->
    <RouterLink to="/live-games" class="sidebar-item" exact-active-class="active">
      <i class="fas fa-circle"></i>
      <span>{{ t('Live') }}</span>
    </RouterLink>

    <!-- Players -->
     <RouterLink to="/market" class="sidebar-item">
      <i class="fas fa-futbol"></i>
      <span>{{ t('Players') }}</span>
     </RouterLink>
    <!-- My Bets -->
    <RouterLink to="/bets" class="sidebar-item" exact-active-class="active">
      <i class="fas fa-ticket-alt"></i>
      <span>{{ t('My Bets') }}</span>
    </RouterLink>

    <!-- Wallet -->
    <RouterLink to="/wallet" class="sidebar-item">
      <i class="fas fa-wallet"></i>
      <span>{{ t('Wallet') }}</span>
    </RouterLink>

    <!-- Profile -->
    <RouterLink to="/profile" class="sidebar-item" exact-active-class="active">
      <i class="fas fa-user"></i>
      <span>{{ t('Profile') }}</span>
    </RouterLink>

    <!-- More -->
    <a href="#" class="sidebar-item">
      <i class="fas fa-ellipsis-h"></i>
      <span>{{ t('More') }}</span>
    </a>

  </aside>
</template>

<script setup>
import { t } from '@/i18n'
</script>

<style scoped>

.sidebar {
  position: fixed;
  left: 0;
  top: 72px;
  width: 220px;
  height: calc(100vh - 72px);
  box-sizing: border-box;

  background: #0b0b10;
  border-right: 1px solid rgba(255,255,255,.05);

  padding: 24px 14px;

  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* هر ردیف */
.sidebar-item {
  height: 52px;

  display: flex;
  align-items: center;

  gap: 14px;

  padding: 0 16px;

  border-radius: 12px;

  color: #8a8a96;

  text-decoration: none;

  font-size: 14px;

  transition: .25s;
}

/* آیکون */
.sidebar-item i {
  width: 20px;

  text-align: center;

  font-size: 16px;
}

/* Hover */
.sidebar-item:hover {
  background: #14141b;
  color: white;
}

/* Active */
.sidebar-item.active {
  background: rgba(155,92,255,.12);
  color: #9B5CFF;
}

/* Active icon */
.sidebar-item.active i {
  color: #9B5CFF;
}
    

/* ===================== */
/* Tablet */
/* ===================== */

@media (max-width: 992px) {

  .sidebar {
    width: 190px;
  }

}


/* ===================== */
/* Mobile */
/* ===================== */

@media (max-width: 768px) {

  .sidebar {
    top: 106px;
    width: 70px;
    height: calc(100vh - 106px);
    padding: 20px 10px;
  }

  .sidebar-item {
    justify-content: center;
    padding: 0;
  }

  .sidebar-item span {
    display: none;
  }

  .sidebar-item i {
    font-size: 18px;
  }

}

@media (max-width: 480px) {
  .sidebar {
    top: 117px;
    height: calc(100vh - 117px);
  }
}

@media (max-width: 360px) {
  .sidebar {
    top: 111px;
    height: calc(100vh - 111px);
  }
}

</style>