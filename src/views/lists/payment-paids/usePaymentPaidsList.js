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
    { text: 'GURUH', value: 'payment.group.number' },
    { text: "TO'LOV OYI", value: 'payment.date' },
    { text: 'TALABA', value: 'payment.student.full_name' },
    { text: "TO'LADI", value: 'amount' },
    { text: 'SANA', value: 'date' },
  ]

  const searchQuery = ref('')
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    skip: 0,
    limit: 10,
  })
  const filter = ref({
    group_id: null,
    student_id: null,
    payment_id: null,
    year: null,
    month: null,
    day: null,
  })
  const loading = ref(false)

  let lastQuery = ''
  const fetchDatas = (force = false) => {
    if (options.value.page) {
      options.value.skip = options.value.page - 1
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

  watch(
    filter,
    () => {
      if (options.value.page != 1) options.value.page = 1
    },
    { deep: true },
  )

  watch(
    [filter, options],
    () => {
      loading.value = true
      fetchDatas()
      // selectedTableData.value = []
    },
    { deep: true },
  )

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
