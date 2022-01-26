<template>
	<div
		class='group-time-cell'
		:style='cellStyles'
		@click="$emit('open-group-time-form', groupTime.id)"
	>
		<!--		<div style="width: 50px; overflow: hidden; height: 30px; text-overflow: ellipsis;">-->
		<v-icon v-if="$can('update', 'groupTime')" size='18'
						@click="$emit('open-group-time-form', groupTime.id)">
			{{ icons.mdiPencilOutline }}
		</v-icon>
		{{ groupTime.group.number }}
		<!--		</div>-->
	</div>
</template>

<script>
// v-if="stategroupTime.indexCalendar && stategroupTime.indexCalendar.includes(`${date}_${room.id}`)"

import { ref } from '@vue/composition-api/dist/vue-composition-api'
import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'
import moment from 'moment'
import { watch } from '@vue/composition-api'

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
    const cellStyles = ref({
      // "background-color": this.bgColor,
      left: 0,
      // right: 'none',
      width: '99%',
      // 'border-left-width': props.date == groupTime.begin_date ? '1px' : '0',
      // 'border-left-radius': props.date == groupTime.begin_date ? '10px' : '0',
      // 'border-right-width': props.date == groupTime.end_date ? '1px' : '0',
      // 'border-right-radius': props.date == groupTime.end_date ? '10px' : '0',
    })

    const calcStyles = () => {
      const groupTime = props.groupTime

      const time1 = moment(groupTime.time_begin, 'HH:mm')
      const time2 = moment(groupTime.time_end, 'HH:mm')
      const minutesForEnd = time2.diff(time1, 'minutes')

      const time1_00 = moment(moment(groupTime.time_begin, 'HH:mm').format('HH') + ':00', 'HH:mm')
      const minutesForBegin = time1.diff(time1_00, 'minutes')

      const left = (minutesForBegin / 60) * 100

      const width = (minutesForEnd / 60) * 100
      const minusWidthForBorder = 4 - minutesForEnd / 60

      cellStyles.value.left = left ? `calc( ${left}% + 2px)` : '2px'
      cellStyles.value.width = `calc( ${width}% - ${minusWidthForBorder}px )`
    }

    calcStyles()

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