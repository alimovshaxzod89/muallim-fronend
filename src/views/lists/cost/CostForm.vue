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
          <span class="headline">Xarajat kiritish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
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
                      :rules="[required]"
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
              <v-col cols="12" class="teacherInp">
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
                </v-autocomplete>
              </v-col>
              <v-col cols="12" class="amount">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  label="SUMMA"
                  v-model="formData.money_id"
                  type="number"
                  dense
                  outlined
									required
                  hide-details
                  :rules="[required]"
                ></v-text-field>
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

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import store from '@/store'
import CostStoreModule from './CostStoreModule'
import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required } from '@core/utils/validation'
import Button from '../../components/button/Button'

const MODULE_NAME = 'cost'

export default {
  components: { Button },
  // props: {
  //
  // },
  created() {
    this.loadTeacher()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, CostStoreModule)
    }

    // show, hide
    const emptyFormData = {
      id: null,
      date: null,
      teacher_id: null,
      money_id: null,
      note: null,
    }
    const formData = ref({ ...emptyFormData })
    const form = ref(null)
    const show = ref(false)
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)
    const open = (id = null) => {
      show.value = true
      if (id) {
        const newFormData = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
        formData.value = {
          ...newFormData,
          amount: String(newFormData.amount),
        }
      }
    }
    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    //validation
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.date && formData.value.teacher_id && formData.value.money_id) {
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
        if (formData.value.date && formData.value.teacher_id && formData.value.money_id) {
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

    // TeacherForm
    const teacherForm = ref(null)
    const addTeacher = (id = null) => {
      teacherForm.value.open(id)
    }
    const addTeacherToOptions = row => {
      selectsDatas.value.teacher = selectsDatas.value.teacher.concat([row])
      formData.value.teacher_id = row.id
    }

    return {
      form,
      picker,
      isDate,
      required,
      formData,
      selectRule,
      show,
      onSubmit,
      open,
      close,

      selectsDatas,
      loadTeacher,
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
.amount {
  margin-top: -45px;
}
.teacherInp {
  margin-bottom: 6%;
  margin-top: -10%;
}
</style>
