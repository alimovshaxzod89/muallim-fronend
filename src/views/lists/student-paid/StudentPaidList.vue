<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-center flex-wrap pb-0'>

			<v-col cols='3'>
				<v-text-field
					v-model='filter.query'
					dense
					outlined
					hide-details
					label='Qidirish'
					class='data-list-search me-3'
				></v-text-field>
			</v-col>

			<v-col cols='9'>
				<student-paid-search v-model='filter' />
			</v-col>
			<v-spacer></v-spacer>

			<div class='btnAdd ml-auto'>
				<v-btn class='primary mb-3' @click='openForm()'>Qo'shish</v-btn>
			</div>
		</v-card-text>

		<!-- table -->
		<v-data-table
			v-model='selectedTableData'
			:headers='tableColumns'
			:items='state.rows'
			:options.sync='options'
			:server-items-length='state.total'
			:loading='loading'
			:items-per-page='options.itemsPerPage'
			:footer-props='footerProps'
			class='text-no-wrap'
		>
			<template slot='item.index' slot-scope='props'>
				{{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
			</template>

			<!-- total -->
			<template #[`item.total`]='{ item }'> ${{ item.total }}</template>

			<template late #[`item.actions`]='{ item }'>
				<div class='d-flex align-center justify-center'>
					<!-- delete -->
					<v-tooltip bottom>
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
					<v-tooltip bottom>
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

			<template #[`item.month_year`]='{ item }'>
				{{ item.payment.date | year_month }}
				<br>
				{{ item.payment.amount | summa }}
			</template>
			<template #[`item.amount`]='{ item }'>
				{{ item.amount | summa }}
			</template>

			<template #[`item.date`]='{ item }'>
				<div v-if='item.date != today'>
					{{ item.date | date }}
					<br>
				</div>
				<div v-if='getDate(item.created_at) == item.date'>
					{{ getHourMinute(item.created_at) }}
				</div>

			</template>

			<template #[`item.group`]='{ item }'>
				{{ item.payment.group.number }}
				<br>
				{{ item.payment.group.subject.name }}
			</template>


			<!--      <template v-slot:footer>-->
			<!--				<table class="totalAmount">-->
			<!--					<tbody>-->
			<!--						<tr>-->
			<!--							<td></td>-->
			<!--							<td></td>-->
			<!--							<td></td>-->
			<!--							<td></td>-->
			<!--							<td rowspan="10" class="text-end">Jami summa:</td>-->
			<!--							<td rowspan="1" class="text-end">{{totalAmount()}}</td>-->
			<!--							<td></td>-->
			<!--						</tr>-->
			<!--					</tbody>-->
			<!--				</table>-->
			<!--      </template>-->
		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<student-paid-form
			ref='studentPaidForm'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>
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
} from '@mdi/js'

import { ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import moment from 'moment'

moment.locale('uz-latn')

import envParams from '@envParams'

// store module
import StudentPaidStoreModule from './StudentPaidStoreModule'

// composition function
import useStudentPaidList from './useStudentPaidList'
import StudentPaidForm from './StudentPaidForm'
import StudentPaidSearch from './StudentPaidSearch'
import DialogConfirm from '../../components/DialogConfirm.vue'

const MODULE_NAME = 'studentPaid'

export default {
	components: {
		StudentPaidForm,
		StudentPaidSearch,
		DialogConfirm,
	},
	filters: {
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	methods: {
		getDate(datetime) {
			return moment(datetime).format('YYYY-MM-DD')
		},
		getHourMinute(datetime) {
			return moment(datetime).format('H:mm')
		},
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, StudentPaidStoreModule)
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

			options,
			loading,
			notify,
			selectedTableData,
		} = useStudentPaidList(MODULE_NAME)

		//interface additional elements
		const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
		const actions = ['Delete', 'Edit']
		const selectedAction = ref('')
		const actionOptions = [
			{ title: 'Delete', icon: mdiDeleteOutline },
			{ title: 'Edit', icon: mdiPencilOutline },
		]


		//Form
		const studentPaidForm = ref(null)
		const openForm = id => {
			studentPaidForm.value.open(id)
		}

		//Delete Confirm Dialog
		const dialogConfirm = ref(null)
		const confirmDelete = id => {
			dialogConfirm.value
				.open('O\'chirishga aminmisiz?')
				.then(() => deleteRow(id))
				.catch(() => {
				})
		}

		const BASE_URL = envParams.BASE_URL

		// const selectsDatas = ref({
		//   amount: null,
		// })
		//
		// const totalAmount = () => {
		//   return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
		// }
		// axios.get('/api/payment-paids').then(response => {
		//   if (response.data.success) {
		//     selectsDatas.value.amount = response.data.data
		//   }
		// })

		const today = new Date().toISOString().slice(0, 10)

		// Return
		return {
			BASE_URL,
			state,

			// totalAmount,
			// selectsDatas,

			tableColumns,
			searchQuery,
			options,
			loading,
			notify,
			selectedTableData,
			filter,
			today,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			dialogConfirm,
			confirmDelete,


			studentPaidForm,
			openForm,

			MODULE_NAME,

			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiEyeOutline,
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

.totalAmount {
	margin-left: 70%;
}
</style>
