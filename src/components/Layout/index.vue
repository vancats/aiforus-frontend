<template>
  <div h-screen relative pt-40>
    <header fixed left-0 right-0 top-0 z-1>
      <TopBar />
    </header>
    <div ref="el" h-full bg-bluegray-2 rounded-3 relative box-border overflow-y-scroll>
      <n-layout fixed bottom-2 left-2 top-42 rounded-3xl w-58 border bg-white>
        <SideBar />
        {{ y }}
      </n-layout>
      <section p-2 pl-62>
        <Content />
      </section>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
import { useScroll } from '@vueuse/core'

defineOptions({
  name: 'LayoutPage',
})

const el = ref<HTMLElement | null>(null)
const { y } = useScroll(el)
</script>
