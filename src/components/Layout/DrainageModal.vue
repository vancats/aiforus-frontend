<template>
  <n-card
    v-if="useStore.showDrainageModal && useStore.wechatQRCode"
    fixed right-10 bottom-20
    style="width: 140px; background: #414053; border-radius: 8px; padding: 8px 14px 22px"
    size="small" :bordered="false" role="dialog" aria-modal="true" closable
    @close="useStore.showDrainageModal = false"
  >
    <span mt-2>
      微信扫码加入社群
      享更多有趣AI应用
    </span>
    <img :src="useStore.wechatQRCode" wh-25 m-auto mt-2>
  </n-card>
</template>

<script setup lang='ts'>
import { useNormalStore } from '~/store/index'
const useStore = useNormalStore()
</script>
