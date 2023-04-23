<template>
  <template v-if="promptInfo">
    <div ref="promptPageEl" w-full p-6 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
      <DetailHeader :detail-info="promptInfo" />

      <div v-if="!isRolePlay" mt-6 px-6 py-4 rounded-2xl bg="#37384E" relative>
        <n-popover v-if="promptInfo.visible" trigger="hover" placement="bottom-end" max-w-100>
          <template #trigger>
            <div absolute top-4 right-4 flex-center title-brief cursor>
              <ai-prompt-visible mr-1 />
              查看AI机器人预设信息
            </div>
          </template>
          <div font-extrabold my-1>
            Prompt
          </div>
          {{ promptInfo.prompt }}
        </n-popover>

        <div v-if="promptInfo.variableList?.length">
          <div mb-4 font-extrabold>
            为了生成结果更准确，请填写你对AI机器人的要求
          </div>

          <n-space :size="12" vertical mb-4>
            <div v-for="(variableInfo, index) in promptInfo.variableList" :key="variableInfo.variable" flex-center>
              <DetailSelect v-model:select="selectValueArr[index]" :variable-info="variableInfo" />
            </div>
          </n-space>
        </div>

        <div font-extrabold>
          为了生成结果更准确，请填写你对AI机器人的具体描述
        </div>
        <n-input
          v-model:value="userPrompt"
          type="textarea" :placeholder="promptInfo.input"
          my-4 bg="#3F415B" rounded-xl
          :autosize="{ minRows: 5, maxRows: 5 }"
          @click="showText"
        />
        <div flex-center-end>
          <n-button type="primary" :disabled="isProcessing" px-7 @click="startChat">
            确认
          </n-button>
        </div>
      </div>

      <div v-if="allowConversation" ref="messageRef" h-150 w-full mt-6 mb="-10" flex-start-between-col py-6 rounded-2xl relative bg="#37384E">
        <div ref="chatEl" w-full overflow-y-scroll>
          <div v-for="(messageInfo, index) in messages" :key="index" w-full>
            <div v-if="messageInfo.role === 'user'" mb-6 flex-start>
              <div w-full ml-22 rounded-lg py-3 pl-3 pr-7 text="#001042" bg="#EFF1FC">
                <span style="white-space: pre-wrap;">
                  {{ messageInfo.content }}
                </span>
              </div>
              <div wh-10 mx-6 rounded="100%">
                <ai-nav-avator wh-10 :src="promptInfo.iconUrl" />
              </div>
            </div>

            <div v-if="messageInfo.role === 'assistant'" mb-6 flex-start-end>
              <img :src="promptInfo.iconUrl" wh-10 mx-6 rounded="100%">
              <div w-full mr-22 rounded-lg py-3 pl-3 pr-7 text="#001042" bg="#EFF1FC">
                <span style="white-space: pre-wrap;">
                  {{ messageInfo.content }}
                </span>

                <div flex-center-between mt-3 text="#3A50FF">
                  <div>
                    <div v-if="index === messages.length - 1" flex-center cursor>
                      <div v-if="isProcessing" flex-center @click="stopGenerate">
                        <ai-prompt-stop mr-1 />
                        <span>
                          停止生成
                        </span>
                      </div>
                      <div v-else flex-center @click="regenerate">
                        <ai-prompt-refresh mr-1 />
                        <span>
                          重新生成
                        </span>
                      </div>
                    </div>
                  </div>
                  <div flex-center>
                    <div v-if="index === messages.length - 1 && !isProcessing" flex-center cursor @click="doContinue">
                      <ai-prompt-continue mr-1 />
                      继续
                    </div>
                    <div v-if="index !== messages.length - 1 || !isProcessing" flex-center cursor @click="clipboard(messages[index].content)">
                      <ai-prompt-copy ml-4 mr-1 />
                      复制
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="messageInfo.role === 'division'" mx-22 mb-6 flex-center-center>
              <n-divider>
                您已成功修改具体描述，以下是新的对话信息
              </n-divider>
            </div>
          </div>
        </div>

        <div w-full px-5>
          <n-input
            v-model:value="userVal"
            type="textarea"
            :disabled="isProcessing"
            :placeholder="submitPlaceholder"
            :autosize="{ minRows: 1, maxRows: 5 }"
            @keyup.enter="sendMessageByEnter"
          >
            <template #suffix>
              <ai-prompt-send cursor @click="sendMessageByClick" />
            </template>
          </n-input>
        </div>
      </div>
    </div>

    <n-modal v-model:show="showModal">
      <n-card
        style="width: 400px; background: #2b2c3d; border-radius: 12px"
        size="huge" :bordered="false" role="dialog" aria-modal="true" closable
        @close="() => showModal = false"
      >
        <template #header>
          <div flex-center>
            <ai-nav-warning mr-2 />
            次数不足
          </div>
        </template>
        您今日的 30 次使用次数已经用完,请扫描群二维码，联系群管理员获取更多次数
        <img wh-60 m-auto my-6 :src="useStore.wechatQRCode" alt="二维码">
      </n-card>
    </n-modal>
  </template>
</template>

<script setup lang='ts'>
import { clipboard, getLocalItem, removeLocalItem } from '../../utils/index'
import { useNormalStore, useWebSocketStore } from '../../store/index'
import type { PromptInfo } from './type'
import { getPromptInfo } from '~/api/prompt'

const route = useRoute()
const useStore = useNormalStore()
const useWebSocket = useWebSocketStore()
const promptInfo = ref<PromptInfo>()

const selectValueArr = ref<string[]>([])
const userPrompt = ref('')
const showModal = ref(false)
const allowConversation = ref(false)

const isRolePlay = computed(() => {
  return !!promptInfo.value?.tagList.some(i => i.name === '角色扮演')
})

const fetchInfo = async () => {
  const refresh = getLocalItem('refresh') !== 'false'
  removeLocalItem('refresh')
  const res = await getPromptInfo(Number(route.params.id), refresh)
  promptInfo.value = res
  if (res?.variableList) {
    selectValueArr.value = res.variableList.map(variableInfo => {
      return variableInfo.value.split(',')[0]
    })
  }
  if (res?.tagList) {
    allowConversation.value = isRolePlay.value
  }
}

onMounted(() => {
  fetchInfo()
  useWebSocket.ws?.close()
})

const isProcessing = ref(false)
const userVal = ref('')
const messages = ref<Array<{ role: string; content: string }>>([])

const promptPageEl = ref<HTMLElement | null>(null)
const { y } = useScroll(promptPageEl, { behavior: 'smooth' })
const chatEl = ref<HTMLElement | null>(null)
const { y: chatY } = useScroll(chatEl)
const scrollToBottom = () => {
  setTimeout(() => {
    y.value += 1000
  })
}
const scrollChatToBottom = () => {
  chatY.value += 1000
}

const initWebSocket = (res: string) => {
  const token = getLocalItem('token')
  let wsUri = 'wss://aiforus.cn/gpt/chat'
  if (token) {
    wsUri += `?token=${token}`
  }
  useWebSocket.ws = new WebSocket(wsUri)
  useWebSocket.ws.onopen = () => {
    useWebSocket.ws?.send(res)
  }

  let prev = ''
  useWebSocket.ws.onmessage = (res) => {
    if (res.data === '#DONE#') {
      isProcessing.value = false
    }
    else if (res.data === '#NOUSAGE#') {
      isProcessing.value = false
      messages.value.pop()

      const token = getLocalItem('token') || ''
      if (token) {
        showModal.value = true
      }
      else {
        useStore.showLoginModal = true
      }
    }
    else {
      if (prev === '\n' && res.data === '\n') return
      prev = res.data
      allowConversation.value = true
      isProcessing.value = true
      messages.value[messages.value.length - 1].content += res.data
      scrollChatToBottom()
    }
  }

  useWebSocket.ws.onclose = (e) => {
  }

  useWebSocket.ws.onerror = (e) => {
    isProcessing.value = false
    messages.value.pop()
    if (!allowConversation.value) {
      // 对话框未显示状态，未连接成功直接清空信息
      messages.value = []
    }
    const token = getLocalItem('token') || ''
    if (token) showModal.value = true
    else useStore.showLoginModal = true
  }
}

function sendMessage() {
  if (isProcessing.value) return
  const res = processData()
  messages.value.push({ role: 'assistant', content: '' })
  if (!useWebSocket.ws || useWebSocket.ws.readyState !== 1) {
    initWebSocket(res)
  }
  else {
    useWebSocket.ws.send(res)
  }
  setTimeout(() => {
    isProcessing.value = true
  })
}

const startChat = async () => {
  if (messages.value.length) {
    messages.value.push({
      role: 'division',
      content: '您已成功修改具体描述，以下是新的对话信息',
    })
  }

  messages.value.push({
    role: 'user',
    content: userPrompt.value || promptInfo.value!.input,
  })

  showText()
  userVal.value = ''
  sendMessage()
}

watch(() => allowConversation.value, () => {
  if (allowConversation.value) {
    scrollToBottom()
  }
})

const sendMessageByEnter = (e: KeyboardEvent) => {
  if (!e.shiftKey && userVal.value.trim()) {
    sendMessage()
  }
}

const sendMessageByClick = () => {
  if (isRolePlay && !messages.value.length) {
    userVal.value = promptInfo.value?.input || ''
  }
  if (userVal.value) {
    sendMessage()
  }
}

const doContinue = () => {
  userVal.value = '继续'
  sendMessage()
}

const stopGenerate = () => {
  useWebSocket.ws?.close()
  isProcessing.value = false
}

const regenerate = () => {
  useWebSocket.ws?.close()
  setTimeout(() => {
    messages.value.pop()
    userVal.value = ''
    sendMessage()
  })
}

function processData() {
  const variableList = selectValueArr.value.map((item, index) => {
    return {
      variable: promptInfo.value!.variableList[index].variable,
      value: item,
    }
  })

  if (userVal.value) {
    messages.value.push({
      role: 'user',
      content: userVal.value,
    })
    userVal.value = ''
  }

  const context = []
  for (let i = messages.value.length - 1; i > 0 && i > messages.value.length - 5 && messages.value[i].role !== 'division'; i--) {
    context.unshift(messages.value[i])
  }

  context.unshift(messages.value[0])

  return JSON.stringify({
    prompt_id: promptInfo.value!.id,
    variable_list: variableList,
    context,
  })
}

watch(() => route.params, () => {
  isProcessing.value = false
  allowConversation.value = false
  userPrompt.value = ''
  messages.value = []
  useWebSocket.ws?.close()
  fetchInfo()
})

function showText() {
  if (!userPrompt.value) {
    userPrompt.value = promptInfo.value?.input || ''
  }
}

const submitPlaceholder = computed(() => {
  return (isRolePlay.value && !messages.value.length) ? promptInfo.value?.input : isProcessing.value ? '内容正在加速生成...' : '请输入'
})
</script>
