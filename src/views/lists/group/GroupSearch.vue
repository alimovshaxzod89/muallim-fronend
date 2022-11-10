<template>
	<div class='d-flex pb-5' style='width: 100%'>
		<!--		<v-text-field-->
		<!--			v-model="filter.query"-->
		<!--			dense-->
		<!--			outlined-->
		<!--			hide-details-->
		<!--			label="Qidiruv"-->
		<!--			class="data-list-search me-3"-->
		<!--		></v-text-field>-->

		<v-text-field
			v-model='filter.number'
			dense
			outlined
			hide-details
			label='GURUH NOMI'
			class='data-list-search me-3'
			clearable
		></v-text-field>

		<v-autocomplete
			v-model='filter.teacher_id'
			:items='teachers'
			item-text='full_name'
			item-value='id'
			label='USTOZ'
			class='data-list-search me-3'
			dense
			outlined
			hide-details
			clearable
		>
		</v-autocomplete>

		<v-autocomplete
			v-model='filter.subject_id'
			:items='subjects'
			item-text='name'
			item-value='id'
			label='KURS'
			class='data-list-search me-3'
			dense
			outlined
			hide-details
			clearable
		>
		</v-autocomplete>

		<v-autocomplete
			v-model='filter.status_id'
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

	</div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'
import store from '@/store'

export default {
	name: 'GroupSearch',
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
			status: '',
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

		const places = ref([])
		const loadPlaces = () => {
			axios.get('/api/places').then(response => {
				places.value = response.data.data
			})
		}
		loadPlaces()

		const subjects = ref([])
		const loadSubjects = () => {
			axios.get('/api/subjects').then(response => {
				subjects.value = response.data.data
			})
		}
		loadSubjects()

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

		return {
			filter,

			place_id: branch_id,
			branch_id,

			places,
			teachers,
			subjects,
			STATUS,

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