<template>
  <div pr-14 overflow-y-scroll>
    <div title-tags>
      热门应用
    </div>

    <div flex overflow-x-scroll overflow-y-hidden pb-2>
      <template v-for="tool in tools.slice(0, 20)" :key="tool.id">
        <ToolCard :tool-info="tool" />
      </template>

      <n-card
        card-more mr-0 :bordered="false"
        @click="router.push('/tool')"
      >
        <div flex-center-center-col h-75>
          <ai-card-arrow mb-4 />
          <div>更多</div>
        </div>
      </n-card>
    </div>

    <TagList v-model:active-tag="activeTag" :tag-list="filterTags" title="AI小工具" mt-8 />

    <div prompt-layout>
      <template v-for="prompt in prompts" :key="prompt.id">
        <DetailCard :card-info="prompt" />
      </template>
    </div>

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { getPromptCards, getPromptTags } from '~/api/prompt'
import { getToolCards } from '~/api/tool'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { getActualTag } from '~/utils'
import { useNormalStore } from '~/store'
defineOptions({ name: 'IndexPage' })

const router = useRouter()
const useStore = useNormalStore()

const tagList = ref<TagInfo[]>([])
const fetchTags = async () => {
  try {
    const res = await getPromptTags()
    tagList.value = res || []
  }
  catch (e) {
    console.warn(e)
  }
}

const activeTag = ref(0)
useStore.tagId = 0
watch(() => activeTag.value, () => {
  fetchPrompts()
  useStore.tagId = activeTag.value
})

const tools = ref<CardInfo[]>([])
async function fetchTools() {
  try {
    const data = await getToolCards()
    tools.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

const prompts = ref<CardInfo[]>([])
async function fetchPrompts() {
  try {
    const data = await getPromptCards(activeTag.value, '', activeTag.value ? 1 : 2)
    prompts.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

const isFirst = ref(true)
const cachedTags = ref<TagInfo[]>([])
const filterTags = computed(() => {
  if (prompts.value.length && tagList.value.length && isFirst.value) {
    const res = getActualTag(prompts.value, tagList.value)
    cachedTags.value = res
    isFirst.value = false
    return res
  }
  else {
    return cachedTags.value
  }
})

onMounted(() => {
  fetchTags()
  fetchTools()
  fetchPrompts()
})
</script>
