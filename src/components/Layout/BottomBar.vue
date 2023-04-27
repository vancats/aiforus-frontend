<template>
  <template v-if="route.meta.showTabBar">
    <div fixed left-0 right-0 bottom-0 p-2 bg="#242635">
      <div flex-center-around>
        <div side-icon :style="getStyle('/')" @click="router.push('/')">
          <ai-side-home wh-6 />
          <div pt-2 text-sm>
            主页
          </div>
        </div>
        <div side-icon :style="getStyle('/tool')" @click="router.push('/tool')">
          <ai-side-tool wh-6 />
          <div pt-2 text-sm>
            AI应用
          </div>
        </div>
        <div side-icon :style="getStyle('/prompt')" @click="router.push('/prompt')">
          <ai-side-prompt wh-6 />
          <div pt-2 text-sm>
            AI小工具
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang='ts'>
const router = useRouter()
const route = useRoute()

const getStyle = (path: string) => {
  if (path !== route.path) return ''
  return 'color: #FFFFFF;'
}
</script>
