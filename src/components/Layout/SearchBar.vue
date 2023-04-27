<template>
  <div v-if="route.meta.showSearch" layout-right flex-center-between my-3>
    <n-input
      ref="inputRef"
      v-model:value="searchVal"
      px-2 py-1 rounded-xl h="10"
      placeholder="搜索" clearable
      @keyup.enter="onSearch"
      @blur="onSearch"
    >
      <template #prefix>
        <span i-carbon:search text-white />
      </template>
    </n-input>
  </div>
</template>

<script setup lang="ts">
import { useNormalStore } from '~/store'
defineOptions({ name: 'NavBar' })

const router = useRouter()
const route = useRoute()
const useStore = useNormalStore()

const searchVal = ref('')
const onSearch = () => {
  useStore.searchVal = searchVal.value
  router.push('/search')
}
</script>
