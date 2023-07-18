<script setup lang="ts">
import { toRef } from 'vue'
import { useWindFarmStore } from '../stores/windFarm'
import type { TreeItem } from '../../types/windFarm'
import ChevronDown from './icons/ChevronDown.vue'
import ChevronRight from './icons/ChevronRight.vue'

const store = useWindFarmStore()

const props = defineProps<{
  item: TreeItem;
}>()

const item = toRef(props, 'item')
function selectItem() {
  const {id, selected} = item.value
  store.selectItem(id as string, !selected)
}
</script>

<template>
  <div class="item__head">
    <ChevronDown v-if="item.expended"/>
    <ChevronRight v-else/>
    <input type="checkbox" :checked="item.selected" @click="selectItem"/>
    <b>[{{ item.type }}]</b>
    {{ item.name }}
  </div>
  <div class="children">
    <TreeItem
      v-for="farm in item.children"
      :key="farm.id"
      :item="farm"
    />
  </div>

</template>

<style scoped>
.item__head {
  display: flex;
}

.children {
  padding-left: 40px;
}
</style>
