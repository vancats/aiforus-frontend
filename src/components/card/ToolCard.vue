<template>
  <n-card class="group" card-tool :bordered="false" @click="goCardDetail">
    <img :src="toolInfo.iconUrl" w-50 h-36 object-cover rounded-t-2xl alt="icon">

    <div flex-start-between-col h-40 p-4 pt-2.5 rounded-b-xl>
      <div>
        <div>
          <n-ellipsis text-5.5 :line-clamp="1" :tooltip="false">
            {{ toolInfo.name }}
          </n-ellipsis>
        </div>

        <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
          {{ toolInfo.brief }}
        </n-ellipsis>
      </div>

      <div flex-center-between w-full>
        <CardTag :tags="toolInfo.tagList" />
        <div flex-center>
          <ai-card-fire wh-4 />
          <span pl-1>{{ toolInfo.heat }}</span>
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
