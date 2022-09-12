<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.enter="onSubmit()"
    @keydown.esc="close()"
    @click:outside="close()"
    max-width="500px"
    width="500px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">O'qituvchiga tulov</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  type="text"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required, minLengthValidator(formData.amount, 3)]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.subject_id"
                  :items="selectsDatas.subject"
                  item-text="name"
                  item-value="id"
                  label="Kurs"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.teacher_id"
                  :items="selectsDatas.teacher"
                  item-text="full_name"
                  item-value="id"
                  label="O'QITUVCHI"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                  <h4 class="text-required no-text"><span>*</span></h4>
                    <v-autocomplete
                        v-model="formData.day_id"
                        :items="formData.days"
                        item-text="name"
                        item-value="id"
                        label="KUNLAR"
                        dense
                        outlined
                        hide-details
                        clearable
                        :rules="selectRule"
                      >
                      </v-autocomplete>
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

  <subject-form ref="subjectForm" v-on:add-subject-to-options="addSubjectToOptions($event)" />
  <teacher-form ref="teacherForm" v-on:add-teacher-to-options="addTeacherToOptions($event)" />

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import store from '@/store'
import LeadStoreModule from './storeModule/LeadStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import SubjectForm from '@/views/lists/subject/SubjectForm.vue'
import TeacherForm from '@/views/lists/teacher/TeacherForm.vue'
import Button from '../components/button/Button.vue'

const MODULE_NAME4 = 'leadThird'

export default {
  components: { SubjectForm, TeacherForm, Button },
  // props: {
  //
  // },
  created() {
    this.loadSubject()
    this.loadTeacher()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME4)) {
      store.registerModule(MODULE_NAME4, LeadStoreModule)
    }

    // show, hide
    const show = ref(false)
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME4}/getThirdById`](id)))
    }
    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    const form = ref(null)
    const emptyFormData = {
      id: null,
      name: null,
      subject_id: null,
      teacher_id: null,
      day_id: null,
      days:[
          {id: 1, name: "Toq kunlar"},
          {id: 2, name: "Juft kunlar"},
          {id: 3, name: "Dam olish kuni"},
          {id: 4, name: "Har kuni"},
          {id: 5, name: "Boshqa"},
      ]
    }

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
    const loadTeacher = () => {
      axios
        .get('/api/teachers', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.teacher = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.name && formData.value.subject_id && formData.value.teacher_id && formData.value.day_id) {
          store
            .dispatch(`${MODULE_NAME4}/updateThirdRow`, formData.value)
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
        if (formData.value.name && formData.value.subject_id && formData.value.teacher_id && formData.value.day_id) {
          const newThirdValue = {
            ...formData.value,
            position: 1,
          }
          store
            .dispatch(`${MODULE_NAME4}/addThirdRow`, newThirdValue)
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

    // SubjectForm
    const subjectForm = ref(null)
    const addSubject = (id = null) => {
      subjectForm.value.open(id)
    }
    const addSubjectToOptions = (row) => {
      selectsDatas.value.subject = selectsDatas.value.subject.concat([row])
      formData.value.subject_id = row.id
    }

    // TeacherForm
    const teacherForm = ref(null)
    const addTeacher = (id = null) => {
      teacherForm.value.open(id)
    }
    const addTeacherToOptions = (row) => {
      selectsDatas.value.teacher = selectsDatas.value.teacher.concat([row])
      formData.value.teacher_id = row.id
    }

    return {
      form,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadSubject,
      loadTeacher,
      validate,
      show,
      onSubmit,
      open,
      close,

      subjectForm,
      addSubject,
      addSubjectToOptions,

      teacherForm,
      addTeacher,
      addTeacherToOptions,

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
