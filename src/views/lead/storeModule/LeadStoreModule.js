import axios from '@axios'

export default {
  namespaced: true,
  state: {
    rows: [],
    secondRows: [],
    thirdRows: [],
    total: 0,
    secondTotal: 0,
    thirdTotal: 0,
  },
  getters: {
    indexIds(state) {
      return state.rows.map(el => parseInt(el.id)) 
    },
    indexSecondIds(state){
      return state.secondRows.map(el => parseInt(el.id))
    },
    indexThirdIds(state){
      return state.thirdRows.map(el => parseInt(el.id))
    },
    getById: (state, getters) => (id) => {
      const index = getters.indexIds.indexOf(parseInt(id))
      return state.rows[index]
    },
    getSecondById: (state, getters) => (id) => {
      const index = getters.indexSecondIds.indexOf(parseInt(id))
      return state.secondRows[index]
    },
    getThirdById: (state, getters) => (id) => {
      const index = getters.indexThirdIds.indexOf(parseInt(id))
      return state.thirdRows[index]
    }
  },
  mutations: {
    setRows(state, payload) {
      state.rows = payload;
    },
    setSecondRows(state, payload){
      state.secondRows = payload;
    },
    setThirdRows(state, payload){
      state.thirdRows = payload;
    },
    addRow(state, payload) {
      state.rows.push(payload);
    },
    addSecondRow(state, payload){
      state.secondRows.push(payload);
    },
    addThirdRow(state, payload){
      state.thirdRows.push(payload);
    },
    updateRow(state, { row, index }) {
      state.rows.splice(index, 1, row);
    },
    updateSecondRow(state, { row, index }) {
      state.secondRows.splice(index, 1, row);
    },
    updateThirdRow(state, { row, index }) {
      state.thirdRows.splice(index, 1, row);
    },
    removeRow(state, index) {
      state.rows.splice(index, 1);
    },
    removeSecondRow(state, index) {
      state.secondRows.splice(index, 1);
    },
    removeThirdRow(state, index) {
      state.thirdRows.splice(index, 1);
    },
    setTotal(state, payload) {
      state.total = payload;
    },
    setSecondTotal(state, payload) {
      state.secondTotal = payload;
    },
    setThirdTotal(state, payload) {
      state.thirdTotal = payload;
    },
    incrementTotal(state) {
      state.total++
    },
    incrementSecondTotal(state) {
      state.secondTotal++
    },
    incrementThirdTotal(state) {
      state.thirdTotal++
    },
    decrementTotal(state) {
      state.total--
    },
    decrementSecondTotal(state) {
      state.secondTotal--
    },
    decrementThirdTotal(state) {
      state.thirdTotal--
    },
  },
  actions: {
    fetchDatas({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/leads', { params: queryParams })
          .then(response => {
            const { data, total } = response.data
            commit('setRows', data)
            commit('setTotal', total)
 
            resolve(response.data.message)
          })
          .catch(error => reject(error))
      })
    },
    fetchSecondDatas({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        axios
          .get('/api/leads', { params: queryParams })
          .then(response => {
            const { data, total } = response.data
            commit('setSecondRows', data)
            commit('setSecondTotal', total)
 
            resolve(response.data.message)
          })
          .catch(error => reject(error))
      })
    },
    addRow({ commit }, row) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/leads', row)
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
    addSecondRow({ commit }, row) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/leads', row)
          .then(response => {
            if (response.data.success) {
              commit('addSecondRow', response.data.data)
              commit('incrementSecondTotal')
              resolve(response.data.message)
            }
          })
          .catch(error => reject(error))
      })
    },
    addThirdRow({ commit }, row) {
      return new Promise((resolve, reject) => {
        axios
          .post('api/leads', row)
          .then(response => {
            if (response.data.success) {
              commit('addThirdRow', response.data.data)
              commit('incrementThirdTotal')
              resolve(response.data.message)
            }
          })
          .catch(error => reject(error))
      })
    },
    updateRow({ commit, getters }, row) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/leads/${row.id}`, row)
          .then(response => {
            if (response.data.success) {
              const index = getters.indexIds.indexOf(parseInt(row.id))
              commit('updateRow', { row: response.data.data, index })
              resolve(response.data.message)
            }
          }).catch(error => reject(error))
      })
    },
    updateSecondRow({ commit, getters }, row) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/leads/${row.id}`, row)
          .then(response => {
            if (response.data.success) {
              const index = getters.indexSecondIds.indexOf(parseInt(row.id))
              commit('updateSecondRow', { row: response.data.data, index })
              resolve(response.data.message)
            }
          }).catch(error => reject(error))
      })
    },
    updateThirdRow({ commit, getters }, row) {
      return new Promise((resolve, reject) => {
        axios
          .put(`api/leads/${row.id}`, row)
          .then(response => {
            if (response.data.success) {
              const index = getters.indexThirdIds.indexOf(parseInt(row.id))
              commit('updateThirdRow', { row: response.data.data, index })
              resolve(response.data.message)
            }
          }).catch(error => reject(error))
      })
    },
    removeRow({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/leads/${id}`).then(response => {
          if (response.data.success) {
            const index = getters.indexIds.indexOf(id)
            commit('removeRow', index)
            commit('decrementTotal')
            resolve(response.data.message)
          }
        }).catch(error => reject(error))
      })
    },
    removeSecondRow({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/leads/${id}`).then(response => {
          if (response.data.success) {
            const index = getters.indexSecondIds.indexOf(id)
            commit('removeSecondRow', index)
            commit('decrementSecondTotal')
            resolve(response.data.message)
          }
        }).catch(error => reject(error))
      })
    },
    removeThirdRow({ commit, getters }, id) {
      return new Promise((resolve, reject) => {
        axios.delete(`api/leads/${id}`).then(response => {
          if (response.data.success) {
            const index = getters.indexThirdIds.indexOf(id)
            commit('removeThirdRow', index)
            commit('decrementThirdTotal')
            resolve(response.data.message)
          }
        }).catch(error => reject(error))
      })
    },
  }
}
