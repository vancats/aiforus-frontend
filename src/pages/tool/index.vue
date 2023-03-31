<template>
  <div overflow-y-scroll pr-14>
    <div title-tags>
      <span mr-6>AI应用</span>
      <TagList v-model:active-id="activeToolTag" :tag-list="toolTagList" />
    </div>

    <div tool-layout>
      <template v-for="tool in 50" :key="tool">
        <ToolCard :tool-info="toolInfo" :tag-list="toolTagList" />
      </template>
    </div>

    <Footer />
  </div>
</template>

<script setup lang='ts'>
import type { TagInfo } from '~/components/layout/type'
import { getTags } from '~/api'

defineOptions({ name: 'ToolPage' })

const toolInfo = {
  id: 0,
  name: '论文大纲',
  brief: '我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作',
  iconUrl: '../assets/images/avator.png',
  pageView: 1121,
  hot: false,
  tags: [1],
}
const toolTagList = ref<TagInfo[]>([
  { id: 0, name: '全部' },
  { id: 1, name: 'AI文本' },
  { id: 2, name: 'AI绘画' },
])
const activeToolTag = ref(0)
const fetchTags = async () => {
  try {
    getTags(1).then(res => toolTagList.value = res || [])
  }
  catch (e) {
    console.warn(e)
  }
}
onMounted(() => {
//   fetchTags()
})
</script>
