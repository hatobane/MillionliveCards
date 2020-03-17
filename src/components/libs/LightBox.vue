<template>
  <transition name="fadeIn">
    <div v-if="show" class="lightBox">

      <div class="lightBox__control">
        <div class="lightBox__close" @click.prevent="init(false)"><i class="icon-close"></i></div>
        <div v-if="slide.items[current]" class="lightBox__Label">{{slide.items[current].title}}</div>
      </div>

      <hooper
        ref="lightBox"
        :initialSlide="current"
        :wheelControl="false"
        :infiniteScroll="true"
        :transition="400"
        style="height: auto; max-width: 600px"
        @slide="getCurrent"
      >
        <slide
          v-for="(item, index) of slide.items"
          :key="index"
          class="lightBox__img"
        ><img
          :src="item.src"
          :alt="'card image: ' + item.title"
        ></slide>
      </hooper>

      <div class="lightBox__control">
        <div v-if="slide.items[current]" class="lightBox__Label">{{slide.items[current].title}}</div>
        <div class="lightBox__close" @click.prevent="init(false)"><i class="icon-close"></i></div>
      </div>

    </div>
  </transition>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  components: {
    Hooper,
    Slide
  },
  props: [
    'slide'
  ],
  data() {
    return {
      show: false,
      current: 0
    }
  },
  mounted() {
    EventBus.$on('lightBox', (boolean)=> {
      this.init(boolean)
    })
  },
  methods: {
    init(boolean) {
      this.current = this.slide.current
      EventBus.$emit('fixBackground', boolean)
      this.show = boolean
    },
    getCurrent(payload) {
      const current = payload.currentSlide % this.slide.count
      this.current = (current >= 0) ? current : (current + this.slide.count)
    }
  }
}

</script>