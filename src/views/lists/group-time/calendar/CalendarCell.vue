<template>
	<div
		class="bron-cell"
		:style="cellStyles"
		@click="$emit('open-bron-form', bron.id)"
	>
		<!--		<div style="width: 50px; overflow: hidden; height: 30px; text-overflow: ellipsis;">-->
		<v-icon v-if="$can('update', 'Bron')" size="18" @click="$emit('open-bron-form', bron.id)">
			{{ icons.mdiPencilOutline }}
		</v-icon>

		{{ bron.client }}
		<!--		</div>-->
	</div>
</template>

<script>
// v-if="stateBron.indexCalendar && stateBron.indexCalendar.includes(`${date}_${room.id}`)"

import { ref } from '@vue/composition-api/dist/vue-composition-api'
import { mdiDeleteOutline, mdiPencilOutline } from '@mdi/js'

export default {
  name: 'CalendarCell',
  props: {
    date: {
      type: String,
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
    bron: {
      type: Object,
      required: true,
    },
    monthLastDate: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    // const bron = ref(store.state.bron.rows[props.index])
    // const days = 1
    //
    // const date1 = new Date(bron.value.begin_date)
    // const date2 = new Date(bron.value.end_date)
    // let diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))
    //
    // const firstDate = date1.getDate()
    // if (firstDate + diffDays > props.monthLastDate) {
    // 	diffDays = props.monthLastDate - firstDate
    // }
    //
    // const right = (-1 * diffDays * 55) + (bron.value.end_half_day == 1 ? 27 : 0)
    //
    // const left = bron.value.begin_half_day == 1 ? 0 : 27

    const bron = props.bron

    const date1 = new Date(bron.begin_date)
    const date2 = new Date(bron.end_date)
    let diffDays = Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24))

    const firstDate = date1.getDate()
    if (firstDate + diffDays > props.monthLastDate) {
      diffDays = props.monthLastDate - firstDate
    }

    const right = -1 * diffDays * 55 + (bron.end_half_day == 1 ? 27 : 0)

    let left = bron.begin_half_day == 1 ? 0 : 27
    //agar oldingi oydan o'tib kelayotgan bulsa, begin_half_day hisobga olinmasin
    if (props.date != bron.begin_date) {
      left = 0
    }

    const cellStyles = ref({
      // "background-color": this.bgColor,
      right: `${right}px`,
      left: left ? `${left}px` : 0,
      // 'border-left-width': props.date == bron.begin_date ? '1px' : '0',
      // 'border-left-radius': props.date == bron.begin_date ? '10px' : '0',
      // 'border-right-width': props.date == bron.end_date ? '1px' : '0',
      // 'border-right-radius': props.date == bron.end_date ? '10px' : '0',
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
.bron-cell {
  left: 0;
  position: absolute;
  border: 1px solid #4a0c60;
  height: 30px;
  background-color: rgba(2, 119, 3, 0.29);
  z-index: 3;
}
</style>