<template>
  <n-card
    class="detail-card" card-detail :bordered="false"
    @click="goCardDetail"
  >
    <div flex>
      <img :src="cardInfo.iconUrl" w-30 h-30 rounded-l-2xl alt="123">

      <div flex-start-between-col w-70 h-40 p-4 rounded-r-xl>
        <div w-full>
          <div flex-center-between>
            <div text-5.5>
              {{ cardInfo.name }}
            </div>
            <div flex-center>
              <ai-card-fire />
              <span pl-1>{{ cardInfo.pageView }}</span>
            </div>
          </div>

          <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
            {{ cardInfo.brief }}
          </n-ellipsis>
        </div>

        <CardTag :tags="cardInfo.tagList" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import { setLocalItem } from '../../utils/index'
import type { CardInfo } from './type'
const { cardInfo } = defineProps<{ cardInfo: CardInfo }>()
const router = useRouter()
const goCardDetail = () => {
  setLocalItem('refresh', 'true')
  router.push(`/detail/${cardInfo.type === 0 ? 'prompt' : 'tool'}/${cardInfo.id}`)
}
</script>

<style>
.detail-card:hover .tag-card{
    background: #3D3F58;
}
</style>
