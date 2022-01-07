import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useGroupList(MODULE_NAME) {
  const selectedTableData = ref([])
  const notify = ref({})

  const tableColumns = [
    { text: '#', sortable: false, value: 'index' },
    {
      text: 'AMALLAR',
      value: 'actions',
      align: 'center',
      sortable: false,
    },
    { text: 'RASM', value: 'photo' },
    { text: 'FISH', value: 'full_name' },
    { text: 'TELEFON', value: 'phone' },
    { text: 'TUMAN', value: 'region.name' },
    { text: 'MANZIL', value: 'address' },
    { text: 'D.Y. TUMAN', value: 'permanent_region.name' },
    { text: 'D.Y. MANZIL', value: 'permanent_address' },
    { text: 'JINSI', value: 'gender' },
    { text: "TUG'ILGAN SANA", value: 'birth_date' },
    { text: 'CHEGIRMA', value: 'sale' },
    { text: 'CHEGIRMA SABABI', value: 'sale_cause' },
  ]

  const searchQuery = ref('')
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    first_name: null,
    phone: null,
    region_id: null,
    address: null,
    permanent_region_id: null,
    permanent_address: null,
    gender: null,
    birth_date: null,
    sale: null,
    sale_cause: null,
    limit: 10,
    skip: 0,
  })
  const loading = ref(false)

  let lastQuery = ''
  const fetchDatas = (force = false) => {
    options.value.skip = options.value.page - 1
    options.value.limit = options.value.itemsPerPage

    const queryParams = {
      q: searchQuery.value,
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

  watch(searchQuery, () => {
    if (options.value.page != 1) options.value.page = 1
  })

  watch([searchQuery, options], () => {
    loading.value = true
    fetchDatas()
    // selectedTableData.value = []
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
    tableColumns,
    searchQuery,
    fetchDatas,
    deleteRow,

    options,
    loading,
    notify,
    selectedTableData,
  }
}
