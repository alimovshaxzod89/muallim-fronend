<template>
	<div>
		<v-row>

			<v-col cols='3'>
				<v-autocomplete
					v-model='filter.subject_id'
					:items='subjects'
					item-text='name'
					item-value='id'
					dense
					outlined
					hide-details
					label='KURS'
					class='data-list-search me-3'
					clearable
				></v-autocomplete>
			</v-col>

			<v-col cols='3'>
				<v-autocomplete
					v-model='filter.teacher_id'
					:items='teachers'
					item-text='full_name'
					item-value='id'
					dense
					outlined
					hide-details
					label='USTOZ'
					class='data-list-search me-3'
					clearable
				></v-autocomplete>
			</v-col>

			<v-col cols='3'>
				<v-autocomplete
					v-model='filter.group_id'
					:items='groups'
					item-text='number'
					item-value='id'
					dense
					outlined
					hide-details
					label='GURUH'
					class='data-list-search me-3'
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
					class='data-list-search me-3'
					clearable
				></v-autocomplete>
			</v-col>

			<!-- <div class="d-flex align-center pb-5">
				<v-text-field
					v-model="filter.query"
					dense
					outlined
					hide-details
					label="Qidiruv"
					class="data-list-search me-3"
				></v-text-field>
			</div> -->
		</v-row>

		<v-row>

			<v-col cols='4'>
				<v-text-field
					v-model='filter.year'
					dense
					outlined
					hide-details
					label='QAYSI YIL UCHUN'
					clearable
				/>
			</v-col>

			<v-col cols='4'>
				<v-autocomplete
					v-model='filter.month'
					:items='months'
					item-text='text'
					item-value='id'
					dense
					outlined
					hide-details
					label='QAYSI OY UCHUN'
					class='data-list-search me-3'
					clearable
				></v-autocomplete>
			</v-col>
			<v-col cols='4'>
				<v-select
					label='HAFTANING QAYSI KUNIDA KELADIGAN TALABALAR CHIQARILSIN'
					v-model='filter.week_day'
					:items='weekDays'
					item-value='value'
					item-text='text'
					outlined
					dense
					clearable
				/>
			</v-col>
		</v-row>

		<v-row>
			<v-autocomplete
				v-if='BRANCH_ID == null'
				v-model='filter.place_id'
				:items='places'
				item-text='name'
				item-value='id'
				label='FILIAL'
				class='data-list-search me-3'
				dense
				outlined
				hide-details
				clearable
			>
		</v-autocomplete>

			<!--			<v-col cols='6'>-->

			<!--				<v-menu-->
			<!--					ref='menu'-->
			<!--					v-model='timeMenu'-->
			<!--					:close-on-content-click='false'-->
			<!--					:nudge-right='40'-->
			<!--					:return-value.sync='filter.time'-->
			<!--					transition='scale-transition'-->
			<!--					offset-y-->
			<!--				>-->
			<!--					<template v-slot:activator='{ on, attrs }'>-->
			<!--						<v-text-field-->
			<!--							v-model='filter.time'-->
			<!--							label='Soat nechchida keladiganlar'-->
			<!--							prepend-icon='mdi-clock-time-four-outline'-->
			<!--							readonly-->
			<!--							v-bind='attrs'-->
			<!--							v-on='on'-->
			<!--						></v-text-field>-->
			<!--					</template>-->
			<!--					<v-time-picker-->
			<!--						v-if='timeMenu'-->
			<!--						format='24hr'-->
			<!--						v-model='filter.time'-->
			<!--						full-width-->
			<!--						@click:minute='$refs.menu.save(filter.time)'-->
			<!--					></v-time-picker>-->
			<!--				</v-menu>-->

			<!--			</v-col>-->
		</v-row>
	</div>
</template>

<script>
import { ref, computed, watch } from '@vue/composition-api'

import {
	mdiCalendar,
} from '@mdi/js'
import axios from '@axios'
import store from '@/store'

export default {
	name: 'StudentDebtSearch',
	props: ['value'],
	setup(props, { emit }) {

		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, (value) => {
			filter.value.place_id = value
		})

		const filter = ref(props.value)

		//default fields
		filter.value = Object.assign({
			teacher_id: '',
			number: '',
			subject_id: '',
			place_id: branch_id.value ?? '',
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

		const subjects = ref([])
		const loadSubjects = () => {
			axios.get('/api/subjects').then(response => {
				subjects.value = response.data.data
			})
		}
		loadSubjects()
		watch(() => filter.value.subject_id, val => {
			loadTeachers()
			loadGroups()
		})

		const teachers = ref([])
		const loadTeachers = () => {
			//todo: Kurs tanlangan bo'lsa faqat shu Kursni o'tadigan ustozlar olinsin, backend tomonni to'g'rilash kerak
			const params = clearParams({
				place_id: filter.value.place_id,
				subject_id: filter.value.subject_id,
			})
			axios.get('/api/teachers', { params }).then(response => {
				teachers.value = response.data.data
			})
		}
		loadTeachers()
		watch(() => filter.value.teacher_id, val => {
			loadGroups()
		})

		const groups = ref([])
		const loadGroups = () => {
			const params = clearParams({
				subject_id: filter.value.subject_id,
				teacher_id: filter.value.teacher_id,
				place_id: filter.value.place_id,
			})
			axios.get('/api/groups', { params }).then(response => {
				groups.value = response.data.data
			})
		}
		loadGroups()

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

		// const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)

		// LoadApis
		const months = ref([
			{
				value: 'Yanvar',
				text: 'Yanvar',
				id: 1,
			},
			{
				value: 'Fevral',
				text: 'Fevral',
				id: 2,
			},
			{
				value: 'Mart',
				text: 'Mart',
				id: 3,
			},
			{
				value: 'Aprel',
				text: 'Aprel',
				id: 4,
			},
			{
				value: 'May',
				text: 'May',
				id: 5,
			},
			{
				value: 'Iyun',
				text: 'Iyun',
				id: 6,
			},
			{
				value: 'Iyul',
				text: 'Iyul',
				id: 7,
			},
			{
				value: 'Avgust',
				text: 'Avgust',
				id: 8,
			},
			{
				value: 'Sentabr',
				text: 'Sentabr',
				id: 9,
			},
			{
				value: 'Oktabr',
				text: 'Oktabr',
				id: 10,
			},
			{
				value: 'Noyabr',
				text: 'Noyabr',
				id: 11,
			},
			{
				value: 'Dekabr',
				text: 'Dekabr',
				id: 12,
			},
		])

		const today = Date.now()

		const weekDays = [
			{ value: 1, text: 'Dushanba' },
			{ value: 2, text: 'Seshanba' },
			{ value: 3, text: 'Chorshanba' },
			{ value: 4, text: 'Payshanba' },
			{ value: 5, text: 'Juma' },
			{ value: 6, text: 'Shanba' },
			{ value: 7, text: 'Yakshanba' },
		]

		const timeMenu = ref(false)

		return {
			filter,

			place_id: branch_id,

			subjects,
			teachers,
			groups,
			students,

			today,
			isDate,

			timeMenu: false,

			months,
			weekDays,

			branch_id,


			icons: {
				mdiCalendar,
			},
		}
	},
}
</script>

<style scoped>

</style>