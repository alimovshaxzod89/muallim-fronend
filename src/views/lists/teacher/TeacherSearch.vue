<template>
	<div class="d-flex pb-5" style="width: 100%">
<!--		<v-text-field-->
<!--			v-model="filter.query"-->
<!--			dense-->
<!--			outlined-->
<!--			hide-details-->
<!--			label="Qidirish"-->
<!--			class="data-list-search me-3"-->
<!--		></v-text-field>-->

		<v-text-field
			v-model="filter.full_name"
			dense
			outlined
			hide-details
			label="FISH"
			class="data-list-search me-3"
		></v-text-field>

		<v-autocomplete
			v-model="filter.gender"
			:items="[{value: 1, name: 'Erkak'}, {value: 2, name: 'Ayol'}]"
			item-text="name"
			item-value="value"
			dense
			outlined
			hide-details
			label="Jinsi"
			class="data-list-search me-3"
			clearable
		></v-autocomplete>

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


					<v-text-field
						v-model="filter.phone"
						dense
						outlined
						hide-details
						label="Telefon"
						class="data-list-search me-3"
					></v-text-field>

					<v-autocomplete
						v-model="filter.region_id"
						:items="regions"
						item-text="name"
						item-value="id"
						dense
						outlined
						hide-details
						label="Tuman"
						class="data-list-search me-3"
						clearable
					></v-autocomplete>

					<v-text-field
						v-model="filter.address"
						dense
						outlined
						hide-details
						label="Manzil"
						class="data-list-search me-3"
					></v-text-field>

					<v-autocomplete
						v-model="filter.permanent_region_id"
						:items="regions"
						item-text="name"
						item-value="id"
						dense
						outlined
						hide-details
						label="D.Y. Tuman"
						class="data-list-search me-3"
						clearable
					></v-autocomplete>

					<v-text-field
						v-model="filter.permanent_address"
						dense
						outlined
						hide-details
						label="D.Y. Manzil"
						class="data-list-search me-3"
					></v-text-field>

				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import { ref, watch } from '@vue/composition-api'
import axios from '@axios'
import { mdiCalendar, mdiFilterOutline } from '@mdi/js'

export default {
	name: 'TeacherSearch',
	props: ['value'],

	setup(props, {emit}) {

		const filter = ref(props.value)
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

		return {
			filter,

			regions,

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