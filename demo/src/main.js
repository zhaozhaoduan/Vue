import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state:{ 
    products: [
      {id: 1, name: '鼠标', price: 20},
      {id: 2, name: '键盘', price: 40},
      {id: 3, name: '耳机', price: 60},
      {id: 4, name: '显示屏', price: 80}
    ]
  },
  getters: {
    salePruducts: (state) => {
      let salePruducts = state.products.map(product =>{
        return {
          id: product.id,
          name: product.name,
          price: product.price/2
        }
      })
      return salePruducts;
    }
  },
  mutations: {
    minusPrice(state, payload){
      let newPrice = state.products.forEach(product =>{
        product.price -= payload
      })
    }
  },
  actions: {//异步的方式更改数据
    minusPriceAsync(context, payload) {
      setTimeout(() => {
        context.commit('minusPrice', payload)
      }, 2000)
    }
  }
})





Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
