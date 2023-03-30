<template>
  <div overflow-y-scroll pr-14>
    <div text-xl pb-4>
      热门应用
    </div>
    <div flex overflow-x-scroll>
      <n-card v-for="(tool, index) in 20" :key="index" w-50 h-75 rounded-2xl mr-4 flex-shrink-0 bg-gray>
        {{ tool }}
      </n-card>
      <n-card w-20 h-75 rounded-2xl mr-4 flex-shrink-0 bg-gray @click="router.push('/tool')">
        更多
      </n-card>
    </div>
    <div text-xl pt-8 pb-4>
      热门应用
    </div>
    <div grid grid-cols-2 lg:grid-cols-3 gap-8>
      <n-card v-for="(tool, index) in 20" :key="index" h-40 rounded-2xl mr-4 bg-gray>
        {{ tool }}
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CardType, TagType } from '~/components/Layout/Layout'
import { getCards, getTags } from '~/api'

defineOptions({ name: 'IndexPage' })

const router = useRouter()

const searchVal = ref('')

// Tag
const tags = ref<TagType[]>([])
const fetchTags = async () => {
  const { data } = await getTags()
  const temp = [{
    id: 0,
    name: '全部应用',
    active: true,
  }]
  if (Array.isArray(data?.tagList)) {
    data?.tagList.forEach((item) => {
      temp.push({
        id: item.id,
        name: item.name,
        active: false,
      })
    })
  }
  tags.value = temp
}
const tagChange = (id: number) => {
  let shouldFresh = true
  tags.value.forEach((tag) => {
    if (tag.id === id) {
      if (tag.active) shouldFresh = false
      tag.active = true
    }
    else {
      tag.active = false
    }
  })
  shouldFresh && fetchCards()
}

// List
const listData = ref<CardType[]>([])
async function fetchCards() {
  const query = searchVal.value
  const tag = tags.value.find(i => i.active)?.id
  const { data } = await getCards({ query, tag })
  if (data?.cardList) {
    listData.value = data?.cardList
  }
}

onMounted(() => {
//   fetchTags()
//   fetchCards()
})
</script>

<style>
/* 滚动条 */
::-webkit-scrollbar{
    width: 16px;
    background-color: transparent;
}
/*定义滚动条轨道：内阴影+圆角*/
::-webkit-scrollbar-track {
    background-color:transparent;
}
/*定义滑块：内阴影+圆角*/
::-webkit-scrollbar-thumb {
    background-color: transparent;
}
</style>
