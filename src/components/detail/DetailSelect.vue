<template>
  <div flex-center>
    <span mr-2 text="#9999a5">{{ variableInfo.description }}</span>
    <n-select
      ref="selectEl"
      v-model:value="select"
      w-40 class="prompt-select"
      filterable tag
      :show="isShow"
      size="small"
      :options="options"
      @create="createOption"
    >
      <template #arrow>
        <ai-prompt-arrow @click="showSelect" />
      </template>
    </n-select>
  </div>
</template>

<script setup lang='ts'>
import type { Variable } from '~/pages/detail/type'

const { variableInfo } = defineProps<{ variableInfo: Variable }>()
const { select } = defineModel<{ select: string }>()

const optionsArr = ref<Set<string>>(new Set(variableInfo.value.split(',')))
const options = computed(() => {
  return [...optionsArr.value].map(item => ({
    label: item,
    value: item,
  }))
})

const isShow = ref(false)
const selectEl = ref<HTMLElement | null>(null)
onClickOutside(selectEl, () => {
  isShow.value = false
})

const createOption = (label: string) => {
  select.value = label
  return ({ label, value: label })
}

const showSelect = (e: Event) => {
  e.stopPropagation()
  isShow.value = !isShow.value
}
</script>

<style>
.prompt-select .n-base-selection .n-base-selection-label .n-base-selection-input {
    cursor:text;
}
</style>
