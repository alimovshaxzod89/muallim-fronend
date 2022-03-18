<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.enter="onSubmit()"
    @keydown.esc="close()"
    @click:outside="close()"
    max-width="800px"
    width="800px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  dense
                  outlined
                  required
                  :rules="[required]"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
								<v-autocomplete
                  v-model="formData.subject_id"
                  :items="selectDatas.subjects"
                  item-text="name"
                  item-value="id"
                  label="FAN"
                  dense
                  outlined
                  clearable
                  class="align-start"
									:rules="selectRule"
                ></v-autocomplete>
              </v-col>
							<v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
								<v-autocomplete
                  v-model="formData.teacher_id"
                  :items="selectDatas.teachers"
                  item-text="full_name"
                  item-value="id"
                  label="USTOZ"
                  dense
                  outlined
                  clearable
                  class="align-start"
									:rules="selectRule"
                ></v-autocomplete>
              </v-col>
							<v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
								<v-autocomplete
                  v-model="dynamicDay"
                  :items="selectDatas.day_types"
                  item-text="text"
                  item-value="id"
                  label="KUNLAR"
                  dense
                  outlined
                  clearable
                  class="align-start"
									:rules="selectRule"
                ></v-autocomplete>
								<div class="d-flex flex-wrap check-container" v-if="dynamicDay === 5">
									<v-checkbox
										class="my-checkbox"
										hide-details
										multiple
										v-for="(day, index) in selectDatas.week_day"
										:key="index + '-' + day"
										v-model="formData.week_day"
										:label="day.text"
										:value="day.id"
									></v-checkbox>
								</div>
              </v-col>
							<v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
								<v-autocomplete
                  v-model="formData.room_id"
                  :items="selectDatas.rooms"
                  item-text="name"
                  item-value="id"
                  label="XONA"
                  dense
                  outlined
                  clearable
                  class="align-start"
									:rules="selectRule"
                ></v-autocomplete>
              </v-col>
							<v-col cols="6">
								<h4 class="text-required"></h4>
								<v-menu
									ref="menu"
									v-model="time_begin"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="formData.time_begin"
									transition="scale-transition"
									offset-y
									max-width="290px"
									min-width="290px"
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											class="my-date-picker"
											outlined
											v-model="formData.time_begin"
											label="DARS BOSHLANISH VAQTI"
											:append-icon="icons.mdiClockTimeFourOutline"
											readonly
											hide-details
											v-bind="attrs"
											v-on="on"
										></v-text-field>
									</template>
									<v-time-picker
										format="24hr"
										v-if="time_begin"
										v-model="formData.time_begin"
										color="primary"
										full-width
										@click:minute="$refs.menu.save(formData.time_begin)"
									></v-time-picker>
								</v-menu>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="onSubmit"> Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

  </v-dialog>
</template>

<script>
import { ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'
import { required, minLengthValidator } from '@core/utils/validation'
import { mdiPlusCircleOutline, mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js'

import LeadStoreModule from './LeadStoreModule'

const MODULE_NAME = 'lead'

export default {
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }

    const form = ref(null)
    const emptyFormData = {
      position: null,
      id: null,
      lead_id: null,
      name: null,
      subject_id: null,
      teacher_id: null,
      week_day: [],
      room_id: null,
      time_begin: null,
    }
    const formData = ref({ ...emptyFormData })
    const selectDatas = ref({
      subjects: [],
      teachers: [],
      rooms: [],
      time_begin: null,
      day_types: [
        {
          id: 1,
          text: 'Toq kunlar',
        },
        {
          id: 2,
          text: 'Juft kunlar',
        },
        {
          id: 3,
          text: 'Dam olish kuni',
        },
        {
          id: 4,
          text: 'Har kuni',
        },
        {
          id: 5,
          text: 'Boshqa',
        },
      ],
      week_day: [
        { id: 8, text: 'Dushanba' },
        { id: 9, text: 'Seshanba' },
        { id: 10, text: 'Chorshanba' },
        { id: 11, text: 'Payshanba' },
        { id: 12, text: 'Juma' },
        { id: 13, text: 'Shanba' },
        { id: 14, text: 'Yakshanba' },
      ],
    })
    const dynamicDay = ref(null)
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const time_begin = ref(null)
    const time_begin2 = ref(null)

    // Show, Hide
    const show = ref(false)
    const formTitle = ref("Yangi guruh qo'shish")
    const open = (position, id) => {
      show.value = true
      if (position) formData.value.position = position
      if (id) {
        formTitle.value = 'Guruhni tahrirlash'
        formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
      }
    }
    const close = () => {
      show.value = false
      formTitle.value = "Yangi guruh qo'shish"
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
      dynamicDay.value = null
    }

    // Form submit
    const onSubmit = () => {
      const newValue = {
        ...formData.value,
        week_day: dynamicDay.value !== 5 && dynamicDay.value !== '' ? dynamicDay.value : formData.value.week_day,
      }

      if (form.value.validate()) {
        if (formData.value.id) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, newValue)
            .then(({ data, message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
              return data
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })

              return false
            })
        } else {
          store
            .dispatch(`${MODULE_NAME}/addRow`, newValue)
            .then(({ data, message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
              return data
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
              return false
            })
        }
      }
    }

    // API Loads
    const loadSubjects = () => {
      axios
        .get('api/subjects')
        .then(response => {
          if (response.data.success) {
            selectDatas.value.subjects = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    const loadTeachers = () => {
      axios
        .get('api/teachers')
        .then(response => {
          if (response.data.success) {
            selectDatas.value.teachers = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    const loadRooms = () => {
      axios
        .get('api/rooms')
        .then(response => {
          if (response.data.success) {
            selectDatas.value.rooms = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    loadSubjects()
    loadTeachers()
    loadRooms()

    return {
      form,
      formTitle,
      required,
      minLengthValidator,
      formData,
      selectDatas,
      selectRule,
      time_begin,
      time_begin2,
      dynamicDay,
      show,
      onSubmit,
      open,
      close,

      icons: {
        mdiPlusCircleOutline,
        mdiCalendar,
        mdiClockTimeFourOutline,
      },
    }
  },
}
</script>

<style lang="scss">
.v-input__append-outer {
  margin: 0 0 0 10px !important;
}
.btn-dialog-add-item {
  min-width: 60px !important;
  padding-right: 15px !important;
  padding-left: 15px !important;
  border-color: rgba(94, 86, 105, 0.15) !important;
}

.check-container {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  min-height: 106px;
  padding: 5px 45px 5px 5px;
  border: 1px solid #e7e6e9;
  border-radius: 5px;

  .v-input {
    display: flex;
    align-items: center;
  }

  .v-input--selection-controls {
    margin-top: 0;
  }

  label {
    margin: 5px;
    padding: 6px 10px;
    border-radius: 5px;
    border: 1px solid var(--v-secondary-base);
    background-color: #fff;
    cursor: pointer;
  }

  .v-input--selection-controls__input {
    position: absolute;
    visibility: hidden;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .v-input--is-label-active {
    label {
      border: 1px solid var(--v-primary-base);
      background-color: var(--v-primary-base);
      color: #fff !important;
    }
  }
}
</style>