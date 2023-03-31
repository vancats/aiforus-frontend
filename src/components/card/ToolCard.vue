<template>
  <n-card w-50 h-76 rounded-2xl mr-4 flex-shrink-0 cursor :bordered="false" hoverable>
    <img :src="avator" h-36 rounded-t-2xl alt="123">
    <div h-40 p-4 pt-2.5 rounded-b-xl bg="#2B2C3E">
      <div text="5.5">
        {{ toolInfo.name }}
      </div>
      <n-ellipsis :line-clamp="3" text="sm #9C9CA9" :tooltip="false">
        {{ toolInfo.brief }}
      </n-ellipsis>
      <div flex-center-between mt-2>
        <n-tag :bordered="false" text="sm #FFFFFF" bg="#1F1E2C" rounded-lg>
          {{ toolInfo.tags.join(',') }}
        </n-tag>
        <div flex-center>
          <ai-card-fire />
          <span pl-1>{{ toolInfo.pageView }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import avator from '../../assets/images/avatar.png'
import type { CardInfo } from './type'
const { toolInfo } = defineProps<{
  toolInfo: CardInfo
}>()
</script>
