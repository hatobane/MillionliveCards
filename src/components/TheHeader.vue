<template>
  <header class=header>
    <h2 v-if="pageName" class="pageTtl">{{pageName}}</h2>
  </header>
</template>

<script>
import Capitalize from '@/components/libs/Capitalize.js'

export default {
  name: 'TheHeader',
  mixins: [Capitalize],
  data() {
    return {
      pageLabel: {
        'Home': 'Home',
        'Search': 'Search Result',
        'NotFound': false,
        'Album': 'Album',
        'Event': 'Event Archive',
        'Gasya': 'Gasya Archive',
        'event_category': 'Event Category',
        'gasya_category': 'Gasya Category',
        'Single': false,
        'Taxonomy': false,
        'None': false
      }
    }
  },
  computed: {
    pageName() {
      const name = this.$route.name
      if(name === 'Home') {
        return (this.$route.query.sort) ? this.pageLabel['Search'] : this.pageLabel['Home']
      }else if(name === 'Archive') {
        const match = this.$_capitalize(this.$route.params.pathMatch)
        return this.pageLabel[match] ? this.pageLabel[match] : this.pageLabel['None']
      }
      return this.pageLabel[name]
    }
  }
}
</script>