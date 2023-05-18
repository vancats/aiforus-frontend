import { defineStore } from 'pinia'
import type { PromptData } from './type'
import { getLocalItem } from '~/utils'

export const useNormalStore = defineStore('search', () => {
  const searchVal = ref('')
  const username = ref(getLocalItem('username') || '')
  const tagId = ref(0)

  const showLoginModal = ref(false)

  const showDrainageModal = ref(true)
  const wechatQRCode = ref('')
  return { searchVal, username, tagId, showLoginModal, showDrainageModal, wechatQRCode }
})

export const useWebSocketStore = defineStore('webSocket', () => {
  const ws = ref<WebSocket | null>(null)
  return { ws }
})

export const usePromptDataStore = defineStore('promptData', () => {
  const promptMap: Map<number, PromptData> = new Map()

  const setPromptDataToMap = (routeId: number, data: PromptData) => {
    promptMap.set(routeId, data)
  }
  return { promptMap, setPromptDataToMap }
})
