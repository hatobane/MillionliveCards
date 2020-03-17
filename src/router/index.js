import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import Archive from '@/views/Archive.vue'
import Album from '@/views/Album.vue'
import Single from '@/views/Single.vue'
import Taxonomy from '@/views/Taxonomy.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/album',
    name: 'Album',
    component: Album
  },
  {
    path: '/(event|gasya)',
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/(event_category|gasya_category)/:id',
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/(event|gasya)/:id',
    name: 'Taxonomy',
    component: Taxonomy
  },
  {
    path: '/(vo|da|vi|ex)/:id(card\\d{1,4})',
    name: 'Single',
    component: Single,
  },
  {
    path: '/*',
    name: 'NotFound',
    component: NotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
