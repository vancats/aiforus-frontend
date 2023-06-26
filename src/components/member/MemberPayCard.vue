<template>
  <div px-4-6 py-4-6 rounded-2xl bg="#2B2C3E" w-full sm:w-98 flex-center>
    <ai-activity-share wh-6-12 mr-2-3 />
    <span text-4-5 font-400 mr-1>充值立得 +</span>
    <ai-member-energy wh-3.5-6 mr-1 />
    <span text-3.5-7 font-800>750</span>
    <n-button type="primary" w-22 ml-auto h-6-8.5 :style="{ background: '#3A50FF', color: '#FFFFFF' }" @click="toPay">
      去充值
    </n-button>
  </div>
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()

const toPay = () => {
  memberStore.showMemberChargeModal = true
}
</script>
