import axios from '@axios'

export default {
	namespaced: true,
	state: {
		rows: [],
		total: 0,
		list: [],
	},
	getters: {
		indexIds(state) {
			return state.rows.map(el => parseInt(el.id))
		},
		getById: (state, getters) => id => {
			const index = getters.indexIds.indexOf(parseInt(id))
			return state.rows[index]
		},
		getFilteredList: (state) => params => {

			const filter = JSON.parse(JSON.stringify(params))
			delete filter.branch_id
			delete filter.place_id

			if (Object.keys(filter).length) {
				let arr = []

				const filterEntry = Object.entries(filter)

				for (let i = 0; i < state.list.length; i++) {
					let mos = true

					for (let j = 0; j < filterEntry.length; j++) {

						const [key, value] = filterEntry[j]

						if (key === 'group_id') {
							if (!state.list[i].group_ids.includes(value)) {
								mos = false
								break
							}
						} else if (key in state.list[i] && state.list[i][key] != value) {
							mos = false
							break
						}
					}

					if (mos)
						arr.push(state.list[i])
				}

				return arr
			}

			return state.list
		},
	},
	mutations: {
		setList(state, payload) {
			state.list = payload
		},
		setRows(state, payload) {
			state.rows = payload
		},
		addRow(state, payload) {
			state.rows.unshift(payload)
		},
		updateRow(state, { row, index }) {
			state.rows.splice(index, 1, row)
		},
		removeRow(state, index) {
			state.rows.splice(index, 1)
		},
		setTotal(state, payload) {
			state.total = payload
		},
		incrementTotal(state) {
			state.total++
		},
		decrementTotal(state) {
			state.total--
		},
	},
	actions: {
		fetchList({ commit }, place_id) {
			return new Promise((resolve, reject) => {
				axios
					.get(`/api/students-list/${place_id}`)
					.then(response => {
						const { data } = response.data
						commit('setList', data)

						resolve(response.data.message)
					})
					.catch(error => reject(error))
			})
		},
		fetchDatas({ commit }, queryParams) {
			return new Promise((resolve, reject) => {
				axios
					.get('/api/students', { params: queryParams })
					.then(response => {
						const { data, total } = response.data
						commit('setRows', data)
						commit('setTotal', total)

						resolve(response.data.message)
					})
					.catch(error => reject(error))
			})
		},
		addRow({ commit }, row) {
			return new Promise((resolve, reject) => {
				axios
					.post('/api/students', row)
					.then(response => {
						if (response.data.success) {
							commit('addRow', response.data.data)
							commit('incrementTotal')

							resolve(response.data)
						}
					})
					.catch(error => reject(error))
			})
		},
		updateRow({ commit, getters }, row) {
			return new Promise((resolve, reject) => {
				axios
					.put(`/api/students/${row.id}`, row)
					.then(response => {
						if (response.data.success) {
							const index = getters.indexIds.indexOf(parseInt(row.id))
							commit('updateRow', { row: response.data.data, index })

							resolve(response.data)
						}
					})
					.catch(error => reject(error))
			})
		},
		removeRow({ commit, getters }, id) {
			return new Promise((resolve, reject) => {
				axios
					.delete(`/api/students/${id}`)
					.then(response => {
						if (response.data.success) {
							const index = getters.indexIds.indexOf(id)
							commit('removeRow', index)
							commit('decrementTotal')

							resolve(response.data.message)
						}
					})
					.catch(error => reject(error))
			})
		},
	},
}
