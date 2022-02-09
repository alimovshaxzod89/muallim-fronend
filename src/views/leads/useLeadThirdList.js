import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useThirdList(MODULE_NAME4) {

  const selectedThirdTableData = ref([])
  const thirdNotify = ref({})

  const thirdTableColumns = [
    { text: '#', sortable: false, value: 'index' },
    {
        text: 'AMALLAR',
        value: 'thirdActions',
        align: 'center',
        sortable: false,
    },
    { text: 'NOMI', value: 'name' },
    { text: 'FAN', value: 'subject' },
    { text: 'USTOZ', value: 'teacher.full_name' },
    { text: 'KUNLAR', value: 'day.name' },
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
  const fetchThirdDatas = (force = false) => {

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
        .dispatch(`${MODULE_NAME4}/fetchThirdDatas`, queryParams)
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

    setTimeout(() => fetchThirdDatas(), 1000);
  }, {deep: true})

  watch(thirdOptions, () => {
    thirdLoading.value = true
    fetchThirdDatas()
    // selectedSecondTableData.value = []
  })

  //delete
  const deleteThirdRow = (id) => {
    store.
        dispatch(`${MODULE_NAME4}/removeThirdRow`, id)
        .then((message) => {
            thirdNotify.value = { type: 'success', text: message, time: Date.now() }

            fetchThirdDatas(true)

    }).catch(error => {
      console.log(error)
      thirdNotify.value = { type: 'error', text: error.message, time: Date.now() }
    })

  }

  return {
    thirdTableColumns,
    filter,
    fetchThirdDatas,
    deleteThirdRow,

    thirdOptions,
    thirdLoading,
    thirdNotify,
    selectedThirdTableData
  }
}
