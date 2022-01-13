<template>

	<v-simple-table class='borderedmytable'>
		<template v-slot:default>
			<thead>
			<tr>
				<th>#</th>
				<th v-for='time in times'
						:key='time.hour'
				>
					{{ time.time }}
				</th>
			</tr>
			</thead>
			<tbody>
			<tr v-for='room in rooms'
					:key='room.id'
			>
				<td>
					<div style='min-width: 50px'>{{ room.name }}</div>
				</td>
				<td v-for='time in times'
						:key='time.hour'
				>
					<div>

					</div>
					<div v-if="time.time == groupTimes.time_begin">
						{{ time.time }}
					</div>
					<div style='position: relative; height: 100%; margin-top: 5px; width: 50px;'>

						<div v-if="room.id == 2 && time.hour == '9'"
								 style='left: 0; right: -150px; position: absolute; border: 1px solid #4a0c60; height: 30px; background-color: rgba(2,119,3,0.29)'>
							guruh 12, MuhammadNur
						</div>

					</div>
				</td>
			</tr>
			</tbody>
		</template>
	</v-simple-table>

</template>

<script>
import { mdiCalendar } from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import moment from 'moment'

import { ref, onMounted } from '@vue/composition-api'

export default {
	name: 'LessonsRooms',
	setup() {
		let times = ref([])
		for (let hour = 8; hour <= 23.5; hour += 0.5) {
			times.value.push({ time: moment.utc(hour * 3600 * 1000).format('H:mm'), hour })
		}

		const rooms = ref([{ id: 1, name: '1x' }, { id: 2, name: '2x' }, { id: 3, name: '3x' }])
		const newArray = groupTimes.filter(function (el)
			{
				return el.time_begin >=15 &&
					el.time_end <= 200;
			}
		);
		const groupTimes = ref([
			{
				"id": 6,
				"group_id": 15,
				"room_id": 1,
				"week_day": 1,
				"time_begin": "07:00",
				"time_end": "10:00"
			},
			{
				"id": 7,
				"group_id": 16,
				"room_id": 1,
				"week_day": 1,
				"time_begin": "10:00",
				"time_end": "11:30"
			},
			{
				"id": 8,
				"group_id": 18,
				"room_id": 1,
				"week_day": 1,
				"time_begin": "02:00",
				"time_end": "03:30"
			},
			{
				"id": 9,
				"group_id": 20,
				"room_id": 1,
				"week_day": 1,
				"time_begin": "04:00",
				"time_end": "05:30"
			}
		])

		return {
			times,
			rooms,
			groupTimes,
			newArray,
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
	padding: 0 !important;
	text-align: center !important;
}

table td {
	padding: 0 !important;
}
</style>