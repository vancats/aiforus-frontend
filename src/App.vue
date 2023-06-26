<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>

  <n-config-provider :theme-overrides="appTheme">
    <n-dialog-provider>
      <dialog-api />
    </n-dialog-provider>
    <main w-full flex>
      <SideBar web-only />
      <div w-full h-screen flex-col layout-left sm:pt-8 overflow-hidden>
        <SearchBar mobile-only />
        <NavBar web-only />
        <RouterView />
      </div>
      <BottomBar mobile-only />
      <DrainageModal web-only />

      <LoginModal />
      <MemberChargeModal />
      <EnergyShortageModal />
      <RedeemCodeModal />
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { isWeChatBrowser, setLocalItem } from './utils/index'
import { wechatLogin } from '~/api/login'
import { useNormalStore } from '~/store'
import { appTheme } from '~/config/themeOverrides'
import { getQRCode } from '~/api/common'
import { useMemberStore } from '~/store/member'
import { userCheckIn } from '~/api/member'
import naiveui from '~/utils/naiveui'
defineOptions({ name: 'AppPage' })

const memberStore = useMemberStore()
const useStore = useNormalStore()

const fetchQRCode = () => {
  getQRCode().then(
    res => {
      if (res?.qrcodeUrl) {
        useStore.wechatQRCode = res.qrcodeUrl
      }
    })
}

const loginInWechat = async () => {
  const code = location.search.slice(1).split('&').find(i => i.includes('code'))?.split('=')[1]
  if (code) {
    const res = await wechatLogin(code)
    if (res.data?.token) {
      setLocalItem('token', res.data.token)
      setLocalItem('username', res.data.userId)
      useStore.username = res.data.userId
    }
  }
}

onMounted(async () => {
  fetchQRCode()
  if (isWeChatBrowser()) {
    loginInWechat()
  }
  if (useStore.username) {
    await memberStore.getMemberInfo(useStore.username)

    if (!memberStore.userMemberInfo?.isCheckin) {
      try {
        const res = await userCheckIn(useStore.username)
        if (res?.toast) {
          naiveui.message.success(res.toast)
          memberStore.getMemberInfo(useStore.username)
        }
      }
      catch (error) {
        console.error(error)
      }
    }
  }
})
</script>
