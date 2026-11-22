import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import '@fortawesome/fontawesome-free/css/all.min.css'
import '@fontsource/vazirmatn/arabic-400.css'
import '@fontsource/vazirmatn/arabic-500.css'
import '@fontsource/vazirmatn/arabic-600.css'
import '@fontsource/vazirmatn/arabic-700.css'

import App from './App.vue'

import Home from './components/Home.vue'
import SignupLogin from './components/Signup-login.vue'
import Player from './components/player.vue'
import Prediction from './components/prediction.vue'
import market from './components/market.vue'
import Wallet from './components/wallet/wallet.vue'
import Profile from './components/Profile/Profile.vue'
import LiveGames from './components/Live-games.vue'
import Mybets from './components/Mybets.vue'
import FirstGoal from './components/firstgoal.vue'
import Assist from './components/assist.vue'
import AnytimeGoal from './components/anytimegoal.vue'
import YellowCard from './components/yellowcard.vue'
import PlayerOfMatch from './components/playerofmatch.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      component: Home
    },

    {
      path: '/auth',
      component: SignupLogin
    },
    

    {
      path: '/player/:id',
      component: Player
    },

    {
      path: '/player/:id/prediction',
      component: Prediction
    },

    {
      path: '/market',
      component: market
    },
    {
      path: '/markets/first-goal',
      component: FirstGoal
    },
    {
      path: '/markets/assist',
      component: Assist
    },
    {
      path: '/markets/anytime-goal',
      component: AnytimeGoal
    },
    {
      path: '/markets/yellow-card',
      component: YellowCard
    },
    {
      path: '/markets/player-of-match',
      component: PlayerOfMatch
    },

    {
      path: '/wallet',
      component: Wallet
    },

    {
      path: '/profile',
      component: Profile
    },

    {
      path: '/live-games',
      component: LiveGames
    },
    {
      path: '/bets',
      alias: '/mybets',
      component: Mybets
    }
  ]
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')