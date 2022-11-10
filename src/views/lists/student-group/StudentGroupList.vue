<template>
	<v-card id='data-list'>

		<v-card-text>

			<student-group-search v-model='filter' />

			<v-spacer></v-spacer>

			<div class='d-flex align-center justify-end my-4'>

				<div v-if='state.rows.length > 0' class='mx-2'>
					<v-btn class='success exportXlsx' color='white' outlined
								 @click='ExportExcel2()'>Jadvalni yuklab olish
					</v-btn>
				</div>
				<v-btn class='primary' @click='openForm()'>Qo'shish</v-btn>
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

			<!-- total -->
			<template #[`item.total`]='{ item }'> ${{ item.total }}</template>

			<template late #[`item.actions`]='{ item }'>
				<div class='d-flex align-center justify-center'>
					<!-- delete -->
					<v-tooltip bottom v-if="$can('delete', 'StudentGroup')">
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
					<v-tooltip bottom v-if="$can('update', 'StudentGroup')">
						<template #activator='{ on, attrs }'>
							<v-btn icon small v-bind='attrs' v-on='on' @click='openForm(item.id)'>
								<v-icon size='18'>
									{{ icons.mdiPencilOutline }}
								</v-icon>
							</v-btn>
						</template>
						<span>Edit</span>
					</v-tooltip>

					<!-- Others -->
          			<div class="demo-space-x">
						<v-menu
							bottom
							offset-x
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

									<!-- Archive -->
									<v-tooltip bottom>
										<template #activator='{ on, attrs }'>
											<v-btn color="warning" icon small v-bind='attrs' v-on='on' @click="archived(item)">
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

			<template #[`item.group.number`]='{ item }'>
				{{ item.group.number }}
				<br>
				{{ item.group.teacher.full_name }}
			</template>

			<template #[`item.student.full_name`]='{ item }'>
				{{ item.student.full_name }} <br>
				{{ item.student.phone }}
			</template>

			<template #[`item.begin_date`]='{ item }'>
				{{ item.begin_date | date }}
			</template>
			<template #[`item.end_date`]='{ item }'>
				{{ item.end_date | date }}
			</template>

			<template #[`item.sale`]='{ item }'>
				<div v-if='item.sale'>
					{{ item.sale | summa }}
					<br>
					<i>{{ item.sale_cause }}</i>
				</div>
			</template>

			<template #[`item.status`]="{ item }">
				{{item.status == 0 ? 'Kutilmoqda': (item.status == 1 ? 'Aktiv' : (item.status == -1 ? 'Arxiv' : '') )}}
			</template>
		</v-data-table>

		<dialog-confirm ref='dialogConfirm' />

		<student-group-form
			ref='studentGroupForm'
			v-on:notify='notify = { type: $event.type, text: $event.text, time: Date.now() }'
		/>
	</v-card>
</template>

<script>
import store from '@/store'
import envParams from '@envParams'
import {
	mdiDeleteOutline,
	mdiDotsVertical,
	mdiEyeOutline,
	mdiFilterOutline,
	mdiPencilOutline,
	mdiPlus,
	mdiTrendingUp,
	mdiArchiveArrowDown,
} from '@mdi/js'
import { ref } from '@vue/composition-api'
import moment from 'moment'
import numeral from 'numeral'
import XLSX from 'xlsx'
import DialogConfirm from '../../components/DialogConfirm.vue'
import StudentGroupForm from './StudentGroupForm'
// store module
import StudentGroupStoreModule from './StudentGroupStoreModule'
// composition function
import useStudentGroupList from './useStudentGroupList'
import StudentGroupSearch from './StudentGroupSearch'

moment.locale('uz-latn')

numeral.locale('ru')

const MODULE_NAME = 'studentGroup'

export default {
	components: {
		StudentGroupSearch,
		StudentGroupForm,
		DialogConfirm,
	},
	filters: {
		date: value => (value ? moment(value).format('D MMMM YYYY') : ''),
		sum: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},
	setup() {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, StudentGroupStoreModule)
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
		} = useStudentGroupList(MODULE_NAME)

		//interface additional elements
		const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })
		const actions = ['Delete', 'Edit']
		const selectedAction = ref('')
		const actionOptions = [
			{ title: 'Delete', icon: mdiDeleteOutline },
			{ title: 'Edit', icon: mdiPencilOutline },
		]

		//Form
		const studentGroupForm = ref(null)
		const openForm = id => {
			studentGroupForm.value.open(id)
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

		const archived = (studentGroup) =>{
			studentGroup.status = -1;
			store
				.dispatch(`${MODULE_NAME}/updateRow`, studentGroup)
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

		const BASE_URL = envParams.BASE_URL

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

		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}

		const ExportExcel2 = () => {

			const params = new URLSearchParams(clearParams(filter.value)).toString()

			window.open(envParams.BACKEND_URL + `/export/student-groups?${params}`, '_blank')
		}

		// Return
		return {
			BASE_URL,
			state,

			excel,
			ExportExcel,
			ExportExcel2,

			tableColumns,
			searchQuery,
			options,
			loading,
			notify,
			selectedTableData,
			filter,

			actions,
			actionOptions,
			selectedAction,
			footerProps,

			dialogConfirm,
			confirmDelete,

			archived,
			
			studentGroupForm,
			openForm,

			MODULE_NAME,

			icons: {
				mdiTrendingUp,
				mdiPlus,
				mdiPencilOutline,
				mdiDeleteOutline,
				mdiDotsVertical,
				mdiEyeOutline,
				mdiFilterOutline,
				mdiArchiveArrowDown,
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
