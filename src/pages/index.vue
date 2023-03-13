<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <Layout />
  </n-config-provider>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})
const themeOverrides = {
  Input: {
    border: '1px solid rgba(255, 255, 255, 0.5)',
    borderHover: '1px solid rgba(255, 255, 255, 0.8)',
    borderFocus: '1px solid #3A50FF',
    textColor: 'rgba(253, 253, 253, 1)',
    placeholderColor: 'rgba(253, 253, 253, 0.4)',
  },
}
</script>
