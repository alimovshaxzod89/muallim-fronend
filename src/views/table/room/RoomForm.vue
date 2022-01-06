<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.esc="close()"
    @click:outside="close()"
    @keydown.enter="onSubmit()"
    max-width="800px"
    width="800px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Xonalar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="10">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.place_id"
                  :items="selectsDatas.place"
                  item-text="name"
                  item-value="id"
                  label="Bino"
                  dense
                  outlined
                  clearable
                  :rules="selectRule"
                  class="align-start"
                >
                </v-autocomplete>
              </v-col>

              <v-col cols="10">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-text-field
                  type="text"
                  label="NOMI"
                  v-model="formData.name"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="10">
                <v-text-field
                  type="number"
                  label="SIG'IMI"
                  v-model="formData.capacity"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="10">
                <v-text-field
                  type="text"
                  label="AKTIV"
                  v-model="formData.active"
                  outlined
                  dense
                  required
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
import { mdiCalendar, mdiPlusCircleOutline } from '@mdi/js'

import store from '@/store'
import axios from '@axios'

import { ref, onMounted } from '@vue/composition-api'
import { required, minLengthValidator, maxLengthValidator } from '@core/utils/validation'

const MODULE_NAME = 'room'

export default {
  props: {
  },

  created() {
    this.loadPlaces()
  },

  setup(props, { emit }) {
    const show = ref(false)
    const open = (id = null) => {
      show.value = true
      if (id) formData.value = JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](id)))
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }

    const form = ref(null)
    const emptyFormData = {
      id: null,
      place_id: null,
      name: null,
      capacity: null,
      active: null,
    }

    // validation
    const formData = ref({ ...emptyFormData })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang']
    const validate = () => {
      form.value.validate()
    }

    // form options for selects
    const selectsDatas = ref({})
    // !METHODS
    const loadPlaces = () => {
      axios
        .get('places', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.place = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (
            formData.value.name && 
            formData.value.place_id && 
            formData.value.name
          ) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
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
        if (formData.value.name && 
            formData.value.place_id && 
            formData.value.name
          ) {
          store
            .dispatch(`${MODULE_NAME}/addRow`, formData.value)
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

    // placeForm
    const placeForm = ref(null)
    const addPlace = (id = null) => {
      placeForm.value.open(id)
    }
    const addPlaceToOptions = row => {
      selectsDatas.value.place = selectsDatas.value.place.concat([row])
      formData.value.place_id = row.id
    }

    // Watch
    const changeSale = () => {
      if (formData.value.sale === false) {
        formData.value.sale_cause = ''
      }
    }

    return {
      form,
      required,
      minLengthValidator,
      maxLengthValidator,
      emptyFormData,
      formData,
      validate,
      show,
      onSubmit,
      open,
      close,
      changeSale,

      selectRule,
      selectsDatas,
      loadPlaces,

      addPlace,
      placeForm,
      addPlaceToOptions,

      icons: {
        mdiCalendar,
        mdiPlusCircleOutline,
      },
    }
  },
}
</script>
