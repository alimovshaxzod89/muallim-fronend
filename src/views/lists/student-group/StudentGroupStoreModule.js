import axios from '@axios'

export default {
  namespaced: true,
  state: {
    rows: [],
    total: 0
  },
  getters: {
    indexIds(state) {
      return state.rows.map(el => parseInt(el.id))
    },
    getById: (state, getters) => (id) => {
      const index = getters.indexIds.indexOf(parseInt(id))
      return state.rows[index]
    }
  },
  mutations: {
    setRows(state, payload) {
      state.rows = payload;
    },
    addRow(state, payload) {
      state.rows.push(payload);
    },
    updateRow(state, { row, index }) {
      state.rows.splice(index, 1, row);
    },
    removeRow(state, index) {
      state.rows.splice(index, 1);
    },
    setTotal(state, payload) {
      state.total = payload;
    },
    incrementTotal(state) {
      state.total++
    },
    decrementTotal(state) {
      state.total--
    }

  },
  actions: {
    fetchDatas({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/student-groups', { params: queryParams })
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
          .post('api/student-groups', row)
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
          .put(`api/student-groups/${row.id}`, row)
          .then(response => {
            if (response.data.success) {

              const index = getters.indexIds.indexOf(parseInt(row.id))
              commit('updateRow', { row: response.data.data, index })

              resolve(response.data)
            }
          }).catch(error => reject(error))

      })
    },
    removeRow({ commit, getters }, id) {

      return new Promise((resolve, reject) => {

        axios.delete(`api/student-groups/${id}`).then(response => {
          if (response.data.success) {

            const index = getters.indexIds.indexOf(id)
            commit('removeRow', index)
            commit('decrementTotal')

            resolve(response.data.message)
          }
        }).catch(error => reject(error))

      })

    },
  }
}
