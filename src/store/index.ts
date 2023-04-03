import { defineStore } from 'pinia'
import { getLocalItem } from '~/utils'

export const useSearchStore = defineStore('search', () => {
  const searchVal = ref('')
  const username = ref(getLocalItem('username') || '')
  return { searchVal, username }
})
