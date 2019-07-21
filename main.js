import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

// Vue.prototype.serverUrl = "https://www.imovietrailer.com/superhero";			// 生产环境
// Vue.prototype.serverUrl = "https://www.imovietrailer-dev.com/superhero";		// 开发环境
 Vue.prototype.serverUrl = "http://www.wcf-monkey.top:8001/renren-api";		// 开发环境



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
