import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var car = localStorage.getItem('car') || ''
export default new Vuex.Store({
  
  state: {
    userInfo: {

    },
    carSum:car
    

  },
  mutations: {
    changeLogin(state, status) {
      state.userInfo = status
    },
    addcarSum(state, status) {
      state.carSum =parseInt(state.carSum+ status)
      localStorage.setItem('car',state.carSum)
    },
    changecarSum(state, status) {
      state.carSum = status
      localStorage.setItem('car',state.carSum)
    },

   
  },
  actions: {
    loginAction({ commit }, user) {
      commit('changeLogin', user)
    }
    
  },
  
})
