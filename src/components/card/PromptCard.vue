<template>
  <n-card
    class="group" card-prompt :bordered="false"
    @click="goCardDetail"
  >
    <div flex h-full>
      <img :src="promptInfo.iconUrl" wh-37 rounded-l-2xl alt="icon">

      <div flex-start-between-col w-full px-4 py-2>
        <div w-full rounded-r-xl>
          <div flex-center-between mb-2>
            <n-ellipsis text-lg :line-clamp="1" :tooltip="false">
              {{ promptInfo.name }}
            </n-ellipsis>

            <div flex-center-end flex-shrink-0>
              <ai-card-fire wh-4 mr-1 />
              <span>
                {{ promptInfo.heat }}
              </span>
            </div>
          </div>

          <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
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
