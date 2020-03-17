<template>
  <div v-if="query.length > 0" class="taxonomy__slide">

    <ul class="taxonomy__slide__thumb m-pc">
      <li
        v-for="(item, index) of query"
        :key="item.title"
        :class="{action: slide.current === index}"
        @click.prevent.stop="$refs.slide.slideTo(index)"
      ><img :src="slide.items[index].thumb" :alt="item.title"></li>
    </ul>

    <div class="archive__label">Card: {{slide.current + 1}}/{{query.length}}</div>
    <hooper
      ref="slide"
      :infiniteScroll="true"
      :transition="400"
      style="height: auto"
      @slide="getSlideCurrent"
      class="taxonomy__slide__list"
    >
      <slide
        v-for="(item, index) of query"
        :key="item.title"
        class="taxonomy__slide__item"
      >

        <h3 class="taxonomy__cardTtl m-sp">{{item.title}}</h3>
        <div class="taxonomy__img"><img :src="slide.items[index].src" :alt="item.title"></div>

        <div class="taxonomy__card">
          <h3 class="taxonomy__cardTtl m-pc">{{item.title}}</h3>
          <h4 class="taxonomy__skill"><span v-if="item.skill">Skill 『{{item.skill}}』</span><span v-else>None Skill</span></h4>
          <div class="taxonomy__serif" v-html="item.serif"></div>
          <router-link tag="button" type="button" class="taxonomy__link" :to="singleLink(item)">カード詳細ページ</router-link>
        </div>

      </slide>
    </hooper>

    <ul class="taxonomy__slide__btn">
      <li><button @click.prevent="$refs.slide.slidePrev()"><i class="icon-angle-left"></i></button></li>
      <li><button @click.prevent="$refs.slide.slideNext()"><i class="icon-right"></i></button></li>
    </ul>

    <ul class="taxonomy__slide__dots m-pc">
      <li
        v-for="item of query"
        :key="item.id"
      ></li>
    </ul>

  </div>

</template>

<script>
//import {EventBus} from '@/components/libs/EventBus.js'
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'
//import LightBox from '@/components/libs/LightBox.vue'

export default {
  name: 'TaxonomySlide',
  props: [
    'id',
    'type',
    'query'
  ],
  components: {
    Hooper,
    Slide
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
        this.getSlideItems()
        this.slide.count = this.query.length
      }
    }
  },
  computed: {
    singleLink() {
      return (card)=> {
        return '/' + card.type1 + '/card' + card.id
      }
    }
  },
  methods: {
    getSlideItems() {
      let items = []
      for (let i=0; i<this.query.length; i++) {
        let imgFolder = ('00'+Math.ceil(this.query[i].id/100)).slice(-2)
        items[i] = {
          title: this.query[i].title,
          src: '/card/frame' + imgFolder + '/frame' + this.query[i].id + '.jpg',
          thumb: '/card/frame' + imgFolder + '/thumb_frame' + this.query[i].id + '.jpg',
        }
      }
      this.slide.items = items
    },
    getSlideCurrent(payload) {
      const current = payload.currentSlide % this.slide.count
      this.slide.current = (current >= 0) ? current : (current + this.slide.count)
    }
  }
}
</script>