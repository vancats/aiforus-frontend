<template>
  <div flex-center-between-row mb-8 pr-14>
    <div w-60 h-10 mr-6>
      <ai-nav-title w-60 h-10 @click="goHome" />
    </div>

    <n-input
      ref="inputRef"
      v-model:value="searchVal"
      px-2 py-2 rounded-xl
      h="12"
      placeholder="搜索" clearable
      @keyup.enter="onSearch"
    >
      <template #prefix>
        <span i-carbon:search text-white />
      </template>
    </n-input>

    <n-popover v-if="useStore.username" trigger="click" placement="bottom" raw :show-arrow="false">
      <template #trigger>
        <div flex-center-center w-55 h-12 ml-6 p-2 rounded-2xl cursor bg="#2B2C3E">
          <ai-nav-avator wh-7 />
          <span text-4.5 mx-2>
            {{ useStore.username || 'AIS2688152' }}
          </span>
          <ai-card-arrow wh-4 />
        </div>
      </template>

      <div flex-center-center h-8 px-13 rounded-2xl cursor text-white bg="#2B2C3E" @click="showLogoutModal = true">
        退出登陆
      </div>
    </n-popover>

    <n-button v-else type="primary" ml-10 h-12 p-4 @click="onLogin">
      登录/注册
    </n-button>
  </div>

  <n-modal
    v-model:show="showModal" preset="card" size="huge" :bordered="false"
    w-84 h-95 rounded-2xl :style="{ background: '#3D3E59' }"
  >
    <template #header>
      <div flex-center-center>
        <ai-nav-wechat />
        <div text-5.5 ml-2>
          微信扫码登录
        </div>
      </div>
    </template>

    <div flex-center-center wh-64 relative m-auto text-white>
      <img :src="qrcodeUrl" wh-64 rounded-2xl alt="加载二维码失败，请刷新">
      <div v-if="isExpired" absolute flex-center-center wh-64 rounded-2xl bg="#000" bg-opacity-70>
        <span i-mingcute:refresh-1-fill wh-16 cursor @click="onLogin" />
      </div>
    </div>

    <template #footer>
      <div text-center>
        <span v-if="isExpired">
          二维码已过期，点击刷新按扭重新生成
        </span>
        <span v-else>
          登录畅享更多AI应用
        </span>
      </div>
    </template>
  </n-modal>

  <n-modal v-model:show="showLogoutModal">
    <n-card
      style="width: 480px; background: #2b2c3d; border-radius: 12px"
      size="huge" :bordered="false" role="dialog" aria-modal="true"
    >
      <template #header>
        <div flex-center>
          <ai-nav-warning mr-2 />
          退出登陆
        </div>
      </template>
      退出登陆后访问AI应用可能受限，确定退出吗？
      <template #footer>
        <div flex-center-center>
          <n-button px-7 mr-4 @click="showLogoutModal = false">
            取消
          </n-button>
          <n-button type="primary" px-7 @click="logout">
            确定
          </n-button>
        </div>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { removeLocalItem } from '../../utils/index'
import { checkLoginStatus, login } from '~/api/login'
import { useSearchStore } from '~/store'
import { setLocalItem } from '~/utils'
import naiveui from '~/utils/naiveui'
defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')
const useStore = useSearchStore()
const searchVal = ref('')

const onSearch = () => {
  useStore.searchVal = searchVal.value
  router.push('/search')
}

const showModal = ref(false)
const qrcodeUrl = ref('')
const isExpired = ref(false)
const checkedCnt = ref(0)

const startChecked = async () => {
  checkedCnt.value++
  const res = await checkLoginStatus()
  if (res.data?.token) {
    setLocalItem('token', res.data.token)
    setLocalItem('username', res.data.userId)
    showModal.value = false
    useStore.username = res.data.userId
  }
  else if (res.code === 400 && checkedCnt.value < 16) {
    setTimeout(() => {
      startChecked()
    }, 2000)
  }
  else {
    isExpired.value = true
  }
}

const onLogin = async () => {
  try {
    const res = await login()
    qrcodeUrl.value = res?.qrcodeUrl || ''
    showModal.value = true
    checkedCnt.value = 0
    isExpired.value = false
    startChecked()
  }
  catch (e) {
    console.warn(e)
  }
}

const showLogoutModal = ref(false)
const logout = () => {
  removeLocalItem('token')
  removeLocalItem('username')
  naiveui.message.success('您已退出登陆')
  useStore.username = ''
  showLogoutModal.value = false
}
</script>
