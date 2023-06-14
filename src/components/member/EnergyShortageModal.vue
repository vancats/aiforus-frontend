<template>
  <n-modal
    v-model:show="memberStore.showEnergyShortageModal" preset="dialog" type="warning" size="huge" :bordered="false"
    h-110-115 color="#fff" rounded-2xl :style="{ background: '#3D3E59' }"
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
      <img :src="useStore.wechatQRCode" wh-45 mb-3 rounded-2>
      <p text-3.5 font-400 mb-7>
        （加入用户群可以获得AI能量哦）
      </p>
      <div w-full flex-center-between>
        <n-button type="primary" flex-1 mr-4 h-11.5 text-4 font-600 @click="toTask">
          去完成任务
        </n-button>
        <n-button type="primary" flex-1 h-11.5 text-4 font-600 @click="toCharge">
          去充值
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
import { useNormalStore } from '~/store/index'
const router = useRouter()

const useStore = useNormalStore()
const memberStore = useMemberStore()

const toTask = () => {
  router.push('/user')
  memberStore.showEnergyShortageModal = false
}

const toCharge = () => {
  memberStore.showMemberChargeModal = true
  memberStore.showEnergyShortageModal = false
}
</script>
