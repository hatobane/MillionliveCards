<template>
  <div>
    <transition-group tag="ul" class="menu" name="fadeInMenu">
      <li v-show="show" key="home" @click="jump('/')"><i class="icon-double-right"></i>Home</li>
      <!-- <li v-show="show" @click="jump('/album')" key="album"><i class="icon-double-right"></i>Album</li> -->
      <li v-show="show"  @click="jump('/event')" key="event"><i class="icon-double-right"></i>Event</li>
      <li v-show="show"  @click="jump('/gasya')" key="gasya"><i class="icon-double-right"></i>Gasya</li>
    </transition-group>

    <transition name="fadeInLeft">
      <div v-show="show" class="subMenu">
        <a href="https://twitter.com/sogineko" target="_blank" title="はとばねぇ Twitter"><i class="icon-twitter"></i>@sogineko</a>
        <div>Copyright © {{new Date().getFullYear()}} hatobane.</div>
      </div>
    </transition>
  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'

export default {
  name: 'TheNav',
  props: ['show'],
  data() {
    return {
      type: this.$route.name
    }
  },
  methods: {
    jump(target) {
      EventBus.$emit('closeMenu')
      this.$router.push(target).catch(()=> {})
      if(target==='/') EventBus.$emit('resetHome')
      if(/event|gasya/.test(target)) EventBus.$emit('resetArchive')
    }
  }
}
</script>