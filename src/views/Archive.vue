<template>
  <div v-if="query" class="archive">

    <pagination
      :contentBtns="true"
      :contentSelect="false"
      :page.sync="page"
      :pageLength="pageLength"
      @pageReload="pageReload($event)"
    />

    <ul class="archive">
      <template v-if="this.query.length">
        <transition-group name="fadeInArchve">
          <template v-for="i of postsPerPage">
            <template v-if="query[start + (i-1)]">
              <Cassette
                :item="query[start + (i-1)]"
                :key="query[start + (i-1)].post_name"
              />
            </template>
          </template>
        </transition-group>
      </template>
      <template v-else>
        <li>イベントが見つかりません</li>
      </template>
    </ul>

    <pagination
      :contentBtns="true"
      :contentSelect="true"
      :page.sync="page"
      :pageLength="pageLength"
      @pageReload="pageReload($event)"
    />

    <div class="archive__ad--pc m-pc">
      <iframe
        src="/iframe/AdmaxPc01.html"
        border="0"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="60px"
      ></iframe>
    </div>

    <div class="archive__ad--pc m-pc">
      <iframe
        src="/iframe/AdmaxPc02.html"
        border="0"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="60px"
      ></iframe>
    </div>

    <div class="m-kokoku--sp m-sp">
      <iframe
        src="/iframe/AdmaxSp02.html"
        border="0"
        marginwidth="0"
        marginheight="0"
        frameborder="0"
        scrolling="no"
        width="100%"
        height="100px"
      ></iframe>
    </div>

  </div>
</template>

<script>
import {EventBus} from '@/components/libs/EventBus.js'
import Capitalize from '@/components/libs/Capitalize.js'
import Cassette from '@/components/cassette/Archive.vue'
import pagination from '@/components/Pagination.vue'

const POSTS_PER_PAGE = 10 //表示件数

export default {
  name: 'Archive',
  head: {
    title: function() {
      return {
        inner: this.$_capitalize(this.type)
      }
    }
  },
  mixins: [Capitalize],
  components: {
    Cassette,
    pagination
  },
  data() {
    return {
      page: 1,
      start: 0,
      query: []
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.query = this.getQuery()
        if(this.cat) this.filterQuery()
        this.$emit('updateHead')
      }
    }
  },
  computed: {
    postsPerPage: ()=> POSTS_PER_PAGE,
    type() {
      return this.$route.params.pathMatch.replace('_category', '')
    },
    cat() {
      return this.$route.params.id || false
    },
    pageLength() {
      return Math.floor((this.query.length - 1) / POSTS_PER_PAGE) + 1
    }
  },
  created() {
    this.start = (this.page-1) * POSTS_PER_PAGE
  },
  mounted() {
    EventBus.$on('resetArchive', ()=> {
      this.resetArchive()
    })
  },
  methods: {
    getQuery() {
      const sortQuery = (arr)=> {
        return arr.sort((a, b)=> {
          const _a = a.post_date.split('-').join('')
          const _b = b.post_date.split('-').join('')
          return (+_a < +_b) ? 1 : -1
        })
      }
      if(this.type === 'event') {
        return sortQuery(this.$dbEvent)
      }else if(this.type === 'gasya') {
        return sortQuery(this.$dbGasya)
      }
      return []
    },
    filterQuery() {
      this.query = this.query.filter(e=> e.tax_category === this.cat)
    },
    pageReload() {
      this.page = +(this.$route.query.page)
      this.start = (this.page-1)*POSTS_PER_PAGE
      this.$SmoothScroll(document.body, 800)
    },
    resetArchive() {
      this.page = 1
      this.start = 0
      this.$SmoothScroll(document.body, 800)
    }
  }
}
</script>
