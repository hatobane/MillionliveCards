<template>
  <li v-if="item" class="archive__cardItem" @click="jumpTax()">
    <h2 class="archive__ttl--sp m-sp">{{item.title}}</h2>
    <div class="archive__cardItem__thumb"><img :src="cardImg.src" :alt="cardImg.alt"></div>
    <div class="archive__cardItem__content">
      <h2 class="archive__ttl--pc m-pc">{{item.title}}</h2>
      <div class="archive__cardItem__tax">
        <div>Category: <button type="button" @click.stop="jumpCat()">{{item.tax_category}}</button></div>
        <div><span>{{item.start_date}}</span>～<span v-if="item.end_date">{{item.end_date}}</span></div>
      </div>
    </div>
  </li>
</template>

<script>

  export default {
    name: 'ArchiveCassette',
    props: ['item'],
    computed: {
      type() {
        return this.item.post_name.match(/^\D+/)[0]
      },
      cardImg() {
        const card = this.$dbCard.filter((e)=> {
          const reg = new RegExp(this.item.post_name)
          return reg.test(e.from)
        }).sort((a, b) => (+a.id < +b.id) ? 1 : -1)[0]
        const folder = 'frame' + ('00'+Math.ceil(card.id/100)).slice(-2)
        const src = '/card/' + folder + '/thumb_frame' + card.id + '.jpg'
        const alt = card.title
        return {
          src: src,
          alt: alt
        }
      }
    },
    methods: {
      jumpTax() {
        this.$router.push('/' + this.type + '/' + this.item.post_name)
      },
      jumpCat() {
        this.$router.push('/' + this.type + '_category/' + this.item.tax_category)
      }
    }
  }

</script>