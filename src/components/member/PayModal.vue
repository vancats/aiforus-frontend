<template>
  <n-modal
    v-model:show="showModal" preset="card" size="huge" :bordered="false"
    w-139 h-157 rounded-2xl :style="{ background: '#292C3C' }"
    @close="memberStore.showPayModal = false"
  >
    <div flex-center-center-col relative>
      <p text-5.5 font-700 mb-8>
        微信支付
      </p>
      <div text-10.5 font-800 mb-8>
        ￥{{ memberStore?.currentTypeFee }}
      </div>
      <div flex-center-center wh-64 mb-12 relative text-white>
        <img :src="payQRCode" wh-64 rounded-2xl alt="加载二维码失败，请刷新">
        <div v-if="isExpired" absolute flex-center-center wh-64 rounded-2xl bg="#000 opacity-70">
          <span i-mingcute:refresh-1-fill wh-16 cursor @click="onPay" />
        </div>
      </div>
      <p text-5.5 font-700>
        谢谢老板支持，祝老板发财～
      </p>
    </div>
    <template #footer>
      <ai-member-cat w-38 h-30 absolute bottom-0 right-0 />
    </template>
  </n-modal>
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
import { useNormalStore } from '~/store'
import { checkPayStatus, memberPay } from '~/api/member'
import naiveui from '~/utils/naiveui'
const memberStore = useMemberStore()
const useStore = useNormalStore()
const isExpired = ref(false)
const checkedCnt = ref(0)
const payQRCode = ref('')

const startChecked = async () => {
  checkedCnt.value++
  const res = await checkPayStatus(memberStore.payOrderId, memberStore.currentTypeSelect)
  if (res?.code === 200) {
    memberStore.showMemberChargeModal = false
    memberStore.showPayModal = false
    naiveui.message.success('支付成功')
    memberStore.getMemberInfo(useStore.username)
  }
  else if (res?.code === 400 && checkedCnt.value < 105) {
    setTimeout(() => {
      startChecked()
    }, 2000)
  }
  else {
    isExpired.value = true
  }
}

const isFetchEnd = ref(false)
const showModal = computed(() => isFetchEnd.value && memberStore.showPayModal)

const onPay = async () => {
  try {
    isFetchEnd.value = false
    const res = await memberPay(useStore.username, memberStore.currentTypeSelect)
    memberStore.payOrderId = res?.orderId
    payQRCode.value = res?.qrcodeUrl || ''
    checkedCnt.value = 0
    isExpired.value = false
    startChecked()
  }
  catch (e) {
    console.warn(e)
  }
  finally {
    isFetchEnd.value = true
  }
}

watch(() => memberStore.showPayModal, () => {
  if (memberStore.showPayModal) {
    onPay()
  }
})
</script>
