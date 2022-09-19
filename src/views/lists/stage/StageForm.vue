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
          <span class="headline">Bosqich qo'shish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.subject_id"
                  :items="selectsDatas.subject"
                  item-text="name"
                  item-value="id"
                  label="FKursAN"
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
                  type="text"
                  dense
                  outlined
                  hide-details
                  :rules="[required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="formData.status"
                  hide-details
                  label="AKTIV"
                  true-value="1"
                  false-value="0"
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn 
						color="success" 
						type="button" 
						@click="onSubmit" 
						:disabled="submitDisabled"
					>
						<v-icon
							class="loading-animation"
							v-if="submitDisabled"
						>
							{{ icons.mdiLoading }}
						</v-icon>
						Saqlash
					</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>

    <subject-form ref="subjectForm" />
  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

import store from '@/store'
import StageStoreModule from './StageStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import SubjectForm from '@/views/lists/subject/SubjectForm.vue'
import Button from '../../components/button/Button'

const MODULE_NAME = 'stage'

export default {
  components: { SubjectForm, Button },
  // props: {
  //
  // },
  created() {
    this.loadSubject()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StageStoreModule)
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
      subject_id: null,
      name: null,
      status: '1',
    }

    //validation
    const formData = ref({})
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    //form options for selects
    const selectsDatas = ref({})
    // ! METHODS
    const loadSubject = () => {
      axios
        .get('/api/subjects', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.subject = response.data.data
          }
        })
        .catch(error => console.log(error))
    }

    // on form submit
     const submitDisabled = ref(false)
    const onSubmit = () => {
      if(submitDisabled.value === true)
				return
			else
				submitDisabled.value = true

				submitDisabled.value = true

			if (!form.value.validate()) {
				console.log('form inputs not valid!')

				submitDisabled.value = false
				return
			}
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
            })
            .finally(() => {
              submitDisabled.value = false
            })
        } else {
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
            .finally(() => {
              submitDisabled.value = false
            })
        }
      }
    }

    // StageForm
    const subjectForm = ref(null)
    const addSubject = (id = null) => {
      subjectForm.value.open(id)
    }

    return {
      form,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadSubject,
      validate,
      show,
      onSubmit,
      submitDisabled,
      open,
      close,

      subjectForm,
      addSubject,

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
