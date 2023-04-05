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
                <ai-card-fire mr-1 />
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
          <div mb-4 font-extrabold>
            为了生成结果更准确，请填写你对AI机器人的要求
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
        />
        <div flex-center-end>
          <n-button type="primary" :disabled="isProcessing" px-7 @click="startChat">
            确认
          </n-button>
        </div>
      </div>

      <div v-if="isConfirm" ref="messageRef" h-150 mt-4 mb="-10" flex-start-between-col py-6 rounded-2xl relative bg="#37384E">
        <div ref="chatEl" w-full overflow-y-scroll>
          <div v-for="(message, index) in messages" :key="index" w-full>
            <div mb-6 :class="index % 2 ? 'flex-start' : 'flex-start-end'">
              <img v-if="index % 2" :src="promptInfo.iconUrl" wh-10 mx-6 rounded="100%">
              <div w-full :class="index % 2 ? 'mr-22' : 'ml-22'" rounded-lg py-3 pl-3 pr-7 text="#001042" bg="#EFF1FC">
                {{ message }}
                <div v-if="index % 2" flex-center-between mt-3 text="#3A50FF">
                  <div>
                    <div
                      v-if="index === messages.length - 1" flex-center cursor
                      @click="stopOrRegenerate"
                    >
                      <template v-if="isProcessing">
                        <ai-prompt-stop mr-1 />
                        <span>
                          停止生成
                        </span>
                      </template>
                      <template v-else>
                        <ai-prompt-refresh mr-1 />
                        <span>
                          重新生成
                        </span>
                      </template>
                    </div>
                  </div>
                  <div flex-center>
                    <div v-if="index === messages.length - 1 && !isProcessing" flex-center cursor @click="doContinue">
                      <ai-prompt-continue mr-1 />
                      继续
                    </div>
                    <div v-if="index !== messages.length - 1 || !isProcessing" flex-center cursor @click="clipboard(messages[index])">
                      <ai-prompt-copy ml-4 mr-1 />
                      复制
                    </div>
                  </div>
                </div>
              </div>
              <div v-if="!(index % 2)" wh-10 mx-6 rounded="100%">
                <ai-nav-avator wh-10 :src="promptInfo.iconUrl" />
              </div>
            </div>
          </div>
        </div>

        <div w-full h-11 px-5>
          <n-input
            v-model:value="userVal"
            h-11 py-1
            :disabled="isProcessing"
            :placeholder="isProcessing ? '内容正在加速生成...' : '请输入'"
            @keyup.enter="sendMessage"
          >
            >
            <template #suffix>
              <ai-prompt-send
                cursor
                @click="sendMessage"
              />
            </template>
          </n-input>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang='ts'>
import { clipboard, getLocalItem, removeLocalItem } from '../../utils/index'
import { useWebSocketStore } from '../../store/index'
import type { PromptInfo } from './type'
import { getPromptInfo } from '~/api/prompt'

const route = useRoute()

const promptInfo = ref<PromptInfo>()

const selectValueArr = ref<string[]>([])
const userPrompt = ref('')
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
const messages = ref<string[]>([
//   '我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来',
//   '我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来',
//   '我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来',
//   '我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来',
//   '我我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来我们都会有美好的未来们都会有美好的未来',
])

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
  setTimeout(() => {
    chatY.value += 100
  })
}

const useSocketStore = useWebSocketStore()
const wsUri = 'ws://175.178.218.120/gpt/chat'
const initWebSocket = (res: string) => {
  useSocketStore.ws = new WebSocket(wsUri)
  useSocketStore.ws.onopen = () => {
    useSocketStore.ws?.send(res)
  }

  useSocketStore.ws.onmessage = (res) => {
    if (JSON.parse(res.data) === '#Done#') {
      isProcessing.value = false
      return
    }
    if (isProcessing.value) {
      scrollChatToBottom()
      messages.value[messages.value.length - 1] += JSON.parse(res.data)
    }
  }

  useSocketStore.ws.onclose = (e) => {
    isProcessing.value = false
  }

  useSocketStore.ws.onerror = (e) => {
    isProcessing.value = false
  }
}

function sendMessage() {
  if (isProcessing.value) return
  isProcessing.value = true
  const res = processData()
  messages.value.push('')
  if (!useSocketStore.ws || useSocketStore.ws.readyState !== 1) {
    initWebSocket(res)
  }
  else {
    useSocketStore.ws.send(res)
  }
}

const startChat = async () => {
  isConfirm.value = true
  messages.value.push(userPrompt.value || promptInfo.value!.input)
  sendMessage()

  // TODO Hack
  scrollToBottom()
}

const doContinue = () => {
  userVal.value = '继续'
  sendMessage()
}

const stopOrRegenerate = () => {
  useSocketStore.ws?.close()
  if (isProcessing.value) {
    isProcessing.value = false
  }
  else {
    messages.value.pop()
    userVal.value = ''
    sendMessage()
  }
}

function processData() {
  const variableList = selectValueArr.value.map((item, index) => {
    return {
      variable: promptInfo.value!.variableList[index].variable,
      value: item,
    }
  })

  if (userVal.value) {
    messages.value.push(userVal.value)
    userVal.value = ''
  }

  const context = []
  for (let i = messages.value.length - 1; i > 0 && i > messages.value.length - 5; i--) {
    const role = i % 2 ? 'assistant' : 'user'
    context.unshift({
      role,
      content: messages.value[i],
    })
  }

  context.unshift({ role: 'user', content: messages.value[0] })

  return JSON.stringify({
    prompt_id: promptInfo.value!.id,
    variable_list: variableList,
    context,
  })
}

watch(() => route.params, () => {
  isProcessing.value = false
  isConfirm.value = false
  messages.value = []
  fetchInfo()
})
</script>

<style>
.prompt-select .n-base-selection .n-base-selection-label .n-base-selection-input {
    cursor:text;
}
</style>
