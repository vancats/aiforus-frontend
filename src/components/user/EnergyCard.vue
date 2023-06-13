<template>
  <div px-3-6 py-3-4 rounded-2xl bg="#2B2C3E" w-full sm:w-98>
    <div flex-center mb-3>
      <p text-4 font-400>
        当前剩余能量
      </p>
      <n-tooltip trigger="hover" placement="bottom" :width="280">
        <template #trigger>
          <span i-mingcute:question-line ml-1 color="#9C9CA9" wh-4 />
        </template>
        <div text-3>
          <p mb-1>
            ·什么是AI能量：你可以使用AI能量在平台上与AI模型对话，目前每次消耗2个AI能量
          </p>
          <p>·如何获得AI能量：完成能量任务或充值能量即可获得AI能量</p>
        </div>
      </n-tooltip>
    </div>
    <div flex-center>
      <ai-member-energy wh-4.5-6 />
      <p text-5.5-7 font-700-800 ml-1.5>
        {{ memberStore.userMemberInfo?.memberEnergy || '-' }}
      </p>
      <n-button type="primary" icon-placement="left" ml-auto w-24-28 h-7-8.5 text-3.5-4 font-700 @click="memberStore.showMemberChargeModal = true">
        + 补充能量
      </n-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()
</script>
