import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useRoomList(MODULE_NAME) {

  const selectedTableData = ref([])
  const notify = ref({})

  const tableColumns = [
    { text: '#', sortable: false, value: 'index' },
<<<<<<< HEAD
=======
    { text: 'Bino', value: 'place_id' },
    { text: 'Nomi', value: 'name' },
    { text: "Sig'imi", value: 'capacity' },
    { text: "Aktiv", value: 'status' },
>>>>>>> e4b537ebb708c03885ec9627464c088095aeeace
    {
      text: 'Amallar',
      value: 'actions',
      align: 'center',
      sortable: false,
    },
    { text: 'BINO', value: 'place.name' },
    { text: 'NOMI', value: 'name' },
    { text: "SIG'IMI", value: 'capacity' },
    { text: "AKTIV", value: 'status' },
  ]

  const filter = ref({
    name: '',
  })


  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const loading = ref(false)

  let lastQuery = '';
  const fetchDatas = (force = false) => {

    options.value.skip = options.value.page -1
    options.value.limit = options.value.itemsPerPage

    const queryParams = {
      ...options.value,
    }

    const filterCleared = {}
		for (let key in filter.value) {
			let value = filter.value[key]
			if (value !== null && value !== '') {
				filterCleared[key] = value
			}
		}

    queryParams.filter = filterCleared

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

  watch(filter, () => {
    if (options.value.page != 1) options.value.page
      options.value = true

      setTimeout(() => fetchDatas(), 1000);
  }, {deep: true})

  watch(options, () => {
    loading.value = true
    fetchDatas()
    // selectedTableData.value = []
  })

  //delete
  const deleteRow = (id) => {
    store.dispatch(`${MODULE_NAME}/removeRow`, id)
    .then((message) => {
      notify.value = { type: 'success', text: message, time: Date.now() }

      fetchDatas(true)
    })
    .catch(error => {
      console.log(error)
      notify.value = { type: 'success', text: error.message, time: Date.now() }
    })

  }

  return {
    tableColumns,
    filter,
    fetchDatas,
    deleteRow,

    options,
    loading,
    notify,
    selectedTableData
  }
}














