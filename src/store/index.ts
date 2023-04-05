import { defineStore } from 'pinia'
import { getLocalItem } from '~/utils'

export const useSearchStore = defineStore('search', () => {
  const searchVal = ref('')
  const username = ref(getLocalItem('username') || '')
  return { searchVal, username }
})

export const useWebSocketStore = defineStore('webSocket', () => {
  const ws = ref<WebSocket | null>(null)
  return { ws }
})

export const usePromptDataStore = defineStore('promptData', () => {
  const map: Map<number, any> = new Map()
  return { map }
})
