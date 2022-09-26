<template>
	<v-tooltip top>
		<template #activator="{ on, attrs }">
			<div
				class='group-time-cell'
				:style='cellStyles'
				@click="$emit('open-group-time-form', groupTime.id)"
				v-bind="attrs"
				v-on="on"
			>
				<v-icon v-if="$can('update', 'groupTime')" size='18' @click="$emit('open-group-time-form', groupTime.id)">
					{{ icons.mdiPencilOutline }}
				</v-icon>
				<span class="text-dots">
					{{ groupTime.group.teacher.full_name }} <b>{{ groupTime.group.number }}</b>
				</span>
			</div>
		</template>
		<span>
			Ustoz:
			<b>{{ groupTime.group.teacher.full_name }}</b>,
			Guruh:
			<b>{{ groupTime.group.number }}</b>,
			Kurs:
			<b>{{ groupTime.group.subject.name }}</b>,
			Soat:
			<b>{{ groupTime.time_begin }}</b>
			-
			<b>{{ groupTime.time_end }}</b>
		</span>
	</v-tooltip>
</template>

<script>
// v-if="stategroupTime.indexCalendar && stategroupTime.indexCalendar.includes(`${date}_${room.id}`)"
import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

import { ref, watch } from '@vue/composition-api/dist/vue-composition-api'
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
    groupTime: {
      type: Object,
      required: true,
    },
    // index: {
    // 	type: Number,
    // 	required: true,
    // },
  },
  setup(props) {
    const cellStyles = ref({
      left: 0,
      width: '99%',
      // "background-color": this.bgColor,
      // right: 'none',
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

    watch(calcStyles, () => {})

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

<style scoped lang="scss">
.group-time-cell {
  display: flex;
  align-items: center;
  left: 0;
  position: absolute;
  border: 1px solid #4a0c60;
  height: 30px;
  background-color: rgba(2, 119, 3, 0.29);
  z-index: 3;
  button {
    transform: translateX(7px);
  }
}

.text-dots {
  display: -webkit-box;
  height: 20px;
  margin-left: 15px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>