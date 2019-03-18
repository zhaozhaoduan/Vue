//模块导入
import Vue from '../node_modules/vue/dist/vue.js'

import App from './app.js'

new Vue({
	el:'#app',
	components: {
		App
	},
	template: "<App/>"
})