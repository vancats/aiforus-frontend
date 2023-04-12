<template>
  <div flex-center>
    <span mr-4 text="#9999a5">{{ variableInfo.description }}</span>
    <n-select
      v-model:value="select"
      w-50
      class="prompt-select"
      filterable tag
      :options="getOptions(variableInfo.value)"
    />
  </div>
</template>

<script setup lang='ts'>
import type { Variable } from '~/pages/detail/type'

const { variableInfo } = defineProps<{ variableInfo: Variable }>()
const { select } = defineModel<{ select: string }>()

const getOptions = (str: string) => {
  const arr = str.split(',')
  return arr.map(item => ({
    label: item,
    value: item,
  }))
}
</script>

<style>
.prompt-select .n-base-selection .n-base-selection-label .n-base-selection-input {
    cursor:text;
}
</style>
