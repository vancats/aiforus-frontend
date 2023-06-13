<template>
  <div>
    <div flex-center-between-row mb-8 pr-14>
      <div w-60 h-10 mr-6>
        <ai-nav-title w-60 h-10 cursor @click="goHome" />
      </div>

      <n-input
        ref="inputRef"
        v-model:value="searchVal"
        px-2 py-2 rounded-xl h="14"
        placeholder="搜索" clearable
        @keyup.enter="onSearch"
      >
        <template #prefix>
          <span i-carbon:search text-white />
        </template>
      </n-input>
      <div px-6 py-3 rounded-2xl bg="#2B2C3E" w-36 flex-center mx-6>
        <ai-member-energy wh-6 mr-2 />
        <span text-5.5 font-400>{{ memberStore.userMemberInfo?.memberEnergy }}</span>
      </div>
      <n-popover v-if="useStore.username" trigger="click" placement="bottom-end" raw :show-arrow="false">
        <template #trigger>
          <div>
            <ai-nav-avator wh-14 />
          </div>
        </template>
        <div bg="#2B2C3E" w-40 rounded-2xl mt-4 px-2 py-2>
          <div flex-center-center mb-2 h-11 rounded-2xl cursor text-white hover:bg="#37384E" @click="memberStore.showMemberChargeModal = true">
            会员充值
          </div>
          <div flex-center-center mb-2 h-11 rounded-2xl cursor text-white hover:bg="#37384E" @click="memberStore.showRedeemCodeModal = true">
            兑换码
          </div>
          <div flex-center-center h-11 rounded-2xl cursor text-white hover:bg="#37384E" @click="showLogoutModal = true">
            退出登陆
          </div>
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
import { exitLogin } from '~/utils/index'
import { useNormalStore, useWebSocketStore } from '~/store'
import { useMemberStore } from '~/store/member'
import naiveui from '~/utils/naiveui'

defineOptions({ name: 'NavBar' })

const router = useRouter()
const useStore = useNormalStore()
const memberStore = useMemberStore()
const useWebSocket = useWebSocketStore()

const goHome = () => router.push('/')

const searchVal = ref('')
const onSearch = () => {
  useStore.searchVal = searchVal.value
  router.push('/search')
}

const showLogoutModal = ref(false)
const logout = () => {
  exitLogin()
  naiveui.message.success('您已退出登陆')
  useWebSocket.ws?.close()
  useStore.username = ''
  showLogoutModal.value = false
  memberStore.resetMemberInfo()
}
</script>
