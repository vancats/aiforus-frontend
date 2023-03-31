<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider :theme-overrides="appTheme">
    <main w-full flex style="font-family: AlibabaPuHuiTi-Regular">
      <SideBar />
      <div w-full flex-col pl-14 pt-8 overflow-hidden h-screen>
        <NavBar />
        <RouterView />
      </div>
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { appTheme } from './config/themeOverrides'
defineOptions({ name: 'AppPage' })
</script>
