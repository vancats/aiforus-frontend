<template>
  <div py-2 flex items-center>
    <div :class="listIcon.iconName" mr-1 w-6 h-6 inline-block :style="listIcon.iconStyle" />
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
import type { StyleValue } from 'vue'
import type { CardType } from './Layout'

defineProps<{
  listTitle: String
  listIcon: {
    iconName: String
    iconStyle: StyleValue
  }
  cardList: CardType[]
}>()

defineOptions({
  name: 'ListBarPage',
})
</script>
