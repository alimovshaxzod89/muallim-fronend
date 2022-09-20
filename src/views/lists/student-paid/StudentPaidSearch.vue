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

			<v-col cols='3'>
				<v-select
					v-model='filter.cashbox_id'
					:items='cashboxes'
					item-text='name'
					item-value='id'
					dense
					outlined
					hide-details
					label="TO'LOV TURI"
					class='data-list-search me-3'
					clearable
				></v-select>
			</v-col>
			<v-col cols="3">
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
			</v-col>

		</v-row>

		<v-radio-group v-model='dateFilterMode'>
			<v-row>

				<v-col cols='1'>
					<v-radio key='monthly' value='monthly' />
				</v-col>

				<v-col cols='3'>
					<v-text-field
						v-model='filter.year'
						type='number'
						dense
						outlined
						hide-details
						label='YIL'
						class='data-list-search me-3'
						clearable
						:disabled='dateFilterMode !== "monthly"'
					></v-text-field>
				</v-col>

				<v-col cols='3'>
					<v-select
						v-model='filter.month'
						:items='months'
						item-text='text'
						item-value='id'
						dense
						outlined
						hide-details
						label='OY'
						class='data-list-search me-3'
						clearable
						:disabled='dateFilterMode !== "monthly"'
					></v-select>
				</v-col>

				<v-col cols='3'>
					<v-text-field
						v-model='filter.day'
						type='number'
						min='1'
						max='31'
						dense
						outlined
						hide-details
						label='KUN [1, 31]'
						class='data-list-search me-3'
						clearable
						:disabled='dateFilterMode !== "monthly"'
					></v-text-field>
				</v-col>

			</v-row>


			<v-row>
				<v-col cols='1'>
					<v-radio key='between' value='between' />
				</v-col>

				<v-col cols='3'>
					<v-menu
						ref='menuref'
						v-model='menu1'
						:close-on-content-click='false'
						transition='scale-transition'
						offset-y
						max-width='290px'
						min-width='auto'
					>
						<template v-slot:activator='{ on, attrs }'>
							<v-text-field
								v-model='filter.date1'
								label='SANA ...dan'
								persistent-hint
								:prepend-icon='icons.mdiCalendar'
								v-bind='attrs'
								v-on='on'
								outlined
								dense
								clearable
								:disabled='dateFilterMode !== "between"'
							></v-text-field>
						</template>
						<v-date-picker
							v-model='filter.date1'
							no-title
							color='primary'
							@input='menu1 = false'
						></v-date-picker>

					</v-menu>
				</v-col>

				<v-col cols='3'>
					<v-menu
						v-model='menu2'
						:close-on-content-click='false'
						transition='scale-transition'
						offset-y
						max-width='290px'
						min-width='auto'
					>
						<template v-slot:activator='{ on, attrs }'>
							<v-text-field
								v-model='filter.date2'
								label='SANA ...gacha'
								persistent-hint
								:prepend-icon='icons.mdiCalendar'
								readonly
								v-bind='attrs'
								v-on='on'
								outlined
								dense
								clearable
								:disabled='dateFilterMode !== "between"'
							></v-text-field>
						</template>
						<v-date-picker
							v-model='filter.date2'
							no-title
							color='primary'
							@input='menu2 = false'
						></v-date-picker>
					</v-menu>
				</v-col>

			</v-row>
		</v-radio-group>
	</div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'
import moment from 'moment/moment'
import store from '@/store'

export default {
	name: 'StudentPaidSearch',
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
			group_id: '',
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
		watch(() => filter.value.subject_id, () => {
			loadTeachers()
			loadGroups()
		})

		const teachers = ref([])
		const loadTeachers = () => {
			//todo: Kurs tanlangan bo'lsa faqat shu Kursni o'tadigan ustozlar olinsin, backend tomonni to'g'rilash kerak
			const params = clearParams({
				subject_id: filter.value.subject_id,
				place_id: filter.value.place_id,
			})
			axios.get('/api/teachers', { params }).then(response => {
				teachers.value = response.data.data
			})
		}
		loadTeachers()
		watch(() => filter.value.teacher_id, () => {
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

		watch(() => filter.value.group_id, () => {
			loadStudents()
		})

		const students = ref([])
		const loadStudents = () => {
			const params = clearParams({
				group_id: filter.value.group_id,
				place_id: filter.value.place_id,
			})
			axios.get('/api/students', { params }).then(response => {
				students.value = response.data.data
			})
		}
		loadStudents()


		const cashboxes = ref([])
		const loadCashboxes = () => {
			axios.get('/api/cashboxes').then(response => {
				cashboxes.value = response.data.data
			})
		}
		loadCashboxes()


		const years = ref([
			{ id: 1, number: '2020' },
			{ id: 2, number: '2021' },
			{ id: 3, number: '2022' },
		])

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

		// Filter date picker
		const date = ref(new Date().toISOString().substr(0, 10))
		const menu1 = ref(false)
		const menu2 = ref(false)


		// Datepicker
		// const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)
		const isDateTwo = ref(false)


		const formatDate = dates => {
			if (!dates) return null
			const [year, month, day] = dates.split('-')

			return `${month}/${day}/${year}`
		}

		let dateFormatted = formatDate(new Date().toISOString().substr(0, 10))

		const parseDate = dates => {
			if (!dates) return null
			const [month, day, year] = dates.split('/')

			return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
		}

		const computedDateFormatted = computed(() => formatDate(date.value))

		watch(date, () => {
			dateFormatted = formatDate(date.value)
		})

		const dateFilterMode = ref('monthly')
		watch(dateFilterMode, (val) => {
			if (val === 'monthly') {

				filter.value.year = moment(Date.now()).format('YYYY')
				filter.value.month = parseInt(moment(Date.now()).format('M'))

				filter.value = {
					...filter.value,
					year: moment(Date.now()).format('YYYY'),
					month: parseInt(moment(Date.now()).format('M')),
					date1: '',
					date2: '',
				}
			} else {

				filter.value = {
					...filter.value,
					year: '',
					month: '',
					date1: moment(Date.now()).startOf('month').format('YYYY-MM-DD'),
					date2: moment(Date.now()).endOf('month').format('YYYY-MM-DD'),
				}
			}
		})

		return {
			filter,

			years,
			months,

			isDate,
			isDateTwo,
			date,
			menu1,
			menu2,
			// picker,

			dateFilterMode,

			dateFormatted,
			computedDateFormatted,
			parseDate,
			formatDate,

			subjects,
			groups,
			teachers,
			students,
			cashboxes,

			place_id: branch_id,

			icons: {
				mdiFilterOutline,
				mdiCalendar,
			},
		}
	},
}
</script>

<style scoped>

</style>