<template>
  <div layout-right-bottom overflow-y-scroll>
    <div flex-start>
      <ai-user-avator wh-14.5-37 bg="#D8B9F6" border="4 solid #FFFFFF" rounded-2xl />
      <div ml-2-6>
        <div text-4-7 font-extrabold mb-1-2 flex-center>
          <ai-member-vector v-if="memberStore.userMemberExpire > 0" mr-2 />
          ID： {{ normalStore.username || '--' }}
        </div>
        <div v-if="memberStore.userMemberExpire > 0" text-3-5>
          会员到期时间： {{ memberStore.userMemberExpire }}天
        </div>
      </div>
      <span text-4-7 ml-2-6 font-extrabold />
    </div>
    <energy-card mt-6 />

    <div v-if="normalStore.username">
      <p text-6 font-700 mb-4 mt-6>
        每日任务
      </p>
      <div flex-wrap>
        <member-activity-card />
      </div>
    </div>

    <div mt-4-10 mb-0-4>
      <n-tabs v-model:value="currentUserTab" type="line" :bar-width="0" size="large">
        <n-tab v-for="tab in userTabs" :key="tab.id" :name="tab.id">
          <span text="4-6!">{{ tab.name }}</span>
        </n-tab>
      </n-tabs>
    </div>
    <user-collect v-if="currentUserTab === UserTabs.collect" />
    <user-creation v-if="currentUserTab === UserTabs.creation" />
    <user-energy v-if="currentUserTab === UserTabs.energy" />
  </div>
</template>

<script setup lang='ts'>
import { UserTabs } from './type'
import { useNormalStore } from '~/store'
import { useMemberStore } from '~/store/member'
const memberStore = useMemberStore()
const normalStore = useNormalStore()

const userTabs = ref([{
  name: '收藏',
  id: UserTabs.collect,
},
// {
//   name: '我的创作',
//   id: UserTabs.creation,
// }, {
//   name: '能量明细',
//   id: UserTabs.energy,
// },
])
const currentUserTab = ref(UserTabs.collect)

onMounted(() => {
  if (!normalStore.username) {
    normalStore.showLoginModal = true
  }
})
</script>
