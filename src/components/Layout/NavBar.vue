<template>
  <div fixed left-0 top-0 p-5 pr-10 w-full text-white text-xl flex items-center justify-between>
    <div flex items-center cursor-pointer @click="goHome">
      <div i-mingcute:planet-line mx-2 py-1 />
      <div>AI FOR US</div>
    </div>
    <div @click="onChange">
      <template v-if="!isSearch">
        <span i-carbon:search style="color: #ffffff" cursor-pointer />
      </template>
      <template v-else>
        <n-input
          v-model="modelValue"
          class="px-2 py-1 w-[600px]! box-border rounded-lg bg-transparent"
          placeholder="搜索你想找的相关应用" size="small"
        >
          <template #prefix>
            <span i-carbon:search style="color: #ffffff" />
          </template>
        </n-input>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'NavBarPage',
})

const router = useRouter()
const goHome = () => router.push('/1')

const { modelValue } = defineModel<{
  modelValue: string
}>()

const isSearch = ref(false)

const onChange = () => {
  isSearch.value = !isSearch.value
}
</script>
