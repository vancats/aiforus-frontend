<template>
  <div>
    <n-data-table
      ref="table"
      :columns="columns"
      :bordered="false"
      :data="data"
      :loading="loading"
      :pagination="pagination"
    />
  </div>
</template>

<script setup lang='ts'>
const columns = [
  {
    title: '能量',
    key: 'a',
  },
  {
    title: '途径',
    key: 'b',
  },
  {
    title: '时间',
    key: 'c',
  },
]

const loading = ref(false)

const data = Array.from({ length: 20 }).map((_, index) => {
  return {
    a: `-30.00${index}`,
    b: '使用chat GPT聊天',
    c: '2023572014',
  }
})

const pagination = reactive({
  pageSize: 10,
})
</script>
