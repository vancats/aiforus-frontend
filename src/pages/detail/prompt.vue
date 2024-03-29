<template>
  <template v-if="promptInfo">
    <div ref="promptPageEl" w-full p-3-6 rounded-2xl bg="#2B2C3E" overflow-y-scroll>
      <DetailHeader :detail-info="promptInfo" />

      <div v-if="!isRolePlay" mt-6 rounded-2xl sm="px-6 py-4 bg-#37384E" relative>
        <n-popover v-if="promptInfo.visible" trigger="hover" placement="bottom-end" max-w-70-100>
          <template #trigger>
            <div absolute top-0-4 right-0-4 flex-center title-brief cursor>
              <ai-prompt-visible mr-1 />
              <span web-only>
                查看AI机器人预设信息
              </span>
              <span mobile-only>
                查看AI信息
              </span>
            </div>
          </template>
          <div font-extrabold my-1>
            Prompt
          </div>
          {{ promptInfo.prompt }}
        </n-popover>

        <div v-if="promptInfo.variableList?.length">
          <span web-only font-extrabold mb-4>
            为了生成结果更准确，请填写你对AI机器人的要求
          </span>
          <span mobile-only mb-4>
            请填写你对AI机器人的要求
          </span>

          <n-space :size="12" vertical mb-4>
            <div v-for="(variableInfo, index) in promptInfo.variableList" :key="variableInfo.variable" flex-center>
              <DetailSelect v-model:select="selectValueArr[index]" :variable-info="variableInfo" />
            </div>
          </n-space>
        </div>

        <span web-only font-extrabold>
          为了生成结果更准确，请填写你对AI机器人的具体描述
        </span>
        <span mobile-only>
          请填写你对AI机器人的具体描述
        </span>
        <n-input
          v-model:value="userPrompt"
          type="textarea" :placeholder="promptInfo.input"
          my-4 bg="#3F415B" rounded-xl
          :autosize="{ minRows: 5, maxRows: 5 }"
          @click="setUserPromptContent"
        />
        <div flex-center-end>
          <n-button
            type="primary" :disabled="isProcessing" px-7
            w-full-auto @click="startChat"
          >
            确认
          </n-button>
        </div>
      </div>

      <div v-if="allowConversation" ref="messageRef" h-120-150 w-full mt-6 mb="-10" text-3-4 flex-start-between-col py-3-6 rounded-2xl relative bg="#37384E">
        <div ref="chatEl" w-full overflow-y-scroll>
          <div v-for="(messageInfo, index) in messages" :key="index" w-full>
            <div v-if="messageInfo.role === 'user'" mb-3-6 flex-start>
              <div w-full ml-12-22 rounded-lg p-2-3 text="#FFFFFF" bg="#3A50FF">
                <div v-html="DOMPurify.sanitize(parseMarkDown(messageInfo.content))" />
              </div>
              <div wh-8-10 mx-2-6 rounded="100%">
                <ai-nav-avator wh-8-10 :src="promptInfo.iconUrl" />
              </div>
            </div>

            <div v-if="messageInfo.role === 'assistant'" mb-3-6 flex-start-end>
              <img :src="promptInfo.iconUrl" wh-8-10 mx-2-6 rounded="100%">
              <div w-full mr-12-22 rounded-lg p-2-3 text="#001042" bg="#EFF1FC">
                <div
                  class="overflow-auto whitespace-normal"
                  v-html="DOMPurify.sanitize(parseMarkDown(messageInfo.content), {
                    ADD_ATTR: ['class'], // 额外允许class属性
                    ADD_TAGS: ['span'], // 额外允许<span>标签
                  })"
                />
                <div flex-center-between mt-1-3 text="#3A50FF">
                  <div flex-shrink-0>
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
                  <div flex-center flex-shrink-0>
                    <div v-if="index === messages.length - 1 && !isProcessing" flex-center cursor @click="doContinue">
                      <ai-prompt-continue mr-1 />
                      继续
                    </div>
                    <div v-if="index !== messages.length - 1 || !isProcessing" flex-center cursor @click="clipboard(messages[index].content)">
                      <ai-prompt-copy ml-2-4 mr-1 />
                      复制
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="messageInfo.role === 'division'" mx-12-22 mb-3-6 flex-center-center>
              <n-divider text-3>
                您已修改要求，以下是新信息
              </n-divider>
            </div>
          </div>
        </div>

        <div w-full px-5>
          <n-input
            ref="searchEl"
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

    <n-modal v-model:show="showCountModal">
      <n-card
        style="background: #2b2c3d; border-radius: 12px"
        w-50-100
        size="huge" :bordered="false" role="dialog" aria-modal="true" closable
        @close="() => showCountModal = false"
      >
        <template #header>
          <div flex-center>
            <ai-nav-warning mr-2 />
            <span text-4-5>次数不足</span>
          </div>
        </template>
        <span text-3-4>
          您今日的 30 次使用次数已经用完,请扫描群二维码，联系群管理员获取更多次数
        </span>
        <img wh-35-60 m-auto my-3 :src="useStore.wechatQRCode" alt="二维码">
      </n-card>
    </n-modal>
  </template>
</template>

<script setup lang='ts'>
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import hljs from 'highlight.js'
import 'highlight.js/styles/agate.css'
import type { PromptInfo } from './type'
import { markedHighlight } from '~/utils/marked-highlight'
import { clipboard, getLocalItem, removeLocalItem } from '~/utils/index'
import { useNormalStore, usePromptDataStore, useWebSocketStore } from '~/store/index'
import { useMemberStore } from '~/store/member'
import { getPromptInfo } from '~/api/prompt'
import { checkTokenValid } from '~/api/login'
const route = useRoute()
const useStore = useNormalStore()
const useWebSocket = useWebSocketStore()
const usePromptData = usePromptDataStore()
const memberStore = useMemberStore()
let routeId = Number(route.params.id)

const promptInfo = ref<PromptInfo>()
const selectValueArr = ref<string[]>([])

const allowConversation = ref(false)
const userPrompt = ref('')
const showCountModal = ref(false)
const isRolePlay = computed(() => {
  return !!promptInfo.value?.tagList.some(i => i.name === '角色扮演')
})

const isProcessing = ref(false)
const messages = ref<Array<{ role: string; content: string }>>([])
const userVal = ref('')

const submitPlaceholder = computed(() => {
  return (isRolePlay.value && !messages.value.length) ? promptInfo.value?.input : isProcessing.value ? '内容正在加速生成...' : '请输入'
})

// Scroll
const promptPageEl = ref<HTMLElement | null>(null)
const { y } = useScroll(promptPageEl, { behavior: 'smooth' })
const chatEl = ref<HTMLElement | null>(null)
const { y: chatY } = useScroll(chatEl)
const searchEl = ref<HTMLElement | null>(null)
const scrollToBottom = () => {
  setTimeout(() => {
    y.value += 1000
  })
}
const scrollChatToBottom = () => {
  chatY.value += 10000
}

async function fetchInfo() {
  const refresh = getLocalItem('refresh') !== 'false'
  removeLocalItem('refresh')
  const res = await getPromptInfo(routeId, refresh)
  promptInfo.value = res

  const promptVal = usePromptData.promptMap.get(routeId)
  if (promptVal) {
    messages.value = promptVal.messages
    userPrompt.value = promptVal.userPrompt
    selectValueArr.value = promptVal.selectValueArr
    allowConversation.value = promptVal.allowConversation
  }
  else {
    if (res?.variableList) {
      selectValueArr.value = res.variableList.map(variableInfo => {
        return variableInfo.value.split(',')[0]
      })
    }
    if (res?.tagList) {
      allowConversation.value = isRolePlay.value
    }
  }
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
      addCopyCodeText()
      // 无论请求结果如何 都刷新一下能量值
      if (useStore.username) {
        memberStore.getMemberInfo(useStore.username)
      }
    }
    else if (res.data === '#NOUSAGE#') {
      isProcessing.value = false
      messages.value.pop()

      const token = getLocalItem('token') || ''
      if (token) {
        checkTokenValid(token).then(res => {
          if (res) {
            showCountModal.value = true
            memberStore.showEnergyShortageModal = true
          }
        })
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
    if (token) {
      checkTokenValid(token).then(res => {
        if (res) showCountModal.value = true
      })
    }
    else {
      useStore.showLoginModal = true
    }
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

// 点击上面的确定
function startChat() {
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

  setUserPromptContent()
  userVal.value = ''
  sendMessage()
}

// 输入框的回车
function sendMessageByEnter(e: KeyboardEvent) {
  if (!e.shiftKey && userVal.value.trim()) {
    sendMessage()
  }
}

// 点击发送图标
function sendMessageByClick() {
  if (isRolePlay && !messages.value.length) {
    userVal.value = promptInfo.value?.input || ''
  }
  if (userVal.value) {
    sendMessage()
    searchEl.value?.blur()
  }
}

function doContinue() {
  userVal.value = '继续'
  sendMessage()
}

function stopGenerate() {
  useWebSocket.ws?.close()
  isProcessing.value = false
  addCopyCodeText()
}

function regenerate() {
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

function setUserPromptContent() {
  if (!userPrompt.value) {
    userPrompt.value = promptInfo.value?.input || ''
  }
}

function parseMarkDown(content: string) {
  return marked.parse(content)
}

function addMarkedConfig() {
  const renderer = {
    list(body: string, ordered: boolean) {
      if (ordered) {
        return `<ol>${body}</ol>`
      }
      return body
    },
    listitem(text: string) {
      return `<li>${text}</li>`
    },
  }
  marked.use({ renderer }, markedHighlight({
    highlight(code: string, lang: string) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
    langPrefix: 'hljs language-',
    pedantic: false,
    gfm: true,
    breaks: false,
    sanitize: false,
    smartypants: false,
    xhtml: false,
  }), { headerIds: false, mangle: false })
}

function addCopyCodeText() {
  const pres = document.querySelectorAll('pre')
  Array.from(pres).forEach(item => {
    // 防止重复添加
    if (Array.from(item.classList).includes('copy')) return
    item.classList.add('copy')

    const copyNode = document.createElement('span')
    copyNode.style.cssText = 'position: absolute; right: 4px; top: 4px; cursor: pointer; color: white; font-size: 12px'
    copyNode.innerHTML = '复制代码'
    copyNode.onclick = function () {
      const copyData = item?.innerText
      clipboard(copyData.slice(0, -4))
    }
    item.appendChild(copyNode)
  })
}

function setPromptDataToMap() {
  usePromptData.setPromptDataToMap(routeId, {
    messages: messages.value,
    selectValueArr: selectValueArr.value,
    userPrompt: userPrompt.value,
    allowConversation: allowConversation.value,
  })
}

onMounted(() => {
  fetchInfo()
  useWebSocket.ws?.close()
  addMarkedConfig()
})

watch(() => allowConversation.value, () => {
  if (allowConversation.value) {
    scrollToBottom()
    setTimeout(() => {
      scrollChatToBottom()
    }, 500)
  }
})

watch(() => route.params, () => {
  setPromptDataToMap()

  routeId = Number(route.params.id)
  isProcessing.value = false
  allowConversation.value = false
  userPrompt.value = ''
  messages.value = []
  useWebSocket.ws?.close()
  fetchInfo()
})

onBeforeRouteLeave(() => {
  setPromptDataToMap()
})
</script>

<style>
pre {
    white-space:break-spaces;
    position: relative;
}

ul li {
    list-style: disc;
}

ol li{
    list-style:decimal inside;
}

li p {
    display: inline;
}

table {
    font-size:14px;
    color:#333333;
    width: 100%;
    border: 2px solid #666666;
}

table th {
    font-weight: bold;
    padding: 8px;
    border: 2px solid #666666;
    background-color: #dedede;
}

table td {
    padding: 8px;
    border: 2px solid #666666;
    border-collapse: collapse;
}
</style>
