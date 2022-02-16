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
          <span class="headline">Yangi guruh qo'shish</span>
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
                  label="KURSNI TANLANG"
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
                  label="O'QITUVCHINI TANLANG"
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
                  v-model="formData.days"
                  :items="selectDatas.days"
                  item-text="text"
                  item-value="id"
                  label="KUNLAR"
                  dense
                  outlined
                  clearable
                  class="align-start"
									:rules="selectRule"
                ></v-autocomplete>
								<div class="d-flex flex-wrap check-container" v-if="formData.days === 5">
									<v-checkbox
										class="my-checkbox"
										hide-details
										v-for="(day, index) in days"
										:key="index + '-' + day"
										v-model="formData.days"
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
                  label="XONANI TANLANG"
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
									v-model="time_begin"
									:close-on-content-click="false"
									:nudge-right="40"
									:return-value.sync="time_begin"
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
import { mdiPlusCircleOutline, mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js'

import { ref } from '@vue/composition-api'
import store from '@/store'
import axios from '@axios'

import LeadStoreModule from './LeadStoreModule'

import { required, minLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'lead'

export default {
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }

    const form = ref(null)
    const emptyFormData = {
      id: null,
      name: null,
      subject_id: null,
      teacher_id: null,
      days: [],
      room_id: null,
      time_begin: null,
    }
    const formData = ref({ ...emptyFormData })
    const selectDatas = ref({
      subjects: [],
      teachers: [],
      days: [
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
      rooms: [],
      time_begin: null,
    })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const time_begin = ref(null)
    const days = ref([
      { id: 1, text: 'Dushanba' },
      { id: 2, text: 'Seshanba' },
      { id: 3, text: 'Chorshanba' },
      { id: 4, text: 'Payshanba' },
      { id: 5, text: 'Juma' },
      { id: 6, text: 'Shanba' },
      { id: 7, text: 'Yakshanba' },
    ])

    // Show, Hide
    const show = ref(false)
    const open = () => {
      show.value = true
    }
    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    // Form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (
          formData.value.name &&
          formData.value.subject_id &&
          formData.value.teacher_id &&
          formData.value.room_id &&
          formData.value.days
        ) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(({ data, message }) => {
              close()
              return data
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
              return false
            })
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
          })
        }
      } else {
        if (
          formData.value.name &&
          formData.value.subject_id &&
          formData.value.teacher_id &&
          formData.value.room_id &&
          formData.value.days
        ) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(({ data, message }) => {
              close()
              return data
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
              return false
            })
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
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
      required,
      minLengthValidator,
      formData,
      selectDatas,
      selectRule,
      time_begin,
      days,
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
  // margin-bottom: 20px;
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
