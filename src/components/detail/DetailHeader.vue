<template>
  <div flex-center>
    <img :src="detailInfo.iconUrl" wh-18-35 mr-3-6 rounded-2xl alt="icon">

    <div h-18-35 flex-start-between-col>
      <div>
        <n-space flex-center :size="4">
          <n-ellipsis max-w-30-full text-4-5.5 :line-clamp="1" :tooltip="false">
            {{ detailInfo.name }}
          </n-ellipsis>
          <CardTag v-if="detailInfo" :tags="detailInfo.tagList" />
          <div flex-center>
            <ai-card-fire wh-3-4 mr-1 />
            <div text-3-sm>
              {{ getHeat(detailInfo.heat) }}
            </div>
          </div>
        </n-space>

        <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
          {{ detailInfo.brief }}
        </n-ellipsis>
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
