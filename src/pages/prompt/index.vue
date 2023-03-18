<template>
  <div h-20vh />
  <div layout-content min-h-80vh>
    <div class="absolute -top-5vw left-10vw wh-10vw bg-blue rounded">
      <span wh-full i-carbon:airport-01 />
    </div>
    <div class="absolute -top-6vh left-22vw text-4xl flex">
      <span text-white>{{ promptInfo?.name }}</span>
    </div>
    <div p-6>
      <div text-2xl mb-2>
        关于 {{ promptInfo?.name }}
      </div>
      <div break-words text="#5B6681 sm" style="textIndent: 2rem">
        {{ promptInfo?.brief }}
      </div>

      <div p-4 mt-4 w-full rounded-lg bg-white>
        <n-input
          :value="promptInfo?.promptContext"
          type="textarea"
          :on-input="onInput"
          :theme-overrides="promptInputTheme"
          :autosize="{
            minRows: 3,
          }"
        />
        <div pt-2 flex-center text="#3A50FF">
          <img wh-4 :src="copyImg" @click="clipboard">
          <span cursor pl-1 mr-2 @click="clipboard">复制</span>
          <img wh-4 :src="enterImg">
          <a href="https://chat.openai.com/" target="_blank" cursor pl-1>去ChatGPT使用</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import type { PromptInfo } from './index'
import copyImg from '~/assets/copy.png'
import enterImg from '~/assets/enter.png'
import naiveui from '~/utils/naiveui'
import { promptInputTheme } from '~/config/themeOverrides'
import { getPromptInfo } from '~/api/prompt'

defineOptions({ name: 'PromptPage' })

const { params } = useRoute()

const promptInfo = ref<PromptInfo>()
const fetchPromptInfo = async () => {
  const { data } = await getPromptInfo({ id: Number(params.id), click: false })
  if (data?.toolPageInfo) {
    promptInfo.value = data.toolPageInfo
  }
}

onMounted(() => {
  fetchPromptInfo()
})

const onInput = (value: string) => {
  if (promptInfo.value?.promptContext) {
    promptInfo.value.promptContext = value
  }
}

const clipboard = () => {
  if (!promptInfo.value?.promptContext) return
  if (navigator.clipboard) {
  // clipboard api 复制
    navigator.clipboard.writeText(promptInfo.value.promptContext)
  }
  else {
    const textarea = document.createElement('textarea')
    document.body.appendChild(textarea)
    // 隐藏此输入框
    textarea.style.position = 'fixed'
    textarea.style.clip = 'rect(0 0 0 0)'
    textarea.style.top = '10px'
    // 赋值
    textarea.value = promptInfo.value.promptContext
    // 选中
    textarea.select()
    // 复制
    document.execCommand('copy', true)
    // 移除输入框
    document.body.removeChild(textarea)
  }
  naiveui.message.success('复制成功！')
}
</script>
