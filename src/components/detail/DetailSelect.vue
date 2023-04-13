<template>
  <div flex-center>
    <span mr-4 text="#9999a5">{{ variableInfo.description }}</span>
    <n-select
      ref="selectEl"
      v-model:value="select"
      w-50 class="prompt-select"
      filterable tag
      :show="isShow"
      :options="options"
      @create="createOption"
    >
      <template #arrow>
        <ai-prompt-arrow @click="isShow = !isShow" />
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
</script>

<style>
.prompt-select .n-base-selection .n-base-selection-label .n-base-selection-input {
    cursor:text;
}
</style>
