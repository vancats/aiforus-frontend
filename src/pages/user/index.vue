<template>
  <div layout-right-bottom overflow-y-scroll>
    <div flex-start>
      <ai-user-avator wh-14.5-37 bg="#D8B9F6" border="4 solid #FFFFFF" rounded-2xl />
      <span text-4-7 ml-2-6 font-extrabold>
        UID： {{ normalStore.username || '--' }}
      </span>
    </div>
    <div mt-4-10 mb-0-4>
      <p text-4-6 font-700 mb-2-6>
        收藏
      </p>
      <n-divider my="0!" />
    </div>
    <n-tabs v-model:value="activeType" :bar-width="24" size="large">
      <n-tab v-for="tab in cardTypeTabs" :key="tab.id" :name="tab.id">
        <span text="4-5!">{{ tab.name }}</span>
      </n-tab>
    </n-tabs>
    <div v-if="currentCardsData.length" mt-3-6>
      <TagList v-model:active-tag="activeTag" :tag-list="currentCardsTags" />

      <div prompt-layout>
        <template v-for="card in currentCardsData" :key="card.id">
          <DetailCard :card-info="card" />
        </template>
      </div>
    </div>
    <div v-else text-center mt-50>
      <p text-4-6 mb-10>
        快去看看有没有你感兴趣的{{ cardTypeTabs[activeType].name }}吧！
      </p>
      <n-button type="primary" @click="searchMore">
        去看看
      </n-button>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useNormalStore } from '~/store'
import type { CardInfo } from '~/components/card/type'
import type { TagInfo } from '~/utils/type'
import { CardType } from '~/components/card/type'
import { getActualTag, getTargetTagCard } from '~/utils'
import { useCollectStore } from '~/store/collect'

const normalStore = useNormalStore()
const collectStore = useCollectStore()

const cardTypeTabs = ref([{
  name: 'AI小工具',
  id: CardType.prompt,
},
{
  name: 'AI应用',
  id: CardType.tool,
}])

// 切换标签
const activeTag = ref(0)
watch(() => activeTag.value, () => {
  filterCardsData()
})

// 切换类型
const activeType = ref<CardType>(CardType.prompt)
watch(() => activeType.value, async () => {
  await searchCardsData()
  activeTag.value = 0
})

const router = useRouter()
const searchMore = () => {
  switch (activeType.value) {
    case CardType.prompt:
      router.push('./prompt')
      break
    case CardType.tool:
      router.push('./tool')
      break
    default:
      break
  }
}

const currentCardsData = ref<CardInfo[]>([])
const currentCardsTags = ref<TagInfo[]>([])
onMounted(() => {
  if (!normalStore.username) {
    normalStore.showLoginModal = true
  }
  searchCardsData()
})

// 登录状态变化后，需要更新一下收藏状态
watch(() => normalStore.username, async () => {
  await collectStore.refreshWholeCollectedCard(normalStore.username, activeType.value)
  searchCardsData()
})

// 获取卡片数据和实际的标签数据
async function searchCardsData() {
  if (!normalStore.username) {
    currentCardsData.value = []
    currentCardsTags.value = []
    return
  }
  currentCardsData.value = await collectStore.getWholeCollectedCard(normalStore.username, activeType.value)
  const tagsAll = await collectStore.getWholeCardsTags(activeType.value)
  currentCardsTags.value = getActualTag(currentCardsData.value, tagsAll)
}

// 筛选当前标签数据
async function filterCardsData() {
  const dataAll = await collectStore.getWholeCollectedCard(normalStore.username, activeType.value)
  currentCardsData.value = getTargetTagCard(dataAll || [], [activeTag.value])
}
</script>
