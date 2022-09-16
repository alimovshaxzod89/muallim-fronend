<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keyup='onSubmit()'
		@keydown.esc='close()'
		@click:outside='close()'
		max-width='1000px'
		width='1000px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Talaba guruh qo'shish</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>
							<v-col cols='4'>
								<v-list-item-title>Ustozlar</v-list-item-title>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.teacher_id'
									:items='teachers'
									item-text='full_name'
									item-value='id'
									label='USTOZ'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
									required
								>
									<template v-slot:append-outer>
										<v-btn
											class='btn-dialog-add-item'
											color='secondary'
											height='40px !important'
											outlined
											@click='addTeacher()'
										>
											<v-icon size='22'>
												{{ icons.mdiPlusCircleOutline }}
											</v-icon>
										</v-btn>
									</template>
								</v-autocomplete>
							</v-col>
							<v-col cols='4'>
								<v-list-item-title>Guruh</v-list-item-title>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.group_id'
									:items='groups'
									item-text='number'
									item-value='id'
									label='GURUH'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
								>
									<template v-slot:append-outer>
										<v-btn
											class='btn-dialog-add-item'
											color='secondary'
											height='40px !important'
											outlined
											@click='addGroup()'
										>
											<v-icon size='22'>
												{{ icons.mdiPlusCircleOutline }}
											</v-icon>
										</v-btn>
									</template>
								</v-autocomplete>
							</v-col>
							<v-col cols='4'>
								<v-list-item-title>Talaba</v-list-item-title>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.student_id'
									:items='students'
									item-text='full_name'
									item-value='id'
									label='TALABA'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
									required
								>
									<template v-slot:append-outer>
										<v-btn
											class='btn-dialog-add-item'
											color='secondary'
											height='40px !important'
											outlined
											@click='addStudent()'
										>
											<v-icon size='22'>
												{{ icons.mdiPlusCircleOutline }}
											</v-icon>
										</v-btn>
									</template>
								</v-autocomplete>
							</v-col>
							<v-col cols='6'>
								<v-menu v-model='isDateFirst' :close-on-content-click='false' offset-y
												min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.begin_date'
											label='BOSHLANGAN SANA'
											readonly
											v-bind='attrs'
											v-on='on'
											hide-details
											outlined
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.begin_date'
										color='primary'
										@input='isDateFirst = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>
							<v-col cols='6'>
								<v-menu v-model='isDateSecond' :close-on-content-click='false' offset-y
												min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.end_date'
											label='TUGAGAN SANA'
											readonly
											v-bind='attrs'
											v-on='on'
											hide-details
											outlined
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.end_date'
										color='primary'
										@input='isDateSecond = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>


							<v-col cols='4' class='mt-0'>
								<v-checkbox
									v-model='hasSale'
									hide-details
									label='CHEGIRMA'
								></v-checkbox>
							</v-col>

						</v-row>
						<v-row v-if='hasSale'>
							<v-col cols='4' class='mt-0'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									v-model='formData.sale'
									hide-details
									clearable
									dense
									outlined
									label='CHEGIRMA SUMMASI'
									:rules='hasSale ? [required] : []'
								></v-text-field>
							</v-col>

							<v-col cols='8' class='mt-0'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-textarea
									rows='2'
									v-model='formData.sale_cause'
									hide-details
									clearable
									dense
									outlined
									label='CHEGIRMA SABABI'
									:rules='hasSale ? [required] : []'
								></v-textarea>
							</v-col>

						</v-row>

						<v-row>

							<v-col cols='6' class='mt-0'>
								<v-checkbox
									v-model='formData.status'
									hide-details
									label='AKTIV'
								></v-checkbox>
							</v-col>
						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close()'>Bekor qilish</v-btn>
					<v-btn color='success' type='submit' @click.prevent='onSubmit'> Saqlash</v-btn>
				</v-card-actions>
			</v-form>

			<template #[`item.begin_date`]='{ item }'> {{ item.begin_date | date }}</template>
		</v-card>

		<student-form ref='studentForm' v-on:add-student-to-options='addStudentToOptions($event)' />
		<group-form ref='groupForm' v-on:add-group-to-options='addGroupToOptions($event)' />
		<teacher-form ref='teacherForm' v-on:add-group-to-options='addTeacherToOptions($event)' />

	</v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'

moment.locale('uz')

import store from '@/store'
import StudentGroupStoreModule from './StudentGroupStoreModule'

import axios from '@axios'

import { ref, watch } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import StudentForm from '@/views/lists/student/StudentForm'
import GroupForm from '@/views/lists/group/GroupForm'
import Button from '../../components/button/Button'
import teacherForm from '@/views/lists/teacher/TeacherForm.vue'

const MODULE_NAME = 'studentGroup'

export default {
	components: { StudentForm, GroupForm, teacherForm, Button },

	filters: {
		date: value => moment(value).format('D MMMM YYYY'),
		// sum: value => numeral(value).format('0,0'),
		feed: value => value[1] + '/' + value[2] + '/' + value[3],
	},

	setup(props, { emit }) {
		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, StudentGroupStoreModule)
		}

		// show, hide
		const show = ref(false)
		const open = (id = null) => {
			show.value = true
			if (id) {
				formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))

				if (formData.value.group.teacher_id)
					formData.value.teacher_id = formData.value.group.teacher_id
			}

		}
		const close = () => {
			show.value = false
			form.value.resetValidation()
			formData.value = { ...emptyFormData }

			hasSale.value = false
		}

		const form = ref(null)
		const emptyFormData = {
			id: null,
			teacher_id: null,
			student_id: null,
			group_id: null,
			begin_date: null,
			end_date: null,

			sale: null,
			sale_cause: null,

			status: '1',
		}

		const picker = new Date().toISOString().substr(0, 10)
		const isDateFirst = ref(false)
		const isDateSecond = ref(false)

		//validation
		const formData = ref({ ...emptyFormData })
		const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
		const validate = () => {
			form.value.validate()
		}


		const hasSale = ref(false)

		watch(() => formData.value.sale, val => {

			if (val)
				hasSale.value = true
			else
				hasSale.value = false

		})

		watch(hasSale, (val) => {
			if (!val) {
				formData.value.sale = null
				formData.value.sale_cause = null
			}
		})


		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}


		const students = ref([])
		const loadStudents = () => {
			axios.get('/api/students').then(response => {
				if (response.data.success) {
					students.value = response.data.data
				}
			})
				.catch(error => console.log(error))
		}
		loadStudents()

		//
		const teachers = ref()
		const loadTeachers = () => {
			axios.get('/api/teachers').then(response => {
				if (response.data.success) {
					teachers.value = response.data.data
				}
			})
		}
		loadTeachers()

		const groups = ref([])
		const loadGroups = () => {
			const params = clearParams({
				teacher_id: formData.value.teacher_id,
			})

			axios.get(`/api/groups`, { params }).then(response => {
				groups.value = response.data.data
			})
		}
		loadGroups()

		watch(
			() => formData.value.teacher_id,
			() => {
				loadGroups()
			},
		)

		// on form submit
		const onSubmit = () => {
			if (form.value.validate()) {
				if (formData.value.id) {
					store
						.dispatch(`${MODULE_NAME}/updateRow`, formData.value)
						.then(({ message }) => {
							close()
							// emit('notify', { type: 'success', text: message })
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })
						})
				} else {
					store
						.dispatch(`${MODULE_NAME}/addRow`, formData.value)
						.then(({ message }) => {
							close()
							emit('notify', { type: 'success', text: message })
						})
						.catch(error => {
							console.log(error)
							emit('notify', { type: 'error', text: error.message })
						})
				}
			}
		}

		// StudentForm
		const studentForm = ref(null)
		const addStudent = (id = null) => {
			studentForm.value.open(id)
		}
		const addStudentToOptions = row => {
			students.value = students.value.concat([row])
			formData.value.student_id = row.id
		}
		// GroupForm
		const groupForm = ref(null)
		const addGroup = (id = null) => {
			groupForm.value.open(id)
		}
		const addGroupToOptions = row => {
			groups.value = groups.value.concat([row])
			formData.value.group_id = row.id
		}

		// TeacherForm
		const teacherForm = ref(null)
		const addTeacher = (id = null) => {
			teacherForm.value.open(id)
		}
		const addTeacherToOptions = row => {
			selectsDatas.value.teacher = selectsDatas.value.teacher.concat([row])
			formData.value.teacher_id = row.id
		}

		return {
			form,
			picker,
			isDateFirst,
			isDateSecond,
			required,
			minLengthValidator,
			formData,
			selectRule,
			validate,
			show,
			onSubmit,
			open,
			close,

			teachers,

			studentForm,
			addStudent,
			addStudentToOptions,
			groupForm,
			teacherForm,
			addGroup,
			addGroupToOptions,
			addTeacher,
			addTeacherToOptions,
			groups,
			students,

			hasSale,

			icons: {
				mdiPlusCircleOutline,
				mdiCalendar,
			},
		}
	},
}
</script>

<style>
.v-input__append-outer {
	margin: 0 0 0 10px !important;
}

.btn-dialog-add-item {
	min-width: 60px !important;
	padding-right: 15px !important;
	padding-left: 15px !important;
	border-color: rgba(94, 86, 105, 0.15) !important;
}
</style>
