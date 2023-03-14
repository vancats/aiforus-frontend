<template>
  <n-message-provider>
    <message-api />
  </n-message-provider>
  <n-config-provider :theme-overrides="themeOverrides">
    <main font-sans text="gray-700 dark:gray-200" h-screen>
      <RouterView />
    </main>
  </n-config-provider>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'AppPage',
})

const themeOverrides = {
  Input: {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderHover: '1px solid rgba(255, 255, 255, 0.8)',
    borderFocus: '1px solid #3A50FF',
    textColor: 'rgba(253, 253, 253, 1)',
    placeholderColor: 'rgba(253, 253, 253, 0.4)',
    color: 'transparent',
    colorFocus: 'transparent',
  },
  Button: {
    colorHoverInfo: '#3A50FF',
    colorFocusInfo: '#3A50FF',
  },
}
</script>
