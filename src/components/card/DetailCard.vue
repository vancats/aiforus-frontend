<template>
  <n-card class="detail-card" card-detail :bordered="false" hoverable>
    <div flex>
      <img :src="avator" w-30 h-30 rounded-l-2xl alt="123">

      <div h-40 p-4 rounded-r-xl>
        <div flex-center-between mb-2>
          <div text-5.5>
            {{ cardInfo.name }}
          </div>
          <div flex-center>
            <ai-card-fire />
            <span pl-1>{{ cardInfo.pageView }}</span>
          </div>
        </div>

        <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
          {{ cardInfo.brief }}
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

const { cardInfo, tagList } = defineProps<{
  cardInfo: CardInfo
  tagList: Array<TagInfo>
}>()

const tags = computed(() => {
  return tagList.filter(tag => cardInfo.tags.includes(tag.id)).map(i => i.name)
})
</script>

<style>
.detail-card:hover .tag-card{
    background: #3D3F58;
}
</style>
