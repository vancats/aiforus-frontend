<template>
  <n-modal
    v-model:show="showModal" preset="card" size="huge" :bordered="false"
    w-84 h-95 rounded-2xl :style="{ background: '#3D3E59' }"
    @close="useStore.showLoginModal = false"
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
      <img :src="loginQRCode" wh-64 rounded-2xl alt="加载二维码失败，请刷新">
      <div v-if="isExpired" absolute flex-center-center wh-64 rounded-2xl bg="#000 opacity-70">
        <span i-mingcute:refresh-1-fill wh-16 cursor @click="onLogin" />
      </div>
    </div>

    <template #footer>
      <div text-center>
        <span v-if="isExpired">
          二维码已过期，点击刷新按扭重新生成
        </span>
        <span v-else>
          登录获得更多使用次数
        </span>
      </div>
    </template>
  </n-modal>
</template>

<script setup lang='ts'>
import { checkLoginStatus, login } from '~/api/login'
import { useNormalStore } from '~/store'
import { setLocalItem } from '~/utils'
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()
const useStore = useNormalStore()

const isExpired = ref(false)
const checkedCnt = ref(0)
const loginQRCode = ref('')

const startChecked = async () => {
  checkedCnt.value++
  const res = await checkLoginStatus()
  if (res.data?.token) {
    setLocalItem('token', res.data.token)
    setLocalItem('username', res.data.userId)
    useStore.showLoginModal = false
    useStore.username = res.data.userId
    memberStore.getMemberInfo(useStore.username)
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

const isFetchEnd = ref(false)
const showModal = computed(() => isFetchEnd.value && useStore.showLoginModal)
const onLogin = async () => {
  try {
    isFetchEnd.value = false
    const res = await login()
    loginQRCode.value = res?.qrcodeUrl || ''
    checkedCnt.value = 0
    isExpired.value = false
    startChecked()
  }
  catch (e) {
    console.warn(e)
  }
  finally {
    isFetchEnd.value = true
  }
}

watch(() => useStore.showLoginModal, () => {
  if (useStore.showLoginModal) {
    onLogin()
  }
})
</script>
