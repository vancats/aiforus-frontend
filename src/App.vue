<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider :theme-overrides="appTheme">
    <main w-full flex>
      <SideBar />
      <div w-full flex-col pl-10 pt-8 overflow-hidden h-screen>
        <NavBar />
        <RouterView />
      </div>
      <DrainageModal />
      <LoginModal />
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { useNormalStore } from '~/store'
import { appTheme } from '~/config/themeOverrides'
import { getQRCode } from '~/api/common'
defineOptions({ name: 'AppPage' })

const useStore = useNormalStore()

onMounted(() => {
  getQRCode().then(
    res => {
      if (res?.qrcodeUrl) {
        useStore.wechatQRCode = res.qrcodeUrl
      }
    })
})
</script>
