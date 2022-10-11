<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-flex-start flex-wrap justify-end my-filter'>

			<student-paid-search v-model='filter' />

			<v-spacer></v-spacer>

			<div class='d-flex align-center'>
				<div v-if='state.rows.length > 0' class='ml-auto mx-2 my-4'>
					<v-btn class='success exportXlsx' color='white' outlined
								 @click='ExportExcel()'>Jadvalni yuklab olish
					</v-btn>
				</div>

				<div class='btnAdd ml-auto'>
					<v-btn v-if="$can('create', 'StudentPaid')" class='primary' @click='openForm()'>Qo'shish
					</v-btn>
				</div>
			</div>
		</v-card-text>

		<!-- table -->
		<v-data-table
			ref='excel'
			v-model='selectedTableData'
			:single-select='singleSelect'
			show-select
			item-key='id'
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

			<template v-slot:top>
				<div class='d-flex pb-5' style='width: 100%'>
<!--					<v-switch-->
<!--						v-model='singleSelect'-->
<!--						label='Faqat bitta tanlash'-->
<!--						class='pa-3'-->
<!--					></v-switch>-->

					<v-btn
						v-if='selectedTableData.length'
						class='ma-2'
						outlined
						color='danger'
						large
						@click='openTurniket()'>
						Turniket
						<v-icon size='18'>
							{{ icons.mdiLockOpenVariant }}
						</v-icon>
					</v-btn>
				</div>

			</template>

			<template late #[`item.actions`]='{ item }'>
				<div class='d-flex align-center justify-center'>
					<!-- delete -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='confirmDelete(item.id)'
										 v-if="$can('delete', 'StudentPaid')">
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
							<v-btn icon small v-bind='attrs' v-on='on' @click='openForm(item.id)'
										 v-if="$can('update', 'StudentPaid')">
								<v-icon size='18'>
									{{ icons.mdiPencilOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Edit</span>
					</v-tooltip>

					<!-- print  -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='printCheck(item)'>
								<v-icon size='18'>
									{{ icons.mdiPrinter }}
								</v-icon>
							</v-btn>
						</template>
						<span>Chop etish</span>
					</v-tooltip>

					<!-- print2  -->
					<!--					<v-tooltip bottom>-->
					<!--						<template #activator='{ on, attrs }'>-->
					<!--							<v-btn icon small v-bind='attrs' v-on='on' @click='printCheck2(item)'>-->
					<!--								P-->
					<!--							</v-btn>-->
					<!--						</template>-->
					<!--						<span>Chop etish</span>-->
					<!--					</v-tooltip>-->


					<!-- turniket -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openTurniket(item.payment.student)'
										 :color="isTurniketAccepted(item.payment.student.accepted, item.payment.student.accepted_end_date) ? 'success' : 'error'">
								<v-icon size='18' v-if='isTurniketAccepted(item.payment.student.accepted, item.payment.student.accepted_end_date)'>
									{{ icons.mdiLockOpenVariant }}
								</v-icon>
								<v-icon size='18' v-if='!isTurniketAccepted(item.payment.student.accepted, item.payment.student.accepted_end_date)'>
									{{ icons.mdiLock }}
								</v-icon>
							</v-btn>
						</template>
						<span>Ro'xsat</span>
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
			<template #[`item.cashbox_id`]='{ item }'>
				{{ item.cashbox_id ? item.cashbox.name : '' }}
			</template>

			<template #[`item.date`]='{ item }'>
				<div v-if='item.date != today'>
					{{ item.date | date }}
					<br>
				</div>
				<!--				<div v-if='getDate(item.created_at) == item.date'>-->
				{{ getHourMinute(item.created_at) }}
				<!--				</div>-->

			</template>

			<template #[`item.student_id`]='{ item }'>
				{{ item.payment.student.full_name }}
				<br>
				{{ item.payment.student.phone }}
			</template>

			<template #[`item.group`]='{ item }'>
				{{ item.payment.group.number }}
				<br>
				{{ item.payment.group.subject.name }}
				<br>
				{{ item.payment.group.teacher.full_name }}
			</template>


			<template slot='body.append'>
				<tr>
					<th colspan='4' class='text-end'>Jami:</th>
					<th colspan='1' class='text-center mr-4'>{{ totalWasPaid | summa }}</th>
					<th colspan='1'></th>
					<th colspan='1'></th>
					<th colspan='1' class='text-center'>{{ totalPayment | summa }}</th>
				</tr>
			</template>
		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<student-paid-form
			ref='studentPaidForm'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>

		<student-turniket
			ref='studentTurniket'
			v-on:refresh-list='fetchDatas(true);'
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
	mdiPrinter,
	mdiLock,
	mdiLockOpenVariant,
} from '@mdi/js'

import { ref, computed, watch } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import moment from 'moment'
import envParams from '@envParams'


import XLSX from 'xlsx'

// store module
import StudentPaidStoreModule from './StudentPaidStoreModule'

// composition function
import useStudentPaidList from './useStudentPaidList'
import StudentPaidForm from './StudentPaidForm'
import StudentPaidSearch from './StudentPaidSearch'
import DialogConfirm from '../../components/DialogConfirm.vue'
import StudentTurniket from './../student/StudentTurniket.vue'

const MODULE_NAME = 'studentPaid'

export default {
	components: {
		StudentTurniket,
		StudentPaidForm,
		StudentPaidSearch,
		DialogConfirm,
		mdiPrinter,
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

		const BASE_URL = envParams.BASE_URL
		const BACKEND_URL = envParams.BACKEND_URL

		//store state
		const state = ref(store.state[MODULE_NAME])

		//logics
		const {
			filter,
			searchQuery,
			tableColumns,
			deleteRow,
			fetchDatas,

			options,
			loading,
			notify,
			selectedTableData,
		} = useStudentPaidList(MODULE_NAME)

		const singleSelect = ref(false)

		//turniket begin
		const studentTurniket = ref()
		const openTurniket = (item = null) => {
			let students = []

			if (item) {
				students = [item]
			} else {
				students = selectedTableData.value.map(item => {
					return item.payment.student
				})
			}

			studentTurniket.value.openModal(students)
		}

		const isTurniketAccepted = (accepted, end_date) => {
			if (accepted == 1 && end_date >= moment().format('YYYY-MM-DD'))
				return true
			else
				return false
		}
		//turniket end

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

		const totalWasPaid = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + item.amount, 0)
			return total
		})

		const totalPayment = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + item.payment.amount, 0)
			return total
		})

		// export xlsx
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


		const printCheck = data => {
			var myWindow = window.open(
				BACKEND_URL + '/print/' + data.id,
				'MsgWindow',
				'toolbar=no,status=no,menubar=no,width=600,height=600',
			)
			//myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
		}

		const printCheck2 = data => {
			var myWindow = window.open(
				BACKEND_URL + '/print2/' + data.id,
				'MsgWindow',
				'toolbar=no,status=no,menubar=no,width=600,height=600',
			)
			//myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
		}

		// Return
		return {
			BASE_URL,
			state,

			excel,
			ExportExcel,

			// totalAmount,
			// selectsDatas,

			tableColumns,
			searchQuery,
			options,
			loading,
			notify,
			filter,
			today,

			totalWasPaid,
			totalPayment,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			fetchDatas,
			dialogConfirm,
			confirmDelete,


			studentPaidForm,
			openForm,

			printCheck,
			printCheck2,

			MODULE_NAME,

			studentTurniket,
			selectedTableData,
			// selected,
			singleSelect,
			openTurniket,
			isTurniketAccepted,

			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiEyeOutline,
				mdiPrinter,
				mdiLock,
				mdiLockOpenVariant,
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
