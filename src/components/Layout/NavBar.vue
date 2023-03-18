<template>
  <div fixed left-0 top-0 p-5 pr-10 w-full h-16 text="gray-300" text-xl flex-center-between z-1>
    <div flex-center cursor @click="goHome">
      <div i-mingcute:planet-line mx-2 py-1 />
      <div>AI FOR US</div>
    </div>
    <div ref="searchEl" @click="onChange">
      <template v-if="searchFocus">
        <n-input
          :value="searchVal"
          class="px-2 py-1 w-[600px]! rounded-lg"
          placeholder="搜索你想找的相关应用" size="small" clearable
          :on-input="onInput"
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
const onInput = (value: string) => searchVal.value = value
const onSearch = () => {
  localStorage.setItem('feedback-search', searchVal.value)
  router.push({ name: 'Feedback' })
  searchVal.value = ''
  searchFocus.value = false
}
</script>
