import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useRequestList(MODULE_NAME2) {

  const requestSelectedTableData = ref([])
  const notify = ref({})

  const requestTableColumns = [
    { text: '#', sortable: false, value: 'index' },
    {
        text: 'AMALLAR',
        value: 'actions',
        align: 'center',
        sortable: false,
    },
    { text: 'FIO', value: 'full_name' },
    { text: 'TELEFON', value: 'phone' },
    { text: 'IZOH', value: 'note' },
    ]

  const filter = ref({
    query: '',
  })
  const requestOptions = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const requestLoading = ref(false)

  let lastQuery = '';
  const requestFetchDatas = (force = false) => {

    requestOptions.value.skip = requestOptions.value.page -1
    requestOptions.value.limit = requestOptions.value.itemsPerPage

    const queryParams = {
      ...requestOptions.value,
    }

		for (let key in filter.value) {
			let value = filter.value[key]
			if (value !== null && value !== '') {
				queryParams[key] = value
			}
		}

    const newQuery = JSON.stringify(queryParams)

    if (force || lastQuery !== newQuery) {
      lastQuery = newQuery

      store
        .dispatch(`${MODULE_NAME2}/requestFetchDatas`, queryParams)
        .then(() => {
            requestLoading.value = false
        })
        .catch(error => {
          console.log(error)
          requestLoading.value = false
          notify.value = { type: 'error', text: error, time: Date.now() }
        })
    }

    lastQuery = JSON.stringify(queryParams)

  }

  watch(filter, () => {
    if (requestOptions.value.page != 1) requestOptions.value.page = 1
    requestLoading.value = true

    setTimeout(() => requestFetchDatas(), 1000);
  }, {deep: true})

  watch(requestOptions, () => {
    requestLoading.value = true
    requestFetchDatas()
    // selectedTableData.value = []
  })

  //delete
  const requestDeleteRow = (id) => {

    store.
        dispatch(`${MODULE_NAME2}/requestRemoveRow`, id)
        .then((message) => {
            notify.value = { type: 'success', text: message, time: Date.now() }

            fetchDatas(true)

    }).catch(error => {
      console.log(error)
      notify.value = { type: 'error', text: error.message, time: Date.now() }
    })

  }

  return {
    requestTableColumns,
    filter,
    requestFetchDatas,
    requestDeleteRow,

    requestOptions,
    requestLoading,
    notify,
    requestSelectedTableData
  }
}
