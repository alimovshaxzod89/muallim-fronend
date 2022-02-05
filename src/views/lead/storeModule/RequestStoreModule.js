import axios from '@axios'

export default {
  namespaced: true,
  state: {
    requestRows: [],
    secondRequestRows: [],
    requestTotal: 0,
    secondRequestTotal: 0,
  },
  getters: {
    requestIndexIds(state) {
        return state.requestRows.map(el => parseInt(el.id)) 
    },
    secondRequestIndexIds(state) {
      return state.secondRequestRows.map(el => parseInt(el.id)) 
    },
    requestGetById: (state, getters) => (id) => {
        const index = getters.requestIndexIds.indexOf(parseInt(id))
        return state.requestRows[index]
    },
    secondRequestGetById: (state, getters) => (id) => {
      const index = getters.secondRequestIndexIds.indexOf(parseInt(id))
      return state.secondRequestRows[index]
    },
  },
  mutations: {
    requestSetRows(state, payload) {
        state.requestRows = payload;
    },
    secondRequestSetRows(state, payload) {
      state.secondRequestRows = payload;
    },
    requestAddRow(state, payload) {
        state.requestRows.push(payload);
    },
    secondRequestAddRow(state, payload) {
      state.secondRequestRows.push(payload);
    },
    requestUpdateRow(state, { row, index }) {
        state.requestRows.splice(index, 1, row);
    },
    secondRequestUpdateRow(state, { row, index }) {
      state.secondRequestRows.splice(index, 1, row);
    },
    requestRemoveRow(state, index) {
        state.requestRows.splice(index, 1);
    },
    secondRequestRemoveRow(state, index) {
      state.secondRequestRows.splice(index, 1);
    },
    requestSetTotal(state, payload) {
        state.requestTotal = payload;
    },
    secondRequestSetTotal(state, payload) {
      state.secondRequestTotal = payload;
    },
    requestIncrementTotal(state) {
        state.requestTotal++
    },
    secondRequestIncrementTotal(state) {
      state.secondRequestTotal++
    },
    requestDecrementTotal(state) {
        state.requestTotal--
    },
    secondRequestDecrementTotal(state) {
      state.secondRequestTotal--
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
    secondRequestFetchDatas({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/appeals', { params: queryParams })
          .then(response => {
            const { data, total } = response.data
            commit('secondRequestSetRows', data)
            commit('secondRequestSetTotal', total)
 
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
    secondRequestAddRow({ commit }, row) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/appeals', row)
          .then(response => {
            if (response.data.success) {
              commit('secondRequestAddRow', response.data.data)
              commit('secondRequestIncrementTotal')
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
    secondRequestUpdateRow({ commit, getters }, row) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/appeals/${row.id}`, row)
          .then(response => {
            if (response.data.success) {
              const index = getters.secondRequestIndexIds.indexOf(parseInt(row.id))
              commit('secondRequestUpdateRow', { row: response.data.data, index })
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
    secondRequestRemoveRow({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/appeals/${id}`).then(response => {
          if (response.data.success) {
            const index = getters.secondRequestIndexIds.indexOf(id)
            commit('secondRequestRemoveRow', index)
            commit('secondRequestDecrementTotal')
            resolve(response.data.message)
          }
        }).catch(error => reject(error))
      })
    },
  },
}
