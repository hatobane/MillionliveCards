<template>
  <div id="app">

    <the-header/>

    <div class="content" :class="{fix: fix}">

      <transition name="fadeIn">
        <router-view/>
      </transition>

    </div>

    <the-footer/>

  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
  data() {
    return {
      fix: false,
      notFound: {
        show: false,
        text: ''
      }
    }
  },
  watch: {
    '$route': function(to, from) {
      if (to.path !== from.path) {
        this.$SmoothScroll(document.body, 800)
      }
    }
  },
  mounted() {
    EventBus.$on('fixBackground', ($event)=> {
      this.fixBackground($event)
    })
  },
  methods: {
    fixBackground(boolean) {
      this.fix = boolean
    }
  }
}
</script>