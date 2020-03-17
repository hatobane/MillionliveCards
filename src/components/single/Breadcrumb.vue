<template>
  <ul class="single__breadcrumb">
    <li><button type="button" @click="$router.push('/')"><i class="icon-home"></i>Home</button></li>
    <li>{{card.type1}}</li>
    <li>{{card.title}}</li>
  </ul>
</template>

<script>

export default {
  name: 'SingleBreadcrumb',
  props:['card']
}
</script>