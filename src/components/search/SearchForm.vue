<template>
  <transition name="fadeInDown">
    <form v-show="show" class="searchForm" @submit.prevent="submit()">

      <div class="serachForm__keyword">
        <h3 class="searchForm__ttl">Keyword</h3>
        <input type="text" v-model="setting.keyword">
      </div>

      <div class="serchForm__settings">
        <select-item
          :id="'rarity'"
          :title="'Rarity'"
          :options="{
            default: 'レアリティ',
            sr: 'SR',
            hr: 'HR',
            r: 'R',
            hn: 'HN',
            n: 'N'
          }"
        />

        <select-item
          :id="'cost'"
          :title="'Cost'"
          :options="{
            default: 'コスト',
            '20': '20',
            '19': '19',
            '18': '18',
            '17': '17',
            '16': '16',
            '15': '15',
            '14': '14',
            '13': '13',
            '12': '12',
            '11': '11',
            '10': '10',
            '9': '9',
            '8': '8',
            '7': '7',
            '6': '6',
            '5': '5',
            '4': '4',
            '3': '3',
            '2': '2'
          }"
        />

        <select-item
          :id="'sort'"
          :title="'Sort'"
          :options="{
            id: 'Card Id',
            ap: 'Ap',
            dp: 'Dp',
            total: 'Total'
          }"
        />

        <select-item
          :id="'orderby'"
          :title="'OrderBy'"
          :options="{
            desc: 'Desc (降順)',
            asc: 'Asc (昇順)'
          }"
        />
      </div>

      <h3 class="searchForm__ttl">Idol</h3>
      <div class="serachForm__idols">
        <ul class="serachForm__idols__tabs">
          <li
            v-for="type of types"
            :key="type"
            :class="{active: selectIdol.type === type}"
            @click="changeTab(type)"
          >{{typeLabel(type)}}</li>
        </ul>

        <transition name="fadeIn">
          <div v-show="setting.idol" class="serachForm__idols__panel">
            <div class="serachForm__idols__selected">{{(idolList[setting.idol])?idolList[setting.idol].name:''}}<br>
              <span class="serachForm__idols__reset" @click="ResetSelectIdol()"><i class="icon-close"></i>Reset</span>
            </div>
            <div class="serachForm__idols__panel__img"><img :src="'/assets/img/icons/'+setting.idol+'.png'" :alt="setting.idol"></div>
          </div>
        </transition>

        <transition name="fadeIn">
          <ul v-show="selectIdol.type" class="searchForm__idols__btns">
            <li
              v-for="idol of idolSelect"
              :key="idol"
              @click="setSelectIdol(idol)"
            ><img :src="'/assets/img/icons/'+idol+'.png'" :alt="idolList[idol].name"></li>
          </ul>
        </transition>
      </div>

      <footer class="searchForm__footer">
        <button type="submit" @click="submit()"><i class="icon-search"></i>Search</button>
        <button type="button" @click="close()"><i class="icon-close"></i></button>
      </footer>

    </form>
  </transition>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import Han2zen from '@/components/libs/Han2zen.js'
import Idols from '@/components/libs/Idols.js'
import SelectItem from '@/components/search/Select.vue'

const TYPES = ['all', 'vo', 'da', 'vi', 'ex']

export default {
  name: 'SearchForm',
  components: {
    SelectItem
  },
  mixins: [
    Idols,
    Han2zen
  ],
  props: ['show'],
  data() {
    return {
      setting: {
        keyword: '',
        rarity: 'default',
        cost: 'default',
        sort: 'id',
        orderby: 'desc',
        idol: null
      },
      selectIdol: {
        type: false
      }
    }
  },
  computed: {
    types: ()=> TYPES,
    typeLabel: ()=> {
      return (type)=> type.charAt(0).toUpperCase() + type.slice(1)
    },
    idolSelect() {
      if(this.selectIdol.type === 'all') {
        return Object.keys(this.idolList)
      }else {
        return Object.keys(this.idolList).filter(idol=>this.idolList[idol].type === this.selectIdol.type)
      }
    }
  },
  methods: {
    changeTab(type) {
      this.selectIdol.type = (this.selectIdol.type === type) ? false : type
    },
    setSelectIdol(idol) {
      this.setting.idol = idol
    },
    ResetSelectIdol() {
      this.setting.idol = false
    },
    submit() {
      let query = {
        page: 1,
        sort: this.setting.sort,
        orderby: this.setting.orderby,
      }
      if(this.setting.keyword.trim() != '') {
        query.keyword = this.$_toHankakuKana(this.setting.keyword.trim())
      }
      if(this.setting.idol) {
        query.idol = this.setting.idol
      }
      if(this.setting.rarity != 'default') {
        query.rarity = this.setting.rarity
      }
      if(this.setting.cost != 'default') {
        query.cost = this.setting.cost
      }

      this.$router.push({
        path: '/',
        query: query
      }).catch(()=> {
      })
      EventBus.$emit('getPostQeruy')
      this.$emit('close')
    },
    close() {
      this.selectIdol.type = false
      this.$emit('close')
    },
  }
}
</script>