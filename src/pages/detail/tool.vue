<template>
  <template v-if="toolInfo">
    <div overflow-y-scroll w-full p-12 pt-8 rounded-2xl bg="#2B2C3E">
      <div flex-center>
        <img :src="toolInfo.iconUrl" wh-40 mr-6 rounded-2xl alt="icon">
        <div h-40 flex-start-between-col>
          <n-space flex-center>
            <div text-5.5>
              {{ toolInfo.name }}
            </div>
            <CardTag v-if="toolInfo" :tags="toolInfo.tagList" />
            <div flex-center>
              <ai-card-fire mr-1 />
              <div>{{ toolInfo.pageView }}</div>
            </div>
          </n-space>
          <n-ellipsis title-brief block mb-2 :line-clamp="3" :tooltip="false">
            {{ toolInfo.brief }}
          </n-ellipsis>
          <n-space justify="space-between">
            <n-button type="primary" @click="open">
              去官网使用
            </n-button>
            <n-popover trigger="hover" placement="bottom">
              <template #trigger>
                <n-button type="primary" ml-2 rounded bg="#3A50FF">
                  微信扫码使用
                </n-button>
              </template>
              <img :src="toolInfo.qrcodeUrl" wh-10vw alt="">
            </n-popover>
          </n-space>
        </div>
      </div>
      <div text-5.5 mt-4 pt-6 pb-3 border="t-1 #1F1E2C">
        使用教程
      </div>
      <div title-brief mb-4>
        {{ toolInfo.usageContext }}
      </div>
      <img v-if="toolInfo.usageImageUrl" :src="toolInfo.usageImageUrl" w-full alt="">
    </div>
  </template>
</template>

<script setup lang='ts'>
import type { ToolInfo } from './type'
import { getToolInfo } from '~/api/tool'

const toolInfo = ref<ToolInfo>()
const fetchInfo = async () => {
  const res = await getToolInfo(1, false)
  toolInfo.value = res
}

const open = () => {
  window.open(toolInfo.value?.outsideUrl, '_blank')
}
onMounted(() => {
  fetchInfo()
})
</script>
