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
          <span class="headline">Guruhlar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
							<v-col cols="6">
								<h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.week_day"
                  :items="group_times.week_day"
                  item-text="name"
                  item-value="id"
                  label="KUN"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
								<h4 class="text-required no-texts"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.room_id"
                  :items="group_times.room"
                  item-text="name"
                  item-value="id"
                  label="XONA"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-text-field
                  type="number"
                  label="VAQT ..DAN"
                  v-model="formData.time_begin"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

							<v-col cols="6">
                <h4 class="text-required no-texts"><span>*</span></h4>
                <v-text-field
                  type="number"
                  label="VAQT ..GACHA"
                  v-model="formData.time_end"
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
import { mdiCalendar } from '@mdi/js'

import store from '@/store'
import axios from '@axios'

import { ref, onMounted } from '@vue/composition-api'
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
      number: null,
      subject_id: null,
      stage_id: null,
      teacher_id: null,
      price: null,
      teacher_share: null,
      max_students: null,
      begin_date: null,
      end_date: null,
    }

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
        if (
          formData.value.number &&
          formData.value.stage_id &&
          formData.value.teacher_id &&
          formData.value.price &&
          formData.value.status
        ) {
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
        if (
          formData.value.number &&
          formData.value.stage_id &&
          formData.value.teacher_id &&
          formData.value.price &&
          formData.value.status
        ) {
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

    // Load subjects
    const group_times = ref()
    const loadGroup_times = () => {
      axios.get('/api/group_times').then(response => {
        if (response.data.success) {
          console.log(response)
          group_times.value = response.data
        }
      })
    }

    onMounted(() => {
      loadGroup_times()
    })

    return {
      required,
      minLengthValidator,
      maxLengthValidator,
      formData,
      validate,
      show,
      onSubmit,
      open,
      close,
      group_times,
      stages,
      rooms,
      teachers,
      isDate2,

      icons: {
        mdiCalendar,
      },
    }
  },
}
</script>
