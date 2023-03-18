<template>
  <div h-8vh />
  <div layout-content pr-20vw min-h-92vh>
    <!-- Input -->
    <n-input
      :value="searchVal"
      mt-4 p-2 rounded-lg
      placeholder="搜索你想找的相关应用" size="small" clearable
      :theme-overrides="feedbackInputTheme"
      :on-input="onInput"
      @keydown.enter="onSearch"
    >
      <template #prefix>
        <span i-carbon:search style="color: #3A50FF" />
      </template>
    </n-input>

    <!-- Content -->
    <Content v-if="listData.length" :tags="tags" :list-data="listData" @tag-change="tagChange" />
    <div v-else flex-center-center my-4>
      <div i-mingcute:planet-line mr-2 text="#3A50FF" />
      老板，没有应用可以“用Chat GPT写商业计划书”，换个关键词试试
    </div>

    <!-- Feedback -->
    <div pb-4 text="#3A50FF center">
      <span cursor @click="openFeedbackDialog">
        没有找到可用ai应用？点击向我们反馈
      </span>
    </div>

    <!-- Feedback Modal -->
    <n-modal v-model:show="showModal" preset="dialog" type="info" auto-focus close-on-esc title="反馈">
      <n-input
        type="textarea"
        :value="textareaValue"
        :theme-overrides="feedbackTextareaTheme"
        :on-input="onTextarea"
        :autosize="{ minRows: 3 }"
      />
      <template #action>
        <n-button type="info" bg="#3A50FF" @click="onSubmit">
          提交
        </n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang='ts'>
import type { CardType, TagType } from '~/components/Layout/Layout'
import { getCards, getTags } from '~/api'
import { feedbackInputTheme, feedbackTextareaTheme } from '~/config/themeOverrides'
import { postFeedback } from '~/api/feedback'

defineOptions({ name: 'FeedbackPage' })

const searchVal = ref(sessionStorage.getItem('feedback-search') || '')
sessionStorage.removeItem('feedback-search')
const onInput = (value: string) => searchVal.value = value
const onSearch = () => fetchCards()

// Tag
const tags = ref<TagType[]>([])
const fetchTags = async () => {
  const { data } = await getTags()
  const temp = [{
    id: 0,
    name: '全部应用',
    active: true,
  }]
  if (Array.isArray(data?.tagList)) {
    data?.tagList.forEach((item) => {
      temp.push({
        id: item.id,
        name: item.name,
        active: false,
      })
    })
  }
  tags.value = temp
}
const tagChange = (id: number) => {
  let shouldFresh = true
  tags.value.forEach((tag) => {
    if (tag.id === id) {
      if (tag.active) shouldFresh = false
      tag.active = true
    }
    else {
      tag.active = false
    }
  })
  shouldFresh && fetchCards()
}

// List
const listData = ref<CardType[]>([])
async function fetchCards() {
  const query = searchVal.value
  const tag = tags.value.find(i => i.active)?.id
  const { data } = await getCards({ query, tag })
  if (data?.cardList) {
    listData.value = data?.cardList
  }
}

onMounted(() => {
  fetchTags()
  fetchCards()
})

// Modal
const showModal = ref(false)
const openFeedbackDialog = () => showModal.value = true

const textareaValue = ref('')
const onTextarea = (value: string) => textareaValue.value = value

const onSubmit = async () => {
  await postFeedback({ type: 0, context: textareaValue.value })
  showModal.value = false
}
</script>
