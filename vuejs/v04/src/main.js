import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 라우팅을 위한 구문추가

const app = createApp(App)
app.use(router).mount('#app')
app.config.globalProperties.$myname = '홍길동' // 전역변수 설정
app.config.globalProperties.$myfn = () => alert('짜잔!!') // 전역변수 설정
