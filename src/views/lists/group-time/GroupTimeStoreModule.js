import axios from '@axios'

export default {
  namespaced: true,
  state: {
    rows: [],
    total: 0,
  },
  getters: {
    indexIds(state) {
      return state.rows.map(el => parseInt(el.id))
    },
    getById: (state, getters) => id => {
      const index = getters.indexIds.indexOf(parseInt(id))
      return state.rows[index]
    },
		indexCalendar(state) {
			return state.rows.map(el => {

				let date = el.begin_date

				//agar oldingi oydan o'tib kelayotgan bulsa, kalendarda tanlangan oyning 1-sidan qilib kalendarda ko'rsatilsin
				const date1 = new Date(el.begin_date)
				const month1 = date1.getMonth() + 1
				const year = date1.getFullYear()
				if (month1 != state.month) {
					const month = String(state.month).padStart(2, '0')
					date = `${year}-${month}-01`
				}

				return `${time}_${el.room_id}`
			})
		},
  },
  mutations: {
    setRows(state, payload) {
      state.rows = payload
    },
    addRow(state, payload) {
      state.rows.push(payload)
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
    fetchDatas({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/group-times', { params: queryParams })
          .then(response => {
            const { data, total } = response.data
            commit('setRows', data[queryParams.group_id] ?? [])
            commit('setTotal', data[queryParams.group_id] ? data[queryParams.group_id].length : 0)
            // commit('setRows', data)
            // commit('setTotal', total)

            resolve(response.data.message)
          })
          .catch(error => reject(error))
      })
    },
    addRow({ commit }, row) {
      return new Promise((resolve, reject) => {
        axios
          .post('/api/group-times', row)
          .then(response => {
            if (response.data.success) {
              commit('addRow', response.data.data)
              commit('incrementTotal')

              resolve(response.data.message)
            }
          })
          .catch(error => reject(error))
      })
    },
    updateRow({ commit, getters }, row) {
      return new Promise((resolve, reject) => {
        axios
          .put(`/api/group-times/${row.id}`, row)
          .then(response => {
            if (response.data.success) {
              const index = getters.indexIds.indexOf(parseInt(row.id))
              commit('updateRow', { row: response.data.data, index })

              resolve(response.data.message)
            }
          })
          .catch(error => reject(error))
      })
    },
    removeRow({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios
          .delete(`/api/group-times/${id}`)
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
