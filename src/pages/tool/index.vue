<template>
  <div overflow-y-scroll pr-14>
    <div text-xl pb-4>
      AI应用
    </div>
    <div grid grid-cols="1 sm:2 md:3 lg:4 xl:5 2xl:6">
      <template v-for="tool in 50" :key="tool">
        <ToolCard :tool-info="toolInfo" />
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'ToolPage' })

const toolInfo = {
  id: 0,
  name: '论文大纲',
  brief: '我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作',
  iconUrl: '../assets/images/avator.png',
  pageView: 1121,
  hot: false,
  tags: [1, 2],
}
</script>

<style>

</style>
