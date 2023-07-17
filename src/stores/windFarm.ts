import { defineStore } from 'pinia'
import axios, { AxiosInstance } from 'axios'

const publicApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/"
})

export const useWindFarmStore = defineStore('windFarm', {
  state: () => {
    return {
      farmTree: []
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    loadFarmTree() {
      return publicApi.get('tree').then(response => {
        this.farmTree = response.data
      })
    },
  },
})
