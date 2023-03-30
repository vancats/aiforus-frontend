<template>
  <div flex-center-between-row mb-8 pr-14>
    <span
      w-110 text-5xl cursor text="#A47FFA"
      style="font-family: AlibabaPuHuiTi-ExtraBold"
      @click="goHome"
    >
      AI FOR US
    </span>
    <n-input
      ref="inputRef"
      v-model:value="searchVal"
      px-2 py-2 rounded-2xl
      h="12"
      placeholder="搜索" clearable
      @keyup.enter="onSearch"
      @click="onChange"
    >
      <template #prefix>
        <span i-carbon:search text-white />
      </template>
    </n-input>
    <n-button ml-10 h-12 p-4>
      登录/注册
    </n-button>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')
const searchVal = ref('')
const searchFocus = ref(false)

const inputRef = ref(null)
onClickOutside(inputRef, () => searchFocus.value = false)
const onChange = () => searchFocus.value = true
const onSearch = () => {
  sessionStorage.setItem('feedback-search', searchVal.value)
  router.push({ name: 'Feedback' })
  searchVal.value = ''
  searchFocus.value = false
}
</script>
