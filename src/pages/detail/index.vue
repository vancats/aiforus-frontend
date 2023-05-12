<template>
  <div class="nav-card" mobile-only flex-center my-3 mr-3>
    <div h-8 mr-2>
      <ai-common-back @click="goBack" />
    </div>
    <div flex h-8 overflow-x-scroll overflow-y-hidden>
      <template v-for="card in cards.slice(0, 20)" :key="card.id">
        <DetailNavCard :card-info="card" />
      </template>
    </div>
  </div>

  <div flex pb-4 layout-right overflow-y-scroll>
    <div web-only w-140 mr-4 pr-2 overflow-y-scroll>
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
    const index = cards.value.findIndex(card => String(card.id) === route.params.id)
    if (index !== -1) {
      [cards.value[0], cards.value[index]] = [cards.value[index], cards.value[0]]
    }
  }
  catch (e) {
    console.warn(e)
  }
}

// 保存前置路由以跳转
const prevRoute = ref<any>(null)
onMounted(() => {
  fetchCards()
  prevRoute.value = router.options.history.state.back
})

const goBack = () => {
  if (window.history.length > 1 && route.path !== prevRoute.value) {
    router.push(prevRoute.value)
  }
  else {
    router.push('/')
  }
}
</script>

<style>
/* 滚动条 */
.nav-card ::-webkit-scrollbar{
    height: 0;
}
</style>
