<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text>

			<student-debt-search v-model='filter' class='d-block' />

			<v-row>
				<div v-if='state.rows.length > 0' class='ml-auto my-4'>
					<v-btn v-if="$can('create', 'Room')" class='success exportXlsx' color='white' outlined
								 @click='ExportExcel()'>Jadvalni yuklab olish
					</v-btn>
				</div>
			</v-row>
		</v-card-text>

		<!-- table -->
		<v-data-table
			ref='excel'
			v-model='selectedTableData'
			show-select
			item-key='id'
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

					<!-- turniket -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openTurniket(item.student)'
										 :color="isTurniketAccepted(item.student.accepted, item.student.accepted_end_date) ? 'success' : 'error'">
								<v-icon size='18'
												v-if='isTurniketAccepted(item.student.accepted, item.student.accepted_end_date)'>
									{{ icons.mdiLockOpenVariant }}
								</v-icon>
								<v-icon size='18'
												v-if='!isTurniketAccepted(item.student.accepted, item.student.accepted_end_date)'>
									{{ icons.mdiLock }}
								</v-icon>
							</v-btn>
						</template>
						<span>Ro'xsat</span>
					</v-tooltip>

				</div>
			</template>

			<template late #[`item.turniket`]='{ item }'>
				<div class='d-flex align-center justify-center'>
					<!-- turniket -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openTurniket(item.student)'
										 :color="isTurniketAccepted(item.student.accepted, item.student.accepted_end_date) ? 'success' : 'error'">
								<v-icon size='18' v-if='isTurniketAccepted(item.student.accepted, item.student.accepted_end_date)'>
									{{ icons.mdiLockOpenVariant }}
								</v-icon>
								<v-icon size='18' v-if='!isTurniketAccepted(item.student.accepted, item.student.accepted_end_date)'>
									{{ icons.mdiLock }}
								</v-icon>
							</v-btn>
						</template>
						<span>Ro'xsat</span>
					</v-tooltip>


					<!-- Others -->
					<div class="demo-space-x">
						<v-menu
							bottom
							:offset-x="offset"
						>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on'>
								<v-icon size='20' >
									{{ icons.mdiDotsVertical }}
								</v-icon>
							</v-btn>
						</template>

						<v-list>
							<v-list-item>
								<v-list-item-title>

									<!-- Delete -->
									<v-tooltip bottom>
										<template #activator='{ on, attrs }'>
											<v-btn color="error" icon small v-bind='attrs' v-on='on' @click='confirmDelete(item.id)'>
												<v-icon size='20'>
													{{ icons.mdiDeleteOutline }}
												</v-icon>
											</v-btn>
										</template>
										<span>O'chirish</span>
									</v-tooltip>

									<!-- Archive -->
									<v-tooltip bottom>
										<template #activator='{ on, attrs }'>
											<v-btn color="warning" icon small v-bind='attrs' v-on='on' @click="archived(item.student)">
												<v-icon size='20'>
													{{ icons.mdiArchiveArrowDown }}
												</v-icon>
											</v-btn>
										</template>
										<span>Arxivlash</span>
									</v-tooltip>
								</v-list-item-title>
							</v-list-item>
							
						</v-list>
						</v-menu>
					</div>

				</div>
			</template>

			<template #[`item.photo`]='{ item }'>
				<img
					@click="zoomTheImg(item)"
					class='img-user'
					:src='item.student.photo_link ? BACKEND_URL + item.student.photo_link : require(`@/assets/images/user-image.png`)'
					alt='Avatar'
				/>
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

				<v-icon
					color="success"
					title="To'lov amalga oshirish uchun bosing"
					@click='openPaymentPaidList(item)'
				>{{ icons.mdiCash }}
				</v-icon>

			</template>
			

			<template slot='body.append'>
				<tr>
					<th colspan='6' class='text-end'>Jami:</th>
					<th colspan='1' class='text-end'>{{ totalDebt | summa }}</th>
					<th colspan='1' class='text-center'>{{ totalPayment | summa }}</th>
				</tr>
			</template>

		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<student-turniket
			ref='studentTurniket'
			v-on:refresh-list='fetchDatas(true);'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>

		<payment-paid-list
			ref='paymentPaidList'
			v-on:refresh-list='fetchDatas(true)'
			v-on:delete-row='fetchDatas(true)'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>

		<v-card 
			v-if="isImgActive" 
			class="zoomTheImg"
		>
			<v-card-text>
				<h3 class="my-4">Talabaning surati</h3>
				<img
					style="width: 400px; height: 400px; object-fit: cover;"
					:src='imgLink ? BACKEND_URL + imgLink : require(`@/assets/images/user-image.png`)'
					alt='Avatar'
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer />
				<v-btn color="error" @click="isImgActive = false">
					Yopish
				</v-btn>
			</v-card-actions>
		</v-card>

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
	mdiLockOpenVariant,
	mdiLock, 
	mdiArchiveArrowDown,
	mdiCash,
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
import StudentTurniket from './../student/StudentTurniket.vue'
import PaymentPaidList from '@/views/lists/payment-paids/PaymentPaidList.vue'
import moment from 'moment/moment'

const MODULE_NAME = 'studentDebt'

export default {
	components: {
		StudentDebtSearch,
		DialogConfirm,
		StudentTurniket,
		PaymentPaidList,
	},
	filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		summa: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {

		const BACKEND_URL = envParams.BACKEND_URL;
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
			fetchDatas,

			options,
			notify,
		} = useStudentDebtList(MODULE_NAME)

		const offset = ref(true)

		// const defaultStatus = ref(null)
		const archived = (student) =>{
			student.status = -1;
			store
				.dispatch(`student/updateRow`, student)
				.then(({ data, message }) => {
					close()
					// emit('notify', { type: 'success', text: message })
					return data
				})
				.catch(error => {
					console.log(error)
					emit('notify', { type: 'error', text: error.message })

					return false
				})

		}

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

		// zoom in on the image
		const isImgActive = ref(false)
		const imgLink = ref(null)
		const zoomTheImg = (item) =>{
			isImgActive.value = true;
			imgLink.value = item.student.photo_link;
		}

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

		const BASE_URL = envParams.BASE_URL


		const totalDebt = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + (item.amount - item.paid), 0)
			return total
		})

		const totalPayment = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + item.amount, 0)
			return total
		})

		//turniket begin
		const studentTurniket = ref()
		const openTurniket = (item = null) => {
			let students = []

			if (item) {
				students = [item]
			} else {
				students = selectedTableData.value.map(item => {
					return item.student
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

		// Paids
		const paymentPaidList = ref(null)
		const openPaymentPaidList = item => {
			paymentPaidList.value.open(item)
		}
		

		// Return
		return {
			BACKEND_URL,
			BASE_URL,
			state,

			excel,
			ExportExcel,

			paymentPaidList,
			openPaymentPaidList,

			tableColumns,
			searchQuery,
			options,
			notify,
			filter,
			selectedTableData,
			fetchDatas,

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
			studentTurniket,
			openTurniket,
			isTurniketAccepted,

			offset,
			archived,

			zoomTheImg,
			isImgActive,
			imgLink,


			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiEyeOutline,
				mdiFilterOutline,
				mdiCalendar,
				mdiLockOpenVariant,
				mdiLock,
				mdiArchiveArrowDown,
				mdiCash,
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
.img-user {
	width: 50px;
	height: 50px;
	overflow: hidden;
	object-fit: cover;
	cursor: pointer;
}
.zoomTheImg{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid rgba(255, 3, 3, 0.828);
}
</style>
