<!-- eslint-disable no-console -->
<template>
  <div overflow-y-scroll pr-14>
    <div text-xl pb-4>
      热门应用
    </div>

    <div flex overflow-x-scroll>
      <template v-for="tool in 20" :key="tool">
        <ToolCard :tool-info="info" />
      </template>
      <n-card
        w-20 rounded-2xl mr-4 flex-shrink-0 :bordered="false" cursor bg="#2B2C3E" hoverable
        @click="router.push('/tool')"
      >
        <div h-75 flex-center-center-col>
          <ai-card-arrow mb-4 />
          <div>更多</div>
        </div>
      </n-card>
    </div>

    <div text-xl pt-8 pb-4 flex-center>
      <span mr-6>AI小工具</span>
      <TagList v-model:active-id="activeTagId" :tag-list="tagList" />
    </div>

    <div grid grid-cols="1 lg:2 xl:3" gap-8>
      <template v-for="prompt in 50" :key="prompt">
        <PromptCard :prompt-info="info" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCards, getTags } from '~/api'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/components/layout/type'

defineOptions({ name: 'IndexPage' })

const router = useRouter()

const tagList = ref<TagInfo[]>([
  { id: 0, name: '全部' },
  { id: 1, name: 'AI文本' },
  { id: 2, name: 'AI绘画' },
])
const activeTagId = ref(0)
const fetchTags = async () => {
  try {
    const data = await getTags(0)
    tagList.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

watch(() => activeTagId.value,
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
  tags: [1, 2],
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
    const data = await getCards({ context: '', tagId: activeTagId.value, type: 0 })
    prompts.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

onMounted(() => {
  fetchTags()
  fetchTools()
  fetchPrompts()
})
</script>

<style>
/* 滚动条 */
::-webkit-scrollbar{
    width: 16px;
    background-color: transparent;
}
/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
    background-color:transparent;
}
/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
