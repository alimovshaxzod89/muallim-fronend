<template>
	<v-expansion-panels class="my-accordion" accordion>
		<v-expansion-panel>
			<v-expansion-panel-header disable-icon-rotate>
				Ko'proq
				<template #actions>
					<v-icon color="secondary">
						{{ icons.mdiFilterOutline  }}
					</v-icon>
				</template>
			</v-expansion-panel-header>
			<v-expansion-panel-content>

				<v-col cols="3">
					<v-autocomplete
						v-model="filter.year"
						:items="years"
						item-text="number"
						item-value="id"
						solo
						dense
						outlined
						hide-details
						label="YIL"
						class="data-list-search me-3"
						clearable
					></v-autocomplete>
				</v-col>

				<v-col cols="3">
					<v-autocomplete
						v-model="filter.month"
						:items="months"
						item-text="name"
						item-value="id"
						solo
						dense
						outlined
						hide-details
						label="OY"
						class="data-list-search me-3"
						clearable
					></v-autocomplete>
				</v-col>

				<v-col cols="3">
					<v-menu
						ref="menuref"
						v-model="menu1"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="auto"
					>

						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="filter.date"
								label="Hozirgi san'a"
								persistent-hint
								:prepend-icon="icons.mdiCalendar"
								v-bind="attrs"
								@blur="date = parseDate(dateFormatted)"
								v-on="on"
								outlined
								dense
								clearable
							></v-text-field>
						</template>


						<v-date-picker
							v-model="filter.date"
							no-title
							color="primary"
							@input="menu1 = false"
						></v-date-picker>

					</v-menu>
				</v-col>

				<v-col cols="3">
					<v-menu
						v-model="menu2"
						:close-on-content-click="false"
						transition="scale-transition"
						offset-y
						max-width="290px"
						min-width="auto"
					>
						<template v-slot:activator="{ on, attrs }">
							<v-text-field
								v-model="filter.date2"
								label="san'ani tanlash"
								persistent-hint
								:prepend-icon="icons.mdiCalendar"
								readonly
								v-bind="attrs"
								v-on="on"
								outlined
								dense
								clearable
							></v-text-field>
						</template>

						<v-date-picker
							v-model="filter.date2"
							no-title
							color="primary"
							@input="menu2 = false"
						></v-date-picker>
					</v-menu>
				</v-col>

				<!-- <v-autocomplete
					v-model="filter.full_name"
					:items="teachers"
					item-text="full_name"
					item-value="id"
					dense
					outlined
					hide-details
					label="Ustozlar"
					class="data-list-search me-3"
					clearable
				></v-autocomplete> -->

				<v-autocomplete
					v-model="filter.group_id"
					:items="groups"
					item-text="number"
					item-value="id"
					solo
					dense
					outlined
					hide-details
					label="Guruhlar"
					class="data-list-search me-3"
					clearable
				></v-autocomplete>

				<v-autocomplete
					v-model="filter.student_id"
					:items="students"
					item-text="full_name"
					item-value="id"
					solo
					dense
					outlined
					hide-details
					label="Studentlar"
					class="data-list-search me-3"
					clearable
				></v-autocomplete>

			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'

export default {
	name: 'StudentPaidSearch',
	props: ['value'],
	setup(props, {emit}) {

		const filter = ref(props.value)
		watch(filter, (value) => {
			emit('input', value)
		}, {deep: true})


		const years = ref([
			{ id: 1, number: '2020' },
			{ id: 2, number: '2021' },
			{ id: 3, number: '2022' },
		])

		const months = ref([
			{ id: 1, name: 'Yanvar' },
			{ id: 2, name: 'Fevral' },
			{ id: 3, name: 'Mart' },
			{ id: 4, name: 'Aprel' },
			{ id: 5, name: 'May' },
			{ id: 6, name: 'Iyun' },
			{ id: 7, name: 'Iyul' },
			{ id: 8, name: 'Avgust' },
			{ id: 9, name: 'Sentabr' },
			{ id: 10, name: 'Oktabr' },
			{ id: 11, name: 'Noyabr' },
			{ id: 12, name: 'Dekabr' },
		])

		// LoadApis
		const groups = ref([])
		const loadGroups = () => {
			axios.get('/api/groups').then(response => {
				groups.value = response.data.data
			})
		}
		loadGroups()

		const teachers = ref([])
		const loadTeachers = () => {
			axios.get('/api/teachers').then(response => {
				teachers.value = response.data.data
			})
		}
		loadTeachers()


		const students = ref([])
		const loadStudents = () => {
			axios.get('/api/students').then(response => {
				students.value = response.data.data
			})
		}
		loadStudents()


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

			dateFormatted,
			computedDateFormatted,
			parseDate,
			formatDate,

			groups,
			teachers,
			students,

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