<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keydown.esc='close()'
		@click:outside='close()'
		@keydown.enter='onSubmit()'
		max-width='800px'
		width='800px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Guruhlar</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols='6'>
								<h4 class='text-required no-texts'><span>*</span></h4>
								<v-text-field
									type='text'
									label='GURUH NOMI'
									v-model='formData.number'
									:rules='[required]'
									required
									outlined
									dense
								></v-text-field>
							</v-col>

							<v-col cols='6' v-if='place_id == null'>
								<v-autocomplete
									v-model='formData.place_id'
									:items='places'
									item-text='name'
									item-value='id'
									label='FILIAL'
									dense
									outlined
									hide-details
									clearable
								>
								</v-autocomplete>
							</v-col>

							<v-col cols='12'>
								<h4 class='text-required no-texts'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.subject_id'
									:items='subjects'
									item-text='name'
									item-value='id'
									label='KURS'
									:rules='selectRule'
									dense
									outlined
									clearable
									class='align-start'
								></v-autocomplete>
							</v-col>

							<v-col cols='6'>
								<v-autocomplete
									v-model='formData.stage_id'
									:items='stages'
									item-text='name'
									item-value='id'
									label='BOSQICH'
									dense
									outlined
									clearable
									class='align-start'
								></v-autocomplete>
							</v-col>

							<v-col cols='6'>
								<h4 class='text-required no-texts'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.teacher_id'
									:items='teachers'
									item-text='full_name'
									item-value='id'
									label='USTOZ'
									:rules='selectRule'
									dense
									outlined
									clearable
									class='align-start'
								></v-autocomplete>
							</v-col>

							<v-col cols='6'>
								<v-autocomplete
									v-model='formData.room_id'
									:items='rooms'
									item-text='name'
									item-value='id'
									label='XONA'
									dense
									outlined
									clearable
									class='align-start'
								></v-autocomplete>
							</v-col>

							<v-col cols='6'>
								<h4 class='text-required no-texts'><span>*</span></h4>
								<v-text-field
									type='number'
									label='NARX'
									v-model='formData.price'
									:rules='[required]'
									outlined
									dense
								></v-text-field>
							</v-col>

							<v-col cols='6'>
								<v-text-field
									type='text'
									label='ULUSH'
									v-model='formData.teacher_share'
									outlined
									dense
									required
								></v-text-field>
							</v-col>

							<v-col cols='6'>
								<v-text-field
									type='text'
									label="Maks o'quvchi soni"
									v-model='formData.max_students'
									outlined
									dense
									required
								></v-text-field>
							</v-col>

							<v-col cols='6'>
								<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<h4 class='text-required no-texts'><span>*</span></h4>
										<v-text-field
											v-model='formData.begin_date'
											label='BOSHLANGAN SANA'
											readonly
											v-bind='attrs'
											v-on='on'
											:rules='[required]'
											required
											outlined
											clearable
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.begin_date'
										color='primary'
										@input='isDate = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>

							<v-col cols='6'>
								<v-menu v-model='isDate2' :close-on-content-click='false' offset-y min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.end_date'
											label='TUGASH SANASI'
											readonly
											v-bind='attrs'
											v-on='on'
											outlined
											clearable
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.end_date'
										color='primary'
										@input='isDate2 = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>

							<v-col cols='12'>
								<v-textarea
									v-model='formData.description'
									label='IZOH'
									hide-details
									outlined
									clearable
									class='mt-0'
									height='100'
								></v-textarea>
							</v-col>

							<v-col cols='3'>
								<v-autocomplete
									v-model='formData.status'
									:items='STATUS'
									item-text='name'
									item-value='id'
									label='STATUS'
									dense
									outlined
									clearable
									class='align-start'
								></v-autocomplete>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close()'>Bekor qilish</v-btn>
					<v-btn color='success' type='submit' @click.prevent='onSubmit'>Saqlash</v-btn>
				</v-card-actions>
			</v-form>
		</v-card>
	</v-dialog>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import GroupStoreModule from '../group/GroupStoreModule'

import { ref, onMounted, watch, computed } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'group'

export default {
	setup(props, { emit }) {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, GroupStoreModule)
		}

		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, val => {
			emptyFormData.place_id = val
			formData.value.place_id = val
		})

		//show, hide
		const show = ref(false)
		const form = ref(null)
		const emptyFormData = {
			id: null,
			place_id: branch_id.value,
			number: null,
			subject_id: null,
			stage_id: null,
			teacher_id: null,
			price: null,
			teacher_share: null,
			max_students: null,
			begin_date: null,
			end_date: null,
			status: 1,
		}

		const formData = ref({ ...emptyFormData })

		const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)
		const isDate2 = ref(false)

		const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
		const validate = () => {
			form.value.validate()
		}
		const open = (id = null) => {
			show.value = true
			setTimeout(() => {
				formData.value.status
				form.value.$el[0].focus()
			}, 100)
			if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
		}
		const close = () => {
			show.value = false
			formData.value = { ...emptyFormData }
			form.value.resetValidation()
		}


		// on form submit
		const onSubmit = () => {
			if (form.value.validate()) {
				if (formData.value.id) {
					store
						.dispatch(`${MODULE_NAME}/updateRow`, formData.value)
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
				} else {
					store
						.dispatch(`${MODULE_NAME}/addRow`, formData.value)
						.then(({ data, message }) => {
							close()
							emit('notify', { type: 'success', text: message })
							emit('add-group-to-options', data)
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })

							return false
						})
				}
			}
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

	
		// Load subjects
		const subjects = ref()
		const loadSubjects = () => {
			axios.get('/api/subjects').then(response => {
				if (response.data.success) {
					subjects.value = response.data.data
				}
			})
		}
		
		// Load subjects
		const stages = ref()
		const loadStages = () => {
			axios.get('/api/stages').then(response => {
				if (response.data.success) {
					stages.value = response.data.data
				}
			})
		}
		// Load rooms
		const rooms = ref()
		const loadRooms = () => {
			const params = clearParams({
				place_id: formData.value.place_id,
			})
			axios.get('/api/rooms', { params }).then(response => {
				if (response.data.success) {
					rooms.value = response.data.data
				}
			})
		}
		// Load teachers
		const teachers = ref()
		const loadTeachers = () => {
			const params = clearParams({
				place_id: formData.value.place_id,
			})
			axios.get('/api/teachers', { params }).then(response => {
				if (response.data.success) {
					teachers.value = response.data.data
				}
			})
		}
		const places = ref({})
		const loadPlace = () => {
			axios
				.get('/api/places', { params: { itemsPerPage: -1 } })
				.then(response => {
					if (response.data.success) {
						places.value = response.data.data
					}
				})
				.catch(error => console.log(error))
		}
		loadPlace()

		onMounted(() => {
			loadSubjects()
			loadStages()
			loadRooms()
			loadTeachers()
		})

		// ProductTypeForm
		const roomForm = ref(null)
		const addPlace = (id = null) => {
			roomForm.value.open(id)
		}
		// const addPlaceToOptions = row => {
		//   selectsDatas.value.room = selectsDatas.value.room.concat([row])
		//   formData.value.place_id = row.id
		// }

		return {
			form,
			picker,
			isDate,
			required,
			minLengthValidator,
			maxLengthValidator,
			formData,
			selectRule,
			places,
			validate,
			show,
			onSubmit,
			open,
			close,
			subjects,
			stages,
			rooms,
			STATUS,
			teachers,
			isDate2,

			place_id: branch_id,
			// addPlaceToOptions,

			addPlace,
			roomForm,

			icons: {
				mdiCalendar,
			},
		}
	},
}
</script>
