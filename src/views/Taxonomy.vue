<template>
  <div class="taxonomy">
    <h2 class="archive__label">{{campaign.title}}</h2>
    <div class="taxonomy__status">
      <div>Category: <router-link tag="button" type="button" :to="categoryLink">{{campaign.tax_category}}</router-link></div>
      <div><span>{{campaign.start_date}}</span>～<span v-if="campaign.end_date">{{campaign.end_date}}</span></div>
    </div>

      <taxonomy-slide
        :id="id"
        :type="type"
        :query="query"
      />

  </div>
</template>

<script>
import TaxonomySlide from '@/components/taxonomy/Slide.vue'

export default {
  name: 'Taxonomy',
  head: {
    title: function() {
      return {
        inner: this.campaign.title
      }
    }
  },
  components: {
    TaxonomySlide
  },
  watch: {
    '$route': {
      immediate: true,
      handler() {
        this.$emit('updateHead')
      }
    }
  },
  computed: {
    type() {
      return this.$route.params.pathMatch
    },
    id() {
      return this.$route.params.id
    },
    campaign() {
      if(this.type==='event') {
        return this.$dbEvent.filter(e=>e.post_name===this.id)[0]
      }else if(this.type==='gasya') {
        return this.$dbGasya.filter(e=>e.post_name===this.id)[0]
      }
      return false
    },
    query() {
      return this.$dbCard.filter((e)=> {
        const reg = new RegExp(this.id)
        return reg.test(e.from)
      }).sort((a, b)=> (a.id < b.id ? 1 : -1))
    },
    categoryLink() {
      return '/' + this.type + '_category/' + this.campaign.tax_category
    }
  }
}
</script>
