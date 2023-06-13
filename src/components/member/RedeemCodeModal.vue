<template>
  <n-modal
    v-model:show="memberStore.showRedeemCodeModal" preset="card" size="huge" :bordered="false"
    w-68.5-196 h-74-77 rounded-2xl :style="{ background: '#2B2C3E' }"
    @after-leave="close"
  >
    <div web-only>
      <div flex px-4>
        <div mr-10 flex-col>
          <p text-5.5 font-400>
            输入兑换码
          </p>
          <n-form-item
            :validation-status="inputValidationStatus"
            :feedback="inputFeedback"
            w-99
            mb-6
          >
            <n-input
              v-model:value="code"
              placeholder="输入兑换码"
              bg="#37384E"
              px-2 py-2 rounded-xl h="12"
            />
          </n-form-item>
          <n-button type="primary" mx-auto w-67.5 h-13.5 text-5 font-800 @click="submit">
            立即兑换
          </n-button>
        </div>
        <n-divider vertical h="53!" />
        <div flex-1 flex-center-center-col>
          <p text-5.5 font-400 mb-6>
            扫码进群获取兑换码
          </p>
          <img :src="useStore.wechatQRCode" wh-34 mb-3 rounded-2>
          <p text-3.5 font-400>
            快来薅羊毛～
          </p>
        </div>
      </div>
    </div>

    <template #header>
      <p text-5.5 font-400 mobile-only>
        输入兑换码
      </p>
    </template>
    <div mobile-only>
      <div flex-center-between-col>
        <n-form-item
          :validation-status="inputValidationStatus"
          :feedback="inputFeedback"
          w-full
          mt="-8"
        >
          <n-input
            v-model:value="code"
            placeholder="输入兑换码"
            bg="#37384E"
            rounded-xl h="8"
          />
        </n-form-item>
        <img :src="useStore.wechatQRCode" wh-19.5 mb-2 rounded-2>
        <p text-3.5 font-400 mb-4>
          扫码进群获取兑换码
        </p>
        <n-button type="primary" w-43 h-8 text-4 font-400 @click="submit">
          立即兑换
        </n-button>
      </div>
    </div>
  </n-modal>
</template>

<script setup lang='ts'>
import { useNormalStore } from '~/store/index'
import { useTheCdkey } from '~/api/member'
import naiveui from '~/utils/naiveui'
import { useMemberStore } from '~/store/member'
const useStore = useNormalStore()
const memberStore = useMemberStore()

const code = ref('')
const inputValidationStatus = ref<'error' | 'success' | 'warning' | undefined>('success')
const inputFeedback = ref('')

const refreshModal = () => {
  code.value = ''
  inputValidationStatus.value = 'success'
  inputFeedback.value = ''
}

const close = () => {
  refreshModal()
  memberStore.showRedeemCodeModal = false
}

const submit = async () => {
  try {
    const res = await useTheCdkey(useStore.username, code.value)
    if (res?.toast) {
      naiveui.message.success(res.toast)
      memberStore.getMemberInfo(useStore.username)
    }
    close()
  }
  catch (error) {
    inputValidationStatus.value = 'error'
    inputFeedback.value = '兑换码无效，请检查是否输入无误'
    console.error(error)
  }
}
</script>
