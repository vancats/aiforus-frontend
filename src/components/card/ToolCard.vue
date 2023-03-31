<template>
  <n-card
    class="tool-card" card-tool :bordered="false" hoverable
    @click="router.push('/detail/tool')"
  >
    <img :src="avator" h-36 rounded-t-2xl alt="123">

    <div h-40 p-4 pt-2.5 rounded-b-xl>
      <div text-5.5>
        {{ toolInfo.name }}
      </div>

      <n-ellipsis title-brief :line-clamp="3" :tooltip="false">
        {{ toolInfo.brief }}
      </n-ellipsis>

      <div flex-center-between mt-2>
        <CardTag :tags="tags" />
        <div flex-center>
          <ai-card-fire />
          <span pl-1>{{ toolInfo.pageView }}</span>
        </div>
      </div>
    </div>
  </n-card>
</template>

<script setup lang='ts'>
import avator from '../../assets/images/avatar.png'
import type { TagInfo } from '../layout/type'
import type { CardInfo } from './type'
const { toolInfo, tagList } = defineProps<{
  toolInfo: CardInfo
  tagList: Array<TagInfo>
}>()
const router = useRouter()
const tags = computed(() => {
  return tagList.filter(tag => toolInfo.tags.includes(tag.id)).map(i => i.name)
})
</script>

<style>
.tool-card:hover .tag-card{
    background: #3D3F58;
}
</style>
