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
      align: 'start',
      sortable: false,
    },
    { text: 'GURUH', value: 'group.name' },
    { text: 'KUN', value: 'week_day' },
    { text: 'XONA', value: 'room.name' },
    { text: 'VAQT ...DAN', value: 'time_begin' },
    { text: 'VAQT ...GACHA', value: 'time_end' },
  ]

  const searchQuery = ref('')
  const options = ref({
    sortBy: ['id'],
    group_id: null,
    sortDesc: [true],
    skip: 0,
    limit: 10,
  })
  const filter = ref({
    group_id: null,
  })
  const loading = ref(false)

  let lastQuery = ''
  const fetchDatas = (force = false) => {
    if (options.value.page) {
      options.value.skip = (options.value.page - 1) * options.value.itemsPerPage
    }
    if (options.value.itemsPerPage) {
      options.value.limit = options.value.itemsPerPage
    }

    const queryParams = {
      q: searchQuery.value,
      ...options.value,
    }

    for (let key in filter.value) {
			let value = filter.value[key]
			if (value !== null && value !== '') {
				queryParams[key] = value
			}
		}

    // const filterCleared = {}
    // for (let key in filter.value) {
    //   let value = filter.value[key]
    //   if (value !== null && value !== '') {
    //     filterCleared[key] = value
    //   }
    // }
    // queryParams.filter = filterCleared

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

  return {
    tableColumns,
    searchQuery,
    filter,
    fetchDatas,

    options,
    loading,
    notify,
    selectedTableData,
  }
}
