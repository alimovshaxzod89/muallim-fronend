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
          <span class="headline">Tumanlar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4> 
                <v-autocomplete
                  v-model="formData.province_id"
                  :items="selectsDatas.region"
                  item-text="name"
                  item-value="id"
                  label="VILOYAT"
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
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required, minLengthValidator(formData.name, 3)]"
                ></v-text-field>
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
import RegionStoreModule from './RegionStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button'

const MODULE_NAME = 'region'

export default {
  components: { Button },
  // props: {
  //
  // },
  created() {
    this.loadProvince()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, RegionStoreModule)
    }

    // show, hide
    const show = ref(false)
    const open = (id = null) => {
      show.value = true
      setTimeout(() => {
        form.value.$el[0].focus()
      }, 100)
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
      province_id: null,
      name: null,
    }
    const formData = ref({})

    //validation
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadProvince = () => {
      axios
        .get('/api/provinces', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.region = response.data.data
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
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
            .then(({ data, message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('add-province-to-options', data)
            })
            .catch(error => {
              ;``
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
              return false
            })
        }
      }
    }

    // ProvinceForm
    const regionForm = ref(null)
    const addProvince = (id = null) => {
      provinceForm.value.open(id)
    }
    const addProvinceToOptions = row => {
      selectsDatas.value.region = selectsDatas.value.region.concat([row])
      formData.value.province_id = row.id
    }

    return {
      form,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadProvince,
      validate,
      show,
      onSubmit,
      open,
      close,

      regionForm,
      addProvince,
      addProvinceToOptions,

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
