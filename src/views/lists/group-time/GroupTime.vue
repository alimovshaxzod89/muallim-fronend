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
							<v-icon dark left>{{ icons.mdiArrowLeft }}</v-icon>
							Орқага
						</v-btn>
						<h2>
							&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{ places[filter.place_id] ? places[filter.place_id] : null
							}}</h2>
					</div>
					<div>
						<div class='month'>
							<v-btn
								v-for='(day, dayIndex) in weekDays'
								:key='dayIndex'
								style='margin-right: 5px; margin-bottom: 5px'
								width='100'
								:outlined='filter.weekDays.indexOf(parseInt(dayIndex)) === -1'
								color='primary'
								small
								@click='setWeekDays(parseInt(dayIndex))'
							>
								{{ day }}
							</v-btn>
						</div>
					</div>
				</v-col>
			</div>
			<br>
			<div v-for='day in filter.weekDays'>
				<h2>{{ weekDays[day] }}</h2>
				<calendar
					v-if='filter.place_id'
					:day='day'
					:place_id='filter.place_id'
				/>
				<br />
			</div>
		</div>
	</div>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'

import { onMounted, ref, watch } from '@vue/composition-api'
import { useRouter } from '@core/utils'

import store from '@/store'
import axios from '@axios'

import SelectPlace from './SelectPlace'
import Calendar from './calendar/Calendar'
import GroupTimeStoreModule from './GroupTimeStoreModule'

const MODULE_NAME = 'group-time'

export default {
  components: {
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

		const { router, route } = useRouter()

    onMounted(() => {
      filter.value.place_id = route.value.query.place_id ? parseInt(route.value.query.place_id) : null
    })

    const places = ref({})
    const loadPlaces = () => {
      axios.get('/api/places').then(response => {
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
      place_id: null,
      weekDays: [],
    })

    filter.value.weekDays.push(new Date().getDay())

    const weekDays = {
      1: 'Dushanba',
      2: 'Seshanba',
      3: 'Chorshanba',
      4: 'Payshanba',
      5: 'Juma',
      6: 'Shanba',
      7: 'Yakshanba',
    }
    const setWeekDay = day => {
      filter.value.weekDays = [day]
    }
    const setWeekDays = day => {
      if (filter.value.weekDays.indexOf(day) !== -1) {
        //remove
        const pos = filter.value.weekDays.indexOf(day)
        filter.value.weekDays.splice(pos, 1)
      } else {
        //add
        filter.value.weekDays = [...filter.value.weekDays, day].sort()
      }
    }

    watch(
      filter,
      value => {
        const { place_id, weekDays } = value

        if (place_id && weekDays.length > 0) {
          store
            .dispatch(`${MODULE_NAME}/fetchDatas`, filter.value)
            .then(() => {})
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
.month {
  width: 140%;
}
</style>