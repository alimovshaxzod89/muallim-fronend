import store from '@/store'
import { ref, watch } from '@vue/composition-api'

export default function usePaymentList(MODULE_NAME) {
	const selectedTableData = ref([])
	const notify = ref({})

	const tableColumns = [
		{ text: '#', sortable: false, value: 'index' },
		{ text: 'GURUH', value: 'group.number' },
		// { text: 'USTOZ', value: 'group.teacher.full_name' },
		{ text: 'SURAT', value: 'photo' },
		{ text: 'TALABA', value: 'student.full_name' },
		// { text: 'TELEFON', value: 'student.phone' },
		{ text: "OYLIK TO'LOV", value: 'amount' },
		{ text: "TO'LADI", value: 'paid' },
		{ text: 'QARZ', value: 'debt' },
		{ text: 'CHEGIRMA', value: 'sale' },
		// { text: 'OY', value: 'month', align: 'center' },
	]

	const filter = ref({
		query: '',
		group_id: '',
		teacher_id : '',
		// region_id: '',
		// address: '',
		// permanent_region_id: '',
		// permanent_address: '',
		// gender: '',
		// birth_date: '',
		// sale: '',
		// sale_cause: '',
	})
	const options = ref({
		sortBy: ['id'],
		sortDesc: [true],
		limit: 10,
		skip: 0,
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

	watch(
		filter,
		() => {
			if (options.value.page != 1) options.value.page = 1
			loading.value = true

			setTimeout(() => fetchDatas(), 1000)
		},
		{ deep: true },
	)

	watch(options, () => {
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
		filter,
		fetchDatas,
		deleteRow,

		options,
		loading,
		notify,
		selectedTableData,
	}
}
