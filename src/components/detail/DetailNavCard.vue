<template>
  <div flex-center flex-shrink-0 w-30 text-3 mr-2 p-1 rounded bg="#2b2c3d" :style="isUsing && 'background: #363755'" @click="goCardDetail">
    <img :src="cardInfo.iconUrl" wh-6 rounded alt="icon">

    <n-ellipsis w-full ml-1 line-clamp="1" :tooltip="false">
      {{ cardInfo.name }}
    </n-ellipsis>
  </div>
</template>

<script setup lang='ts'>
import type { CardInfo } from '../card/type'
import { setLocalItem } from '~/utils'

const { cardInfo } = defineProps<{ cardInfo: CardInfo }>()
const router = useRouter()
const route = useRoute()
const goCardDetail = () => {
  setLocalItem('refresh', 'false')
  router.push(`/detail/${cardInfo.type === 0 ? 'prompt' : 'tool'}/${cardInfo.id}`)
}

const isUsing = computed(() => {
  return route.matched[0]?.name === 'Detail' && route.params.id === String(cardInfo.id)
})
</script>
