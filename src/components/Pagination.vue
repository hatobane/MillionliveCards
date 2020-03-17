<template>
  <div class="pagination">
    <div class="archive__label">Page: {{page}}/{{pageLength}}</div>
    <ul v-if="contentBtns" class="pagination__btns">
      <li :class="{disable: page===1}" @click="jump($event, 1)"><i class="icon-double-left"></i></li>
      <li :class="{disable: page===1}" @click="jump($event, page-1)"><i class="icon-angle-left"></i></li>
      <li :class="{disable: page===pageLength}" @click="jump($event, page+1)"><i class="icon-right"></i></li>
      <li :class="{disable: page===pageLength}" @click="jump($event, pageLength)"><i class="icon-double-right"></i></li>
    </ul>

    <div v-if="contentSelect" class="pagination__select">
      <select name="paginationSelect" v-model="selectPage" @change="jump($event, selectPage)">
        <option
          v-for="i of selectPages"
          :key="i"
          :value="i+1"
          v-text="('page: ' + (i+1) + ((page===(i+1)) ? ' (this page)' : ''))"
        />
      </select>
    </div>
  </div>
</template>

<script>
const SELECT_RANGE = 20 //セレクトボックス 前後ページ数

export default {
  name: 'Pagination',
  props: [
    'contentBtns',
    'contentSelect',
    'page',
    'pageLength',
  ],
  data() {
    return {
      currentPage: 1,
      selectPage: this.page
    }
  },
  computed: {
    selectPages() {
      return [...Array(this.pageLength).keys()].filter((i) => {
        return Math.abs(i - this.page) <= SELECT_RANGE
      })
    }
  },
  watch: {
    page() {
      this.selectPage = this.page
    }
  },
  methods: {
    jump($event, pageNum) {
      if(!$event.target.classList.contains('disable')) {
        const target = this.getJumpPath(pageNum)
        this.$router.push(target).catch(()=> {})
        this.$emit('pageReload')
      }
    },
    getJumpPath(pageNum) {
      const path = this.$route.fullPath
      if(/page=\d+/.test(path)) {
        return path.replace(/page=\d+/, 'page=' + pageNum)
      }else if(/\?/.test(path)){
        return path + '&page=' + pageNum
      }else {
        return path + '?page=' + pageNum
      }
    }
  }
}
</script>