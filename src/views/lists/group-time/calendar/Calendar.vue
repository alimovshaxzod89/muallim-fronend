<template>
	<v-card>
		<v-simple-table class="my-table">
			<template v-slot:default>
				<thead>
				<tr>
					<th>Xona / Soat</th>
					<th v-for='time in times'
							:key='time.hour'
							style='text-align: left !important;'
					>
						{{ time.hour }}
					</th>
				</tr>
				</thead>
				<tbody>
					<tr v-for="room in rooms" :key="room.id">
						<td>
							<div style="min-width: 50px; white-space: nowrap;">{{ room.name  }} ({{room.capacity}}x)</div>
						</td>

						<td
							v-for="time in times"
							:key="time.hour"
						>
							<div
								style="position: relative; height: 100%; margin-top: 5px; width: 50px;"
								class="cell"
								v-if="getters[`${MODULE_NAME}/indexCalendar`].includes(`${time}_${room.id}`)"
							>
								<calendar-cell
									:group-time="stateGroupTime.rows[getters[`group-time/indexCalendar`].indexOf(`${time}_${room.id}`)]"
									:time="time"
									:room_id="room.id"
									v-on:open-group-time-form="openGroupTimeForm($event)"
								/>
							</div>

							<div
								style="position: relative; height: 100%; margin-top: 5px; width: 50px;"
								class="cell"
								v-if="!getters[`${MODULE_NAME}/indexCalendar`].includes(`${time}_${room.id}`)"
								@dblclick="openGroupTimeForm(null, {place_id, room_id: room.id, time_begin: time})"
							>
							</div>
						</td>

					</tr>
				</tbody>
			</template>
		</v-simple-table>

		<group-time-form ref="groupTimeForm" />
	</v-card>
</template>

<script>
import moment from 'moment'
import { getCurrentInstance, onMounted, ref, watch } from '@vue/composition-api/dist/vue-composition-api'
import axios from '@axios'
import store from '@/store'
import GroupTimeStoreModule from '../GroupTimeStoreModule'
import GroupTimeForm from './../crud/GroupTimeForm'
import CalendarCell from './CalendarCell'

const MODULE_NAME = 'group-time'

export default {
  name: 'Calendar',
  components: {
    CalendarCell,
    GroupTimeForm,
  },
  props: {
    day: {
      type: Number,
      require: true,
    },
    place_id: {
      type: Number,
      require: true,
    },
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, GroupTimeStoreModule)
    }

    const stateGroupTime = ref(store.state[MODULE_NAME])
    const getters = store.getters

    // store.commit(`${MODULE_NAME}/setYear`, props.year)
    // store.commit(`${MODULE_NAME}/setMonth`, props.month)

    const vm = getCurrentInstance().proxy

		let times = ref([])
		for (let hour = 6; hour <= 23; hour += 1) {
			times.value.push({ time: moment.utc(hour * 3600 * 1000).format('H:mm'), hour })
		}

    onMounted(() => {
      loadRooms(props.place_id)
    })
    watch(
      () => props.place_id,
      value => {
        loadRooms(value)
      },
    )

    // Load subjects
    const rooms = ref([])
    const loadRooms = place_id => {
      axios.get('/api/rooms', { params: { place_id } }).then(response => {
        if (response.data.success) {
          rooms.value = response.data.data
        }
      })
    }

    //form
    const groupTimeForm = ref()
    const openGroupTimeForm = (id, fields = {}) => {
      if (id && vm.$can('update', 'Bron')) {
        groupTimeForm.value.open(id, fields)
      } else if (vm.$can('create', 'Bron')) {
        groupTimeForm.value.open(id, fields)
      }
    }

    const currentDate = moment().format('YYYY-MM-DD')

    return {
      times,
      rooms,

      currentDate,

      stateGroupTime,
      getters,

      groupTimeForm,
      openGroupTimeForm,

			MODULE_NAME,
    }
  },
}
</script>

<style scoped>
table th + th {
  border-left: 1px solid #dddddd;
}

table td + td {
  border-left: 1px solid #dddddd;
}

table th {
  padding: 2px !important;
  text-align: center !important;
}

table td {
  padding: 2px !important;
}

table {
  table-layout: fixed !important;
}

/*table td {*/
/*	overflow: hidden !important;*/
/*}*/

table td {
  width: 50px;
}

table td:nth-of-type(1) {
  width: 40px !important;
}
</style>