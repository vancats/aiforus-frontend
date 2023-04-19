<template>
  <div flex pb-4 pr-12 overflow-y-scroll>
    <div w-140 mr-4 pr-2 overflow-y-scroll>
      <template v-for="card in cards.slice(0, 20)" :key="card.id">
        <DetailCard mb-4 :card-info="card" />
      </template>
      <n-card
        card-detail h-14 :bordered="false"
        @click="router.push(route.matched[1]?.name === 'PromptDetail' ? '/prompt' : '/tool')"
      >
        <div text="5 center" leading-13>
          更多应用
        </div>
      </n-card>
    </div>
    <RouterView />
  </div>
</template>

<script setup lang='ts'>
import { getPromptCards } from '~/api/prompt'
import { getToolCards } from '~/api/tool'
import type { CardInfo } from '~/components/card/type'
import { useNormalStore } from '~/store'
defineOptions({ name: 'DetailPage' })

const router = useRouter()
const route = useRoute()
const useStore = useNormalStore()

const cards = ref<CardInfo[]>([])
async function fetchCards() {
  try {
    const action = route.matched[1]?.name === 'PromptDetail' ? getPromptCards : getToolCards
    const data = await action(useStore.tagId, useStore.searchVal, 1)
    cards.value = data || []
  }
  catch (e) {
    console.warn(e)
  }
}
onMounted(() => fetchCards())
</script>
