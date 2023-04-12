<template>
  <div pr-14 overflow-y-scroll>
    <template v-if="tools.length || prompts.length">
      <div title-tags>
        AI应用
      </div>
      <template v-if="tools.length">
        <div flex overflow-x-scroll overflow-y-hidden pb-2>
          <template v-for="tool in tools.slice(0, 20)" :key="tool.id">
            <ToolCard :tool-info="tool" />
          </template>

          <n-card
            card-more mr-0 :bordered="false"
            @click="router.push('/tool')"
          >
            <div h-75 flex-center-center-col>
              <ai-card-arrow mb-4 />
              <div>更多</div>
            </div>
          </n-card>
        </div>
      </template>
      <Feedback v-else type-name="AI应用" />

      <TagList v-if="prompts.length" v-model:active-tag="activeTag" :tag-list="filterTags" title="AI小工具" mt-8 />

      <template v-if="prompts.length">
        <div prompt-layout>
          <template v-for="prompt in prompts" :key="prompt.id">
            <DetailCard :card-info="prompt" />
          </template>
        </div>
      </template>
      <Feedback v-else type-name="AI小工具" />
    </template>
    <Feedback v-else type-name="AI应用和AI小工具" />
  </div>
</template>

<script setup lang="ts">
import { getPromptCards, getPromptTags } from '~/api/prompt'
import { getToolCards } from '~/api/tool'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { useNormalStore } from '~/store'
import { getActualTag } from '~/utils'
defineOptions({ name: 'SearchPage' })

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
    const data = await getToolCards(0, useStore.searchVal)
    tools.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}

const prompts = ref<CardInfo[]>([])
async function fetchPrompts() {
  try {
    const data = await getPromptCards(activeTag.value, useStore.searchVal)
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

watch(() => useStore.searchVal,
  async () => {
    tagList.value = []
    prompts.value = []
    activeTag.value = 0
    fetchTools()
    await fetchTags()
    await fetchPrompts()
    isFirst.value = true
  })

onMounted(() => {
  fetchTags()
  fetchTools()
  fetchPrompts()
})
</script>
