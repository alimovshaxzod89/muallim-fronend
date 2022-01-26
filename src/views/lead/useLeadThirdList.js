import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useThirdList(MODULE_NAME) {

  const selectedThirdTableData = ref([])
  const thirdNotify = ref({})

  const thirdTableColumns = [
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
  const thirdOptions = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const thirdLoading = ref(false)

  let lastQuery = '';
  const fetchDatas = (force = false) => {

    thirdOptions.value.skip = thirdOptions.value.page -1
    thirdOptions.value.limit = thirdOptions.value.itemsPerPage

    const queryParams = {
      ...thirdOptions.value,
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
            thirdLoading.value = false
        })
        .catch(error => {
          console.log(error)
          thirdLoading.value = false
          thirdNotify.value = { type: 'error', text: error, time: Date.now() }
        })
    }

    lastQuery = JSON.stringify(queryParams)

  }

  watch(filter, () => {
    if (thirdOptions.value.page != 1) thirdOptions.value.page = 1
    thirdLoading.value = true

    setTimeout(() => fetchDatas(), 1000);
  }, {deep: true})

  watch(thirdOptions, () => {
    thirdLoading.value = true
    fetchDatas()
    // selectedSecondTableData.value = []
  })

  //delete
  const deleteThirdRow = (id) => {

    store.
        dispatch(`${MODULE_NAME}/removeRow`, id)
        .then((message) => {
            thirdNotify.value = { type: 'success', text: message, time: Date.now() }

            fetchDatas(true)

    }).catch(error => {
      console.log(error)
      thirdNotify.value = { type: 'error', text: error.message, time: Date.now() }
    })

  }

  return {
    thirdTableColumns,
    filter,
    fetchDatas,
    deleteThirdRow,

    thirdOptions,
    thirdLoading,
    thirdNotify,
    selectedThirdTableData
  }
}
