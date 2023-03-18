import Layout from '~/pages/index.vue'
import ToolPage from '~/pages/tool/index.vue'
import PromptPage from '~/pages/prompt/index.vue'
import FeedbackPage from '~/pages/feedback/index.vue'

const routes = [
  { name: 'Home', path: '/', component: Layout },
  { name: 'Tool', path: '/tool/:id', component: ToolPage },
  { name: 'Prompt', path: '/prompt/:id', component: PromptPage },
  { name: 'Feedback', path: '/feedback', component: FeedbackPage },
]

export default routes
