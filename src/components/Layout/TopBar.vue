<template>
  <div text-3xl pt-10 mb-4 text-white dark:text-white>
    百度一下
  </div>

  <n-input
    v-model="modelValue"
    class="px-2 py-2 w-140! mb-4 text-left rounded-3xl"
    placeholder="输入" size="small"
  >
    <template #prefix>
      <span i-carbon:search style="color: #c1c1c1" />
    </template>
  </n-input>
</template>

<script setup lang="ts">
defineOptions({
  name: 'TopBarPage',
})

const { modelValue } = defineModel<{
  modelValue: string
}>()
</script>
