<template>
  <!-- form dialog -->
  <v-dialog
    v-model="show"
    @keydown.enter="onSubmit()"
    @keydown.esc="close()"
    @click:outside="close()"
    max-width="1000px"
    width="1000px"
  >
    <v-card>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">DAVOMAT</span>
        </v-card-title>
        <v-card-text>       
          <v-container>
            <v-row>
                <v-col cols="6">
                    <h4 class="text-required no-text"><span>*</span></h4>
                    <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="formData.date"
                          label="SA'NA"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          hide-details
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
              <v-col cols="6">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-autocomplete
                  v-model="formData.group_id"
                  :items="selectsDatas.group"
                  item-text="number"
                  item-value="id"
                  label="GURUH"
                  solo
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="formData.student_id"
                  :items="selectsDatas.student"
                  item-text="full_name"
                  item-value="id"
                  label="TALABA"
                  solo
                  dense
                  outlined
                  hide-details
                  clearable
                  :rules="selectRule"
                  required
                >
                </v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="formData.came"
                  hide-details
                  label="KELDI"
                  class="mt-0"
                  false-value="0"
                  true-value="1"
                ></v-checkbox>
              </v-col>
              <v-col cols="6">
                <v-textarea
                   v-model="formData.note"
                   label="IZOH"
                   dense
                   outlined
                   hide-details
                   height="80"
                >
                </v-textarea>
              </v-col>
              <v-col cols="6">
                <v-textarea
                   v-model="formData.note_to_admin"
                   label="ADMINGA MUROJAAT"
                   dense
                   outlined
                   hide-details
                   height="80"
                >
                </v-textarea>
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

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>
    </v-card>

  <student-form ref="studentForm" v-on:add-student-to-options="addStudentToOptions($event)" />
  <group-form ref="groupForm" v-on:add-group-to-options="addGroupToOptions($event)" />

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'
moment.locale('uz')

import numeral from 'numeral'

import store from '@/store'
import DavomatStoreModule from './DavomatStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import StudentForm from '@/views/lists/student/StudentForm.vue'
import GroupForm from '@/views/lists/group/GroupForm.vue'
import Button from '../../components/button/Button.vue'

const MODULE_NAME = 'davomat'

export default {
  components: {
    StudentForm,
    GroupForm,
    Button,
  },

  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    sum: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  created() {
    this.loadStudent()
    this.loadGroup()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, DavomatStoreModule)
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
      date: null,
      group_id: null,
      student_id: null,
      came: '0',
      note: null,
      note_to_admin: null,
    }

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //validation
    const formData = ref({ ...emptyFormData })
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
            selectsDatas.value.student = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    const loadGroup = () => {
      axios
        .get('/api/groups', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.group = response.data.data
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
      if (formData.value.id) {
        if (formData.value.date && formData.value.group_id && formData.value.student_id && formData.value.came) {
          store
            .dispatch(`${MODULE_NAME}/updateRow`, formData.value)
            .then(({ message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
            })
            .finally(() => {
							submitDisabled.value = false
						})
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
          })
          .finally(() => {
            submitDisabled.value = false
          })
        }
      } else {
        if (formData.value.date && formData.value.group_id && formData.value.student_id && formData.value.came) {
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
        } else {
          emit('notify', {
            type: 'warning',
            text: "Bo'limda xatolik! bo'limlarni to'gri to'ldiring!",
          })
          .finally(() => {
            submitDisabled.value = false
          })
        }
      }
    }

    // SubjectForm
    const studentForm = ref(null)
    const addStudent = (id = null) => {
      studentForm.value.open(id)
    }
    const addStudentToOptions = row => {
      selectsDatas.value.student = selectsDatas.value.student.concat([row])
      formData.value.student_id = row.id
    }
    // GroupForm
    const groupForm = ref(null)
    const addGroup = (id = null) => {
      groupForm.value.open(id)
    }
    const addGroupToOptions = row => {
      selectsDatas.value.group = selectsDatas.value.group.concat([row])
      formData.value.group_id = row.id
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
      loadStudent,
      loadGroup,
      validate,
      show,
      onSubmit,
      submitDisabled,
      open,
      close,

      studentForm,
      addStudent,
      addStudentToOptions,
      groupForm,
      addGroup,
      addGroupToOptions,

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
