<template>
  <!-- form dialog -->
  <v-dialog 
    v-model="show"
    @keydown.enter="onSubmit()" 
    @keydown.esc="close()" 
    @click:outside="close()" 
    max-width="700px" 
    width="700px"
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
                  v-model="formData.student"
                  :items="selectsDatas.student_group"
                  item-text="name"
                  item-value="id"
                  label="TALABA"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                  <template>
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
                <h4 class="text-required no-text"><span>*</span></h4>  
                <v-text-field
                  label="FAMILIYA"
                  v-model="formData.last_name"
                  type="text"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="SHARIFI"
                  v-model="formData.middle_name"
                  type="text"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  prefix="+998"
                  label="TELEFON"
                  v-model="formData.phone"
                  type="phone"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="formData.region_id"
                  :items="selectsDatas.teacher"
                  item-text="name"
                  item-value="id"
                  label="TUMAN"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                  <v-textarea
                    v-model="formData.address"
                    label="MANZIL"
                    dense
                    outlined
                    hide-details
                    required
                    height="80px"
                  >
                  </v-textarea>
              </v-col>
              <v-col cols="6"> 
                <v-autocomplete
                  v-model="formData.permanent_region_id"
                  :items="selectsDatas.teacher"
                  item-text="name"
                  item-value="id"
                  label="D.Y. TUMAN"
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                  <v-textarea
                    v-model="formData.permanent_address"
                    label="D.Y. MANZIL"
                    dense
                    outlined
                    hide-details
                    required
                    height="80px"
                  >
                  </v-textarea>
              </v-col>
              <v-col cols="6"> 
                <v-radio-group
                 v-model="formData.gender"
                 class="mt-0"
                 hide-details
                >
                    <v-radio
                      label="ERKAK"
                      value="0"
                    ></v-radio>
                    <v-radio
                      label="AYOL"
                      value="1"
                    ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="6">  
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.birth_date"
                      label="TUG'ilGAN SANASI"
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
                    v-model="formData.birth_date"
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
    </v-card>

  <student-form ref="studentForm" v-on:add-product-type-to-options="addProductTypeToOptions($enent)" />
  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import StudentGroupStoreModule from './StudentGroupStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button'
import StudentForm from '../student/StudentForm.vue'

const MODULE_NAME = 'studentGroup'

export default {
  components: { Button, StudentForm },
  // props: {
  //
  // },
  created() {
      this.loadStudent()
  },
  setup (props, {emit})  {
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
      teacher: null,
			student: null,
			group: null,
			begin_date: null,
			end_date: null,
			status: null
    }
    const formData = ref({ ...emptyFormData })

    // birth date picker
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //validation
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
            selectsDatas.value.student_group = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (
            formData.value.student &&
            formData.value.group
        ) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(message => {
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
      } else {
        if (
            formData.value.student &&
            formData.value.group
           ) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(message => {
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
        roomForm.value.open(id)
    }
    const addRegionToOptions = row => {
        selectsDatas.value.region = selectsDatas.value.region.concat([row])
        formData.value.region_id = row.id
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
      loadRegion,
      validate,
      show,
      onSubmit,
      open,
      close,

      teacherForm,
      addRegion,
      addRegionToOptions,

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
