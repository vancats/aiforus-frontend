<template>
  <n-menu
    v-model:value="activeKey"
    :options="menuOptions"
    :root-indent="18"
    :indent="12"
  />
</template>

<script setup lang="ts">
import type { MenuOption } from 'naive-ui'

function renderIcon(icon: string) {
  return () => h('span', { classList: icon })
}

const menuOptions: MenuOption[] = [
  {
    label: 'HelloWorld1',
    key: 'hear-the-wind-sing',
    icon: renderIcon('i-carbon-bare-metal-server-02'),
    children: [
      {
        label: 'Hello',
        key: 'rat',
      },
    ],
  },
  {
    label: 'HelloWorld2',
    key: 'pinball-1973',
    icon: renderIcon('i-carbon-bare-metal-server-02'),
    children: [
      {
        label: 'World',
        key: 'rat',
      },
    ],
  },
  {
    label: 'HelloWorld3',
    key: 'a-wild-sheep-chase',
    icon: renderIcon('i-carbon-bare-metal-server-02'),
    children: [
      {
        label: 'HelloWorld123',
        key: 'rat',
      },
      {
        label: '人物',
        key: 'people',
      },
      {
        label: '饮品',
        key: 'beverage',
      },
      {
        label: '食物',
        key: 'food',
      },
    ],
  },
  {
    label: 'HelloWorld4',
    key: 'dance-dance-dance',
    icon: renderIcon('i-carbon-bare-metal-server-02'),
    children: [
      {
        label: '人物',
        key: 'people',
      },
      {
        label: '饮品',
        key: 'beverage',
      },
      {
        label: '食物',
        key: 'food',
      },
      {
        label: 'Hello World',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]
const activeKey = ref<string | null>(null)
</script>
