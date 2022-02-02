import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function useStudentPaidList(MODULE_NAME) {

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
    { text: 'FAN', value: 'subject.name' },
    { text: 'GURUH', value: 'group.number' },
    { text: 'TALABA', value: 'student.full_name' },
    { text: 'OY/YIL', value: 'month_year' },
    { text: 'SUMMA', value: 'amount' },
    { text: 'SA\'NA', value: 'date' },
    ]

  const filter = ref({
    query: '',
    teacher_id: '',
    group_id: '',
    student_id: '',
    status: '',
    begin_date: '',
    end_date: '',
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
    if (options.value.page != 1) options.value.page = 1
    loading.value = true

    setTimeout(() => fetchDatas(), 1000);
  }, {deep: true})

  watch(options, () => {
    loading.value = true
    fetchDatas()
    // selectedTableData.value = []
  })

  //delete
  const deleteRow = (id) => {

    store.
        dispatch(`${MODULE_NAME}/removeRow`, id)
        .then((message) => {
            notify.value = { type: 'success', text: message, time: Date.now() }

            fetchDatas(true)

    }).catch(error => {
      console.log(error)
      notify.value = { type: 'error', text: error.message, time: Date.now() }
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



