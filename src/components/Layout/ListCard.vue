<template>
  <n-card hoverable embedded mr-2 mb-2 w-44 h-44 rounded-xl cursor-pointer @click="goCardDeatil">
    <div flex flex-col items-center justify-between>
      <img :src="avator" w-16 h-16 rounded>
      <div mt-1 text-lg class="text-#303544">
        {{ cardInfo.name }}
      </div>
      <n-ellipsis :line-clamp="2" text-sm class="text-#5B6681">
        {{ cardInfo.explaining }}
      </n-ellipsis>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import type { CardType } from './Layout'
import avator from '~/assets/avator.jpeg'

const props = defineProps<{
  cardInfo: CardType
}>()

defineOptions({
  name: 'ListCardPage',
})
const router = useRouter()
const goCardDeatil = () => {
  router.push(`/card/${encodeURIComponent(props.cardInfo.id)}`)
}
</script>
