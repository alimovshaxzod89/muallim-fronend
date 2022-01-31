import axios from '@axios'

export default {
  namespaced: true,
  state: {
    requestRows: [],
    requestTotal: 0,
  },
  getters: {
    requestIndexIds(state) {
        return state.requestRows.map(el => parseInt(el.id)) 
    },
    requestGetById: (state, getters) => (id) => {
        const index = getters.requestIndexIds.indexOf(parseInt(id))
        return state.requestRows[index]
    },
  },
  mutations: {
    requestSetRows(state, payload) {
        state.requestRows = payload;
    },
    requestAddRow(state, payload) {
        state.requestRows.push(payload);
    },
    requestUpdateRow(state, { row, index }) {
        state.requestRows.splice(index, 1, row);
    },
    requestRemoveRow(state, index) {
        state.requestRows.splice(index, 1);
    },
    requestSetTotal(state, payload) {
        state.requestTotal = payload;
    },
    requestIncrementTotal(state) {
        state.requestTotal++
    },
    requestDecrementTotal(state) {
        state.requestTotal--
    },
  },
  actions: {
    requestFetchDatas({ commit }, queryParams) {
        return new Promise((resolve, reject) => {
          axios
            .get('/api/appeals', { params: queryParams })
            .then(response => {
              const { data, total } = response.data
              commit('requestSetRows', data)
              commit('requestSetTotal', total)
   
              resolve(response.data.message)
            })
            .catch(error => reject(error))
        })
    },
    requestAddRow({ commit }, row) {
        return new Promise((resolve, reject) => {
          axios
            .post('api/appeals', row)
            .then(response => {
              if (response.data.success) {
                commit('requestAddRow', response.data.data)
                commit('requestIncrementTotal')
                resolve(response.data.message)
              }
            })
            .catch(error => reject(error))
        })
    },
    requestUpdateRow({ commit, getters }, row) {
        return new Promise((resolve, reject) => {
          axios
            .put(`api/appeals/${row.id}`, row)
            .then(response => {
              if (response.data.success) {
                const index = getters.requestIndexIds.indexOf(parseInt(row.id))
                commit('requestUpdateRow', { row: response.data.data, index })
                resolve(response.data.message)
              }
            }).catch(error => reject(error))
        })
    },
    requestRemoveRow({ commit, getters }, id) {
        return new Promise((resolve, reject) => {
          axios.delete(`api/appeals/${id}`).then(response => {
            if (response.data.success) {
              const index = getters.requestIndexIds.indexOf(id)
              commit('requestRemoveRow', index)
              commit('requestDecrementTotal')
              resolve(response.data.message)
            }
          }).catch(error => reject(error))
        })
    },
  },
}
