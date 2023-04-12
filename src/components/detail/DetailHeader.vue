<template>
  <div flex-center>
    <img :src="detailInfo.iconUrl" wh-35 mr-6 rounded-2xl alt="icon">
    <div h-35 flex-start-between-col>
      <div>
        <n-space flex-center>
          <div text-5.5>
            {{ detailInfo.name }}
          </div>
          <CardTag v-if="detailInfo" :tags="detailInfo.tagList" />
          <div flex-center>
            <ai-card-fire wh-4 mr-1 />
            <div>{{ detailInfo.heat }}</div>
          </div>
        </n-space>

        <n-ellipsis title-brief block my-2 :line-clamp="3" :tooltip="false">
          {{ detailInfo.brief }}
        </n-ellipsis>
      </div>

      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { PromptInfo, ToolInfo } from '~/pages/detail/type'

const { detailInfo } = defineProps<{ detailInfo: ToolInfo | PromptInfo }>()
</script>
