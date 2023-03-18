<template>
  <div main-title>
    百度一下 使用每一种AI
  </div>

  <n-input
    :value="searchVal"
    class="p-2 my-6 box-border rounded-lg"
    placeholder="搜索你想找的相关应用" size="small" clearable
    :on-input="onInput"
    @keydown.enter="onSearch"
  >
    <template #prefix>
      <span i-carbon:search style="color: #ffffff" />
    </template>
  </n-input>
</template>

<script setup lang="ts">
const emit = defineEmits<{ (e: 'search'): void }>()
defineOptions({ name: 'SearchBar' })
const { searchVal } = defineModel<{ searchVal: string }>()

const onInput = (value: string) => searchVal.value = value

const onSearch = () => emit('search')
</script>
