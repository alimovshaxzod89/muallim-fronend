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
                <v-autocomplete
                  v-model="formData.teacher_id"
                  :items="selectsDatas.teacher"
                  item-text="full_name"
                  item-value="id"
                  label="O'qituvchi"
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
                      @click="addTeacher()"
                    >
                      <v-icon size="22">
                        {{ icons.mdiPlusCircleOutline }}
                      </v-icon>
                    </v-btn>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>  
                <v-text-field
                  label="SUMMA"
                  v-model="formData.amount"
                  type="number"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required, minLengthValidator(formData.amount, 3)]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="my-date-picker"
                      v-model="formData.date"
                      label="SANA"
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
              <v-col cols="12">
                  <v-textarea
                    v-model="formData.note"
                    label="IZOH"
                    dense
                    outlined
                    hide-details
                    required
                    height="80px"
                  >
                  </v-textarea>
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

  <teacher-form ref="teacherForm" v-on:add-teacher-to-options="addTeacherToOptions($event)" />

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import store from '@/store'
import TeacherPaidStoreModule from './TeacherPaidStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import TeacherForm from '@/views/lists/teacher/TeacherForm.vue'
import Button from '../../components/button/Button'

const MODULE_NAME = 'teacherPaid'

export default {
  components: { TeacherForm, Button },
  // props: {
  //
  // },
  created() {
    this.loadTeacher()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, TeacherPaidStoreModule)
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
      amount: null,
      date: null,
      note: null,
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
        if (formData.value.teacher_id && formData.value.amount) {
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
        if (formData.value.teacher_id && formData.value.amount) {
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
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadTeacher,
      validate,
      show,
      onSubmit,
      open,
      close,

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
