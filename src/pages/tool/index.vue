import { ToolInfo } from './index';
<template>
  <div h-20vh />
  <div layout-content min-h-80vh>
    <!-- Image -->
    <div class="absolute -top-5vw left-5vw sm:left-10vw wh-10vw bg-blue rounded">
      <span wh-full i-carbon:airport-01 />
    </div>

    <!-- Title & Button -->
    <div class="absolute -top-6vh left-17vw sm:left-22vw text-4xl flex">
      <span text-white>
        {{ toolInfo?.name }}
      </span>
      <n-button type="info" ml-2 rounded bg="#3A50FF">
        去官网使用
      </n-button>
      <n-popover trigger="hover" placement="bottom">
        <template #trigger>
          <n-button type="info" ml-2 rounded bg="#3A50FF">
            去扫码使用
          </n-button>
        </template>
        <span wh-10vw i-carbon:airport-01 />
      </n-popover>
    </div>

    <!-- Content -->
    <div p-6>
      <div text-2xl mb-2>
        关于 {{ toolInfo?.name }}
      </div>
      <div break-words text="#5B6681 sm" style="textIndent: 2rem">
        {{ toolInfo?.brief }}
      </div>
      <div text-2xl my-4>
        使用方法
      </div>
      <div break-words text="#5B6681 sm" style="textIndent: 2rem">
        {{ toolInfo?.usageContext }}
      </div>
      <img v-if="toolInfo?.usageImageUrl" py-2 :src="toolInfo?.usageImageUrl">
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { ToolInfo } from '.'
import { getToolInfo } from '~/api/tool'

defineOptions({ name: 'ToolPage' })

const { params } = useRoute()

const toolInfo = ref<ToolInfo>()
const fetchPromptInfo = async () => {
  const { data } = await getToolInfo({ id: Number(params.id), click: false })
  if (data?.toolPageInfo) {
    toolInfo.value = data.toolPageInfo
  }
}

onMounted(() => {
  fetchPromptInfo()
})
</script>
