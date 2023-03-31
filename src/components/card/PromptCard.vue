<template>
  <n-card class="prompt-card" card-prompt :bordered="false" hoverable @click="router.push('/detail/tool')">
    <div flex>
      <img :src="avator" wh-44 rounded-l-2xl alt="123">

      <div p-4 rounded-r-xl>
        <div flex-center-between mb-2>
          <div text-5.5>
            {{ promptInfo.name }}
          </div>
          <div flex-center>
            <ai-card-fire />
            <span pl-1>{{ promptInfo.pageView }}</span>
          </div>
        </div>

        <n-ellipsis title-brief mb-2 :line-clamp="3" :tooltip="false">
          {{ promptInfo.brief }}
        </n-ellipsis>

        <CardTag :tags="tags" />
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import avator from '../../assets/images/avatar.png'
import type { TagInfo } from '../layout/type'
import type { CardInfo } from './type'

const { promptInfo, tagList } = defineProps<{
  promptInfo: CardInfo
  tagList: Array<TagInfo>
}>()
const router = useRouter()

const tags = computed(() => {
  return tagList.filter(tag => promptInfo.tags.includes(tag.id)).map(i => i.name)
})
</script>

<style>
.prompt-card:hover .tag-card{
    background: #3D3F58;
}
</style>
