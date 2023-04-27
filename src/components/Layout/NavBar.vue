<template>
  <div>
    <div flex-center-between-row mb-8 pr-14>
      <div w-60 h-10 mr-6>
        <ai-nav-title w-60 h-10 cursor @click="goHome" />
      </div>

      <n-input
        ref="inputRef"
        v-model:value="searchVal"
        px-2 py-2 rounded-xl h="12"
        placeholder="搜索" clearable
        @keyup.enter="onSearch"
      >
        <template #prefix>
          <span i-carbon:search text-white />
        </template>
      </n-input>

      <n-popover v-if="useStore.username" trigger="click" placement="bottom" raw :show-arrow="false">
        <template #trigger>
          <div flex-center-center w-55 h-12 ml-6 p-2 rounded-2xl cursor bg="#2B2C3E">
            <ai-nav-avator wh-7 />
            <span text-4.5 mx-2>
              {{ useStore.username || 'AIS2688152' }}
            </span>
            <ai-card-arrow wh-4 />
          </div>
        </template>

        <div flex-center-center h-8 px-13 rounded-2xl cursor text-white bg="#2B2C3E" @click="showLogoutModal = true">
          退出登陆
        </div>
      </n-popover>

      <n-button v-else type="primary" ml-10 h-12 p-4 @click="useStore.showLoginModal = true">
        登录/注册
      </n-button>
    </div>

    <n-modal v-model:show="showLogoutModal">
      <n-card
        style="width: 480px; background: #2b2c3d; border-radius: 12px"
        size="huge" :bordered="false" role="dialog" aria-modal="true"
      >
        <template #header>
          <div flex-center>
            <ai-nav-warning mr-2 />
            退出登陆
          </div>
        </template>
        退出登陆后访问AI应用可能受限，确定退出吗？
        <template #footer>
          <div flex-center-center>
            <n-button px-7 mr-4 @click="showLogoutModal = false">
              取消
            </n-button>
            <n-button type="primary" px-7 @click="logout">
              确定
            </n-button>
          </div>
        </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { removeLocalItem } from '../../utils/index'
import { useNormalStore, useWebSocketStore } from '~/store'
import naiveui from '~/utils/naiveui'
defineOptions({ name: 'NavBar' })

const router = useRouter()
const useStore = useNormalStore()
const useWebSocket = useWebSocketStore()

const goHome = () => router.push('/')

const searchVal = ref('')
const onSearch = () => {
  useStore.searchVal = searchVal.value
  router.push('/search')
}

const showLogoutModal = ref(false)
const logout = () => {
  removeLocalItem('token')
  removeLocalItem('username')
  naiveui.message.success('您已退出登陆')
  useWebSocket.ws?.close()
  useStore.username = ''
  showLogoutModal.value = false
}
</script>
