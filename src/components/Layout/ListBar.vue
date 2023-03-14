<template>
  <div py-2 flex items-center>
    <img :src="listIcon" mr-1 w-5 h-5>
    <div text-5>
      {{ listTitle }}
    </div>
  </div>
  <div flex flex-wrap>
    <template v-for="card in cardList" :key="card">
      <ListCard :card-info="card" />
    </template>
  </div>
</template>

<script setup lang='ts'>
import type { CardType } from './Layout'

defineProps<{
  listTitle: string
  listIcon: string
  cardList: CardType[]
}>()

defineOptions({
  name: 'ListBarPage',
})
</script>
