<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='my-filter'>

			<payment-search v-model='filter' />

			<v-row>
				<div v-if='state.rows.length > 0' class="ml-auto my-4">
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
			:headers='tableColumns'
			:items='state.rows'
			:options.sync='options'
			:server-items-length='state.total'
			:loading='loading'
			:items-per-page='options.itemsPerPage'
			:footer-props='footerProps'
			class='text-no-wrap'
		>
			<template slot='item.index' scope='props'>
				{{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
			</template>

			<template #[`item.amount`]='{ item }'>
				{{ getMonth(item.month) }} {{ item.year }}
				<v-text-field
					style='width: 150px; margin-top: 0; padding-top: 0;'
					:value='item.amount'
					hide-details
					:append-icon='icons.mdiPencilOutline'
					@keydown.enter='updateAmount(item, $event, true)'
					@blur='updateAmount(item, $event)'
				></v-text-field>
			</template>

			<template #[`item.paid`]='{ item }'>
				<v-btn outlined color='success' title="To'lov amalga oshirish uchun bosing"
							 @click='openPaymentPaidList(item)'>{{ item.paid | summa }}
				</v-btn>
			</template>

			<template #[`item.group.number`]='{ item }'>
				{{ item.group.number }}
				<br>
				{{ item.group.teacher.full_name }}
			</template>

			<template #[`item.debt`]='{ item }'>
				<span style='color: rgb(239 32 42);'>{{ item.amount - item.paid | summa }}</span>
			</template>

			<template #[`item.photo`]='{ item }'>
				<img
					@click="zoomTheImg(item)"
					class='img-user'
					:src='item.student.photo_link ? BACKEND_URL + item.student.photo_link : require(`@/assets/images/user-image.png`)'
					alt='Avatar'
				/>
			</template>

			<template #[`item.sale`]='{ item }'>
				<div v-if='item.student.student_groups[0].sale'>
					{{ item.student.student_groups[0].sale | summa }}
					<br>
					<i>{{ item.student.student_groups[0].sale_cause }}</i>
				</div>
			</template>

			<template #[`item.month`]='{ item }'>
				{{ getMonth(item.month) }}
				<br>
				{{ item.year }}
			</template>

			<template #[`item.student.full_name`]='{ item }'>
				{{ item.student.full_name }}
				<br>
				{{ item.student.phone }}
			</template>

			<template slot='body.append'>
				<tr>
					<th colspan='5' class='text-end'>Jami:</th>
					<th colspan='1' class='text-center'>{{ totalPayment | summa }}</th>
					<th colspan='1' class='text-center'>{{ totalDebt | summa }}</th>
				</tr>
			</template>

		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<payment-form
			ref='paymentForm'
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
	mdiCalendar,
	mdiImageEditOutline,
	mdiFilterOutline,
} from '@mdi/js'

import { onMounted, ref, reduce, computed } from '@vue/composition-api'

import store from '@/store'
import axios from '@axios'

import envParams from '@envParams'

// store module
import PaymentStoreModule from './PaymentStoreModule'

import XLSX from 'xlsx'

// composition function
import usePaymentList from './usePaymentList'
import PaymentForm from './PaymentForm.vue'
import PaymentSearch from './PaymentSearch.vue'
import PaymentPaidList from '@/views/lists/payment-paids/PaymentPaidList.vue'
import DialogConfirm from '@/views/components/DialogConfirm.vue'

const MODULE_NAME = 'payment'

export default {
	components: {
		PaymentForm,
		PaymentSearch,
		PaymentPaidList,
		DialogConfirm,
	},
	filters: {
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, PaymentStoreModule)
		}
		const BACKEND_URL = envParams.BACKEND_URL

		// // UnRegister on leave
		// onUnmounted(() => {
		//   if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
		// })

		//store state
		const state = ref(store.state[MODULE_NAME])

		//logics
		const {
			filter,
			tableColumns,
			deleteRow,
			fetchDatas,

			options,
			loading,
			notify,
			selectedTableData,
		} = usePaymentList(MODULE_NAME)

		//interface additional elements
		const footerProps = ref({ 'items-per-page-options': [5, 10, 20, 50, 100, -1] })
		const actions = ['Delete', 'Edit']
		const selectedAction = ref('')
		const actionOptions = [
			{ title: 'Delete', icon: mdiDeleteOutline },
			{ title: 'Edit', icon: mdiPencilOutline },
		]

		//Form
		const studentForm = ref(null)
		const openForm = id => {
			studentForm.value.open(id)
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

		const updateAmount = ({ id, date, group_id, student_id, amount }, event, entered = false) => {
			if (amount === parseInt(event.target.value)) return

			axios
				.put(`/api/payments/${id}`, {
					amount: event.target.value,
					date,
					group_id,
					student_id,
				})
				.then(response => {
					if (response.status === 200) {
						if (!entered) {
							notify.value = { type: 'success', text: 'Qiymat saqlandi' }
						} else {
							event.target.blur()
						}
					}
				})
		}

		const monthOptions = ref([
			{
				value: '1',
				text: 'Yanvar',
				id: 1,
			},
			{
				value: '2',
				text: 'Fevral',
				id: 2,
			},
			{
				value: '3',
				text: 'Mart',
				id: 3,
			},
			{
				value: '4',
				text: 'Aprel',
				id: 4,
			},
			{
				value: '5',
				text: 'May',
				id: 5,
			},
			{
				value: '6',
				text: 'Iyun',
				id: 6,
			},
			{
				value: '7',
				text: 'Iyul',
				id: 7,
			},
			{
				value: '8',
				text: 'Avgust',
				id: 8,
			},
			{
				value: '9',
				text: 'Sentabr',
				id: 9,
			},
			{
				value: '10',
				text: 'Oktabr',
				id: 10,
			},
			{
				value: '11',
				text: 'Noyabr',
				id: 11,
			},
			{
				value: '12',
				text: 'Dekabr',
				id: 12,
			},
		])

		const getMonth = month => {
			const result = monthOptions.value.filter(item => {
				if (item.value === month) {
					return item.text
				}
			})
			return result[0].text
		}


		const totalPayment = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + item.paid, 0)
			return total
		})

		const totalDebt = computed(() => {
			let total = 0
			if (state.value.rows !== undefined && state.value.rows.length > 0)
				total = state.value.rows.reduce((prev, item) => prev + (item.amount - item.paid), 0)
			return total
		})

		const isImgActive = ref(false)
		const imgLink = ref(null)
		const zoomTheImg = (item) =>{
			isImgActive.value = true;
			imgLink.value = item.student.photo_link;
		}
		

		// const selectsDatas = ref({
		//   amount: null,
		//   paid: null,
		// })
		//
		// axios.get('/api/payments').then(response => {
		//   if (response.data.success) {
		// 		console.log(response)
		//     selectsDatas.value.amount = response.data.data
		//     selectsDatas.value.paid = response.data.data
		//   }
		// })

		// const totalAmount = () => {
		//   return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
		// }
		// const totalPaid = () => {
		//   return selectsDatas.value.paid.reduce((a, c) => a + c.paid, 0)
		// }

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

		// Paids
		const paymentPaidList = ref(null)
		const openPaymentPaidList = item => {
			paymentPaidList.value.open(item)
		}

		// Return
		return {
			BACKEND_URL,
			state,
			ExportExcel,
			excel,
			// totalAmount,
			paymentPaidList,
			openPaymentPaidList,
			fetchDatas,
			// selectsDatas,

			tableColumns,
			filter,
			options,
			loading,
			notify,
			selectedTableData,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			dialogConfirm,
			confirmDelete,

			studentForm,
			openForm,

			MODULE_NAME,
			getMonth,

			updateAmount,

			totalDebt,
			totalPayment,

			zoomTheImg,
			isImgActive,
			imgLink,

			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiCalendar,
				mdiEyeOutline,
				mdiImageEditOutline,
				mdiFilterOutline,
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
	cursor: pointer;
	width: 50px;
	height: 50px;
	overflow: hidden;
	object-fit: cover;
}
.zoomTheImg{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border: 1px solid rgba(255, 3, 3, 0.828);
}

.my-table-footer {
	width: 100%;
	background-color: #f3f2f7;

	td {
		padding: 0 16px;
		font-weight: 700;
		font-size: 14px;
	}
}
</style>
