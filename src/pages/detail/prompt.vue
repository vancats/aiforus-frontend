<template>
  <template v-if="promptInfo">
    <div w-full p-12 pt-8 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
      <div flex-center>
        <img :src="promptInfo.iconUrl" wh-40 mr-6 rounded-2xl alt="icon">
        <div h-40 flex-start-between-col>
          <div>
            <n-space flex-center>
              <div text-5.5>
                {{ promptInfo.name }}
              </div>
              <CardTag v-if="promptInfo" :tags="promptInfo.tagList" />
              <div flex-center>
                <ai-card-fire mr-1 />
                <div>{{ promptInfo.pageView }}</div>
              </div>
            </n-space>

            <n-ellipsis title-brief block my-2 :line-clamp="3" :tooltip="false">
              {{ promptInfo.brief }}
            </n-ellipsis>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang='ts'>
import { getLocalItem, removeLocalItem } from '../../utils/index'
import type { PromptInfo } from './type'
import { getPromptInfo } from '~/api/prompt'

const route = useRoute()
const promptInfo = ref<PromptInfo>()
const fetchInfo = async () => {
  const refresh = Boolean(getLocalItem('refresh'))
  removeLocalItem('refresh')
  const res = await getPromptInfo(Number(route.params.id), refresh)
  promptInfo.value = res
}
watch(() => route.params, () => fetchInfo())
onMounted(() => fetchInfo())
</script>
