<template>
  <n-card
    class="prompt-card" card-prompt :bordered="false"
    @click="goCardDetail"
  >
    <div flex h-full>
      <img :src="promptInfo.iconUrl" wh-44 rounded-l-2xl alt="icon">

      <div flex-start-between-col w-full p-4>
        <div w-full rounded-r-xl>
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
        </div>

        <CardTag :tags="promptInfo.tagList" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import { setLocalItem } from '../../utils/index'
import type { CardInfo } from './type'
const { promptInfo } = defineProps<{ promptInfo: CardInfo }>()
const router = useRouter()
const goCardDetail = () => {
  setLocalItem('refresh', 'false')
  router.push(`/detail/prompt/${promptInfo.id}`)
}
</script>

<style>
.prompt-card:hover .tag-card{
    background: #3D3F58;
}
</style>
