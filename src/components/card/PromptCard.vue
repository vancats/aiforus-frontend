<template>
  <n-card
    class="prompt-card" card-prompt :bordered="false"
    @click="router.push(`/detail/prompt/${promptInfo.id}`)"
  >
    <div flex>
      <img :src="promptInfo.iconUrl" wh-44 rounded-l-2xl alt="123">

      <div p-4 w-full rounded-r-xl>
        <div flex-center-between mb-2>
          <div text-5.5>
            {{ promptInfo.name }}
          </div>
          <div flex-center>
            <ai-card-fire />
            <span pl-1>{{ promptInfo.pageView }}</span>
          </div>
        </div>

        <n-ellipsis title-brief mb-2 :line-clamp="3" :tooltip="false">
          {{ promptInfo.brief }}
        </n-ellipsis>

        <CardTag :tags="promptInfo.tagList" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import type { CardInfo } from './type'
defineProps<{ promptInfo: CardInfo }>()
const router = useRouter()
</script>

<style>
.prompt-card:hover .tag-card{
    background: #3D3F58;
}
</style>
