<template>
  <div>
    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go"
    />
    <TheCounter :initial="1" />
    <n-button>naive-ui</n-button>
    <div>
      <button
        class="m-3 text-sm btn"
        :disabled="!name"
        @click="go"
      >
        Go
      </button>
    </div>
  </div>
</template>

<script setup lang="ts" generic="T extends any, O extends any">
defineOptions({
  name: 'IndexPage',
})

const name = $ref('')

const router = useRouter()
const go = () => {
  if (name)
    router.push(`/hi/${encodeURIComponent(name)}`)
}
</script>
