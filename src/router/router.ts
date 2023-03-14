import Layout from '~/pages/index.vue'
import CardPage from '~/pages/card/index.vue'
import PromptPage from '~/pages/prompt/index.vue'

const routes = [
  { path: '/', component: Layout },
  { path: '/card/:id', component: CardPage },
  { path: '/prompt/:id', component: PromptPage },
]

export default routes
