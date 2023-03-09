<template>
  <n-card hoverable shadow mr-4 mb-2 w-32 h-32 p-0 bg-white rounded-xl>
    <img :src="avator" rounded p-2>
    <div flex justify-between text-blue>
      <span cursor-pointer>详情</span>
      <span>|</span>
      <span cursor-pointer>使用</span>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import avator from '~/assets/avator.jpeg'
</script>
