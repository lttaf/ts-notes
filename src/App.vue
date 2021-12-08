<template>
  <div>
    <TheNavBar/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TheNavBar from '@/components/TheNavBar.vue'

export default defineComponent({
  name: 'App',
  components: {
    TheNavBar
  },
  setup() {
    
  },
})
</script>


<style src='../node_modules/bootswatch/dist/vapor/bootstrap.css'>
</style>
