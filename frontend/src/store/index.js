// import { from } from 'core-js/core/array'
import Vue from 'vue'
import Vuex from 'vuex'
import {toyStore} from './toy.store.js'
import {userStore} from './user.store.js'
import {reviewStore} from './review.store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  modules: {
    toyStore,
    userStore,
    reviewStore
  }
})
