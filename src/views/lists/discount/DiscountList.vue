<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-flex-start flex-wrap justify-end my-filter'>
			<v-row class='mx-auto'>
				<v-row>
					
					<v-col>
						<v-autocomplete
							v-model='filter.sale'
							:items="[{value: 1, name: 'Ha'}, {value: 0, name: 'Yo\'q'}]"
							item-text='name'
							item-value='value'
							dense
							outlined
							hide-details
							label='Chegirma'
							class='mx-auto'
							clearable
						></v-autocomplete>
					</v-col>
					<v-col>
						<v-text-field
							v-model='filter.sale_cause'
							dense
							outlined
							hide-details
							label='Chegirma sababi'
							class='mx-auto'
						></v-text-field>
					</v-col>
				</v-row>
			</v-row>


			<v-spacer></v-spacer>

			<div class='d-flex align-center'>
				<div class='mx-2 my-4'>
					<v-btn class='success exportXlsx' color='white' outlined
								 @click='ExportExcel()'>Jadvalni yuklab olish
					</v-btn>
				</div>
				<div class='btnAdd ml-auto'>
					<v-btn v-if="$can('create', 'Student')" class='primary' @click='openForm()'>Qo'shish
					</v-btn>
				</div>
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
			:loading='loading'
			:items-per-page='options.itemsPerPage'
			:footer-props='footerProps'
			class='text-no-wrap'
		>
			<template slot='item.index' scope='props'>
				{{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
			</template>

			<template #[`item.actions`]='{ item }'>
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
						<span>O'chirish</span>
					</v-tooltip>

					<!-- edit  -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openForm(item.id)'>
								<v-icon size='18'>
									{{ icons.mdiPencilOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Tahrirlash</span>
					</v-tooltip>
				</div>
			</template>

			<template #[`item.gender`]='{ item }'>
				{{ item.gender == 1 ? 'Erkak' : item.gender == 2 ? 'Ayol' : '' }}
			</template>

			<template #[`item.sale`]='{ item }'>
				{{ item.sale ? 'Ha' : 'Yo\'q' }}
			</template>
		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<discount-form
			ref='discountForm'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>
	</v-card>
</template>

<script>
import {
	mdiCalendar,
	mdiDeleteOutline,
	mdiDotsVertical,
	mdiEyeOutline,
	mdiFilterOutline,
	mdiImageEditOutline,
	mdiPencilOutline,
	mdiPlus,
	mdiTrendingUp,
} from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import { onMounted, ref } from '@vue/composition-api'
import moment from 'moment'

moment.locale('uz-latn')

import envParams from '@envParams'

import XLSX from 'xlsx'

// store module
import DiscountStoreModule from './DiscountStoreModule'

// composition function
import DialogConfirm from '@/views/components/DialogConfirm.vue'
import DiscountForm from './DiscountForm'
import useDiscountList from './useDiscountList'

const MODULE_NAME = 'student'

export default {
	components: {
		DiscountForm,
		DialogConfirm,
	},
	filters: {
		date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
		// sum: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, DiscountStoreModule)
		}
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

			options,
			loading,
			notify,
			selectedTableData,
		} = useDiscountList(MODULE_NAME)

		//interface additional elements
		const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
		const actions = ['Delete', 'Edit']
		const selectedAction = ref('')
		const actionOptions = [
			{ title: 'Delete', icon: mdiDeleteOutline },
			{ title: 'Edit', icon: mdiPencilOutline },
		]

		// Datepicker
		const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)

		//Form
		const discountForm = ref(null)
		const openForm = id => {
			discountForm.value.open(id)
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

		const BACKEND_URL = envParams.BACKEND_URL

		// LoadApis
		const regions = ref([])
		const loadRegions = () => {
			axios.get('/api/regions').then(response => {
				regions.value = response.data.data
			})
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

		onMounted(() => {
			loadRegions()
		})

		// Return
		return {
			BACKEND_URL,
			state,

			excel,
			ExportExcel,

			picker,
			isDate,
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

			discountForm,
			openForm,

			MODULE_NAME,

			// LoadApis
			regions,

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
	width: 50px;
	height: 50px;
	overflow: hidden;
	object-fit: cover;
}

.my-filter {
	.v-input {
		margin-right: 12px;
		margin-bottom: 12px;
	}
}
</style>
