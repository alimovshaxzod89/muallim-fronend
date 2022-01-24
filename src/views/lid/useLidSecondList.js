import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useLidSecondList(MODULE_NAME) {

  const selectedSecondTableData = ref([])
  const secondNotify = ref({})

  const secondTableColumns = [
    { text: '#', sortable: false, value: 'index' },
    {
        text: 'AMALLAR',
        value: 'actions',
        align: 'center',
        sortable: false,
    },
    { text: 'NOMI', value: 'name' },
    ]

  const filter = ref({
    query: '',
  })
  const secondOptions = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const secondLoading = ref(false)

  let lastQuery = '';
  const fetchDatas = (force = false) => {

    optsecondOptionsions.value.skip = secondOptions.value.page -1
    secondOptions.value.limit = secondOptions.value.itemsPerPage

    const queryParams = {
      ...secondOptions.value,
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
        .dispatch(`${MODULE_NAME}/fetchDatas`, queryParams)
        .then(() => {
            secondLoading.value = false
        })
        .catch(error => {
          console.log(error)
          secondLoading.value = false
          secondNotify.value = { type: 'error', text: error, time: Date.now() }
        })
    }

    lastQuery = JSON.stringify(queryParams)

  }

  watch(filter, () => {
    if (secondOptions.value.page != 1) secondOptions.value.page = 1
    secondLoading.value = true

    setTimeout(() => fetchDatas(), 1000);
  }, {deep: true})

  watch(secondOptions, () => {
    secondLoading.value = true
    fetchDatas()
    // selectedSecondTableData.value = []
  })

  //delete
  const deleteSecondRow = (id) => {

    store.
        dispatch(`${MODULE_NAME}/removeRow`, id)
        .then((message) => {
            secondNotify.value = { type: 'success', text: message, time: Date.now() }

            fetchDatas(true)

    }).catch(error => {
      console.log(error)
      secondNotify.value = { type: 'error', text: error.message, time: Date.now() }
    })

  }

  return {
    secondTableColumns,
    filter,
    fetchDatas,
    deleteSecondRow,

    secondOptions,
    secondLoading,
    secondNotify,
    selectedSecondTableData
  }
}
