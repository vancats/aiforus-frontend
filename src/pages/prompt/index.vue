<template>
  <div overflow-y-scroll>
    <div text-xl pb-4>
      热门应用
    </div>
    <div grid grid-cols-2 lg:grid-cols-3 gap-8>
      <n-card v-for="(tool, index) in 20" :key="index" h-40 rounded-2xl mr-4 bg-gray>
        {{ tool }}
      </n-card>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style>

</style>
