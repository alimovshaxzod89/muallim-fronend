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
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  label="FIO"
                  v-model="formData.full_name"
                  type="text"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  prefix="+998"
                  label="TELEFON"
                  v-model="formData.phone"
                  type="phone"
                  dense
                  outlined
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
import RequestStoreModule from '../storeModule/RequestStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button.vue'

const MODULE_NAME = 'request'

export default {
  components: { Button },
  // props: {
  //
  // },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, RequestStoreModule)
    }

    // show, hide
    const show = ref(false)
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/requestGetById`](id)))
    }
    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    const form = ref(null)
    const emptyFormData = {
      id: null,
      full_name: null,
      phone: null,
      note: null,
    }

    //validation
    const formData = ref({ ...emptyFormData })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.full_name && formData.value.phone) {
          store
            .dispatch(`${MODULE_NAME}/requestUpdateRow`, formData.value)
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
        if (formData.value.full_name && formData.value.phone) {
          const newValue = {
            ...formData.value,
            days: '1',
            hours: '1',
          }
          console.log(newValue)
          store
            .dispatch(`${MODULE_NAME}/requestAddRow`, newValue)
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

    return {
      form,
      required,
      minLengthValidator,
      formData,
      selectRule,
      validate,
      show,
      onSubmit,
      open,
      close,

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
</style>
