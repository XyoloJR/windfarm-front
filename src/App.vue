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
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <WindFarmTree v-if="loaded" @refresh="getWindFarmTree(true)"/>
  <button v-else @click="getWindFarmTree(false)">load wind farm data</button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
