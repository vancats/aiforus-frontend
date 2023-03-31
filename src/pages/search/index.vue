<!-- eslint-disable no-console -->
<template>
  <div pr-14 overflow-y-scroll>
    <div title-tags>
      热门应用
    </div>
    <Feedback keyword="hello" />
    <div flex overflow-scroll>
      <template v-for="tool in 20" :key="tool">
        <ToolCard :tool-info="info" :tag-list="toolTagList" />
      </template>

      <n-card
        card-more mr-0 :bordered="false" hoverable
        @click="router.push('/tool')"
      >
        <div h-75 flex-center-center-col>
          <ai-card-arrow mb-4 />
          <div>更多</div>
        </div>
      </n-card>
    </div>

    <div title-tags pt-8>
      <span mr-6>AI小工具</span>
      <TagList v-model:active-id="activePromptTag" :tag-list="promptTagList" />
    </div>

    <Feedback keyword="hello" />

    <div prompt-layout>
      <template v-for="prompt in 50" :key="prompt">
        <PromptCard :prompt-info="info" :tag-list="promptTagList" />
      </template>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { getCards, getTags } from '~/api'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/components/layout/type'

defineOptions({ name: 'SearchPage' })

const router = useRouter()

const toolTagList = ref<TagInfo[]>([
  { id: 0, name: '全部' },
  { id: 1, name: 'AI文本' },
  { id: 2, name: 'AI绘画' },
])
const promptTagList = ref<TagInfo[]>([
  { id: 0, name: '全部' },
  { id: 1, name: 'AI文本' },
  { id: 2, name: 'AI绘画' },
])
const activePromptTag = ref(0)
const fetchTags = async () => {
  try {
    getTags(0).then(res => promptTagList.value = res || [])
    getTags(1).then(res => toolTagList.value = res || [])
  }
  catch (e) {
    console.warn(e)
  }
}
watch(() => activePromptTag.value,
  () => {
    fetchPrompts()
  })

const info = {
  id: 0,
  name: '论文大纲',
  brief: '我希望你扮演一个专业的作家。你将需要研究一个给定的主题，制定论文陈述，并创建一个既信息丰富又引人入胜的有说服力的工作',
  iconUrl: '../assets/images/avator.png',
  pageView: 1121,
  hot: false,
  tags: [1],
}

const tools = ref<CardInfo[]>([])
async function fetchTools() {
  try {
    const data = await getCards({ context: '', tagId: 0, type: 1 })
    tools.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
const prompts = ref<CardInfo[]>([])
async function fetchPrompts() {
  try {
    const data = await getCards({ context: '', tagId: activePromptTag.value, type: 0 })
    prompts.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

onMounted(async () => {
  //   fetchTags()
  fetchTools()
  fetchPrompts()
})
</script>
