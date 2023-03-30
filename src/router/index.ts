import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/pages/index.vue'
import ToolPage from '~/pages/tool/index.vue'
import PromptPage from '~/pages/prompt/index.vue'
// import FeedbackPage from '~/pages/feedback/index.vue'

const routes = [
  { name: 'Home', path: '/', component: Layout },
  { name: 'Tool', path: '/tool', component: ToolPage },
  { name: 'Prompt', path: '/prompt', component: PromptPage },
  { name: 'Feedback', path: '/feedback', component: Layout },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router