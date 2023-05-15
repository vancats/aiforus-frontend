import './styles/reset.css'
import './styles/main.css'
import 'uno.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { isWeChatBrowser } from './utils'
import router from '~/router'

if (isWeChatBrowser() && !location.search.includes('code')) {
  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd4560a239412688e&redirect_uri=https%3A%2F%2Faiforus.cn&response_type=code&scope=snsapi_userinfo&state=login#wechat_redirect'
}

const app = createApp(App)

app.use(router)

const pinia = createPinia()
app.use(pinia)
app.mount('#app')
