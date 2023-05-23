<template>
  <div layout-right-bottom overflow-y-scroll>
    <div flex-start>
      <ai-user-avator wh-14.5-37 bg="#D8B9F6" border="4 solid #FFFFFF" rounded-2xl />
      <span text-4-7 ml-2-6 font-extrabold>
        UID： {{ normalStore.username || '--' }}
      </span>
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
