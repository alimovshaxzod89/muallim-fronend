<template>
	<div
		class='group-time-cell'
		:style='cellStyles'
		@click="$emit('open-group-time-form', groupTime.id)"
	>
		<!--		<div style="width: 50px; overflow: hidden; height: 30px; text-overflow: ellipsis;">-->
		<v-icon v-if="$can('update', 'groupTime')" size='18' @click="$emit('open-group-time-form', groupTime.id)">
			{{ icons.mdiPencilOutline }}
		</v-icon>
		{{ groupTime.group.number }}
		{{ groupTime.time_begin }}
		-
		{{ groupTime.time_end }}
		<!--		</div>-->
	</div>
</template>

<script>
// v-if="stategroupTime.indexCalendar && stategroupTime.indexCalendar.includes(`${date}_${room.id}`)"

import { ref } from '@vue/composition-api/dist/vue-composition-api'
import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'
import moment from 'moment'

export default {
  name: 'CalendarCell',
  props: {
    day: {
      type: String | Number,
      required: true,
    },
    time: {
      type: String | Number,
      required: true,
    },
    room_id: {
      type: String | Number,
      required: true,
    },
    // index: {
    // 	type: Number,
    // 	required: true,
    // },
    groupTime: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    if (!props.groupTime.group) {
      console.log(props.groupTime, props.day, props.time, props.room_id)
    }
    // const groupTime = ref(store.state.groupTime.rows[props.index])
    // const days = 1
    //
    // const date1 = new Date(groupTime.value.begin_date)
    // const date2 = new Date(groupTime.value.end_date)
    // let diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
    //
    // const firstDate = date1.getDate()
    // if (firstDate + diffDays > props.monthLastDate) {
    // 	diffDays = props.monthLastDate - firstDate
    // }
    //
    // const right = (-1 * diffDays * 55) + (groupTime.value.end_half_day == 1 ? 27 : 0)
    //
    // const left = groupTime.value.begin_half_day == 1 ? 0 : 27

    const groupTime = props.groupTime

    const time1 = moment(groupTime.time_begin, 'HH:mm')
    const time2 = moment(groupTime.time_end, 'HH:mm')
    const minutesForEnd = time2.diff(time1, 'minutes')

    const time1_00 = moment(moment(groupTime.time_begin, 'HH:mm').format('HH') + ':00', 'HH:mm')
    const minutesForBegin = time1.diff(time1_00, 'minutes')

    let colWidth = 55

    const right = -1 * (minutesForEnd / 60) * colWidth + (minutesForBegin / 60) * colWidth

    let left = 0 + (minutesForBegin / 60) * colWidth

    const cellStyles = ref({
      // "background-color": this.bgColor,
      right: `${right}px`,
      left: left ? `${left}px` : 0,
      // 'border-left-width': props.date == groupTime.begin_date ? '1px' : '0',
      // 'border-left-radius': props.date == groupTime.begin_date ? '10px' : '0',
      // 'border-right-width': props.date == groupTime.end_date ? '1px' : '0',
      // 'border-right-radius': props.date == groupTime.end_date ? '10px' : '0',
    })

    return {
      cellStyles,

      icons: {
        mdiPencilOutline,
        mdiDeleteOutline,
      },
    }
  },
}
</script>

<style scoped>
.group-time-cell {
  left: 0;
  position: absolute;
  border: 1px solid #4a0c60;
  height: 30px;
  background-color: rgba(2, 119, 3, 0.29);
  z-index: 3;
}
</style>