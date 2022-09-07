<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keyup.enter="onSubmit()"
    max-width="800px"
    width="800px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Talabalar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="4">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-text-field
                  type="text"
                  label="ISM"
                  v-model="formData.first_name"
                  outlined
                  dense
                  :rules="[required]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-text-field
                  type="text"
                  label="FAMILIYA"
                  v-model="formData.last_name"
                  outlined
                  dense
                  :rules="[required]"
                ></v-text-field>
              </v-col>

              <v-col cols="4">
                <v-text-field
                  type="text"
                  label="SHARIFI"
                  v-model="formData.middle_name"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  prefix="+998"
                  v-mask="'## ### ####'"
                  type="phone"
                  label="TELEFON"
                  v-model="formData.phone"
                  outlined
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.birth_date"
                      label="TUG'ILGAN KUN"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      clearable
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

              <v-col cols="6">
                <v-autocomplete
                  v-model="formData.region_id"
                  :items="regions"
                  item-text="name"
                  item-value="id"
                  label="TUMAN"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

              <v-col cols="6">
                <v-autocomplete
                  v-model="formData.permanent_region_id"
                  :items="regions"
                  item-text="name"
                  item-value="id"
                  label="D.Y. TUMAN"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  type="text"
                  label="MANZIL"
                  v-model="formData.address"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  type="text"
                  label="D.Y. MANZILI"
									v-model="formData.permanent_address"
                  outlined
                  dense
                  required
								></v-text-field>
              </v-col>

              <v-col cols="12">
                <h4 class="text-required">Jinsi <span>*</span></h4>
                <v-radio-group
									v-model="formData.gender"
									column
                  hide-details=""
									class="mt-0"
                  required
								>
									<v-radio
										label="Erkak"
										:value="1"
									></v-radio>
									<v-radio
										label="Ayol"
										:value="2"
									></v-radio>
								</v-radio-group>
              </v-col>

              <v-col cols="12">
                <v-checkbox
                  v-model="formData.sale"
                  hide-details
                  label="CHEGIRMA"
                  @change="changeSale()"
                  false-value="0"
                  true-value="1"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" v-if="formData.sale == 1">
                <v-textarea
                  v-model="formData.sale_cause"
                  label="CHEGIRMA SABABI"
                  hide-details
                  outlined
                  clearable
                  class="mt-0"
                ></v-textarea>
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

import { ref, onMounted } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'
import StudentStoreModule from '../student/StudentStoreModule'

const MODULE_NAME = 'student'

export default {
  setup(props, { emit }) {
    
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentStoreModule)
    }

    //show, hide
    const show = ref(false)
    const form = ref(null)
    const emptyFormData = {
      id: null,
      first_name: null,
      last_name: null,
      middle_name: null,
      phone: null,
      birth_date: null,
      region_id: null,
      permanent_region_id: null,
      address: null,
      permanent_address: null,
      gender: 2,
      sale: false,
      sale_cause: null,
    }
    const formData = ref({ ...emptyFormData })

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

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
    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        //update
        if (formData.value.first_name && formData.value.last_name && formData.value.gender) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
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
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! Bo'limlarni to'g'ri to'ldiring!",
          })
        }
      } else {
        //create
        if (formData.value.first_name && formData.value.last_name && formData.value.gender) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(({ data, message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('add-student-to-options', data)
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
    // Load regions
    const regions = ref()
    const loadRegions = () => {
      axios.get('/api/regions').then(response => {
        if (response.data.success) {
          regions.value = response.data.data
        }
      })
    }

    onMounted(() => {
      loadRegions()
    })

    // Watch
    const changeSale = () => {
      if (formData.value.sale === false) {
        formData.value.sale_cause = ''
      }
    }

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      maxLengthValidator,
      formData,
      validate,
      show,
      onSubmit,
      open,
      close,
      regions,
      changeSale,

      icons: {
        mdiCalendar,
      },
    }
  },
}
</script>
