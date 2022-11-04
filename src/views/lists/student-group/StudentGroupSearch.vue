<template>

	<div>
		<v-row class='flex-wrap'>
			<v-col>
				<v-autocomplete
					v-model='filter.teacher_id'
					:items='teachers'
					item-text='full_name'
					item-value='id'
					dense
					outlined
					hide-details
					label='USTOZ'
					class='mx-auto'
					clearable
				>
				</v-autocomplete>
			</v-col>

			<v-col>
				<v-autocomplete
					v-model='filter.group_id'
					:items='groups'
					item-text='number'
					item-value='id'
					dense
					outlined
					hide-details
					label='GURUH'
					class='mx-auto'
					clearable
				></v-autocomplete>
			</v-col>

			<v-col cols='3'>
				<v-autocomplete
					v-model='filter.student_id'
					:items='students'
					item-text='full_name'
					item-value='id'
					dense
					outlined
					hide-details
					label='TALABA'
					class='mx-auto'
					clearable
				></v-autocomplete>
			</v-col>

			<v-col cols='3'>
				<v-autocomplete
					v-model='filter.status'
					:items="[{value: 1, name: 'Ha'}, {value: 0, name: 'Yo\'q'}]"
					item-text='name'
					item-value='value'
					dense
					outlined
					hide-details
					label='Aktiv'
					class='mx-auto'
					clearable
				></v-autocomplete>
			</v-col>

		</v-row>

		<v-row>
			<v-col cols='3'>
				<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
					<template v-slot:activator='{ on, attrs }'>
						<v-text-field
							v-model='filter.begin_date'
							label='Boshlangan sana'
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
						v-model='filter.begin_date'
						color='primary'
						@input='isDate = false'
						no-title
						:first-day-of-week='1'
						locale='ru-ru'
					></v-date-picker>
				</v-menu>
			</v-col>

			<v-col cols='3'>
				<v-menu
					v-model='isDateTwo'
					:close-on-content-click='false'
					offset-y min-width='auto'
				>
					<template v-slot:activator='{ on, attrs }'>
						<v-text-field
							v-model='filter.end_date'
							label='Tugagan sana'
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
						v-model='filter.end_date'
						color='primary'
						@input='isDateTwo = false'
						no-title
						:first-day-of-week='1'
						locale='ru-ru'
					></v-date-picker>
				</v-menu>
			</v-col>

		</v-row>

	</div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import store from '@/store'
import {
	mdiCalendar,
} from '@mdi/js'

export default {
	name: 'StudentGroupSearch',
	props: ['value'],

	setup(props, { emit }) {

		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, (value) => {
			filter.value.place_id = value
		})

		const filter = ref(props.value)

		//default fields
		filter.value = Object.assign({
			query: '',
			place_id: branch_id.value ?? '',
			teacher_id: '',
			group_id: '',
			student_id: '',
			status: '',
			begin_date: '',
			end_date: '',
		}, props.value)

		//return with default fields
		emit('input', filter.value)

		watch(filter, (value) => {
			emit('input', value)
		}, { deep: true })

		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}

		const teachers = ref([])
		const loadTeachers = () => {
			const params = clearParams({
				place_id: filter.value.place_id,
			})
			axios.get('/api/teachers', { params }).then(response => {
				teachers.value = response.data.data
			})
		}
		loadTeachers()

		const groups = ref([])
		const loadGroups = () => {
			const params = clearParams({
				teacher_id: filter.value.teacher_id,
				place_id: filter.value.place_id,
			})

			axios.get(`/api/groups`, { params }).then(response => {
				groups.value = response.data.data
			})
		}
		loadGroups()

		watch(
			() => filter.value.teacher_id,
			() => {
				loadGroups()
			},
		)
		watch(
			() => filter.value.place_id,
			() => {
				loadGroups()
				loadTeachers()
			},
		)

		// const students = computed(() => store.getters['student/getFilteredList'](filter.value))
		const studentsList = computed(() => store.state['student'].list)

		watch(() => filter.value.group_id, val => {
			filterStudents(val)
		})
		watch(studentsList, () => {
			filterStudents(filter.value.group_id)
		})

		const students = ref(studentsList.value)
		const filterStudents = (group_id) => {
			students.value = store.getters['student/getFilteredList']({group_id})
		}


		// Datepicker
		const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)
		const isDateTwo = ref(false)

		return {
			filter,

			teachers,
			groups,
			students,

			picker,

			isDate,
			isDateTwo,


			icons: {
				mdiCalendar,
			},
		}
	},
}
</script>

<style scoped>

</style>