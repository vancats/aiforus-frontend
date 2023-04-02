import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', () => {
  const searchVal = ref('')
  return { searchVal }
})
