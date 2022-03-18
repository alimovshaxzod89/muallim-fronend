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
          <span class="headline">Talabadan tulov olish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.subject_id"
                  :items="selectsDatas.subject"
                  item-text="name"
                  item-value="id"
                  label="FAN"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
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
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
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
                  required
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                  <v-text-field
                      v-model="formData.month_year"
                      label="OY YIL"
                      dense
                      hide-details
                      outlined
                    ></v-text-field>
              </v-col>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                    type="text"
                    label="SUMMA"
				    v-model="formData.amount"
                    outlined
                    dense
				></v-text-field>
              </v-col>
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-date-picker"
                      v-model="formData.date"
                      label="SA'NA"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details
                      outlined
                      :append-icon="icons.mdiCalendar"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="formData.date"
                    color="primary"
                    @input="isDate = false"
                    no-title
                    :first-day-of-week="1"
                    locale="ru-ru"
                  ></v-date-picker>
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

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>
      <template #[`item.amount`]="{ item }"> {{ item.amount | sum }}</template>
    </v-card>

  <subject-form ref="subjectForm" v-on:add-subject-to-options="addSubjectToOptions($event)" /> 
  <student-form ref="studentForm" v-on:add-student-to-options="addStudentToOptions($event)" />
  <group-form ref="groupForm" v-on:add-group-to-options="addGroupToOptions($event)" />


  
  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'
moment.locale('uz')

import numeral from 'numeral'

import store from '@/store'
import StudentPaidStoreModule from './StudentPaidStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import StudentForm from '@/views/lists/student/StudentForm.vue'
import SubjectForm from '@/views/lists/subject/SubjectForm.vue'
import GroupForm from '@/views/lists/group/GroupForm.vue'
import Button from '../../components/button/Button'

const MODULE_NAME = 'studentPaid'

export default {
  components: {
    SubjectForm,
    StudentForm,
    GroupForm,
    Button,
  },

  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    sum: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },

  created() {
    this.loadSubject()
    this.loadStudent()
    this.loadGroup()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentPaidStoreModule)
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
      subject_id: null,
      group_id: null,
      student_id: null,
      month_year: null,
      amount: null,
      date: null,
    }

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //validation
    const formData = ref({ ...emptyFormData })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadSubject = () => {
      axios
        .get('/api/subjects', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.subject = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
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
      if (form.value.validate()) {
        if (formData.value.id) {
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
        }
      }
    }

    // SubjectForm
    const subjectForm = ref(null)
    const addSubject = (id = null) => {
      subjectForm.value.open(id)
    }
    const addSubjectToOptions = row => {
      selectsDatas.value.subject = selectsDatas.value.subject.concat([row])
      formData.value.subject_id = row.id
    }
    // GroupForm
    const groupForm = ref(null)
    const addGroup = (id = null) => {
      groupForm.value.open(id)
    }
    const addGroupToOptions = row => {
      selectsDatas.value.group = selectsDatas.value.group.concat([row])
      formData.value.group_id = row.id
    }

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadSubject,
      loadStudent,
      loadGroup,
      validate,
      show,
      onSubmit,
      open,
      close,

      subjectForm,
      addSubject,
      addSubjectToOptions,
      groupForm,
      addGroup,
      addGroupToOptions,

      icons: {
        mdiPlusCircleOutline,
        mdiCalendar,
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
