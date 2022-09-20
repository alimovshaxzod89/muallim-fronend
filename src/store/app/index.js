import store from '@/store'

export default {
	namespaced: true,
	state: {
		shallContentShowOverlay: false,
		branch: {},
	},
	getters: {},
	mutations: {
		TOGGLE_CONTENT_OVERLAY(state, value) {
			state.shallContentShowOverlay = value !== undefined ? value : !state.shallContentShowOverlay
		},

		SET_BRANCH(state, value) {
			state.branch = value
			if (value.id) {
				store.commit('SET_BRANCH_ID', value.id)
				store.commit('SET_BRANCH_NAME', value.name)
			} else {
				store.commit('SET_BRANCH_ID', null)
				store.commit('SET_BRANCH_NAME', null)
			}
		},
	},
	actions: {
		changeBranch({ commit }, branch) {
			commit('SET_BRANCH', branch)
			localStorage.setItem('branch', JSON.stringify(branch))
		},
		setBranch({ commit, dispatch }, branch) {
			dispatch('changeBranch', branch)
		}
	},
}
