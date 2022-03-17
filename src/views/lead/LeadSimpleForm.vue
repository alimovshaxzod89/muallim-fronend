<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.enter="onSubmit()"
    @keydown.esc="close()"
    @click:outside="close()"
    max-width="600px"
    width="600px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  dense
                  outlined
                  required
                  hide-details
                  :rules="[required]"
                ></v-text-field>
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
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import { ref } from '@vue/composition-api'
import store from '@/store'

import LeadStoreModule from './LeadStoreModule'

import { required, minLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'lead'

export default {
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, LeadStoreModule)
    }

    const form = ref(null)
    const formTitle = ref("Yangi bo'lim yaratish")
    const emptyFormData = {
      group_id: null,
      id: null,
      position: null,
      name: null,
    }
    const formData = ref({ ...emptyFormData })

    // show, hide
    const show = ref(false)
    const open = (position, id) => {
      show.value = true
      if (position) formData.value.position = position
      if (id) {
        formTitle.value = "Bo'limni tahrirlash"
        formData.value = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](id)))
      }
    }
    const close = () => {
      show.value = false
      formTitle.value = "Yangi bo'lim yaratish"
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
    }

    // Form submit
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
              return data
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
              return false
            })
        }
      }
    }

    return {
      form,
      formTitle,
      required,
      minLengthValidator,
      formData,
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
</style>
