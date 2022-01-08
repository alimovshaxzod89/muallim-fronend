import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useGroupList(MODULE_NAME) {
  const selectedTableData = ref([])
  const notify = ref({})

  const tableColumns = [
    { text: '#', sortable: false, value: 'index' },
    // {
    //   text: 'AMALLAR',
    //   value: 'actions',
    //   align: 'center',
    //   sortable: false,
    // },
    { text: 'GURUH', value: 'group' },
    // { text: 'VAQTLARI', value: 'group' },
    // { text: 'KUN', value: 'week_day' },
    // { text: 'XONA', value: 'room.name' },
    // { text: 'VAQT ..DAN', value: 'time_begin' },
    // { text: 'VAQT ..GACHA', value: 'time_end' },
  ]

  const searchQuery = ref('')
  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    number: null,
    subject_id: null,
    stage_id: null,
    teacher_id: null,
    price: null,
    teacher_share: null,
    max_students: null,
    begin_date: null,
    end_date: null,
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
