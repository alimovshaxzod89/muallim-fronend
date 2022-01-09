<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keydown.enter="onSubmit()"
    max-width="800px"
    width="800px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Guruhlar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
							<v-col cols="6">
								<h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.week_day"
                  :items="days"
                  item-text="name"
                  item-value="key"
                  label="KUN"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
								<h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.room_id"
                  :items="rooms"
                  item-text="name"
                  item-value="id"
                  label="XONA"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <h4 class="text-required no-texts"><span>*</span></h4>
								<!-- <MaskedInput type="text" mask="##:##" outlined dense required class="v-input" v-model="formData.time_begin" /> -->
                <!-- <v-text-field
                  type="number"
                  label="VAQT ...DAN"
                  v-model="formData.time_begin"
                  outlined
                  dense
                  required
                ></v-text-field> -->

								<v-menu
									ref="menu"
									v-model="formData.time_begin"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="time"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
										class="my-date-picker"
											outlined
											v-model="time"
											label="VAQT ...DAN"
											:append-icon="icons.mdiClockTimeFourOutline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										format="24hr"
										v-if="formData.time_begin"
										v-model="time"
										color="primary"
										full-width
										@click:minute="$refs.menu.save(time)"
									></v-time-picker>
								</v-menu>
              </v-col>

							<v-col cols="6">
                <v-menu
									ref="menu2"
									v-model="formData.time_end"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="time2"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
										class="my-date-picker"
											outlined
											v-model="time2"
											label="VAQT ...GACHA"
											:append-icon="icons.mdiClockTimeFourOutline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										format="24hr"
										v-if="formData.time_end"
										v-model="time2"
										color="primary"
										full-width
										@click:minute="$refs.menu2.save(time2)"
									></v-time-picker>
								</v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="onSubmit()">Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js'

import store from '@/store'
import axios from '@axios'

import { ref, onMounted } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'

import MaskedInput from 'vue-masked-input'

export default {
  components: {
    MaskedInput,
  },
  props: {
    MODULE_NAME: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    //show, hide
    const days = ref([
      { key: 1, name: 'Dushanba' },
      { key: 2, name: 'Seshanba' },
      { key: 3, name: 'Chorshanba' },
      { key: 4, name: 'Payshanba' },
      { key: 5, name: 'Juma' },
      { key: 6, name: 'Shanba' },
      { key: 7, name: 'Yakshanba' },
    ])

    const show = ref(false)
    const emptyFormData = {
      id: null,
      week_day: null,
      room_id: null,
      time_begin: null,
      time_end: null,
    }
    const formData = ref({ ...emptyFormData })
    const form = ref(null)
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](id)))
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }
    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.week_day && formData.value.room_id) {
          store
            .dispatch(`${props.MODULE_NAME}/updateRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
            })
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! Bo'limlarni to'g'ri to'ldiring!",
          })
        }
      } else {
        if (formData.value.week_day && formData.value.room_id) {
          store
            .dispatch(`${props.MODULE_NAME}/addRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
            })
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! Bo'limlarni to'gri to'ldiring!",
          })
        }
      }
    }

    // Load subjects
    const rooms = ref(null)
    const loadRooms = () => {
      axios.get('/api/rooms').then(response => {
        if (response.data.success) {
          rooms.value = response.data.data
        }
      })
    }

    onMounted(() => {
      loadRooms()
    })

    // time settings
    const time = ref(null)
    const time2 = ref(null)

    // const timeTesting = type => {
    //   if (formData.value[type].length > 4) {
    //     const firstTime = formData.value[type].slice(0, 2)
    //     const secondTime = formData.value[type].slice(3, 5)
    //     console.log(firstTime + '-' + secondTime)
    //     if (firstTime > 23 || secondTime > 59) {
    //       formData.value[type] = '0000'
    //     }
    //   }
    // }

    // watch(
    //   formData,
    //   () => {
    //     if (formData.value.time_begin) {
    //       timeTesting('time_begin')
    //     }
    //     if (formData.value.time_end) {
    //       timeTesting('time_end')
    //     }
    //   },
    //   { deep: true },
    // )
    // watch(formData, () => {
    //   timeTesting(formData.time_end)
    // })

    return {
      required,
      minLengthValidator,
      maxLengthValidator,
      formData,
      show,
      onSubmit,
      open,
      close,
      rooms,
      days,

      time,
      time2,

      icons: {
        mdiCalendar,
        mdiClockTimeFourOutline,
      },
    }
  },
}
</script>
