<template>
  <template v-if="toolInfo">
    <div w-full p-6 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
      <div flex-center>
        <img :src="toolInfo.iconUrl" wh-40 mr-6 rounded-2xl alt="icon">
        <div h-40 flex-start-between-col>
          <div>
            <n-space flex-center>
              <div text-5.5>
                {{ toolInfo.name }}
              </div>
              <CardTag v-if="toolInfo" :tags="toolInfo.tagList" />
              <div flex-center>
                <ai-card-fire wh-4 mr-1 />
                <div>{{ toolInfo.heat }}</div>
              </div>
            </n-space>

            <n-ellipsis title-brief block my-2 :line-clamp="3" :tooltip="false">
              {{ toolInfo.brief }}
            </n-ellipsis>
          </div>
          <n-space justify="space-between">
            <n-button v-if="!!toolInfo.outsideUrl" type="primary" @click="openLink">
              去官网使用
            </n-button>
            <n-popover v-if="!!toolInfo.qrcodeUrl" trigger="hover" placement="bottom">
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
      <div v-if="toolInfo.usageContext" title-brief mb-4>
        {{ toolInfo.usageContext }}
      </div>
      <img v-if="toolInfo.usageImageUrl" :src="toolInfo.usageImageUrl" w-full mb-4>
      <video v-if="toolInfo.usageVideoUrl" w-full controls>
        <source :src="toolInfo.usageVideoUrl" type="video/mp4">
      </video>
    </div>
  </template>
</template>

<script setup lang='ts'>
import { getLocalItem, removeLocalItem } from '../../utils/index'
import type { ToolInfo } from './type'
import { getToolInfo } from '~/api/tool'

const route = useRoute()
const toolInfo = ref<ToolInfo>()
const fetchInfo = async () => {
  const refresh = getLocalItem('refresh') !== 'false'
  removeLocalItem('refresh')
  const res = await getToolInfo(Number(route.params.id), refresh)
  toolInfo.value = res
}
watch(() => route.params, () => fetchInfo())
onMounted(() => fetchInfo())

const openLink = () => window.open(toolInfo.value?.outsideUrl, '_blank')
</script>
