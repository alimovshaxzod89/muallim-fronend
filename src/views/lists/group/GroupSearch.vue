<template>
	<div class="d-flex pb-5" style="width: 100%">
<!--		<v-text-field-->
<!--			v-model="filter.query"-->
<!--			dense-->
<!--			outlined-->
<!--			hide-details-->
<!--			label="Qidiruv"-->
<!--			class="data-list-search me-3"-->
<!--		></v-text-field>-->

		<v-text-field
			v-model="filter.number"
			dense
			outlined
			hide-details
			label="GURUH NOMI"
			class="data-list-search me-3"
		></v-text-field>

		<v-autocomplete
			v-model="filter.teacher_id"
			:items="teachers"
			item-text="full_name"
			item-value="id"
			label="USTOZ"
			class="data-list-search me-3"
			dense
			solo
			outlined
			hide-details
			clearable
		>
		</v-autocomplete>

		<v-autocomplete
			v-model="filter.subject_id"
			:items="subjects"
			item-text="name"
			item-value="id"
			label="KURS"
			class="data-list-search me-3"
			dense
			solo
			outlined
			hide-details
			clearable
		>
		</v-autocomplete>

		<v-autocomplete
			v-model="filter.place_id"
			:items="places"
			item-text="name"
			item-value="id"
			label="BINO"
			class="data-list-search me-3"
			dense
			solo
			outlined
			hide-details
			clearable
		>
		</v-autocomplete>

	</div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'

export default {
	name: 'GroupSearch',
	props: ['value'],

	setup(props, {emit}) {

		const filter = ref(props.value)
		watch(filter, (value) => {
			emit('input', value)
		}, { deep: true })

		const teachers = ref([])
		const loadTeachers = () => {
			axios.get('/api/teachers').then(response => {
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

		return {
			filter,

			places,
			teachers,
			subjects,

			icons: {
				mdiFilterOutline,
				mdiCalendar,
			},
		}
	}
}
</script>

<style scoped>

</style>