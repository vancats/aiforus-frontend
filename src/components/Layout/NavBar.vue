<template>
  <div flex-center-between-row mb-8 pr-14>
    <span
      w-110 text-5xl cursor text="#A47FFA"
      style="font-family: AlibabaPuHuiTi-ExtraBold"
      @click="goHome"
    >
      <n-gradient-text :gradient="{ from: '#5779FF', to: '#A47FFA', deg: '90' }">
        AI FOR US
      </n-gradient-text>
    </span>

    <n-input
      ref="inputRef"
      v-model:value="searchVal"
      px-2 py-2 rounded-2xl
      h="12"
      placeholder="搜索" clearable
      @keyup.enter="onSearch"
    >
      <template #prefix>
        <span i-carbon:search text-white />
      </template>
    </n-input>

    <n-button type="primary" ml-10 h-12 p-4 @click="onLogin">
      登录/注册
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { login } from '~/api/login'

defineOptions({ name: 'NavBar' })

const router = useRouter()
const goHome = () => router.push('/')
const searchVal = ref('')

// const searchFocus = ref(false)
// const inputRef = ref(null)
// onClickOutside(inputRef, () => searchFocus.value = false)

const onSearch = () => {
//   sessionStorage.setItem('feedback-search', searchVal.value)
  router.push('/search')
  searchVal.value = ''
}

const onLogin = async () => {
  await login()
}
</script>
