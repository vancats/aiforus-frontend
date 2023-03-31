<template>
  <div overflow-y-scroll pr-14>
    <div text-xl pb-4>
      AI小工具
    </div>
    <div grid grid-cols="1 lg:2 xl:3" gap-8>
      <template v-for="prompt in 50" :key="prompt">
        <PromptCard :prompt-info="promptInfo" />
      </template>
    </div>
  </div>
</template>

<script setup lang='ts'>
defineOptions({ name: 'PromptPage' })

const promptInfo = {
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
