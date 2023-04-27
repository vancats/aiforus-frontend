<template>
  <div text-center my-16>
    <div text-3 sm:text-xl>
      老板，没有“{{ useStore.searchVal }}”相关的{{ typeName }}，换个关键词试试
    </div>
    <div text-3 sm:text-sm mt-4 sm:mt-10 cursor text="#3A50FF" @click="openModal">
      没有找到可用ai应用？点击向我们反馈
    </div>
  </div>

  <n-modal v-model:show="showModal">
    <n-card
      style="background: #2b2c3d; border-radius: 12px"
      w-66 sm:w-120
      title="问题与反馈" size="huge" :bordered="false" role="dialog" aria-modal="true"
    >
      <n-input
        v-model:value="feedbackVal"
        type="textarea" placeholder="请输入你的问题"
        bg="#3F415B" rounded-xl
        :autosize="{ minRows: 6, maxRows: 6 }"
      />
      <template #footer>
        <div flex-center-center>
          <n-button px-7 mr-4 @click="showModal = false">
            取消
          </n-button>
          <n-button type="primary" px-7 @click="onFeedback">
            确定
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang='ts'>
import { useNormalStore } from '~/store'
import { searchFeedback } from '~/api/feedback'
import naiveui from '~/utils/naiveui'

defineProps<{ typeName: string }>()
const useStore = useNormalStore()

const showModal = ref(false)
const feedbackVal = ref('')
const openModal = () => {
  feedbackVal.value = ''
  showModal.value = true
}
const onFeedback = async () => {
  if (!feedbackVal.value) return
  try {
    await searchFeedback(feedbackVal.value)
    showModal.value = false
    naiveui.message.success('已收到，感谢您的反馈！')
  }
  catch (e) {
    console.warn(e)
  }
}
</script>
