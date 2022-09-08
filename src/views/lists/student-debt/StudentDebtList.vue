<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-center flex-wrap pb-0'>

			<student-debt-search v-model='filter' />

			<div v-if='state.rows.length > 0' class='ml-auto my-4'>
				<v-btn v-if="$can('create', 'Room')" class='success exportXlsx' color='white' outlined
							 @click='ExportExcel()'>Jadvalni yuklab olish
				</v-btn>
			</div>
		</v-card-text>

		<!-- table -->
		<v-data-table
			ref='excel'
			v-model='selectedTableData'
			:headers='tableColumns'
			:items='state.rows'
			:options.sync='options'
			:server-items-length='state.total'
			:items-per-page='options.itemsPerPage'
			:footer-props='footerProps'
			class='text-no-wrap'
		>
			<template slot='item.index' scope='props'>
				{{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
			</template>

			<!-- total -->
			<template #[`item.total`]='{ item }'> ${{ item.total }}</template>

			<template late #[`item.actions`]='{ item }'>
				<div class='d-flex align-center justify-center'>
					<!-- delete -->
					<v-tooltip bottom v-if="$can('delete', 'Group')">
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='confirmDelete(item.id)'>
								<v-icon size='18'>
									{{ icons.mdiDeleteOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Delete</span>
					</v-tooltip>

					<!-- view  -->
					<v-tooltip bottom v-if="$can('update', 'Group')">
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openForm(item.id)'>
								<v-icon size='18'>
									{{ icons.mdiPencilOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Edit</span>
					</v-tooltip>
				</div>
			</template>

			<template #[`item.group.number`]='{ item }'>
				{{ item.group.number }}
				<br>
				{{ item.group.subject.name }}
				<br>
				{{ item.group.teacher.full_name }}
			</template>

			<template #[`item.student.full_name`]='{ item }'>
				{{ item.student.full_name }}
				<br>
				{{ item.student.phone }}
			</template>

			<template #[`item.month`]='{ item }'>
				{{ item.date | year_month }}
				<br>
				{{ item.amount | summa }}
			</template>

			<template #[`item.amount`]='{ item }'> {{ item.amount | summa }}</template>
			<template #[`item.paid`]='{ item }'> {{ item.paid | summa }}</template>

			<template #[`item.dept`]='{ item }'>
				{{ (item.amount - item.paid) | summa }}
			</template>

			<template slot='body.append'>
				<tr>
					<th colspan='3' class='text-end'>Jami:</th>
					<th colspan='1' class='text-end'>{{ totalDebt | summa }}</th>
					<th colspan='1' class='text-center'>{{ totalPayment | summa }}</th>
				</tr>
			</template>

		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />
	</v-card>
</template>

<script>
import {
	mdiTrendingUp,
	mdiPlus,
	mdiDeleteOutline,
	mdiDotsVertical,
	mdiEyeOutline,
	mdiPencilOutline,
	mdiFilterOutline,
	mdiCalendar,
} from '@mdi/js'

import { computed, ref, watch } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import numeral from 'numeral'

import XLSX from 'xlsx'

import envParams from '@envParams'

// store module
import StudentDebtStoreModule from './StudentDebtStoreModule'

// composition function
import useStudentDebtList from './useStudentDebtList'
import DialogConfirm from '../../components/DialogConfirm.vue'
import StudentDebtSearch from '@/views/lists/student-debt/StudentDebtSearch'

const MODULE_NAME = 'studentDebt'

export default {
	components: {
		StudentDebtSearch,
		DialogConfirm,
	},
	filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		summa: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, StudentDebtStoreModule)
		}
		// UnRegister on leave
		// onUnmounted(() => {
		//   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
		// })

		//store state
		const state = ref(store.state[MODULE_NAME])

		//logics
		const {
			filter,
			searchQuery,
			tableColumns,
			deleteRow,
			selectedTableData,

			options,
			notify,
		} = useStudentDebtList(MODULE_NAME)

		//interface additional elements
		const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
		const actions = ['Delete', 'Edit']
		const selectedAction = ref('')
		const actionOptions = [
			{ title: 'Delete', icon: mdiDeleteOutline },
			{ title: 'Edit', icon: mdiPencilOutline },
		]

		//Delete Confirm Dialog
		const dialogConfirm = ref(null)
		const confirmDelete = id => {
			dialogConfirm.value
				.open('O\'chirishga aminmisiz?')
				.then(() => deleteRow(id))
				.catch(() => {
				})
		}

		// eport xlsx
		const excel = ref(null)
		const ExportExcel = (type, fn, dl) => {
			let elt = excel.value.$el.children[0]
			let wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' })
			return dl
				? XLSX.write(wb, {
					bookType: type,
					bookSST: true,
					type: 'base64',
				})
				: XLSX.writeFile(wb, fn || 'Jadval.' + 'xlsx')
		}

		const BASE_URL = envParams.BASE_URL


		const totalDebt = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				state.value.rows.forEach(item => (total += (item.amount - item.paid)))
			return total
		})

		const totalPayment = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				state.value.rows.forEach(item => (total += item.amount))
			return total
		})

		// Return
		return {
			BASE_URL,
			state,

			excel,
			ExportExcel,

			tableColumns,
			searchQuery,
			options,
			notify,
			filter,
			selectedTableData,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			totalDebt,
			totalPayment,

			dialogConfirm,
			confirmDelete,

			MODULE_NAME,

			// LoadApis

			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiEyeOutline,
				mdiFilterOutline,
				mdiCalendar,
			},
		}
	},
	watch: {
		['notify']() {
			this.$toast[this.notify.type](this.notify.text)
		},
	},
}
</script>

<style lang='scss' scoped>
#data-list {
	.data-list-actions {
		max-width: 7.81rem;
	}

	.data-list-search {
		max-width: 10.625rem;
	}
}
</style>
