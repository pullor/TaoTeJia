/**
 * Created by AIl on 2017/11/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    yhprice: ''
  },
  mutations: {
    changeyh (state, val) {
      state.yhprice = val
    }
  }
})
