<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-dialog-provider>
    <dialog-api />
  </n-dialog-provider>
  <n-config-provider :theme-overrides="appTheme">
    <main flex h-screen>
      <SideBar />
      <NavBar />
      <div ml-42 mt-32 w-full overflow-y-scroll>
        <RouterView />
      </div>
    </main>
  </n-config-provider>
</template>

<script setup lang="ts">
import { appTheme } from './config/themeOverrides'
defineOptions({ name: 'AppPage' })
</script>

<style scoped>

</style>
