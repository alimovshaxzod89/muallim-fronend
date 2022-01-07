<template>
  <!-- form dialog -->
  <v-dialog v-model="show" @keydown.esc="close()" @click:outside="close()" max-width="600px" width="500px">
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Xonalar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>  
                <v-text-field
                  label="ISMI"
                  v-model="formData.first_name"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required, minLengthValidator(formData.first_name, 3)]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
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
              <v-col cols="12">
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
              <v-col cols="12">
                <v-text-field
                  label="TELEFON"
                  v-model="formData.phone"
                  type="number"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="ULUSH %"
                  v-model="formData.share"
                  type="text"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
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
              <v-col cols="12">
                  <v-textarea
                    v-model="formData.address"
                    label="MANZIL"
                    dense
                    outlined
                    hide-details
                    required
                  >
                  </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="D.Y. TUMAN "
                  v-model="formData.permanent_region_id"
                  type="number"
                  dense
                  outlined
                  hide-details
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                  <v-textarea
                    v-model="formData.permanent_address"
                    label="D.Y. MANZIL"
                    dense
                    outlined
                    hide-details
                    required
                  >
                  </v-textarea>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData."
                  hide-details
                  label=""
                  class="mt-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData."
                  hide-details
                  label=""
                  class="mt-0"
                ></v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.birth_date"
                      label="TUG'ilGAN SANASI"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
                      outlined
                      :append-icon="icons.mdiCalendar"
                      class="my-date-picker"
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

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import TeacherStoreModule from './TeacherStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button'

const MODULE_NAME = 'teacher'

export default {
  components: { Button },
  // props: {
  //
  // },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, TeacherStoreModule)
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
      first_name: null,
      last_name: null,
      middle_name: null,
      phone: null,
      share: null,
      region_id: null,
      address: null,
      permanent_region_id: null,
      permanent_address: null,
    //   checkbox gender male
    //   checkbox gender male
      birth_date: null,  
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
    // const loadPlace = () => {
    //   axios
    //     .get('/api/places', { params: { itemsPerPage: -1 } })
    //     .then(response => {
    //       if (response.data.success) {
    //         selectsDatas.value.room = response.data.data
    //       }
    //     })
    //     .catch(error => console.log(error))
    // }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (
            formData.value.first_name &&
            formData.value.last_name &&
            formData.value.middle_name &&
            formData.value.last_name &&
            formData.value.phone &&
            formData.value.share &&
            formData.value.region_id &&
            formData.value.address &&
            formData.value.permanent_region_id &&
            formData.value.permanent_address &&
            formData.value.birth_date
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
            formData.value.first_name &&
            formData.value.last_name &&
            formData.value.middle_name &&
            formData.value.last_name &&
            formData.value.phone &&
            formData.value.share &&
            formData.value.region_id &&
            formData.value.address &&
            formData.value.permanent_region_id &&
            formData.value.permanent_address &&
            formData.value.birth_date
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

   

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      validate,
      show,
      onSubmit,
      open,
      close,


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
