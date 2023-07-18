import { defineStore } from 'pinia'
import axios, { AxiosInstance } from 'axios'

import type { TreeItem, WindFarmStoreState } from '../../types/windFarm'

const publicApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/"
})

export const useWindFarmStore = defineStore('windFarm', {
  state: (): WindFarmStoreState => {
    return {
      farmTree: [],
      items: {},
      selectionType: null,
    }
  },
  actions: {
    expendItem(itemId: string, nextState: boolean) {
      this.items[itemId].expended = nextState
    },
    loadFarmTree() {
      this.$reset()
      return publicApi.get('tree').then(response => {
        this.farmTree = response.data
        this.items = {}
        const iMax = this.farmTree.length
        for (let i = 0; i < iMax; i++) {
          this.mapTreeItem(this.farmTree[i])
        }
      })
    },
    mapTreeItem(item: TreeItem) {
      if (!item.id) {
        item.id = Date.now().toString()
      }
      item.selected = false
      item.expended = false
      this.items[item.id] = item

      const iMax = item.children.length
      for (let i = 0; i < iMax; i++) {
        this.mapTreeItem(item.children[i])
      }
    },
    selectItem(itemId: string, newState: boolean) {
      const item = this.items[itemId]
      if (!this.selectionType) {
        this.selectionType = item.type
      }
      item.selected = newState
    },
    selectDeepItem(itemId: string, newState: boolean) {
      const item = this.items[itemId]
      item.selected = newState

      const iMax = item.children.length
      for (let i = 0; i < iMax; i++) {
        this.selectDeepItem(item.children[i].id as string, newState)
      }
    },
    clearSelection() {
      this.selectionType = null
      const iMax = this.farmTree.length
      for (let i = 0; i < iMax; i++) {
        this.selectDeepItem(this.farmTree[i].id as string, false)
      }
    }
  },
})
