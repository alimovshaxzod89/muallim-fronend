<template>
	<div class='d-flex pb-5' style='width: 100%'>
		<!--		<v-text-field-->
		<!--			v-model="filter.query"-->
		<!--			dense-->
		<!--			outlined-->
		<!--			hide-details-->
		<!--			label="Qidirish"-->
		<!--			class="data-list-search me-3"-->
		<!--		></v-text-field>-->

		<v-text-field
			v-model='filter.full_name'
			dense
			outlined
			hide-details
			label='FISH'
			class='data-list-search me-3'
		></v-text-field>

		<v-autocomplete
			v-if='BRANCH_ID == null'
			v-model='filter.place_id'
			:items='places'
			item-text='name'
			item-value='id'
			dense
			outlined
			hide-details
			label='FILIAL'
			class='data-list-search me-3'
			clearable
		></v-autocomplete>

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

					<v-row>
						<v-col cols='8'>
							<v-text-field
								v-model='filter.phone'
								dense
								outlined
								hide-details
								label='Telefon'
								class='data-list-search me-3'
							></v-text-field>
						</v-col>

						<v-col cols='4'>
							<v-autocomplete
								v-model='filter.gender'
								:items="[{value: 1, name: 'Erkak'}, {value: 2, name: 'Ayol'}]"
								item-text='name'
								item-value='value'
								dense
								outlined
								hide-details
								label='Jinsi'
								class='data-list-search me-3'
								clearable
							></v-autocomplete>
						</v-col>
					</v-row>

					<v-row>

						<v-col cols='6'>
							<v-autocomplete
								v-model='filter.region_id'
								:items='regions'
								item-text='name'
								item-value='id'
								dense
								outlined
								hide-details
								label='Tuman'
								class='data-list-search me-3'
								clearable
							></v-autocomplete>

						</v-col>

						<!--						<v-col cols='6'>-->
						<!--							<v-text-field-->
						<!--								v-model='filter.address'-->
						<!--								dense-->
						<!--								outlined-->
						<!--								hide-details-->
						<!--								label='Manzil'-->
						<!--								class='data-list-search me-3'-->
						<!--							></v-text-field>-->
						<!--						</v-col>-->

						<v-col cols='6'>
							<v-autocomplete
								v-model='filter.permanent_region_id'
								:items='regions'
								item-text='name'
								item-value='id'
								dense
								outlined
								hide-details
								label='D.Y. Tuman'
								class='data-list-search me-3'
								clearable
							></v-autocomplete>
						</v-col>

						<!--						<v-col cols='6'>-->
						<!--							<v-text-field-->
						<!--								v-model='filter.permanent_address'-->
						<!--								dense-->
						<!--								outlined-->
						<!--								hide-details-->
						<!--								label='D.Y. Manzil'-->
						<!--								class='data-list-search me-3'-->
						<!--							></v-text-field>-->
						<!--						</v-col>-->
					</v-row>

				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'
import store from '@/store'

export default {
	name: 'TeacherSearch',
	props: ['value'],

	setup(props, { emit }) {

		const filter = ref(props.value)

		const branch_id = computed(() => store.state.branch_id)
		watch(branch_id, (value) => {
			filter.value.place_id = value ?? ''
		})

		//default fields
		filter.value = Object.assign({
			query: '',
			place_id: branch_id.value ?? '',
			full_name: '',
			phone: '',
			region_id: '',
			address: '',
			permanent_region_id: '',
			permanent_address: '',
			gender: '',
			birth_date: '',
		}, props.value)

		//return with default fields
		emit('input', filter.value)

		watch(filter, (value) => {
			emit('input', value)
		}, { deep: true })

		const regions = ref([])
		const loadRegions = () => {
			axios.get('/api/regions').then(response => {
				regions.value = response.data.data
			})
		}
		loadRegions()

		const places = ref([])
		const loadPlaces = () => {
			axios.get('/api/places').then(response => {
				places.value = response.data.data
			})
		}
		loadPlaces()

		return {
			filter,

			regions,
			places,

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