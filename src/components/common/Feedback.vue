<template>
  <div text="center" my-16>
    <div text-xl>
      老板，搜索不到“{{ keyword }}”，换个关键词试试
    </div>
    <div mt-10 mb-17 cursor text="#3A50FF" @click="showModal = true">
      没有找到可用ai应用？点击向我们反馈
    </div>
  </div>

  <n-modal v-model:show="showModal">
    <n-card
      style="width: 480px; background: #3D3E59"
      title="问题与反馈"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      内容
      <template #footer>
        <n-space>
          <n-button>
            取消
          </n-button>
          <n-button type="primary">
            确定
          </n-button>
        </n-space>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang='ts'>
defineProps<{ keyword: string }>()

const showModal = ref(false)
</script>
