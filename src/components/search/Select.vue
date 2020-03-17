<template>
  <div>
    <h3 class="searchForm__ttl">{{title}}</h3>
    <select :name="id" v-model="$parent.setting[id]">
      <template v-if="id==='cost'">
        <option
          v-for="option of Object.keys(options).sort((a, b)=> (+a < +b ? 1 : -1))"
          :key="option"
          :value="option"
        >{{options[option]}}</option>
      </template>
      <template v-else>
        <option
          v-for="option of Object.keys(options)"
          :key="option"
          :value="option"
        >{{options[option]}}</option>
      </template>
    </select>
  </div>
</template>

<script>
export default {
  name: 'SearchFormSelect',
  props:[
    'id',
    'title',
    'options'
  ]
}
</script>