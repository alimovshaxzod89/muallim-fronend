<template>
	<v-card id='data-list'>
		<!-- search -->
		<v-card-text class='d-flex align-flex-start flex-wrap justify-end my-filter'>
			<v-row class='mx-auto'>
				<v-row class='mx-auto'>
					<v-col>
						<v-text-field
							v-model='filter.full_name'
							dense
							outlined
							hide-details
							label='Fish'
							class='mx-auto'
						></v-text-field>
					</v-col>

					<v-col>
						<v-text-field
							v-model='filter.phone'
							dense
							outlined
							hide-details
							label='Telefon'
							class='mx-auto'
						></v-text-field>
					</v-col>

					<v-col>
						<v-autocomplete
							v-model='filter.region_id'
							:items='regions'
							item-text='name'
							item-value='id'
							dense
							outlined
							hide-details
							label='Tuman'
							class='mx-auto'
							clearable
						></v-autocomplete>
					</v-col>

					<v-col>
						<v-text-field
							v-model='filter.address'
							dense
							outlined
							hide-details
							label='Manzil'
							class='mx-auto'
						></v-text-field>
					</v-col>

					<v-col>
						<v-autocomplete
							v-model='filter.permanent_region_id'
							:items='regions'
							item-text='name'
							item-value='id'
							dense
							outlined
							hide-details
							label='D.Y. Tuman'
							class='mx-auto'
							clearable
						></v-autocomplete>
					</v-col>
				</v-row>


				<v-row>
					<v-col>
						<v-text-field
							v-model='filter.permanent_address'
							dense
							outlined
							hide-details
							label='D.Y. Manzil'
							class='mx-auto'
						></v-text-field>
					</v-col>

					<v-col>
						<v-autocomplete
							v-model='filter.gender'
							:items="[{value: 1, name: 'Erkak'}, {value: 2, name: 'Ayol'}]"
							item-text='name'
							item-value='value'
							dense
							outlined
							hide-details
							label='Jinsi'
							class='mx-auto'
							clearable
						></v-autocomplete>
					</v-col>
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
					<v-col>
						<v-menu v-model='isDate' :close-on-content-click='false' offset-y>
							<template v-slot:activator='{ on, attrs }'>
								<v-text-field
									v-model='filter.birth_date'
									label="Tug'ilgan sana"
									readonly
									v-bind='attrs'
									hide-details
									v-on='on'
									outlined
									clearable
									:append-icon='icons.mdiCalendar'
								></v-text-field>
							</template>
							<v-date-picker
								v-model='filter.birth_date'
								color='primary'
								@input='isDate = false'
								no-title
								:first-day-of-week='1'
								locale='ru-ru'
							></v-date-picker>
						</v-menu>
					</v-col>
				</v-row>
			</v-row>
			<v-row>
				<v-col>
					<v-autocomplete
						v-model='filter.status'
						:items='STATUS'
						item-text='name'
						item-value='id'
						label='STATUS'
						class='data-list-search me-3'
						dense
						outlined
						hide-details
						clearable
					>
					</v-autocomplete>
				</v-col>
			</v-row>


			<v-spacer></v-spacer>

			<div class='d-flex align-center'>
				<div v-if='state.rows.length > 0' class='mx-2 my-4'>
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
					<v-tooltip bottom v-if="$can('delete', 'Group')">
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
					<v-tooltip bottom v-if="$can('update', 'Group')">
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openForm(item.id)'>
								<v-icon size='18'>
									{{ icons.mdiPencilOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Tahrirlash</span>
					</v-tooltip>

					<!-- image -->
					<v-tooltip bottom v-if="$can('update', 'Group')">
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openPhoto(item)'>
								<v-icon size='18'>
									{{ icons.mdiImageEditOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Suratni tanlash</span>
					</v-tooltip>

					<!-- turniket -->
					<v-tooltip bottom>
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openTurniket(item)'
										 :color="isTurniketAccepted(item.accepted, item.accepted_end_date) ? 'success' : 'error'">
								<v-icon size='18' v-if='isTurniketAccepted(item.accepted, item.accepted_end_date)'>
									{{ icons.mdiLockOpenVariant }}
								</v-icon>
								<v-icon size='18' v-if='!isTurniketAccepted(item.accepted, item.accepted_end_date)'>
									{{ icons.mdiLock }}
								</v-icon>
							</v-btn>
						</template>
						<span>Ro'xsat</span>
					</v-tooltip>

				</div>
			</template>

			<template #[`item.gender`]='{ item }'>
				{{ item.gender == 1 ? 'Erkak' : item.gender == 2 ? 'Ayol' : '' }}
			</template>

			<template #[`item.photo`]='{ item }'>
				<img
					class='img-user'
					:src='item.photo_link ? BACKEND_URL + item.photo_link : require(`@/assets/images/user-image.png`)'
					alt='Avatar'
				/>
			</template>

			<template #[`item.birth_date`]='{ item }'> {{ item.birth_date | date }}</template>

			<template #[`item.sale`]='{ item }'>
				{{ item.sale ? 'Ha' : 'Yo\'q' }}
			</template>
			
			<template #[`item.status`]="{ item }">
				{{item.status == 0 ? 'Kutilmoqda': (item.status == 1 ? 'Aktiv' : (item.status == -1 ? 'Arxiv' : '') )}}
			</template>
		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<student-form
			ref='studentForm'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>

		<student-photo
			ref='studentPhoto'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>

		<student-turniket
			ref='studentTurniket'
			v-on:refresh-list='fetchDatas(true)'
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
	mdiLockOutline,
	mdiLock,
	mdiLockOpenVariant,
} from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import { onMounted, ref } from '@vue/composition-api'
import moment from 'moment'

moment.locale('uz-latn')

import envParams from '@envParams'

import XLSX from 'xlsx'

// store module
import StudentStoreModule from './StudentStoreModule'

// composition function
import DialogConfirm from '@/views/components/DialogConfirm.vue'
import StudentForm from './StudentForm'
import StudentPhoto from './StudentPhoto'
import StudentTurniket from './StudentTurniket'
import useStudentList from './useStudentList'

const MODULE_NAME = 'student'

export default {
	components: {
		StudentForm,
		StudentPhoto,
		DialogConfirm,
		StudentTurniket,
	},
	filters: {
		date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
		// sum: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, StudentStoreModule)
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
			fetchDatas,

			options,
			loading,
			notify,
			selectedTableData,
		} = useStudentList(MODULE_NAME)

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
		const studentForm = ref(null)
		const openForm = id => {
			studentForm.value.open(id)
		}

		//Photo
		const studentPhoto = ref(null)
		const openPhoto = item => {
			studentPhoto.value.openUserImage(item)
		}

		//Turniket
		const studentTurniket = ref(null)
		const openTurniket = item => {
			studentTurniket.value.openModal([item])
		}
		const isTurniketAccepted = (accepted, end_date) => {
			if (accepted == 1 && end_date >= moment().format('YYYY-MM-DD'))
				return true
			else
				return false
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

		// Status
		const STATUS = ref([
			{
				id: 0,
				name: 'Kutilmoqda'
			},
			{
				id: 1,
				name: 'Aktiv'
			},
			{
				id: -1,
				name: 'Arxiv'
			}
		])

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
			fetchDatas,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			dialogConfirm,
			confirmDelete,

			studentForm,
			studentPhoto,
			openForm,
			openPhoto,

			studentTurniket,
			openTurniket,
			isTurniketAccepted,

			MODULE_NAME,

			// LoadApis
			regions,
			STATUS,

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
				mdiLockOutline,
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
