import store from '@/store'
import { ref, watch } from '@vue/composition-api'
import moment from 'moment/moment'

export default function useStudentDebtList(MODULE_NAME) {

	const selectedTableData = ref([])
	const notify = ref({})

	const tableColumns = [
		{ text: '#', sortable: false, value: 'index' },
		{ text: 'GURUH', value: 'group.number' },
		// { text: 'USTOZ', value: 'group.teacher.full_name' },
		{ text: 'TALABA', value: 'student.full_name' },
		// { text: 'TELEFON', value: 'student.phone' },
		{ text: 'QARZ', value: 'dept', align: 'right' },
		// { text: 'OYLIK TO\'LOV', value: 'amount', align: 'right' },
		// { text: 'TO\'LADI', value: 'paid' },
		{ text: 'QAYSI OY UCHUN', value: 'month', align: 'center' },
	]

	const filter = ref({
		year: moment(Date.now()).format('YYYY'),
		month: parseInt(moment(Date.now()).format('M')),
		subject_id: '',
		teacher_id: '',
		group_id: '',
		student_id: '',

		week_day: '',
		time: '',

		date: '',
	})

	const options = ref({
		sortBy: ['id'],
		sortDesc: [true],
		limit: 10,
		skip: 0,
		only_dept: 1,
	})
	const loading = ref(false)

	let lastQuery = ''
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
		if (options.value.page != 1) options.value.page
		options.value.page = 1

		setTimeout(() => fetchDatas(), 1000)
	}, { deep: true })

	watch(options, () => {
		loading.value = true
		fetchDatas()
		// selectedTableData.value = []
	})

	//delete
	const deleteRow = (id) => {
		store.dispatch(`${MODULE_NAME}/removeRow`, id)
			.then((message) => {
				notify.value = { type: 'success', text: message, time: Date.now() }

				fetchDatas(true)
			})
			.catch(error => {
				console.log(error)
				notify.value = { type: 'success', text: error.message, time: Date.now() }
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
		selectedTableData,
	}
}














