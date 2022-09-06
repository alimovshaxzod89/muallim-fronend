<template>
	<v-expansion-panels class='my-accordion' accordion>
		<v-expansion-panel>
			<v-expansion-panel-header disable-icon-rotate>
				Ko'proq
				<template #actions>
					<v-icon color='secondary'>
						{{ icons.mdiFilterOutline }}
					</v-icon>
				</template>
			</v-expansion-panel-header>
			<v-expansion-panel-content>
				<v-autocomplete
					v-model='filter.group_id'
					:items='groups'
					item-text='number'
					item-value='id'
					dense
					solo
					outlined
					hide-details
					label='Guruh'
					class='data-list-search me-3'
					clearable
				></v-autocomplete>

				<v-autocomplete
					v-model='filter.teacher_id'
					:items='teachers'
					item-text='full_name'
					item-value='id'
					dense
					solo
					outlined
					hide-details
					label="O'qituvchi"
					class='data-list-search me-3'
					clearable
				></v-autocomplete>

				<v-text-field
					v-model='filter.phone'
					dense
					outlined
					hide-details
					label='Telefon'
					class='data-list-search me-3'
				></v-text-field>

				<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
					<template v-slot:activator='{ on, attrs }'>
						<v-text-field
							class='my-date-picker'
							v-model='filter.birth_date'
							label="Tug'ilgan sana"
							readonly
							v-bind='attrs'
							hide-details
							v-on='on'
							style='height: 40px !important; width: 170px !important'
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

				<v-autocomplete
					v-model='filter.sale'
					:items="[{value: 1, name: 'Ha'}, {value: 0, name: 'Yo\'q'}]"
					item-text='name'
					item-value='value'
					dense
					solo
					outlined
					hide-details
					label='Chegirma'
					class='data-list-search me-3'
					clearable
				></v-autocomplete>

				<v-text-field
					v-model='filter.sale_cause'
					dense
					outlined
					hide-details
					label='Chegirma sababi'
					class='data-list-search me-3'
				></v-text-field>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script>

import {
	mdiCalendar,
	mdiFilterOutline,
} from '@mdi/js'
import { ref, watch } from '@vue/composition-api'
import axios from '@axios'

export default {
	name: 'PaymentSearch',
	props: ['value'],
	setup(props, {emit}) {

		const filter = ref(props.value)
		watch(filter, (value) => {
			emit('input', value)
		}, {deep: true})

		// Datepicker
		// const picker = new Date().toISOString().substr(0, 10)
		const isDate = ref(false)

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

		return {
			filter,

			isDate,
			// picker,

			groups,
			teachers,

			icons: {
				mdiFilterOutline,
				mdiCalendar,
			},
		}
	},
}
</script>

<style lang='scss' scoped>

.my-filter {
	.v-input {
		margin-right: 12px;
		margin-bottom: 12px;
	}
}
</style>