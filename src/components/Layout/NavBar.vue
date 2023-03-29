<template>
  <div fixed left-42 right-14 top-0 h-32 flex-center-between>
    <div
      flex-center text-7xl font-black cursor
      style="font-family: Inter; color: #A47FFA; font-style: normal;"
      @click="goHome"
    >
      AI FOR US
    </div>
    <div ref="searchEl" @click="onChange">
      <template v-if="searchFocus">
        <n-input
          ref="inputRef"
          v-model:value="searchVal"
          class="px-2 py-1 w-35vw! rounded-lg"
          placeholder="搜索你想找的相关应用" size="small" clearable
          @keyup.enter="onSearch"
        >
          <template #prefix>
            <span i-carbon:search text-white />
          </template>
        </n-input>
      </template>
      <template v-else>
        <span i-carbon:search />
      </template>
    </div>
    <div>
      登录/注册
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')
const searchVal = ref('')
const searchFocus = ref(false)

const searchEl = ref(null)
onClickOutside(searchEl, () => searchFocus.value = false)
const onChange = () => searchFocus.value = true
const onSearch = () => {
  sessionStorage.setItem('feedback-search', searchVal.value)
  router.push({ name: 'Feedback' })
  searchVal.value = ''
  searchFocus.value = false
}
</script>
