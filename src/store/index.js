import Vue from 'vue'
import Vuex from 'vuex'
import vedios from './vedios/index.js'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    vedios
  },
  getters
})

export default store