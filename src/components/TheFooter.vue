<template>
  <footer class="footer">
    <div class="footerBtn__bg"></div>
    <div class="footerBtn--menu" @click="switchMenu()">
      <i v-show="menu.show" class="icon-close"></i>
      <i v-show="!menu.show" class="icon-menu"></i>
    </div>
    <div class="footerBtn--up" @click="up()"><i class="icon-up"></i></div>
    <div class="footerBtn--search" @click="showSearchForm()"><i class="icon-search"></i></div>

    <h1 class="siteTtl" @click="jumpHome()">MillionLive Cards</h1>

    <the-nav
      :show="menu.show"
    />

    <searchForm
      :show="searchForm.show"
      @close="closeSearchForm()"
    />

  </footer>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import TheNav from '@/components/TheNav.vue'
import SearchForm from '@/components/search/SearchForm.vue'
export default {
  name: 'TheFooter',
  components: {
    TheNav,
    SearchForm
  },
  data() {
    return {
      searchForm: {
        show: false
      },
      menu: {
        show: false
      }
    }
  },
  mounted() {
    EventBus.$on('closeMenu', ()=> {
      this.closeMenu()
    })
  },
  methods: {
    up() {
      this.$SmoothScroll(document.body, 500)
    },
    switchMenu() {
      this.menu.show = !this.menu.show
    },
    closeMenu() {
      this.menu.show = false
    },
    showSearchForm() {
      this.searchForm.show = true
      EventBus.$emit('fixBackground', true)
    },
    closeSearchForm() {
      this.searchForm.show = false
      EventBus.$emit('fixBackground', false)
    },
    jumpHome(){
      this.$router.push('/').catch(()=> {})
      EventBus.$emit('resetHome')
    }
  }
}
</script>