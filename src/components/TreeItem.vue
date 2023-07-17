<script setup lang="ts">
import { toRef } from 'vue'
import { useWindFarmStore } from '../stores/windFarm'
import type { TreeItem } from '../../types/windFarm'

const store = useWindFarmStore()

const props = defineProps<{
  item: TreeItem;
}>()

const item = toRef(props, 'item')
function selectItem() {
  const {id, selected} = item.value
  store.selectItem(id, !selected)
}
</script>

<template>
  <div>
    <input type="checkbox" :checked="item.selected" @click="selectItem"/>
    <b>[{{ item.type }}]</b>
    {{ item.name }}
    <div class="children">
      <TreeItem
        v-for="farm in item.children"
        :key="farm.id"
        :item="farm"
      />
    </div>
  </div>

</template>

<style scoped>
.children {
  padding-left: 40px;
}
</style>
