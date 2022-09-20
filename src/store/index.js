import appConfigStoreModule from '@core/@app-config/appConfigStoreModule'
import Vue from 'vue'
import Vuex from 'vuex'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
		branch_id: null,
		branch_name: null,
	},
  mutations: {
		SET_BRANCH_ID(state, value) {
			state.branch_id = value
		},
		SET_BRANCH_NAME(state, value) {
			state.branch_name = value
		}
	},
  actions: {},
  modules: {
    appConfig: appConfigStoreModule,
    app,
  },
})
