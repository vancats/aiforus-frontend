<template>
  <n-card class="group" card-detail :bordered="false" @click="goCardDetail">
    <div flex>
      <img :src="cardInfo.iconUrl" wh-37 rounded-l-2xl alt="icon">
      <ai-card-new v-if="cardInfo.manualPriority > -1" absolute left-0 top-0 />

      <div flex-start-between-col w-full h-37 px-3 py-2 rounded-r-xl>
        <div w-full>
          <div flex-center-between mb-2>
            <n-ellipsis text-4.5 :line-clamp="1" :tooltip="false">
              {{ cardInfo.name }}
            </n-ellipsis>
            <div flex-center-end flex-shrink-0 w-15>
              <ai-card-fire wh-4 mr-1 />
              <div>
                {{ cardInfo.heat >= 1000 ? `${Math.floor(cardInfo.heat / 1000)}k` : cardInfo.heat }}
              </div>
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
  setLocalItem('refresh', 'false')
  router.push(`/detail/${cardInfo.type === 0 ? 'prompt' : 'tool'}/${cardInfo.id}`)
}
</script>
