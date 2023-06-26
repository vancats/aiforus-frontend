<template>
  <div px-4-6 py-4-6 rounded-2xl bg="#2B2C3E" w-full sm:w-98 flex-center>
    <ai-activity-calendar wh-6-12 mr-2-3 />
    <span text-4-5 font-400 mr-1>每日登录 +</span>
    <ai-member-energy wh-3.5-6 mr-1 />
    <span text-3.5-7 font-800>{{ memberStore.userMemberExpire > 0 ? ENERGY_CHECK_IN * 2 : ENERGY_CHECK_IN }}</span>
    <n-button type="primary" w-22 ml-auto h-6-8.5 :disabled="isHasDone" :style="{ background: isHasDone ? '#303245' : '#3A50FF', color: isHasDone ? '#9C9CA9' : '#FFFFFF' }" @click="checkIn">
      {{ isHasDone ? '成功' : "签到" }}
    </n-button>
  </div>
</template>

<script setup lang='ts'>
import { ENERGY_CHECK_IN } from './const'
import { useMemberStore } from '~/store/member'
import { userCheckIn } from '~/api/member'
import { useNormalStore } from '~/store'
import naiveui from '~/utils/naiveui'
const useStore = useNormalStore()
const memberStore = useMemberStore()
const isHasDone = computed(() => memberStore.userMemberInfo?.isCheckin === '1')
const checkIn = async () => {
  try {
    const res = await userCheckIn(useStore.username)
    if (res?.toast) {
      naiveui.message.success(res.toast)
      memberStore.getMemberInfo(useStore.username)
    }
  }
  catch (error) {
    console.error(error)
  }
}
</script>
