<template>
  <n-card
    class="detail-card" card-detail :bordered="false"
    @click="router.push(`/detail/${cardInfo.type === 0 ? 'prompt' : 'tool'}/${cardInfo.id}`)"
  >
    <div flex>
      <img :src="cardInfo.iconUrl" w-30 h-30 rounded-l-2xl alt="123">

      <div p-4 w-70 rounded-r-xl>
        <div flex-center-between mb-2>
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

        <CardTag :tags="cardInfo.tagList" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import type { CardInfo } from './type'
const { cardInfo } = defineProps<{ cardInfo: CardInfo }>()
const router = useRouter()
</script>

<style>
.detail-card:hover .tag-card{
    background: #3D3F58;
}
</style>
