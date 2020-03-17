<template>
  <div class="home">
    <div class="archive__label">Status</div>
    <ul class="archive__status">
      <li v-if="$route.query.idol">Idol/{{tagIdol}}</li>
      <li v-if="$route.query.rarity">Rarity/{{tagRarity}}</li>
      <li v-if="$route.query.cost">Cost/{{tagCost}}</li>
      <li>Order/{{tagSort}}</li>
      <li>OrderBy/{{tagOrderBy}}</li>
      <li v-if="$route.query.keyword">Keyword/{{tagKeyword}}</li>
    </ul>

    <pagination
      :contentBtns="true"
      :contentSelect="false"
      :page.sync="page"
      :pageLength="pageLength"
      @pageReload="pageReload($event)"
    />

    <ul class="archive">
      <template v-if="postLength">
        <transition-group name="fadeInArchve">
          <template v-for="i of postsPerPage">
            <template v-if="postQuery[start + (i-1)]">
              <Cassette
                :card="postQuery[start + (i-1)]"
                :key="postQuery[start + (i-1)].id"
              />
            </template>
          </template>
        </transition-group>
      </template>
      <template v-else>
        <li>該当カードが見つかりませんでした</li>
      </template>
    </ul>

    <pagination
      :contentBtns="true"
      :contentSelect="true"
      :page.sync="page"
      :pageLength="pageLength"
      @pageReload="pageReload($event)"
    />

  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import Idols from '@/components/libs/Idols.js'
import Cassette from '@/components/cassette/Home.vue'
import pagination from '@/components/Pagination.vue'

const POSTS_PER_PAGE = 10 //表示件数

export default {
  name: 'Home',
  head: {
    title: function() {
      return {
        inner: this.$route.query.sort ? 'Search Result' : 'Home'
      }
    }
  },
  mixins: [Idols],
  components: {
    Cassette,
    pagination
  },
  data() {
    return {
      postQuery: [],
      page: 1,
      start: 0,
      postLength: 0
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.getPostQeruy()
        this.$emit('updateHead')
      }
    }
  },
  computed: {
    postsPerPage: ()=> POSTS_PER_PAGE,
    tagIdol() {
      return this.idolList[this.$route.query.idol].name
    },
    tagRarity() {
      return this.$route.query.rarity.toUpperCase()
    },
    tagCost() {
      return this.$route.query.cost
    },
    tagSort() {
      const param = this.$route.query.sort
      return param ? param.charAt(0).toUpperCase() + param.slice(1) : 'Id'
    },
    tagOrderBy() {
      const param = this.$route.query.orderby
      return param && param === 'asc' ? 'Asc' : 'Desc'
    },
    tagKeyword() {
      return this.$route.query.keyword
    },
    pageLength() {
      return Math.floor((this.postLength - 1) / POSTS_PER_PAGE) + 1
    }
  },
  mounted() {
    EventBus.$on('getPostQeruy', ()=> {
      this.getPostQeruy()
    })
    EventBus.$on('resetHome', ()=> {
      this.resetHome()
    })
  },
  methods: {
    getPostQeruy() {
      const query = this.$route.query

      //ページ数
      if(query.page) this.setPage(query.page)

      //query スタート地点の取得
      this.start = (this.page-1) * POSTS_PER_PAGE

      //DB取得 ＆ ソート
      const sort = query.sort ? query.sort : 'id'
      const orderby = query.orderby ? query.orderby : 'desc'
      this.postQuery = this.sortPostQuery(sort, orderby)

      //キーワード フィルタリング
      if(query.keyword) {
        this.postQuery = this.keywordPostQuery(query.keyword)
      }

      //レアリティ フィルタリング
      if(query.rarity) {
        this.postQuery = this.filterPostQuery('rarity', query.rarity)
      }

      //コスト値 フィルタリング
      if(query.cost) {
        this.postQuery = this.filterPostQuery('cost', query.cost)
      }

      //アイドル フィルタリング
      if(query.idol) {
        this.postQuery = this.filterPostQuery('cat', query.idol)
      }

      //該当0件の判定
      this.postLength = this.postQuery.length
    },
    setPage(i) {
      if(+i) {
        this.page = +i
      }else { //数値以外はエラーページへ
        this.$router.replace('/notfound')
      }
    },
    sortPostQuery(sort, orderby) {
      return this.$dbCard.sort((a, b)=> {
        let c = (sort === 'total') ? (+a.ap)+(+a.dp) : +a[sort]
        let d = (sort === 'total') ? (+b.ap)+(+b.dp) : +b[sort]
        if(c != d) {
          if(orderby === 'asc') {
            return (c < d) ? -1 : 1
          }else {
            return (c > d) ? -1 : 1
          }
        }else {
          return (a.id > b.id) ? -1 : 1
        }
      })
    },
    keywordPostQuery(keyword) {
      return this.postQuery.filter((post)=> {
        const a = keyword.replace(/ー/g, '-')
        const b = keyword.replace(/-/g, 'ー')
        const c = new RegExp('(' + a + '|' + b + ')')
        return c.test(post.title + ' ' + post.skill + ' ' + post.serif)
      })
    },
    filterPostQuery(option, val) {
      return this.postQuery.filter((post)=> {
        return (post[option] === val)
      })
    },
    pageReload() {
      this.page = +(this.$route.query.page)
      this.start = (this.page-1)*POSTS_PER_PAGE
      this.$SmoothScroll(document.body, 800)
    },
    resetHome() {
      this.page = 1
      this.start = 0
      this.$SmoothScroll(document.body, 800)
    }
  }
}
</script>