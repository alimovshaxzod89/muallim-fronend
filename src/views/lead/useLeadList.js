import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useLeadList(MODULE_NAME) {
  const notify = ref({})

  // const tableColumns = [
  //   { text: '#', sortable: false, value: 'index' },
  //   {
  //     text: 'AMALLAR',
  //     value: 'actions',
  //     align: 'center',
  //     sortable: false,
  //   },
  //   { text: 'ISMI', value: 'first_name' },
  //   { text: 'FAMILIYASI', value: 'last_name' },
  //   { text: 'SHARIFI', value: 'middle_name' },
  //   { text: 'TELEFON', value: 'phone' },
  //   { text: 'TUMAN', value: 'region_id' },
  //   { text: 'MANZIL', value: 'address' },
  //   { text: 'D.Y. TUMAN', value: 'permanent_region_id' },
  //   { text: 'D.Y. Manzili', value: 'permanent_address' },
  //   { text: 'JINSI', value: 'gender' },
  //   { text: "TUG'ILGAN SANASI", value: 'birth_date' },
  // ]

  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const loading = ref(false)

  let lastQuery = ''
  const fetchDatas = (force = false) => {
    options.value.skip = options.value.page - 1
    options.value.limit = options.value.itemsPerPage

    const queryParams = {
      ...options.value,
    }

    const newQuery = JSON.stringify(queryParams)

    if (force || lastQuery !== newQuery) {
      lastQuery = newQuery

      store
        .dispatch(`${MODULE_NAME}/fetchDatas`, queryParams)
        .then(() => {
          loading.value = false
        })
        .catch(error => {
          console.log(error)
          loading.value = false
          notify.value = { type: 'error', text: error, time: Date.now() }
        })
    }

    lastQuery = JSON.stringify(queryParams)
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

  watch(options, () => {
    loading.value = true
    fetchDatas()
  })

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
    // tableColumns,
    fetchDatas,
    deleteRow,

    options,
    loading,
    notify,
  }
}
