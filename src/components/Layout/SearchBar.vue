<template>
  <div text-5xl leading-14 text-white>
    <span>百度一下 </span>
    <span>使用每一种AI</span>
  </div>
  <n-input
    v-model="modelValue"
    class="px-2 py-2 mt-4 mb-6 box-border rounded-lg bg-transparent"
    placeholder="搜索你想找的相关应用" size="small"
  >
    <template #prefix>
      <span i-carbon:search style="color: #ffffff" />
    </template>
  </n-input>
</template>

<script setup lang="ts">
defineOptions({
  name: 'SearchBarPage',
})

const { modelValue } = defineModel<{
  modelValue: string
}>()
</script>

<style>
.n-input:not(.n-input--disabled).n-input--focus {
    background-color: transparent;
}
</style>
