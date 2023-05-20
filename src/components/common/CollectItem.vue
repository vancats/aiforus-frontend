<template>
  <!-- 多加一级div 不然外层使用web-only会破坏flex结构 -->
  <div>
    <div cursor border="none" sm:border="1 solid #fff" py-1 px-1-5 flex-center rounded-1 :style="isCollected ? 'border-color:transparent; background: #3A50FF' : ''" @click="handleCollect">
      <ai-collect-star v-show="!isCollected" wh-3-4 />
      <ai-collect-star-fill v-show="isCollected" wh-3-4 />
      <span ml-1 text-3-3.5>收藏</span>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { PromptInfo, ToolInfo } from '~/pages/detail/type'
import { useNormalStore } from '~/store'
import { useCollectStore } from '~/store/collect'
import { collectOrCancelCard } from '~/api/collect'
import type { collectCardParams } from '~/api/collect'
import naiveui from '~/utils/naiveui'
const { detailInfo } = defineProps<{ detailInfo: ToolInfo | PromptInfo }>()

const normalStore = useNormalStore()
const collectStore = useCollectStore()
const isCollected = ref(false)

const handleCollect = async () => {
  if (!normalStore.username) {
    normalStore.showLoginModal = true
    return
  }
  const params: collectCardParams = {
    userId: normalStore.username,
    cardId: detailInfo.id,
    cardType: detailInfo.type || 0,
    collecting: !isCollected.value,
  }
  await collectOrCancelCard(params)
  await collectStore.refreshWholeCollectedCard(normalStore.username, detailInfo?.type)
  await updateCollectStatus()
  if (isCollected.value) {
    naiveui.message.success('收藏成功，可以在【个人中心-我的收藏】查看')
  }
  else {
    naiveui.message.info('已取消收藏')
  }
}

// 登录状态变化后，需要更新一下收藏状态
watch(() => normalStore.username, async () => {
  await collectStore.refreshWholeCollectedCard(normalStore.username, detailInfo?.type)
  updateCollectStatus()
})

async function updateCollectStatus() {
  if (!normalStore.username) {
    isCollected.value = false
    return
  }
  const wholeCollectedCard = await collectStore.getWholeCollectedCard(normalStore.username, detailInfo?.type)
  isCollected.value = wholeCollectedCard.filter(cardInfo => {
    return detailInfo?.id === cardInfo.id
  }).length > 0
}

onMounted(async () => {
  await updateCollectStatus()
})
</script>
