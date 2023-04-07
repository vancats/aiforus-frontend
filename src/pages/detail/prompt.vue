<template>
  <template v-if="promptInfo">
    <div ref="promptPageEl" w-full p-12 pt-8 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
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
                <ai-card-fire wh-4 mr-1 />
                <div>{{ promptInfo.pageView }}</div>
              </div>
            </n-space>

            <n-ellipsis title-brief block my-2 :line-clamp="3" :tooltip="false">
              {{ promptInfo.brief }}
            </n-ellipsis>
          </div>
        </div>
      </div>

      <div mt-4 px-6 py-4 rounded-2xl bg="#37384E">
        <div v-if="promptInfo.variableList?.length">
          <div mb-4 flex-center-between>
            <div font-extrabold>
              为了生成结果更准确，请填写你对AI机器人的要求
            </div>

            <n-popover v-if="promptInfo.visible" trigger="hover" placement="bottom-end" max-w-100>
              <template #trigger>
                <div flex-center title-brief cursor>
                  <ai-prompt-visible mr-1 />
                  查看AI机器人预设信息
                </div>
              </template>
              <div font-extrabold my-1>
                Prompt
              </div>
              {{ promptInfo.prompt }}
            </n-popover>
          </div>

          <n-space :size="12" vertical>
            <div v-for="(variableInfo, index) in promptInfo.variableList" :key="variableInfo.variable" flex-center>
              <div flex-center>
                <span mr-4>{{ variableInfo.description }}</span>
                <n-select
                  v-model:value="selectValueArr[index]"
                  w-50
                  class="prompt-select"
                  placeholder="请选择"
                  filterable tag
                  :options="getOptions(variableInfo.value)"
                />
              </div>
            </div>
          </n-space>
        </div>

        <div font-extrabold mt-4>
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

      <div v-if="isConfirm" ref="messageRef" h-150 w-full mt-4 mb="-10" flex-start-between-col py-6 rounded-2xl relative bg="#37384E">
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
            :placeholder="isProcessing ? '内容正在加速生成...' : '请输入'"
            :autosize="{ minRows: 1, maxRows: 5 }"
            @keyup.enter="onSendMessage"
          >
            <template #suffix>
              <ai-prompt-send cursor @click="sendMessage" />
            </template>
          </n-input>
        </div>
      </div>
    </div>

    <n-modal v-model:show="showWechat">
      <n-card
        style="width: 400px; background: #2b2c3d; border-radius: 12px"
        size="huge" :bordered="false" role="dialog" aria-modal="true" closable
        :on-close="() => showWechat = false"
      >
        <template #header>
          <div flex-center>
            <ai-nav-warning mr-2 />
            次数不足
          </div>
        </template>
        您今日的 3{{ getLocalItem('token') ? '0' : '' }} 次使用次数已经用完，请{{ getLocalItem('token') ? '' : '登陆或' }}扫描群二维码，联系群管理员获取更多次数
        <img wh-60 m-auto my-6 :src="avator">
      </n-card>
    </n-modal>
  </template>
</template>

<script setup lang='ts'>
import { clipboard, getLocalItem, removeLocalItem } from '../../utils/index'
import { useWebSocketStore } from '../../store/index'
import type { PromptInfo } from './type'
import { getPromptInfo } from '~/api/prompt'
import avator from '~/assets/images/avatar.png'

const route = useRoute()

const promptInfo = ref<PromptInfo>()

const selectValueArr = ref<string[]>([])
const userPrompt = ref('')
const showWechat = ref(false)
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
}

onMounted(() => fetchInfo())

const getOptions = (str: string) => {
  const arr = str.split(',')
  return arr.map(item => ({
    label: item,
    value: item,
  }))
}

const isConfirm = ref(false)
const isProcessing = ref(false)
const userVal = ref('')
const messages = ref<Array<{ role: string; content: string }>>([])

const promptPageEl = ref<HTMLElement | null>(null)
const { y } = useScroll(promptPageEl, { behavior: 'smooth' })
const chatEl = ref<HTMLElement | null>(null)
const { y: chatY } = useScroll(chatEl, { behavior: 'smooth' })
const scrollToBottom = () => {
  setTimeout(() => {
    y.value += 1000
  })
}
const scrollChatToBottom = () => {
  chatY.value += 1000
}

const useSocketStore = useWebSocketStore()
const initWebSocket = (res: string) => {
  const token = getLocalItem('token')
  let wsUri = 'ws://175.178.218.120/gpt/chat'
  if (token) {
    wsUri += `?token=${token}`
  }
  useSocketStore.ws = new WebSocket(wsUri)
  useSocketStore.ws.onopen = () => {
    useSocketStore.ws?.send(res)
  }

  let prev = ''
  useSocketStore.ws.onmessage = (res) => {
    if (res.data === '#DONE#') {
      isProcessing.value = false
    }
    else if (res.data === '#NOUSAGE#') {
      isProcessing.value = false
      showWechat.value = true
      messages.value.pop()
    }
    else {
      if (prev === '\n' && res.data === '\n') return
      prev = res.data
      isProcessing.value = true
      messages.value[messages.value.length - 1].content += res.data
      scrollChatToBottom()
    }
  }

  useSocketStore.ws.onclose = (e) => {
    isProcessing.value = false
  }

  useSocketStore.ws.onerror = (e) => {
    isProcessing.value = false
    showWechat.value = true
    messages.value.pop()
  }
}

function sendMessage() {
  if (isProcessing.value) return
  isProcessing.value = true
  const res = processData()
  messages.value.push({ role: 'assistant', content: '' })
  if (!useSocketStore.ws || useSocketStore.ws.readyState !== 1) {
    initWebSocket(res)
  }
  else {
    useSocketStore.ws.send(res)
  }
}

const startChat = async () => {
  isConfirm.value = true

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

  scrollToBottom()
}

const onSendMessage = (e: KeyboardEvent) => {
  if (!e.shiftKey) {
    sendMessage()
  }
}

const doContinue = () => {
  userVal.value = '继续'
  sendMessage()
}

const stopGenerate = () => {
  useSocketStore.ws?.close()
  isProcessing.value = false
}

const regenerate = () => {
  useSocketStore.ws?.close()
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
    token: getLocalItem('token') || '',
  })
}

watch(() => route.params, () => {
  isProcessing.value = false
  isConfirm.value = false
  messages.value = []
  fetchInfo()
})

function showText() {
  if (!userPrompt.value) {
    userPrompt.value = promptInfo.value?.input || ''
  }
}
</script>

<style>
.prompt-select .n-base-selection .n-base-selection-label .n-base-selection-input {
    cursor:text;
}
</style>
