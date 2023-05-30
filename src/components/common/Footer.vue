<template>
  <div text-center title-brief py-4 cursor @click="linkToOutside">
    备案号：京ICP备2021032068号-2
  </div>
</template>

<script setup lang='ts'>
const linkToOutside = () => {
  window.open('https://beian.miit.gov.cn/')
}
</script>
