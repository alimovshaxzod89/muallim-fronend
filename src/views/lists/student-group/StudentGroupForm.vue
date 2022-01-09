<template>
  <!-- form dialog -->
  <v-dialog 
    v-model="show"
    @keydown.enter="onSubmit()" 
    @keydown.esc="close()" 
    @click:outside="close()" 
    max-width="1000px" 
    width="1000px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Talaba guruh qo'shish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <v-list-item-title>Talaba</v-list-item-title>  
                <v-autocomplete
                  v-model="formData.student_id"
                  :items="selectsDatas.student"   
                  item-text="full_name"
                  item-value="id"
                  label="TALABA"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                  <template v-slot:append-outer>
                    <v-btn
                      class="btn-dialog-add-item"
                      color="secondary"
                      height="40px !important"
                      outlined
                      @click="addStudent()"
                    >
                      <v-icon size="22">
                        {{ icons.mdiPlusCircleOutline }}
                      </v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-list-item-title>Guruh</v-list-item-title>  
                <v-autocomplete
                  v-model="formData.group_id"
                  :items="selectsDatas.group"
                  item-text="number"
                  item-value="id"
                  label="GURUH"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                  <template v-slot:append-outer>
                    <v-btn
                      class="btn-dialog-add-item"
                      color="secondary"
                      height="40px !important"
                      outlined
                      @click="addGroup()"
                    >
                      <v-icon size="22">
                        {{ icons.mdiPlusCircleOutline }}
                      </v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="6">  
                <v-menu v-model="isDateFirst" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-date-picker"
                      v-model="formData.begin_date"
                      label="BOSHLANGAN SANA"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
                      hide-details
                      outlined
                      :append-icon="icons.mdiCalendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.begin_date"
                    color="primary"
                    @input="isDateFirst = false"
                    no-title
                    :first-day-of-week="1"
                    locale="ru-ru"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6">  
                <v-menu v-model="isDateSecond" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-date-picker"
                      v-model="formData.end_date"
                      label="TUGAGAN SANA"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
                      hide-details
                      outlined
                      :append-icon="icons.mdiCalendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.end_date"
                    color="primary"
                    @input="isDateSecond = false"
                    no-title
                    :first-day-of-week="1"
                    locale="ru-ru"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="6" class="mt-0">
                <v-checkbox
                  v-model="formData.status"
                  hide-details
                  label="AKTIV"
                ></v-checkbox>
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

  <student-form ref="studentForm" v-on:add-student-to-options="addStudentToOptions($event)" />
  <group-form ref="groupForm" v-on:add-group-to-options="addGroupToOptions($event)" />
  
  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import StudentGroupStoreModule from './StudentGroupStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import StudentForm from '@/views/lists/student/StudentForm'
import GroupForm from '@/views/lists/group/GroupForm.vue'
import Button from '../../components/button/Button'

const MODULE_NAME = 'studentGroup'

export default {
  components: { StudentForm, GroupForm, Button },
  // props: {
  //
  // },
  created() {
    this.loadStudent()
    this.loadGroup()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentGroupStoreModule)
    }

    // show, hide
    const show = ref(false)
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
    }
    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    const form = ref(null)
    const emptyFormData = {
      id: null,
      teacher_id: null,
      student_id: null,
      group_id: null,
      begin_date: null,
      end_date: null,
      status: true,
    }

    const picker = new Date().toISOString().substr(0, 10)
    const isDateFirst = ref(false)
    const isDateSecond = ref(false)

    //validation
    const formData = ref({ ...emptyFormData })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadStudent = () => {
      axios
        .get('/api/students', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.student = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    const loadGroup = () => {
      axios
        .get('/api/groups', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.group = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.student_id && formData.value.group_id) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(({ message }) => {
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
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
          })
        }
      } else {
        if (formData.value.student_id && formData.value.group_id) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(({ message }) => {
              close()
              emit('notify', { type: 'success', text: message })
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
            })
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
          })
        }
      }
    }

    // StudentForm
    const studentForm = ref(null)
    const addStudent = (id = null) => {
      studentForm.value.open(id)
    }
    const addStudentToOptions = row => {
      selectsDatas.value.student = selectsDatas.value.student.concat([row])
      formData.value.student_id = row.id
    }
    // GroupForm
    const groupForm = ref(null)
    const addGroup = (id = null) => {
      groupForm.value.open(id)
    }
    const addGroupToOptions = row => {
      selectsDatas.value.group = selectsDatas.value.group.concat([row])
      formData.value.group = row.id
    }

    return {
      form,
      picker,
      isDateFirst,
      isDateSecond,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadStudent,
      loadGroup,
      validate,
      show,
      onSubmit,
      open,
      close,

      studentForm,
      addStudent,
      addStudentToOptions,
      groupForm,
      addGroup,
      addGroupToOptions,

      icons: {
        mdiPlusCircleOutline,
      },
    }
  },
}
</script>

<style>
.v-input__append-outer {
  margin: 0 0 0 10px !important;
}
.btn-dialog-add-item {
  min-width: 60px !important;
  padding-right: 15px !important;
  padding-left: 15px !important;
  border-color: rgba(94, 86, 105, 0.15) !important;
}
</style>
