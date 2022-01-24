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
                <v-text-field
                  type="text"
                  label="NOMER"
                  v-model="formData.number"
                  :rules="[required]"
									required
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.place_id"
                  :items="selectsDatas.room"
                  item-text="name"
                  item-value="id"
                  label="BINO"
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
                  v-model="formData.subject_id"
                  :items="subjects"
                  item-text="name"
                  item-value="id"
                  label="FAN"
									:rules="selectRule"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <v-autocomplete
                  v-model="formData.stage_id"
                  :items="stages"
                  item-text="name"
                  item-value="id"
                  label="BOSQICH"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
								<h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.teacher_id"
                  :items="teachers"
                  item-text="full_name"
                  item-value="id"
                  label="USTOZ"
                  :rules="selectRule"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
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
                <v-text-field
                  type="text"
                  label="NARX"
                  v-model="formData.price"
                  :rules="[required]"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

							<v-col cols="6">
                <v-text-field
                  type="text"
                  label="ULUSH"
                  v-model="formData.teacher_share"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

							<v-col cols="6">
                <v-text-field
                  type="text"
                  label="Maks o'quvchi soni"
                  v-model="formData.max_students"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <h4 class="text-required no-texts"><span>*</span></h4>
                    <v-text-field
                    class="my-date-picker"
                      v-model="formData.begin_date"
                      label="BOSHLANGAN SANA"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
											required
                      outlined
                      clearable
                      :append-icon="icons.mdiCalendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.begin_date"
                    color="primary"
                    @input="isDate = false"
                    no-title
                    :first-day-of-week="1"
                    locale="ru-ru"
                  ></v-date-picker>
                </v-menu>
              </v-col>

							<v-col cols="6">
                <v-menu v-model="isDate2" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    class="my-date-picker"
                      v-model="formData.end_date"
                      label="TUGASH SANASI"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      clearable
                      :append-icon="icons.mdiCalendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.end_date"
                    color="primary"
                    @input="isDate2 = false"
                    no-title
                    :first-day-of-week="1"
                    locale="ru-ru"
                  ></v-date-picker>
                </v-menu>
              </v-col>

							<v-col cols="12">
                <v-textarea
                  v-model="formData.description"
                  label="IZOH"
                  hide-details
                  outlined
                  clearable
                  class="mt-0"
									height="100"
                ></v-textarea>
              </v-col>

							<v-col cols="12">
                <v-checkbox
                  v-model="formData.status"
                  hide-details
                  label="Aktiv"
                  false-value="0"
                  true-value="1"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="onSubmit">Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import GroupStoreModule from '../group/GroupStoreModule'

import { ref, onMounted } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'group'

export default {
  setup(props, { emit }) {

    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, GroupStoreModule)
    }

    //show, hide
    const show = ref(false)
    const formData = ref({})
    const form = ref(null)
    const emptyFormData = {
      id: null,
      place_id: null,
      number: null,
      subject_id: null,
      stage_id: null,
      teacher_id: null,
      price: null,
      teacher_share: null,
      max_students: null,
      begin_date: null,
      end_date: null,
      status: "1",
      
    }
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)
    const isDate2 = ref(false)

    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }
    const open = (id = null) => {
      show.value = true
      setTimeout(() => {
        form.value.$el[0].focus()
      }, 100)
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadPlace = () => {
      axios
        .get('/api/places', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.room = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        // update
        if (
            formData.value.number && 
            formData.value.subject_id && 
            formData.value.teacher_id && 
            formData.value.price && 
            formData.begin_date &&
            formData.value.place_id
          ) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(({data, message}) => {
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
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! Bo'limlarni to'g'ri to'ldiring!",
          })
        }
      } else {
        // create
        if (
            formData.value.number && 
            formData.value.subject_id && 
            formData.value.teacher_id && 
            formData.value.price &&
            formData.value.place_id
          ) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(({data, message}) => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('add-group-to-options', data)
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })

              return false
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
    const subjects = ref()
    const loadSubjects = () => {
      axios.get('/api/subjects').then(response => {
        if (response.data.success) {
          subjects.value = response.data.data
        }
      })
    }
    // Load subjects
    const stages = ref()
    const loadStages = () => {
      axios.get('/api/stages').then(response => {
        if (response.data.success) {
          stages.value = response.data.data
        }
      })
    }
    // Load rooms
    const rooms = ref()
    const loadRooms = () => {
      axios.get('/api/rooms').then(response => {
        if (response.data.success) {
          rooms.value = response.data.data
        }
      })
    }
    // Load teachers
    const teachers = ref()
    const loadTeachers = () => {
      axios.get('/api/teachers').then(response => {
        if (response.data.success) {
          teachers.value = response.data.data
        }
      })
    }

    onMounted(() => {
      loadSubjects()
      loadStages()
      loadRooms()
      loadTeachers()
      loadPlace()
    })

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      maxLengthValidator,
      formData,
      selectRule,
      selectsDatas,
      loadPlace,
      validate,
      show,
      onSubmit,
      selectRule,
      open,
      close,
      subjects,
      stages,
      rooms,
      teachers,
      isDate2,

      icons: {
        mdiCalendar,
      },
    }
  },
}
</script>
