<template>
  <template v-if="toolInfo">
    <div w-full p-3-6 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
      <DetailHeader :detail-info="toolInfo">
        <template #web-footer>
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
        </template>
        <template #mobile-footer>
          <n-button w-full mt-3 type="primary" @click="clipboard(toolInfo.outsideUrl)">
            复制官网链接
          </n-button>
        </template>
      </DetailHeader>

      <div text-4-5.5 mt-3 py-3 border="t-1 #1F1E2C">
        使用教程
      </div>
      <div v-if="toolInfo.usageContext" title-brief mb-2>
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
import type { ToolInfo } from './type'
import { clipboard, getLocalItem, removeLocalItem } from '~/utils/index'
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
