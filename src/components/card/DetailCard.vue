<template>
  <n-card class="group" card-detail :bordered="false" @click="goCardDetail">
    <div flex>
      <img :src="cardInfo.iconUrl" wh-20-37 rounded-l-2xl alt="icon">

      <ai-card-new v-if="cardInfo.manualPriority > -1" absolute left-0 top-0 w-8-12 h-4-6 />

      <div flex-start-between-col w-full h-20-37 px-3 py-2 rounded-r-xl>
        <div w-full>
          <div flex-center-between sm:mb-2>
            <n-ellipsis text-4-4.5 :line-clamp="1" :tooltip="false">
              {{ cardInfo.name }}
            </n-ellipsis>
            <div flex-center-end flex-shrink-0 w-15>
              <ai-card-fire wh-3-4 mr-1 />
              <div text-3-sm>
                {{ getHeat(cardInfo.heat) }}
              </div>
            </div>
          </div>

          <div mobile-only>
            <n-ellipsis title-brief :line-clamp="1" :tooltip="false">
              {{ cardInfo.brief }}
            </n-ellipsis>
          </div>

          <div web-only>
            <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
              {{ cardInfo.brief }}
            </n-ellipsis>
          </div>
        </div>

        <div flex-center-between w-full>
          <CardTag :tags="cardInfo.tagList" />
          <n-tag v-if="isUsing" px-2 text-sm rounded-lg text-white bg="#3A50FF" :bordered="false">
            使用中
          </n-tag>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import type { CardInfo } from './type'
import { getHeat, setLocalItem } from '~/utils/index'

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
