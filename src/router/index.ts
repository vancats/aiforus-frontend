import { createRouter, createWebHistory } from 'vue-router'
import Layout from '~/pages/index.vue'
const _import = (path: string, name = 'index') => () => import(`~/pages/${path}/${name}.vue`)

const routes = [
  {
    name: 'Home',
    path: '/',
    component: Layout,
    meta: { showSearch: true, showTabBar: true },
  },
  {
    name: 'Tool',
    path: '/tool',
    component: _import('tool'),
    meta: { showSearch: true, showTabBar: true },
  },
  {
    name: 'Prompt',
    path: '/prompt',
    component: _import('prompt'),
    meta: { showSearch: true, showTabBar: true },
  },
  {
    name: 'Search',
    path: '/search',
    component: _import('search'),
    meta: { showSearch: true, showTabBar: true },
  },
  {
    name: 'Detail',
    path: '/detail',
    component: _import('detail'),
    children: [
      {
        name: 'ToolDetail',
        path: '/detail/tool/:id',
        component: _import('detail', 'tool'),
        meta: { showTabBar: false },
      },
      {
        name: 'PromptDetail',
        path: '/detail/prompt/:id',
        component: _import('detail', 'prompt'),

        meta: { showTabBar: false },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
