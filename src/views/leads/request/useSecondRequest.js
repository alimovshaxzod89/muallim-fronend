import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useSecondRequestList(MODULE_NAME) {

  const secondRequestSelectedTableData = ref([])
  const notify = ref({})

  const secondRequestTableColumns = [
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
  const secondRequestOptions = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const secondRequestLoading = ref(false)

  let lastQuery = '';
  const secondRequestFetchDatas = (force = false) => {

    secondRequestOptions.value.skip = (secondRequestOptions.value.page -1) * (secondRequestOptions.value.itemsPerPage == -1 ? 0:  secondRequestOptions.value.itemsPerPage)
    secondRequestOptions.value.limit = secondRequestOptions.value.itemsPerPage

    const queryParams = {
      ...secondRequestOptions.value,
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
        .dispatch(`${MODULE_NAME}/secondRequestFetchDatas`, queryParams)
        .then(() => {
            secondRequestLoading.value = false
        })
        .catch(error => {
          console.log(error)
          secondRequestLoading.value = false
          notify.value = { type: 'error', text: error, time: Date.now() }
        })
    }

    lastQuery = JSON.stringify(queryParams)

  }

  watch(filter, () => {
    if (secondRequestOptions.value.page != 1) secondRequestOptions.value.page = 1
    secondRequestLoading.value = true

    setTimeout(() => secondRequestFetchDatas(), 1000);
  }, {deep: true})

  watch(secondRequestOptions, () => {
    secondRequestLoading.value = true
    secondRequestFetchDatas()
    // selectedTableData.value = []
  })

  //delete
  const secondRequestDeleteRow = (id) => {

    store.
        dispatch(`${MODULE_NAME}/secondRequestRemoveRow`, id)
        .then((message) => {
            notify.value = { type: 'success', text: message, time: Date.now() }

            secondRequestFetchDatas(true)

    }).catch(error => {
      console.log(error)
      notify.value = { type: 'error', text: error.message, time: Date.now() }
    })

  }

  return {
    secondRequestTableColumns,
    filter,
    secondRequestFetchDatas,
    secondRequestDeleteRow,

    secondRequestOptions,
    secondRequestLoading,
    notify,
    secondRequestSelectedTableData
  }
}
