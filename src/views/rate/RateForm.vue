<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keydown.enter="onSubmit()"
    max-width="600px"
    width="500px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Kurs</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="formData.date"
                      label="Sana"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      :rules="[required]"
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
                <v-text-field
                  type="number"
                  label="Kurs"
                  v-model="formData.rate"
                  outlined
                  dense
                  required
                  :rules="[required, minLengthValidator(formData.rate, 3), maxLengthValidator(formData.rate, 6)]"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>

          <v-btn color="success" type="submit" @click.prevent="onSubmit()">Saqlash</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCalendar } from '@mdi/js'

import store from '@/store'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'

export default {
  props: {
    MODULE_NAME: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    //show, hide
    const show = ref(false)
    const formData = ref({ ...emptyFormData })
    const form = ref(null)
    const emptyFormData = {
      id: null,
      date: null,
      rate: null,
    }
    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    const validate = () => {
      form.value.validate()
    }
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](id)))
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }
    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.rate.length >= 3 && formData.value.rate.length <= 6 && formData.value.date) {
          store
            .dispatch(`${props.MODULE_NAME}/updateRow`, formData.value)
            .then(message => {
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
            text: "Bo'limda xatolik! Bo'limlarni to'g'ri to'ldiring!",
          })
        }
      } else {
        if (formData.value.rate.length >= 3 && formData.value.rate.length <= 6 && formData.value.date) {
          store
            .dispatch(`${props.MODULE_NAME}/addRow`, formData.value)
            .then(message => {
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
            text: "Bo'limda xatolik! Bo'limlarni to'gri to'ldiring!",
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
      maxLengthValidator,
      formData,
      validate,
      show,
      onSubmit,
      open,
      close,

      icons: {
        mdiCalendar,
      },
    }
  },
}
</script>
