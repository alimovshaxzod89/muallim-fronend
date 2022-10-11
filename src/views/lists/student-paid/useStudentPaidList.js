import store from '@/store'
import { ref, watch, } from '@vue/composition-api'
import moment from 'moment'

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
    // { text: 'KURS', value: 'payment.group.subject.name' },
    { text: 'GURUH', value: 'group' },
    { text: 'TALABA', value: 'payment.student.full_name' },
		{ text: 'TO\'LADI', value: 'amount', align: 'center' },
    { text: "TO'LOV TURI", value: 'cashbox_id', align: 'center' },
		{ text: 'SA\'NA', value: 'date', align: 'center' },
    { text: "QAYSI OY UCHUN", value: 'month_year', align: 'center' },
	]

  const filter = ref({
		year: moment(Date.now()).format('YYYY'),
		month: parseInt(moment(Date.now()).format('M')),
		day: parseInt(moment(Date.now()).format('D')),
    // date: new Date().toISOString().substr(0, 10),
    date1: '',
    date2: '',
    group_id: '',
    student_id: '',
		cashbox_id: '',
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

    options.value.skip = (options.value.page - 1) * options.value.itemsPerPage
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
					selectedTableData.value = []
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



