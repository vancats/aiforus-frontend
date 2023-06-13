<template>
  <n-modal
    v-model:show="memberStore.showMemberChargeModal" preset="card" size="huge" :bordered="false"
    web-only

    w-280 h-197 rounded-2xl :style="{ background: '#292C3C' }"
  >
    <div flex px-4>
      <div flex-1>
        <p text-7 font-500 mb-12>
          开通会员，解锁超值AI权益
        </p>
        <n-space vertical :size="48" mb-19>
          <div flex-center>
            <ai-member-energy-more wh-12 mr-2 />
            <div>
              <p text-5.5 font-600>
                立即获得超多能量
              </p>
              <p text-3.5 color="#9C9CA9">
                充值会员天数x50能量
              </p>
            </div>
          </div>
          <div flex-center>
            <ai-member-double wh-12 mr-2 />
            <div>
              <p font-600 text-5.5>
                立即获得超多能量
              </p>
              <p text-3.5 color="#9C9CA9">
                充值会员天数x50能量
              </p>
            </div>
          </div>
          <div flex-center>
            <ai-member-wechat wh-12 mr-2 />
            <div>
              <p font-600 text-5.5>
                立即获得超多能量
              </p>
              <p text-3.5 color="#9C9CA9">
                充值会员天数x50能量
              </p>
            </div>
          </div>
          <div flex-center>
            <ai-member-new wh-12 mr-2 />
            <div>
              <p font-600 text-5.5>
                立即获得超多能量
              </p>
              <p text-3.5 color="#9C9CA9">
                充值会员天数x50能量
              </p>
            </div>
          </div>
        </n-space>
        <div bg="#37384E" rounded-2xl h-30 pl-6.5 pt-4 relative>
          <p font-700 text-5.5>
            创业不易，老板支持一根猫条叭～
          </p>
          <ai-member-cat w-38 h-30 absolute top-0 right-0 />
          <div class="tri-r-6-#37384e" absolute top-8.5 right="-6" />
        </div>
      </div>
      <div w-130 ml-6 p-8 pt-6 bg="#37384E" rounded-2xl>
        <p text-5.5 font-900 mb-33>
          选择最合适你的会员类型
        </p>
        <div
          v-for="info in memberStore.memberTypeInfo"
          :key="info.payType"
          cursor
          bg="#2B2C3E"
          w-full rounded-2xl flex-center-between px-6 py-4 mt-4
          :style="info.payType === memberStore.currentTypeSelect ? { border: '3px solid #3A50FF' } : ''"
          @click="memberStore.currentTypeSelect = info.payType"
        >
          <div>
            <p flex-center text-5.5 font-900>
              {{ info.duration }}天会员 <span text-4 color="#51F0E3" font-400>（¥{{ info.perDayFee }}/天）</span>
            </p>
            <p flex-center text-3.5 color="#9C9CA9">
              赠{{ info.duration * 50 }}能量 <ai-member-energy wh-4 ml-1 />
            </p>
          </div>
          <p text-7 font-700>
            ¥{{ info.wholeFee }}
          </p>
        </div>

        <div mt-7 flex-center-between>
          <p text-5.5 font-800>
            支付方式
          </p>
          <p flex-center>
            <ai-nav-wechat mr-2 wh-6 /> <span text-5.5 font-400>微信</span>
          </p>
        </div>
        <n-button type="primary" h-17 mt-39 w-full text-5.5 font-800 @click="memberStore.showPayModal = true">
          支持一下
        </n-button>
      </div>
    </div>
  </n-modal>

  <n-drawer
    v-model:show="memberStore.showMemberChargeModal"
    mobile-only
    :show-mask="false"
    :default-height="677"
    placement="bottom"
    :mask-closable="false"
    :block-scroll="false"
    rounded-8
  >
    <div px-8 py-10>
      <div text-7.5 font-900 text-center mb-6>
        升级提升聊天体验
      </div>
      <n-space vertical :size="14" mb-8 bg="#151424" px-6.5 py-6 rounded-2xl>
        <div flex-center>
          <ai-member-energy-more wh-8 mr-2 />
          <div>
            <p text-4 font-700>
              立即获得超多能量
            </p>
            <p text-3 color="#9C9CA9">
              充值会员天数x50能量
            </p>
          </div>
        </div>
        <div flex-center>
          <ai-member-double wh-8 mr-2 />
          <div>
            <p text-4 font-700>
              立即获得超多能量
            </p>
            <p text-3 color="#9C9CA9">
              充值会员天数x50能量
            </p>
          </div>
        </div>
        <div flex-center>
          <ai-member-wechat wh-8 mr-2 />
          <div>
            <p text-4 font-700>
              立即获得超多能量
            </p>
            <p text-3 color="#9C9CA9">
              充值会员天数x50能量
            </p>
          </div>
        </div>
      </n-space>

      <div
        v-for="info in memberStore.memberTypeInfo"
        :key="info.payType"
        cursor mt-9 bg="#2B2C3E" w-full rounded-2xl flex-center-between px-6 py-4
        :style="info.payType === memberStore.currentTypeSelect ? { border: '1px solid #3A50FF' } : ''"
        @click="memberStore.currentTypeSelect = info.payType"
      >
        <div>
          <p flex-center text-5 font-400>
            {{ info.duration }}天会员 <span text-4 color="#51F0E3" font-500>（¥{{ info.perDayFee }}/天）</span>
          </p>
          <p flex-center text-3 color="#9C9CA9">
            赠{{ info.duration * 50 }}能量 <ai-member-energy wh-3 ml-1 />
          </p>
        </div>
        <p text-5 font-400>
          ¥{{ info.wholeFee }}
        </p>
      </div>

      <n-button type="primary" absolute bottom-6 left-8 right-8 rounded-2xl h-12 text-4.5 font-700 @click="memberStore.showPayModal = true">
        支持一下
      </n-button>
    </div>
  </n-drawer>

  <PayModal />
</template>

<script setup lang='ts'>
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()

onBeforeMount(async () => {
  await memberStore.getMemberTypeInfo()
})
</script>
