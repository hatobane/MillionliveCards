<template>
  <div class="single__slide">
    <hooper
      ref="slide"
      :infiniteScroll="true"
      :transition="400"
      style="height: auto"
      @slide="getSlideCurrent"
    >
      <slide
        v-for="item of slide.items"
        :key="item.title"
        class="single__slide__img"
      ><img
        :src="item.src"
        :alt="'card image: ' + item.title"
      ><i class="single__slide__zoom m-pc icon-zoom-in" @click="lightBox(true)"></i></slide>
    </hooper>

    <div class="single__slide__dots m-pc">
      <div
        v-for="(item, index) of slide.items"
        :key="index"
        :class="{action: slide.current === index}"
        @click.prevent.stop="$refs.slide.slideTo(index)"
      ><i class="icon-double-right"></i>{{item.title}}</div>
    </div>

    <ul class="single__slide__btn m-sp">
      <li @click.prevent="$refs.slide.slidePrev()"><i class="icon-angle-left"></i></li>
      <li @click.prevent="$refs.slide.slideNext()"><i class="icon-right"></i></li>
    </ul>

    <div class="single__slide__label m-sp">
      <div>-- {{slide.items[slide.current].title}} --</div>
      <div @click="lightBox(true)"><i class="icon-zoom-in"></i></div>
    </div>

    <lightBox
      :slide="slide"
     />
  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
import LightBox from '@/components/libs/LightBox.vue'

export default {
  name: 'SingleSlide',
  props:[
  'card',
  'cardId'
  ],
  components: {
    Hooper,
    Slide,
    LightBox
  },
  data() {
    return {
      slide: {
        count: 0,
        current: 0,
        items: []
      }
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.slide.items = this.getSlideItems()
        this.slide.count = this.slide.items.length
      }
    }
  },
  methods: {
    getSlideItems() {
      const imgFolder = ('00'+Math.ceil(this.cardId/100)).slice(-2)
      const data = [
        {
          title: 'Frame',
          src: '/card/frame' + imgFolder + '/frame' + this.cardId + '.jpg'
        },
        {
          title: 'No Frame',
          src: '/card/noframe' + imgFolder + '/noframe' + this.cardId + '.jpg'
        },
        {
          title: 'Sepia',
          src: '/card/sepia' + imgFolder + '/sepia' + this.cardId + '.jpg'
        }
      ]
      if(this.card && this.card.png === '1') {
        data.push({
          title: 'PNG',
          src: '/card/png' + imgFolder + '/png' + this.cardId + '.png'
        })
      }
      return data
    },
    getSlideCurrent(payload) {
      const current = payload.currentSlide % this.slide.count
      this.slide.current = (current >= 0) ? current : (current + this.slide.count)
    },
    lightBox(boolean) {
      EventBus.$emit('lightBox', boolean)
    }
  }
}
</script>