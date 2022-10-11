import store from '@/store'
import { computed, ref, watch } from '@vue/composition-api'

export default function useStudentList(MODULE_NAME) {
	const selectedTableData = ref([])
	const notify = ref({})

	const tableColumns = [
		{ text: '#', sortable: false, value: 'index' },
		{
			text: 'Amallar',
			value: 'actions',
			align: 'center',
			sortable: false,
		},
		{ text: 'SURAT', value: 'photo' },
		{ text: 'FISH', value: 'full_name' },
		{ text: 'TELEFON', value: 'phone' },
		{ text: 'TUMAN', value: 'region.name' },
		{ text: 'MANZIL', value: 'address' },
		{ text: 'D.Y. TUMAN', value: 'permanent_region.name' },
		{ text: 'D.Y. MANZIL', value: 'permanent_address' },
		{ text: 'JINSI', value: 'gender' },
		{ text: 'TUG\'ILGAN SANA', value: 'birth_date' },
		{ text: 'CHEGIRMA', value: 'sale' },
		{ text: 'CHEGIRMA SABABI', value: 'sale_cause' },
	]

	const branch_id = computed(() => store.state.branch_id)
	watch(branch_id, val => {
		filter.value.place_id = val
	})

	const filter = ref({
		query: '',
		place_id: branch_id.value ?? '',
		full_name: '',
		phone: '',
		region_id: '',
		address: '',
		permanent_region_id: '',
		permanent_address: '',
		gender: '',
		birth_date: '',
		sale: '',
		sale_cause: '',
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

	watch(filter, () => {
		if (options.value.page != 1) options.value.page = 1
		loading.value = true

		setTimeout(() => fetchDatas(), 1000)
	}, { deep: true })

	watch(options, () => {
		loading.value = true
		fetchDatas()
		selectedTableData.value = []
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
