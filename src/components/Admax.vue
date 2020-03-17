<template>
  <div :id="id" class="m-admax"></div>
</template>

<script>
export default {
  name: 'Admax',
  props: [
    'id',
    'src'
  ],
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.init()
      }
    }
  },
  methods: {
    init() {
      const $script = document.createElement('script')
      $script.src = this.src
      $script.async = true

      const $e = document.getElementById(this.id)
      if($e) $e.appendChild($script)
    }
  }
}
</script>