import store from '@/store'
import { computed, ref, watch } from '@vue/composition-api'

export default function useTeacherList(MODULE_NAME) {

	const selectedTableData = ref([])
	const notify = ref({})

	const tableColumns = ref([
		{ text: '#', sortable: false, value: 'index' },
		{
			text: 'AMALLAR',
			value: 'actions',
			align: 'center',
			sortable: false,
		},
		{ text: 'FISH', value: 'full_name' },
		// { text: 'ISMI', value: 'first_name' },
		// { text: 'FAMILIYASI', value: 'last_name' },
		// { text: 'SHARIFI', value: 'middle_name' },
		{ text: 'TELEFON', value: 'phone' },
		{ text: 'JINSI', value: 'gender' },
		{ text: 'TUMAN', value: 'region_id' },
		{ text: 'MANZIL', value: 'address' },
		{ text: 'D.Y. TUMAN', value: 'permanent_region_id' },
		{ text: 'D.Y. Manzili', value: 'permanent_address' },
		{ text: 'TUG\'ILGAN SANASI', value: 'birth_date' },
	])

	const branch_id = computed(() => store.state.branch_id)
	toggleBranchColumn()
	watch(branch_id, val => {
		toggleBranchColumn()
	})

	function toggleBranchColumn() {
		if (branch_id.value) {
			const index = tableColumns.value.findIndex(col => col.value === 'places')
			if (index !== -1) {
				tableColumns.value.splice(index, 1)
			}
		} else {
			tableColumns.value.splice(5, 0, { text: 'DARS BERADIGAN FILIALLARI', value: 'places' })
		}
	}

	const filter = ref({})

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
		// selectedTableData.value = []
	})

	//delete
	const deleteRow = (id) => {

		store
			.dispatch(`${MODULE_NAME}/removeRow`, id)
			.then((message) => {
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












