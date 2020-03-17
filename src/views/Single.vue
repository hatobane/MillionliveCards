<template>
  <div v-if="init" class="single">
    <h3 class="single__cardTtl m-sp">{{card.title}}</h3>
    <div class="single__card">

      <single-slide
        :card="card"
        :cardId="cardId"
      />

      <div class="single__status">
        <h3 class="single__cardTtl m-pc">{{card.title}}</h3>
        <div class="single__skill">
          <h4 class="single__skill__label">Skill <span v-if="card.skill">『{{card.skill}}』</span></h4>
          <div v-text="card.skill?skillEffect:'スキルなし'"></div>
        </div>
        <ul class="single__param">
          <li>Cost:<span>{{card.cost}}</span></li>
          <li>Total:<span>{{+card.ap + +card.dp}}</span></li>
          <li>MaxAp:<span>{{card.ap}}</span></li>
          <li>MaxDp:<span>{{card.dp}}</span></li>
        </ul>
        <div class="single__serif" v-html="card.serif"></div>
      </div>

    </div>

    <div class="single__relation">
      <h4 v-if="campaign.length > 0" class="single__relation__ttl">入手</h4>
      <ul v-if="campaign.length > 0" class="single__relation__data">
        <template v-if="/(event|gasya)/.test(campaignType)">
          <li
            v-for="(item, index) of campaign"
            :key="item.post_name"
          ><button type="button" @click="jumpCampaign(item.post_name)">{{campaign[index].title}}</button></li>
        </template>
        <template v-else>
          <li
            v-for="(item, index) of campaign"
            :key="item.post_name"
            class="current">{{campaign[index].title}}</li>
        </template>
        <li class="single__relation__date">（<span>{{campaign[0].start_date}}</span>～<span v-if="campaign[0].end_date">{{campaign[0].end_date}}</span>）</li>
      </ul>
      <h4 v-if="evolution" class="single__relation__ttl">覚醒</h4>
      <ul v-if="evolution" class="single__relation__data">
        <li
          v-for="item of evolution"
          :key="item.id"
          :class="{current: item.id === card.id}"
        >
          <button type="button" v-if="item.id != card.id" @click="jumpSinglePage(item)">{{item.title}}</button>
          <template v-else>{{item.title}}</template>
        </li>
      </ul>
      <div v-if="card.sub_text.length > 0" class="single__content" v-html="card.sub_text"></div>

      <Breadcrumb
        :card="card"
      />

      <ul class="single__number">
        <li v-if="prevCard"><button type="button" @click="jumpSinglePage(prevCard)"><i class="icon-angle-left"></i></button></li>
        <li>No.{{card.id}}</li>
        <li v-if="nextCard"><button type="button" @click="jumpSinglePage(nextCard)"><i class="icon-right"></i></button></li>
      </ul>
    </div>

  </div>
</template>

<script>
import GetSkillEffect from '@/components/libs/GetSkillEffect.js'
import SingleSlide from '@/components/single/Slide.vue'
import Breadcrumb from '@/components/single/Breadcrumb.vue'

export default {
  name: 'Single',
  head: {
    title: function() {
      return {inner:this.card.title}
    },
    meta: function() {
      return [{name:'description',content:this.card.serif}]
    }
  },
  mixins: [GetSkillEffect],
  components: {
    SingleSlide,
    Breadcrumb
  },
  data() {
    return {
      init: false,
      card: null,
      prevCard: null,
      nextCard: null,
      campaign: [],
      campaignType: null,
      evolution: false
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        try {
          this.getCard()
          this.getCampaign()
          if(['event046', 'event075', 'event112', 'event155'].indexOf(this.card.from) < 0) {
            if(this.campaign.length > 0) this.getEvolution()
          }
        }
        catch {
          this.$router.replace('/notfound')
        }
        this.$emit('updateHead')
        this.init = true
      }
    }
  },
  computed: {
    cardId() {
      return +this.$route.params.id.match(/card(\d+)/)[1]
    },
    query() {
      const arr = this.$dbCard
      return arr.sort((a, b)=> (a.id < b.id ? 1 : -1))
    },
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
      }
      return false
    }
  },
  methods: {
    getCard() {
      const cardLength = this.query.length
      for (let i=0; i<cardLength; i++) {
        if(this.query[i].id === this.cardId) {
          this.card = this.query[i]
          this.prevCard = (i+1) < (cardLength) ? this.query[i+1] : this.query[0]
          this.nextCard = (i-1) >= 0 ? this.query[i-1] : this.query[cardLength-1]
          break
        }
      }
    },
    getCampaign() {
      const from = /\\,/.test(this.card.from) ? [this.card.from] : this.card.from.split(',')
      const getIndex = (db, post_name)=> {
        return db.map(obj=>obj.post_name).indexOf(post_name)
      }
      if(/^(gasya|event)/.test(from[0])) {
        this.campaignType = from[0].match(/^\D+/)[0]
        for(let i=0; i<from.length; i++) {
          if(this.campaignType === 'gasya') {
            this.campaign[i] = this.$dbGasya[getIndex(this.$dbGasya, from[i])]
          }else if(this.campaignType === 'event') {
            this.campaign[i] = this.$dbEvent[getIndex(this.$dbEvent, from[i])]
          }
        }
      }else {
        this.campaign = getIndex(this.$dbCampaign, from[0]) > -1 ? [this.$dbCampaign[getIndex(this.$dbCampaign, from[0])]] : []
      }
    },
    getEvolution() {
      const arr = this.$dbCard.filter((card)=> {
      return (card.from === this.campaign[this.campaign.length - 1].post_name) && (card.cat === this.card.cat)
      }).sort((a, b)=> (a.id > b.id ? 1 : -1))
      if (arr.length > 1) {
        this.evolution = arr
      }
    },
    jumpSinglePage(card) {
      this.init = false
      this.reset()
      this.$router.push('/' + card.type1 + '/card' + card.id)
    },
    jumpCampaign(post_name) {
      if(this.campaignType) {
        const target = '/' + this.campaignType + '/' + post_name
        this.$router.push(target)
      }
    },
    jumpHome() {
      this.$router.push('/')
    },
    reset() {
      this.card = null
      this.campaign = []
      this.campaignType = null
      this.evolution = false
    }
  }
}
</script>