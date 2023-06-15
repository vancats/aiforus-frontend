import type { UserMemberInfo } from '~/api/member'
import { fetchMemberPayType, getUserInfo } from '~/api/member'

interface TypeInfo {
  payType: number
  duration: number
  perDayFee: number
  wholeFee: number
}

export const useMemberStore = defineStore('member', () => {
  const showMemberChargeModal = ref(false)
  const showPayModal = ref(false)
  const showRedeemCodeModal = ref(false)
  const showEnergyShortageModal = ref(false)
  // 会员档位信息
  const memberTypeInfo = ref<TypeInfo[]>([])
  const currentTypeSelect = ref()
  const currentTypeFee = computed(() => {
    return memberTypeInfo.value.find(type => type.payType === currentTypeSelect.value)?.wholeFee || 0
  })
  const payOrderId = ref()
  const getMemberTypeInfo = async () => {
    try {
      if (memberTypeInfo.value.length > 0) {
        return
      }
      const types = await fetchMemberPayType() || []
      if (types.length > 0) {
        memberTypeInfo.value = types.map(type => {
          return {
            payType: type.payType,
            duration: type.duration,
            perDayFee: Math.round((type.fee / type.duration) * 100) / 10000,
            wholeFee: type.fee / 100,
          }
        }).slice(0, 2)
        currentTypeSelect.value = memberTypeInfo.value[0].payType
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  // 用户会员信息
  const userMemberInfo = ref<UserMemberInfo>()
  const userMemberExpire = computed(() => {
    if (!userMemberInfo.value?.memberExpire || userMemberInfo.value?.memberExpire < 0) return 0

    const now = new Date()
    const diff = userMemberInfo.value.memberExpire * 1000 - now.getTime()
    const days = Math.ceil(diff / (24 * 3600 * 1000))
    return days
  })
  const getMemberInfo = async (userId: string) => {
    try {
      userMemberInfo.value = await getUserInfo(userId)
    }
    catch (error) {
      console.error(error)
    }
  }
  const resetMemberInfo = () => {
    userMemberInfo.value = undefined
  }
  return {
    payOrderId,
    userMemberInfo,
    userMemberExpire,
    showEnergyShortageModal,
    currentTypeSelect,
    currentTypeFee,
    showPayModal,
    showRedeemCodeModal,
    showMemberChargeModal,
    memberTypeInfo,
    getMemberInfo,
    resetMemberInfo,
    getMemberTypeInfo,

  }
})
