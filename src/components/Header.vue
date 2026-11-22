<template>
  <header class="header">
    <div class="logo">
      <div class="logo-icon">
        <i class="fas fa-futbol"></i>
      </div>
      <span>PLAY<span class="purple">BET</span></span>
    </div>

    <nav class="nav">
      <a href="#" class="active">{{ t('Home') }}</a>
      <RouterLink to="/live-games" exact-active-class="active">{{ t('Live') }}</RouterLink>
      <a href="#">{{ t('Players') }}</a>
      <a href="#">{{ t('Matches') }}</a>
      <a href="#">{{ t('Promotions') }}</a>
    </nav>

    <div class="actions">
      <div class="search-wrapper" :class="{ open: searchOpen }">

  <input
    v-model="searchText"
    class="search-input"
    :placeholder="t('Search player...')"
  />

  <button
    class="search"
    @click="toggleSearch"
  >
    <i
      :class="
        searchOpen
          ? 'fas fa-futbol'
          : 'fas fa-search'
      "
    ></i>
  </button>

</div>
      <template v-if="!isloggedin">

      <button class="login" @click="login">
        {{ t('Login') }}
      </button>

    <button
  class="signup"
  @click="router.push('/auth')"
>
  {{ t('Sign Up') }}
</button>
      </template>
      <template v-else>
        <div
    v-if="profileopen"
    class="profile-overlay"
    @click="profileopen = false"
  ></div>

  <div class="profile-wrapper">

        <button class="profile" @click="toggleprofile">
          <i class="fas fa-user"></i>
        </button>
        <div
         v-if="profileopen" class="profile-dropdown">
         <button class="dropdown-item" @click="openProfile">
          <i class="fas fa-user"></i>
          <span>{{ t('my profile') }}</span>
         </button>

         <button class="dropdown-item">
          <i class="fas fa-wallet"></i>
          <span>{{ t('wallet') }}</span>
         </button>

         <button class="dropdown-item">
          <i class="fas fa-cog"></i>
          <span>{{ t('settings') }}</span>
         </button>

         <div class="dropdown-divider"></div>

         <button 
         class="dropdown-item logout"
         @click="logout">
        
         <i class="fas fa-sign-out-alt"></i>
         <span>{{ t('logout') }}</span>
         </button>
        </div>
  </div>

      </template>
    </div>
  </header>
</template>


<style scoped>

.header{
    height:72px;
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:0 28px;
    background:#0b0b10;
    border-bottom:1px solid rgba(255,255,255,.05);
}

.logo{
    display:flex;
    align-items:center;
    gap:12px;
    font-size:24px;
    font-weight:700;
    color:#fff;
}

.logo-icon{
    width:34px;
    height:34px;
    border-radius:50%;
    background:linear-gradient(135deg,#8B5CF6,#B026FF);
    display:flex;
    align-items:center;
    justify-content:center;
    color:white;
}

.purple{
    color:#9B5CFF;
}

.nav{
    display:flex;
    gap:36px;
}

.nav a{
    color:#8a8a96;
    text-decoration:none;
    font-size:14px;
    transition:.25s;
    position:relative;
}

.nav a:hover{
    color:white;
}

.nav a.active{
    color:white;
}

.nav a.active::after{
    content:'';
    position:absolute;
    left:0;
    bottom:-22px;
    width:100%;
    height:2px;
    background:#9B5CFF;
}

.actions{
    display:flex;
    align-items:center;
    gap:12px;
}

.search{
    width:42px;
    height:42px;
    border:none;
    border-radius:12px;
    background:#14141b;
    color:#bdbdbd;
    cursor:pointer;
    transition:.25s;
}

.search:hover{
    background:#1b1b24;
}

.login{
    width:82px;
    height:42px;
    background:#14141b;
    border:1px solid rgba(255,255,255,.05);
    border-radius:12px;
    color:white;
    cursor:pointer;
}

.signup{
    width:100px;
    height:42px;
    border:none;
    border-radius:12px;
    background:linear-gradient(135deg,#8B5CF6,#C026FF);
    color:white;
    font-weight:600;
    cursor:pointer;
    transition:.3s;
}

.signup:hover{
    transform:translateY(-2px);
    box-shadow:0 0 20px rgba(155,92,255,.45);
}

.profile-wrapper{
    position:relative;
    z-index: 1001;

}

.profile{
    width:42px;
    height:42px;
    border:none;
    border-radius:12px;
    background:#14141b;
    color:#bdbdbd;
    cursor:pointer;

    display:flex;
    align-items:center;
    justify-content:center;

    font-size:16px;

    transition:.25s;
}

.profile:hover{
    background:#1b1b24;
    color:white;
    box-shadow:0 0 15px rgba(155,92,255,.25);
}

.profile-dropdown{
    position:absolute;

    top:52px;
    right:0;

    width:190px;

    padding:8px;

    background:#111118;

    border:1px solid rgba(255,255,255,.08);

    border-radius:14px;

    box-shadow:
        0 15px 40px rgba(0,0,0,.45);

    z-index:1002;
    display: flex;
    flex-direction: column;
    gap: 2px;

    animation:profileMenu .18s ease;
}

@keyframes profileMenu{

    from{
        opacity:0;
        transform:translateY(-8px);
    }

    to{
        opacity:1;
        transform:translateY(0);
    }

}


/* ===================== */
/* Dropdown Items */
/* ===================== */

.dropdown-item{
    width:100%;

    height:42px;

    border:none;
    border-radius:9px;

    background:transparent;

    color:#bdbdc7;

    display:flex;
    align-items:center;

    gap:12px;

    padding:0 12px;

    cursor:pointer;

    font-size:13px;

    text-align:left;

    transition:.2s;
}

.dropdown-item i{
    width:18px;

    font-size:14px;

    color:#8f63ff;

    text-align:center;
}

.dropdown-item:hover{
    background:#1b1b25;

    color:white;
}


/* ===================== */
/* Divider */
/* ===================== */

.dropdown-divider{
    height:1px;

    background:rgba(255,255,255,.07);

    margin:6px 4px;
}


/* ===================== */
/* Logout */
/* ===================== */

.dropdown-item.logout{
    color:#ff6b6b;
}

.dropdown-item.logout i{
    color:#ff6b6b;
}

.dropdown-item.logout:hover{
    background:rgba(255,80,80,.08);
}

/* ===================== */
/* Tablet */
/* ===================== */
@media (max-width: 992px) {

  .header{
    padding:0 18px;
  }

  .nav{
    gap:20px;
  }

  .actions{
    gap:8px;
  }

}


.profile-overlay {
    position: fixed;
    inset: 0;

    z-index: 999;
}

.search-wrapper{

    position:relative;

    display:flex;

    align-items:center;

}

.search-input{

    width:0;

    opacity:0;

    height:42px;

    border:none;

    outline:none;

    border-radius:12px;

    background:#14141b;

    color:white;

    padding:0;

    transition:.45s ease;

}

.search{

    width:42px;

    height:42px;

    border:none;

    border-radius:12px;

    background:#14141b;

    color:#bdbdbd;

    cursor:pointer;

    transition:.45s ease;

    z-index:2;
}

.search-wrapper.open .search{

    transform:translateX(-55px) rotate(-360deg);

    color:#9B5CFF;
}

.search-wrapper.open .search-input{

    width:260px;

    opacity:1;

    padding:0 16px 0 55px;
}

.search i{

    transition:.35s;

    font-size:17px;
}

.search-wrapper.open i{

    transform:rotate(360deg) scale(1.15);
}

/* ===================== */
/* Mobile */
/* ===================== */
@media (max-width:768px){

  .header{
    height:auto;
    padding:16px;
    flex-wrap:wrap;
    gap:16px;
  }

  .logo{
    font-size:20px;
  }

  /* منو میره پایین */
  .nav{
    order:3;
    width:100%;
    display:flex;
    justify-content:center;
    gap:20px;
    flex-wrap:wrap;
  }

  .nav a{
    font-size:13px;
  }

  .nav a.active::after{
    bottom:-6px;
  }

  .actions{
    margin-left:auto;
  }

  .search,
  .login,
  .signup{
    height:38px;
  }

  .login{
    width:70px;
    font-size:13px;
  }

  .signup{
    width:85px;
    font-size:13px;
  }

}

/* ===================== */
/* Small Mobile */
/* ===================== */
@media (max-width:480px){

  .header{
    flex-direction:column;
    align-items:stretch;
  }

  .logo{
    justify-content:center;
  }

  /* منو حذف میشه */
  .nav{
    display:none;
  }

  .actions{
    width:100%;
    margin:0;
    justify-content:space-between;
  }

  .search{
    width:44px;
  }

  .login,
  .signup{
    flex:1;
  }

  .search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  width: 0;
  height: 42px;

  opacity: 0;
  padding: 0;

  border: none;
  outline: none;
  border-radius: 12px;

  background: #14141b;
  color: white;

  pointer-events: none;

  transition:
    width .4s ease,
    opacity .25s ease,
    padding .4s ease,
    border .3s ease;
}

.search-input::placeholder {
  color: #777783;
}

/* Desktop */
.search-wrapper.open .search-input {
  width: 260px;
  opacity: 1;

  padding: 0 16px 0 55px;

  pointer-events: auto;

  border: 1px solid rgba(155, 92, 255, .2);
}

.search {
  width: 42px;
  height: 42px;

  border: none;
  border-radius: 12px;

  background: #14141b;
  color: #bdbdbd;

  cursor: pointer;

  position: relative;
  z-index: 5;

  transition:
    transform .45s cubic-bezier(.68,-.55,.27,1.55),
    background .3s ease,
    color .3s ease,
    box-shadow .3s ease;
}

.search:hover {
  background: #1b1b24;
}

.search i {
  font-size: 17px;
  transition: transform .4s ease;
}

/* Desktop ball */
.search-wrapper.open .search {
  transform: translateX(-218px) rotate(360deg);

  background: linear-gradient(
    135deg,
    #8B5CF6,
    #C026FF
  );

  color: white;

  box-shadow:
    0 0 20px rgba(155, 92, 255, .45);
}

.search-wrapper.open i {
  transform: rotate(360deg) scale(1.1);
}


/* ========================= */
/* TABLET */
/* 769px - 992px */
/* ========================= */

@media (max-width: 992px) {

  .header {
    padding: 0 18px;
  }

  .nav {
    gap: 20px;
  }

  .actions {
    gap: 8px;
  }

  .search-wrapper.open .search-input {
    width: 220px;
  }

  .search-wrapper.open .search {
    transform: translateX(-178px) rotate(360deg);
  }
}


/* ========================= */
/* MOBILE */
/* 481px - 768px */
/* ========================= */

@media (max-width: 768px) {

  .header {
    height: auto;
    min-height: 72px;

    padding: 14px 16px;

    flex-wrap: wrap;
    gap: 14px;
  }

  .logo {
    font-size: 20px;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
  }

  .nav {
    order: 3;

    width: 100%;

    display: flex;
    justify-content: center;

    gap: 20px;

    flex-wrap: wrap;
  }

  .nav a {
    font-size: 13px;
  }

  .nav a.active::after {
    bottom: -6px;
  }

  .actions {
    margin-left: auto;

    display: flex;
    align-items: center;

    gap: 8px;
  }

  /* Search */

  .search-wrapper {
    position: relative;

    width: 38px;
    height: 38px;

    display: flex;
    align-items: center;
  }

  .search {
    width: 38px;
    height: 38px;

    min-width: 38px;
  }

  .search-input {
    position: absolute;

    right: 0;

    width: 0;
    height: 38px;

    opacity: 0;

    padding: 0;

    pointer-events: none;

    transition:
      width .4s ease,
      opacity .25s ease,
      padding .4s ease;
  }

  /* Input باز می‌شود */

  .search-wrapper.open .search-input {

    width: 200px;

    opacity: 1;

    padding: 0 14px 0 48px;

    pointer-events: auto;

    border: 1px solid rgba(155, 92, 255, .25);
  }

  /* توپ */

  .search-wrapper.open .search {

    transform:
      translateX(-162px)
      rotate(360deg);

    background: linear-gradient(
      135deg,
      #8B5CF6,
      #C026FF
    );

    color: white;

    box-shadow:
      0 0 18px rgba(155, 92, 255, .45);
  }

  .search-wrapper.open i {
    transform:
      rotate(360deg)
      scale(1.1);
  }

  .login {
    width: 70px;
    height: 38px;

    font-size: 13px;
  }

  .signup {
    width: 85px;
    height: 38px;

    font-size: 13px;
  }
}
/* ========================= */
/* SMALL MOBILE */
/* 361px - 480px */
/* ========================= */

@media (max-width: 480px) {

  .header {
    flex-direction: column;
    align-items: stretch;

    padding: 14px;
  }

  .logo {
    justify-content: center;
  }

  .nav {
    display: none;
  }

  .actions {
    width: 100%;

    margin: 0;

    justify-content: flex-end;
    gap: 8px;
  }

  .search-wrapper {
    width: 42px;
    height: 42px;
    flex: 0 0 42px;
  }

  .search-wrapper.open {
    flex: 0 1 150px;
    width: 150px;
    min-width: 0;
  }

  .search-input {
    left: 0;
    right: auto;
    box-sizing: border-box;
  }

  .search {
    width: 42px;
    height: 42px;
  }

  .search-wrapper.open .search-input {

    width: 100%;
    max-width: 100%;

    height: 42px;

    padding: 0 12px 0 52px;
  }

  .search-wrapper.open .search {

    transform:
      rotate(360deg);
  }

  .login,
  .signup {

    height: 42px;
    flex: 0 0 auto;
  }

  .login {
    width: 75px;
  }

  .signup {
    width: 90px;
  }
}


/* ========================= */
/* VERY SMALL MOBILE */
/* 320px - 360px */
/* ========================= */

@media (max-width: 360px) {

  .header {
    padding: 12px;
  }

  .logo {
    font-size: 18px;
  }

  .logo-icon {
    width: 30px;
    height: 30px;
  }

  .actions {
    gap: 6px;
  }

  .search-wrapper {
    width: 38px;
    height: 38px;
    flex-basis: 38px;
  }

  .search {
    width: 38px;
    height: 38px;
  }

  /*
    Input کوچک‌تر می‌شود
    تا از صفحه بیرون نزند
  */

  .search-wrapper.open .search-input {

    width: 100%;
    max-width: 100%;

    height: 38px;

    padding:
      0 10px 0 45px;

    font-size: 12px;
  }

  /* توپ */

  .search-wrapper.open .search {

    transform:
      rotate(360deg);
  }

  .login {
    width: 62px;

    height: 38px;

    font-size: 12px;
  }

  .signup {
    width: 76px;

    height: 38px;

    font-size: 12px;
  }
}


/* ========================= */
/* EXTRA SMALL */
/* 320px and below */
/* ========================= */

@media (max-width: 320px) {

  .header {
    padding: 10px;
  }

  .logo {
    font-size: 17px;
  }

  .actions {
    gap: 4px;
  }

  .search-wrapper.open .search-input {

    font-size: 11px;
  }

  .login {
    width: 58px;
  }

  .signup {
    width: 70px;
  }
}

}

</style>
<script setup>

import { ref } from "vue"
import { useRouter } from 'vue-router'
import { t } from '@/i18n'


const router = useRouter()
const isloggedin = ref(false)
const profileopen = ref(false)
const searchOpen = ref(false)
const searchText = ref("")


function login() {
  isloggedin.value = true
}

function toggleprofile() {
  profileopen.value = !profileopen.value
}

function openProfile() {
  profileopen.value = false
  void router.push('/profile')
}

function logout() {
  isloggedin.value = false
  profileopen.value = false
}

function toggleSearch() {
  searchOpen.value = !searchOpen.value

  if (!searchOpen.value)
    searchText.value = ""
  }
</script>