<template>
  <div overflow-y-scroll w-full p-12 pt-8 rounded-2xl bg="#2B2C3E">
    <div flex-center>
      <img :src="avator" wh-40 mr-6 rounded-2xl alt="">
      <n-space>
        <n-space flex-center>
          <div text-5.5>
            论文大纲
          </div>
          <n-tag px-2 h-6 rounded text="#FFFFFF" bg="#1F1E2C" :bordered="false">
            学习
          </n-tag>
          <div flex-center>
            <ai-card-fire mr-1 />
            <div>1123</div>
          </div>
        </n-space>
        <n-ellipsis title-brief mb-2 :line-clamp="3" :tooltip="false">
          我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息。
        </n-ellipsis>
        <n-space justify="space-between">
          <n-button>
            去官网使用
          </n-button>
          <n-button>
            去扫码使用
          </n-button>
        </n-space>
      </n-space>
    </div>
    <div text-5.5 mt-4 pt-6 pb-3 border="t-1 #1F1E2C">
      使用教程
    </div>
    <div title-brief mb-4>
      我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述。富又引人入胜的有说服力的工作我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述。
    </div>
    <img :src="usage" w-full alt="">
  </div>
</template>

<script setup lang='ts'>
import avator from '../../assets/images/avatar.png'
import usage from '../../assets/images/usage.jpg'
</script>
