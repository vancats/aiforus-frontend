<template>
  <div overflow-y-scroll>
    <div text-xl pb-4>
      热门应用
    </div>
    <div grid sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 pr-14>
      <n-card v-for="(tool, index) in 100" :key="index" h-75 rounded-2xl bg-gray>
        {{ tool }}
      </n-card>
    </div>
  </div>
</template>

<script setup lang='ts'>

</script>

<style>

</style>
