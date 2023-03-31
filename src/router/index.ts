import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/pages/index.vue'
const _import = (path: string, name = 'index') => () => import(`~/pages/${path}/${name}.vue`)

const routes = [
  { name: 'Home', path: '/', component: Layout },
  { name: 'Tool', path: '/tool', component: _import('tool') },
  { name: 'Prompt', path: '/prompt', component: _import('prompt') },
  { name: 'Search', path: '/search', component: _import('search') },
  { name: 'ToolDetail', path: '/detail/tool', component: _import('detail', 'tool') },
  { name: 'PromptDetail', path: '/detail/prompt', component: _import('detail', 'prompt') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
