<template>
  <div class="notFound">
    <h2 class="m-contentTtl">Not Found</h2>
    <div class="notFound__content">
      <div class="notFound__image"><img :src="src" alt="icon"></div>
      <div class="notFound__text">
        <p>該当されたURLは見つかりませんでした。</p>
      </div>

    </div>

    <btn-home />
  </div>
</template>

<script>
import BtnHome from '@/components/btn/BtnHome.vue'

export default {
  name: 'Notfound',
  head: {
    title: function() {
      return {inner:'Not Found'}
    },
    meta: function() {
      return [{name:'robots',content:'noindex'}]
    }
  },
  components: {
    BtnHome
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.$emit('updateHead')
      }
    }
  },
  computed: {
    src() {
      return require('@/assets/img/akane.png')
    }
  }
}
</script>
