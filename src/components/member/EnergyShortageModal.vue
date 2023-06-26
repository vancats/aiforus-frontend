<template>
  <n-modal
    v-model:show="memberStore.showEnergyShortageModal" preset="dialog" type="warning" size="huge" :bordered="false"
    h-80-90 color="#fff" rounded-2xl :style="{ background: '#2B2C3E' }"
  >
    <template #header>
      <div flex-center-center>
        能量不足
      </div>
    </template>
    <div flex-center-center-col>
      <p text-4 font-400 mb-6>
        您的AI能量已不足，您可以通过充值或完成任务获得AI能量
      </p>
      <member-pay-card bg="#3D3E59" mb-6-4 />
      <member-activity-card bg="#3D3E59" />
    </div>
  </n-modal>
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()
</script>
