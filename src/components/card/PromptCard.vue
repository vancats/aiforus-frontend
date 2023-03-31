<template>
  <n-card h-44 rounded-2xl mr-4 cursor bg="#2B2C3E" :bordered="false" hoverable>
    <div flex>
      <img :src="avator" wh-44 rounded-l-2xl alt="123">
      <div h-40 p-4 rounded-r-xl>
        <div flex-center-between mb-2>
          <div text="5.5">
            {{ promptInfo.name }}
          </div>
          <div flex-center>
            <ai-card-fire />
            <span pl-1>{{ promptInfo.pageView }}</span>
          </div>
        </div>
        <n-ellipsis :line-clamp="3" text="sm #9C9CA9" :tooltip="false">
          {{ promptInfo.brief }}
        </n-ellipsis>
        <n-space mt-2>
          <n-tag v-for="tag in promptInfo.tags" :key="tag" :bordered="false" text="sm #FFFFFF" bg="#1F1E2C" rounded-lg>
            {{ tag }}
          </n-tag>
        </n-space>
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import avator from '../../assets/images/avatar.png'
import type { CardInfo } from './type'
const { promptInfo } = defineProps<{
  promptInfo: CardInfo
}>()
</script>
