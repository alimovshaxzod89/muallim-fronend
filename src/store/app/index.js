import store from '@/store'

export default {
	namespaced: true,
	state: {
		shallContentShowOverlay: false,
		branch: {},
		user: { role: null },
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


		SET_USER_ROLE(state, value) {
			if (value) {
				state.user.role = value
				store.commit('SET_USER_ROLE', value)
			} else {
				state.user.role = null
				store.commit('SET_USER_ROLE', null)
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
		},
		setUserRole({ commit }, role) {
			commit('SET_USER_ROLE', role)
		},
	},
}
