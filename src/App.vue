<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider :theme-overrides="appTheme">
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
