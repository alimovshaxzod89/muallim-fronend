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
                  v-model="formData.group_id"
                  :items="selectsDatas.groups"
                  item-text="number"
                  item-value="id"
                  label="GURUH"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>

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
								<v-menu
									ref="menu"
									v-model="time"
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
											outlined
											v-model="formData.time_begin"
											label="VAQT ...DAN"
											:append-icon="icons.mdiClockTimeFourOutline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										format="24hr"
										v-if="time"
										v-model="formData.time_begin"
										color="primary"
										full-width
										@click:minute="$refs.menu.save(formData.time_begin)"
									></v-time-picker>
								</v-menu>
              </v-col>

							<v-col cols="6">
                <v-menu
									ref="menu2"
									v-model="time2"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="formData.time_end"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											outlined
											v-model="formData.time_end"
											label="VAQT ...GACHA"
											:append-icon="icons.mdiClockTimeFourOutline"
											readonly
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										format="24hr"
										v-if="time2"
										v-model="formData.time_end"
										color="primary"
										full-width
										@click:minute="$refs.menu2.save(formData.time_end)"
									></v-time-picker>
								</v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <div v-show="formData.id !==  null">
						<v-btn color="error" type="button" @click.prevent="$emit('delete-form', formData.id), close()">O'chirish</v-btn>
					</div>
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
const MODULE_NAME = 'group-time'

export default {
  setup(props, { emit }) {
    //show, hide

    const form = ref(null)
    const show = ref(false)
    const emptyFormData = {
      id: null,
      group_id: null,
      week_day: null,
      room_id: null,
      time_begin: null,
      time_end: null,
      group_id: null,
    }
    const formData = ref({ ...emptyFormData })
    const open = (item = null, group_id = null) => {
      show.value = true
      if (item) {
        formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](item.id)))
      }
      if (group_id) {
        formData.value.group_id = group_id
      }
    }
    const open2 = (id = null, item = null) => {
      show.value = true
      if (id) {
        formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
      } else if (item) {
        const t = JSON.parse(JSON.stringify(formData.value))
        for (const field in item) {
          t[field] = item[field]
        }
        formData.value = t
      }
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }

    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadPlace = () => {
      axios
        .get('/api/groups', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.groups = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.week_day && formData.value.room_id && formData.value.group_id) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })')
              emit('refresh-list')
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
        //create
        if (formData.value.week_day && formData.value.room_id && formData.value.group_id) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('refresh-list')
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

    const days = ref([
      { key: 1, name: 'Dushanba' },
      { key: 2, name: 'Seshanba' },
      { key: 3, name: 'Chorshanba' },
      { key: 4, name: 'Payshanba' },
      { key: 5, name: 'Juma' },
      { key: 6, name: 'Shanba' },
      { key: 7, name: 'Yakshanba' },
    ])

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
      loadPlace()
    })

    // time settings
    const time = ref(null)
    const time2 = ref(null)

    // ProductTypeForm
    const roomForm = ref(null)
    const addPlace = (id = null) => {
      roomForm.value.open(id)
    }
    const addPlaceToOptions = row => {
      selectsDatas.value.groups = selectsDatas.value.groups.concat([row])
      formData.value.group_id = row.id
    }

    return {
      form,
      formData,
      show,
      onSubmit,
      open,
      open2,
      close,
      rooms,
      days,

      time,
      time2,

      roomForm,
      addPlace,
      addPlaceToOptions,
      selectsDatas,
      selectRule,

      icons: {
        mdiCalendar,
        mdiClockTimeFourOutline,
      },
    }
  },
}
</script>
