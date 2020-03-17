<template>
  <li class="archive__cardItem" @click="jumpSingle()">
    <h2 class="archive__ttl--sp m-sp">{{card.title}}</h2>
    <div class="archive__cardItem__thumb">
      <img :src="src" :alt="card.title">
    </div>
    <div class="archive__cardItem__content">
      <h2 class="archive__ttl--pc m-pc">{{card.title}}</h2>
      <div>{{skillEffect}}</div>
      <ul class="archive__cardItem__status">
        <li>Total<span>{{total}}</span></li>
        <li>Ap<span>{{card.ap}}</span></li>
        <li>Dp<span>{{card.dp}}</span></li>
      </ul>
      <div class="archive__cardItem__cost">Cost<span>{{card.cost}}</span></div>
    </div>
    <div class="archive__cardItem__id m-pc">No.{{card.id}}</div>
  </li>
</template>

<script>
import GetSkillEffect from '@/components/libs/GetSkillEffect.js'
export default {
  name: "HomeCassette",
  props: ['card'],
  mixins: [GetSkillEffect],
  data() {
    return {
      src: null
    }
  },
  watch: {
    'card.id': {
      immediate: true,
      handler() {
        this.getSrc()
      }
    }
  },
  computed: {
    skillEffect() {
      if(this.card.skill) {
        const data = {
          a: this.card.skill_a,
          b: this.card.skill_b,
          c: this.card.skill_c,
          d: this.card.skill_d,
          e: Number(this.card.skill_e)
        }
        return this.$_getSkillEffect(data)
      }else {
        return 'スキルなし'
      }
    },
    total() {
      return +this.card.ap + +this.card.dp
    }
  },
  methods: {
    getSrc() {
      const folder = 'frame' + ('00'+Math.ceil(this.card.id/100)).slice(-2)
      this.src = './card/' + folder + '/thumb_frame' + this.card.id + '.jpg'
    },
    jumpSingle() {
      this.$router.push('/' + this.card.type1 + '/card' + this.card.id)
    }
  }
}
</script>