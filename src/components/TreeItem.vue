<script setup lang="ts">
import { computed, toRef } from 'vue'
import { useWindFarmStore } from '../stores/windFarm'
import type { TreeItem } from '../../types/windFarm'
import ChevronDown from './icons/ChevronDown.vue'
import ChevronRight from './icons/ChevronRight.vue'
import { storeToRefs } from 'pinia'

const store = useWindFarmStore()

const props = defineProps<{
  item: TreeItem;
}>()

const { selectionType } = storeToRefs(store)

const item = toRef(props, 'item')

const notSelectable = computed<boolean>(() => selectionType.value && item.value.type !== selectionType.value)

const hasChildren = computed<boolean>(() => Boolean(item.value.children.length))

function selectToggle() {
  const {id, selected} = item.value
  store.selectItem(id as string, !selected)
}

function toggleExpansion(nextState: boolean) {
  store.expendItem(item.value.id as string, nextState)
}

function selectOnly() {
  store.clearSelection()
  store.selectItem(item.value.id as string, true)
}

</script>

<template>
  <div class="item__head">
    <template v-if="hasChildren">
      <ChevronDown v-if="item.expended" @click="toggleExpansion(false)"/>
      <ChevronRight v-else @click="toggleExpansion(true)"/>
    </template>
    <input
      type="checkbox"
      :checked="item.selected"
      :disabled="notSelectable"
      @click="selectToggle"/>
    <p
      :class="{'with__children': hasChildren}"
      @click="toggleExpansion(!item.expended)"
      @dblclick.capture="selectOnly"
    >
      <b>[{{ item.type }}]</b>
      {{ item.name }}
    </p>
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

p {
  margin: 0;
}

p.with__children:hover {
  cursor: pointer;
}

.children {
  padding-left: 40px;
}
</style>
