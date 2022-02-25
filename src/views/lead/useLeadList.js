import store from '@/store'
import { ref, onBeforeMount } from '@vue/composition-api'

export default function useLeadList(MODULE_NAME) {
  const notify = ref({})
  const loading = ref(false)

  const fetchDatas = () => {
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
  }
  onBeforeMount(() => {
    fetchDatas()
  })

  // Delete
  const deleteRow = id => {
    store
      .dispatch(`${MODULE_NAME}/removeRow`, id)
      .then(message => {
        notify.value = { type: 'success', text: message, time: Date.now() }
        fetchDatas()
      })
      .catch(error => {
        console.log(error)
        notify.value = { type: 'error', text: error.message, time: Date.now() }
      })
  }

  return {
    notify,
    loading,

    fetchDatas,
    deleteRow,
  }
}
