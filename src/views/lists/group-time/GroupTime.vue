<template>
	<div>

		<select-place v-if='!filter.place_id' v-on:select-place='selectPlace($event)' />
		<div v-if='filter.place_id'>
			<div class='row justify-content-between' style='display: flex;'>
				<v-col cols='8'>
					<div class='col d-flex'>
						<v-btn
							outlined
							style=''
							color='primary'
							@click='selectPlace(null)'
						>
							<v-icon
								dark
								left
							>
								{{ icons.mdiArrowLeft }}
							</v-icon>
							Орқага
						</v-btn>
						<h2>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ places[filter.place_id] ? places[filter.place_id] : null
							}}</h2>
					</div>
					<div>
						<!--					<div style="margin-top: 12px; margin-left: 10px">-->
						<!--						<v-select-->
						<!--							v-model="filter.year"-->
						<!--							:items="years"-->
						<!--							item-text="name"-->
						<!--							item-value="id"-->
						<!--							label="Йил"-->
						<!--							outlined-->
						<!--							dense-->
						<!--							class="align-start"-->
						<!--							style="width: 200px"-->
						<!--						></v-select>-->
						<!--					</div>-->

						<div class='month'>
							<v-btn
								v-for='(day, dayIndex) in weekDays'
								:key='dayIndex'
								style='margin-right: 5px; margin-bottom: 5px'
								width='100'
								:outlined='filter.weekDays.indexOf(dayIndex) === -1'
								color='primary'
								small
								@click='setWeekDays(dayIndex)'
								@click.ctrl='setWeekDays(dayIndex)'
							>
								{{ day }}
							</v-btn>
						</div>
					</div>
				</v-col>

			</div>

			<br>
			<calendar
				v-if='filter.year && filter.month && filter.place_id'
				ref='calendar'
				:year='filter.year'
				:month='filter.month'
				:place_id='filter.place_id'
			/>

		</div>

	</div>
</template>

<script>
import { useRouter } from '@core/utils'
import SelectPlace from './SelectPlace'

import { onMounted, ref, watch } from '@vue/composition-api'
import Button from '@/views/components/button/Button'
import moment from 'moment'
import Calendar from './calendar/Calendar'
import store from '@/store'
import GroupTimeStoreModule from './GroupTimeStoreModule'
import { mdiArrowLeft } from '@mdi/js'
import axios from '@axios'

const MODULE_NAME = 'group-time'

export default {
	components: {
		Button,
		SelectPlace,
		Calendar,
	},
	setup() {

		// Register module
		if (!store.hasModule(MODULE_NAME)) {
			store.registerModule(MODULE_NAME, GroupTimeStoreModule)
		}

		//store state
		// const stateBron = ref(store.state[MODULE_NAME])

		onMounted(() => {
			filter.value.place_id = route.value.query.place_id ? parseInt(route.value.query.place_id) : null
		})

		const {
			router,
			route,
		} = useRouter()

		const places = ref({})
		const loadPlaces = () => {
			axios.get('/api/places')
				.then(response => {
					if (response.data.success) {
						const res = response.data.data
						for (const resKey in res) {
							places.value[res[resKey].id] = res[resKey].name
						}
					}
				})
		}
		loadPlaces()

		const selectPlace = id => {
			filter.value.place_id = id

			router.push({
				query: {
					...router.query,
					place_id: id,
				},
			})
		}

		//filters
		const filter = ref({
			year: parseInt(moment()
				.format('YYYY')),
			month: parseInt(moment()
				.format('M')),
			place_id: null,
			weekDays: []
		})
		const weekDays = {1: 'Dushanba', 2: 'Seshanba', 3: 'Chorshanba', 4: 'Payshanba', 5: 'Juma', 6: 'Shanba', 7: 'Yakshanba'}
		const setWeekDay = day => {
			filter.value.weekDays = [day]
		}
		const setWeekDays = day => {
			filter.value.weekDays.push(day)
		}
		watch(
			filter,
			value => {
				const {
					place_id,
					weekDays,
				} = value

				if (place_id && weekDays) {
					store
						.dispatch(`${MODULE_NAME}/fetchDatas`, filter.value)
						.then(() => {
						})
						.catch(error => {
							console.log(error)
							notify.value = {
								type: 'error',
								text: error,
								time: Date.now(),
							}
						})
				}
			},
			{ deep: true },
		)

		return {
			router,
			places,
			selectPlace,
			filter,
			// years,
			// months,
			// setMonth,
			weekDays,
			setWeekDays,
			setWeekDay,

			icons: {
				mdiArrowLeft,
			},
		}
	},
}
</script>

<style scoped>
.switchbutton {
	margin-bottom: -20px;
	margin-top: -20%;
	margin-left: 75%;
}

.switchbutton1 {
	width: 600px;
	margin-top: 10%;
}

.month {
	width: 140%;
}
</style>
