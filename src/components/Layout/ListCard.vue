<template>
  <n-card mr-4 mb-4 wh-44 rounded-lg cursor hoverable embedded @click="goDeatil">
    <div flex-center-between-col>
      <img :src="avator" wh-16 rounded>
      <div mt-1 text-lg text="#303544">
        {{ cardInfo.name }}
      </div>
      <n-ellipsis :line-clamp="2" text="sm #5B6681">
        {{ cardInfo.explaining }}
      </n-ellipsis>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import type { CardType } from './Layout'
import avator from '~/assets/avator.jpeg'

const props = defineProps<{ cardInfo: CardType }>()

defineOptions({ name: 'ListCard' })

const router = useRouter()
const goDeatil = () => router.push(`/${props.cardInfo.type}/${encodeURIComponent(props.cardInfo.id)}`)
</script>
