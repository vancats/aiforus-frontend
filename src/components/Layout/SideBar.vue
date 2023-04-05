<template>
  <div flex-col p-2 pt-40 bg="#242635">
    <div side-icon :style="getStyle('/')" @click="router.push('/')">
      <ai-side-home wh-8 />
      <div pt-2 text-sm>
        主页
      </div>
    </div>
    <div side-icon :style="getStyle('/tool')" @click="router.push('/tool')">
      <ai-side-tool wh-8 />
      <div pt-2 text-sm>
        AI应用
      </div>
    </div>
    <div side-icon :style="getStyle('/prompt')" @click="router.push('/prompt')">
      <ai-side-prompt wh-8 />
      <div pt-2 text-sm>
        AI小工具
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const router = useRouter()
const route = useRoute()
const getStyle = (path: string) => {
  if (path === route.path) {
    return 'color: #FFFFFF; background: linear-gradient(#5779FF, #A47FFA)'
  }
  return ''
}
</script>
