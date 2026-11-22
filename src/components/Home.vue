<template>

  <Header />

  <Sidebar />

  <Hero />

  <main class="content">
  </main>
    <AppFooter />


</template>

<script setup lang="ts">

import Header from './Header.vue'
import Sidebar from './Sidebar.vue'
import Hero from './Hero.vue'
import AppFooter from './Footer/AppFooter.vue';

</script>

<style scoped>

.content {
  width: 92%;
  margin: auto;
}

</style>