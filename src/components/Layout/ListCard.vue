<template>
  <div text-left mb-2>
    <n-card size="small" rounded-xl title="最近使用" hoverable>
      <template #header-extra>
        <div i-basil:award-solid w-8 h-8 text-blue text-4xl inline-block />
      </template>
      <div flex flex-wrap>
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
        <ListItem />
      </div>
    </n-card>
  </div>
</template>

<script setup lang='ts'>

</script>
