<template>
  <div flex-center>
    <img :src="detailInfo.iconUrl" wh-21-35 mr-3-6 rounded-2xl alt="icon">

    <div h-21-35 flex-start-between-col flex-1>
      <div w-full>
        <div flex-center mb-1>
          <n-ellipsis max-w-30-full text-4-5.5 :line-clamp="1" :tooltip="false" ml-1>
            {{ detailInfo.name }}
          </n-ellipsis>
          <CardTag v-if="detailInfo" :tags="detailInfo.tagList" ml-1 />
          <div flex-center ml-1>
            <ai-card-fire wh-3-4 mr-1 />
            <div text-3-sm>
              {{ getHeat(detailInfo.heat) }}
            </div>
          </div>
          <collect-item :key="detailInfo.id" web-only ml-auto :detail-info="detailInfo" />
        </div>
        <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
          {{ detailInfo.brief }}
        </n-ellipsis>
        <div flex-center-end>
          <collect-item :key="detailInfo.id" mobile-only ml-auto :detail-info="detailInfo" />
        </div>
      </div>

      <div web-only>
        <slot name="web-footer" />
      </div>
    </div>
  </div>
  <div mobile-only>
    <slot name="mobile-footer" />
  </div>
</template>

<script setup lang='ts'>
import type { PromptInfo, ToolInfo } from '~/pages/detail/type'
import { getHeat } from '~/utils'

const { detailInfo } = defineProps<{ detailInfo: ToolInfo | PromptInfo }>()
</script>
