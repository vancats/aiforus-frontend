<template>
  <div flex overflow-y-scroll pb-4 pr-12>
    <div pr-2 mr-4 w-140 overflow-y-scroll>
      <template v-for="card in cards" :key="card.id">
        <DetailCard :card-info="card" />
      </template>
      <n-card card-detail h-14 :bordered="false" @click="router.push('/prompt')">
        <div text-5 text-center leading-13>
          更多应用
        </div>
      </n-card>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
import { getToolCards } from '~/api/tool'
import type { CardInfo } from '~/components/card/type'
defineOptions({ name: 'DetailPage' })
const router = useRouter()

const cards = ref<CardInfo[]>([])
async function fetchCards() {
  try {
    const data = await getToolCards()
    cards.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
onMounted(() => {
  fetchCards()
})
</script>
