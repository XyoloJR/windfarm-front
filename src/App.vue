<script setup lang="ts">
import { ref } from 'vue'

import { useWindFarmStore } from './stores/windFarm.ts'
import WindFarmTree from './components/WindFarmTree.vue'

const loaded = ref(false)

const { loadFarmTree } = useWindFarmStore()

function getWindFarmTree(refresh: boolean) {
  if (!loaded.value || refresh) {
    loadFarmTree().then(() => {
      loaded.value = true
    })
  }
}

</script>

<template>
  <WindFarmTree v-if="loaded" @refresh="getWindFarmTree(true)"/>
  <button v-else @click="getWindFarmTree(false)">load wind farm data</button>
</template>

<style scoped>
</style>
