<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useWindFarmStore } from '../stores/windFarm'
import type { TreeItem } from '../../types/windFarm'
import ChevronDown from './icons/ChevronDown.vue'
import ChevronRight from './icons/ChevronRight.vue'

const store = useWindFarmStore()

const props = defineProps<{
  item: TreeItem;
}>()

const item = toRef(props, 'item')

const hasChildren = computed(() => item.value.children.length)

function selectItem() {
  const {id, selected} = item.value
  store.selectItem(id as string, !selected)
}

function toggleExpansion(nextState: boolean) {
  store.expendItem(item.value.id as string, nextState)
}

</script>

<template>
  <div class="item__head">
    <template v-if="hasChildren">
      <ChevronDown v-if="item.expended" @click="toggleExpansion(false)"/>
      <ChevronRight v-else @click="toggleExpansion(true)"/>
    </template>
    <input type="checkbox" :checked="item.selected" @click="selectItem"/>
    <b>[{{ item.type }}]</b>
    {{ item.name }}
  </div>
  <div
    v-if="item.expended"
    class="children"
  >
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
