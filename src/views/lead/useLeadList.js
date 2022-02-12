import store from '@/store'
import { ref } from '@vue/composition-api'

export default function useLeadList(MODULE_NAME) {
  const notify = ref({})

  const loading = ref(false)

  let lastQuery = ''
  const fetchDatas = (force = false) => {
    // const newQuery = JSON.stringify(queryParams)

    store
      .dispatch(`${MODULE_NAME}/fetchDatas`)
      .then(() => {
        loading.value = false
      })
      .catch(error => {
        console.log(error)
        loading.value = false
        notify.value = { type: 'error', text: error, time: Date.now() }
      })
    // if (force || lastQuery !== newQuery) {
    //   lastQuery = newQuery

    // }

    // lastQuery = JSON.stringify(queryParams)
  }

  // watch(
  //   filter,
  //   () => {
  //     if (options.value.page != 1) options.value.page
  //     loading.value = true

  //     setTimeout(() => fetchDatas(), 1000)
  //   },
  //   { deep: true },
  // )

  // watch(options, () => {
  //   loading.value = true
  //   fetchDatas()
  // })

  //delete
  const deleteRow = id => {
    store
      .dispatch(`${MODULE_NAME}/removeRow`, id)
      .then(message => {
        notify.value = { type: 'success', text: message, time: Date.now() }
        fetchDatas(true)
      })
      .catch(error => {
        console.log(error)
        notify.value = { type: 'error', text: error.message, time: Date.now() }
      })
  }

  return {
    fetchDatas,
    deleteRow,

    // options,
    loading,
    notify,
  }
}
