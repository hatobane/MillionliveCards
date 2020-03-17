import Vue from 'vue'
import VS2 from 'vue-script2'
import App from './App.vue'
import router from './router'

import VueAnalytics from 'vue-analytics'
import VueHead from 'vue-head'
import smoothScroll from 'vue-smoothscroll'

import dbCampaign from '@/assets/data/campaign.json'
import dbCard from '@/assets/data/card.json'
import dbEvent from '@/assets/data/event.json'
import dbGasya from '@/assets/data/gasya.json'

import './assets/css/style.css'
import './assets/css/transition.css'
import 'hooper/dist/hooper.css'

Vue.config.productionTip = false
Vue.use(VS2)
Vue.use(VueAnalytics, {id:'UA-64301469-2'})
Vue.use(VueHead, {separator:'|'})
Vue.use(smoothScroll)

Vue.prototype.$dbCampaign = dbCampaign
Vue.prototype.$dbCard = dbCard
Vue.prototype.$dbEvent = dbEvent
Vue.prototype.$dbGasya = dbGasya

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
