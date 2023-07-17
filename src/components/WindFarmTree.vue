<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useWindFarmStore } from '../stores/windFarm'
import TreeItem from './TreeItem.vue'

const emit = defineEmits<{
  (e: 'refresh'): void
}>()
const store = useWindFarmStore()

const { farmTree } = storeToRefs(store)
</script>

<template>
  <header>
    <h1>Tree View</h1>
    <button @click="emit('refresh')">refresh data</button>
  </header>
  <main>
    <TreeItem
      v-for="farm in farmTree"
      :key="farm.id"
      :item="farm"
    />
  </main>
</template>

<style scoped>

</style>
