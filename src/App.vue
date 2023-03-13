<template>
  <main font-sans text="gray-700 dark:gray-200" h-screen>
    <RouterView />
  </main>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'AppPage',
})
</script>
