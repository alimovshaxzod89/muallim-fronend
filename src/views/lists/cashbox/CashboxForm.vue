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
    <v-card width="500" class="cashboxCard">
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Kassa nomlari</span>
        </v-card-title>
        <v-card-text>       
          <v-container>
            <v-row>

              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>  
                <v-text-field
                  label="NOMI"
                  v-model="formData.name"
                  :items="selectsDatas.name"
                  type="text"
                  dense
                  outlined
                  hide-details
                  :rules="[required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <h4 class="text-required no-text"><span>*</span></h4>
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        class="my-date-picker"
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
              <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gray" outlined @click="close()">Bekor qilish</v-btn>
          <v-btn color="success" type="submit" @click.prevent="onSubmit"> Saqlash</v-btn>
        </v-card-actions>

            </v-row>
            
          </v-container>
        </v-card-text>

        
      </v-form>

      <template #[`item.date`]="{ item }"> {{ item.date | date }}</template>
    </v-card>

  </v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'
moment.locale('uz')

import numeral from 'numeral'

import store from '@/store'
import CashboxStoreModule from './CashboxStoreModule'

import axios from '@axios'

import { ref } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import Button from '../../components/button/Button.vue'

const MODULE_NAME = 'cashbox'

export default {
  components: {
    Button,
  },

  filters: {
    date: value => moment(value).format('D MMMM YYYY'),
    sum: value => numeral(value).format('0,0'),
    feed: value => value[1] + '/' + value[2] + '/' + value[3],
  },
  created() {
    this.loadName()
  },
  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, CashboxStoreModule)
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
      name: null,
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
    //! METHODS
    const loadName = () => {
      axios
        .get('/api/cashboxes', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.name = response.data.data
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
            .then(({ message }) => {
              close()
              // emit('notify', { type: 'success', text: message })
            })
            .catch(error => {
              console.log(error)
              emit('notify', { type: 'error', text: error.message })
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
        }
      }
    }

    // // SubjectForm
    // const studentForm = ref(null)
    // const addStudent = (id = null) => {
    //   studentForm.value.open(id)
    // }
    // const addStudentToOptions = (row) => {
    //   selectsDatas.value.student = selectsDatas.value.student.concat([row])
    //   formData.value.student_id = row.id
    // }
    // // GroupForm
    // const groupForm = ref(null)
    // const addGroup = (id = null) => {
    //   groupForm.value.open(id)
    // }
    // const addGroupToOptions = (row) => {
    //   selectsDatas.value.group = selectsDatas.value.group.concat([row])
    //   formData.value.group_id = row.id
    // }

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectsDatas,
      selectRule,
      loadName,
      validate,
      show,
      onSubmit,
      open,
      close,

      // studentForm,
      // addStudent,
      // addStudentToOptions,
      // groupForm,
      // addGroup,
      // addGroupToOptions,

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
.cashboxCard {
  margin-left: 35%;
}
</style>
