<template>
  <n-card class="group" card-tool :bordered="false" @click="goCardDetail">
    <img :src="toolInfo.iconUrl" w-30 h-22 sm:w-50 sm:h-36 object-cover rounded-t-2xl alt="icon">

    <ai-card-new v-if="toolInfo.manualPriority > -1" absolute left-0 top-0 w-8 h-4 sm:w-12 sm:h-6 />

    <div flex-start-between-col h-25 p-2 sm:h-40 sm:p-4 sm:pt-2.5 rounded-b-xl>
      <div>
        <n-ellipsis w-full text-4 leading-4 sm:text-5.5 sm:leading-6 :line-clamp="1" :tooltip="false">
          {{ toolInfo.name }}
        </n-ellipsis>

        <div mobile-only>
          <n-ellipsis w-full title-brief line-clamp="'sm' ? '3' : '2'" :tooltip="false">
            {{ toolInfo.brief }}
          </n-ellipsis>
        </div>

        <div web-only>
          <n-ellipsis w-full title-brief :line-clamp="3" :tooltip="false">
            {{ toolInfo.brief }}
          </n-ellipsis>
        </div>
      </div>

      <div flex-center-between w-full>
        <CardTag :tags="toolInfo.tagList" />
        <div web-only>
          <div flex-center>
            <ai-card-fire wh-3 sm:wh-4 mr-1 />
            <span text-3 sm:text-sm>
              {{ toolInfo.heat >= 1000 ? `${Math.floor(toolInfo.heat / 1000)}k` : toolInfo.heat }}</span>
          </div>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import { setLocalItem } from '../../utils/index'
import type { CardInfo } from './type'

const { toolInfo } = defineProps<{ toolInfo: CardInfo }>()
const router = useRouter()
const goCardDetail = () => {
  setLocalItem('refresh', 'false')
  router.push(`/detail/tool/${toolInfo.id}`)
}
</script>
