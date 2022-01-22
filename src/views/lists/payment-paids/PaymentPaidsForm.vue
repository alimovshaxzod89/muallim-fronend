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
          <span class="headline">Talabadan to'lov olish</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
							<v-col cols="6">
                <v-autocomplete
                  v-model="formData.subject_id"
                  :items="subjects"
                  item-text="name"
                  item-value="id"
                  label="FAN"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <v-autocomplete
                  v-model="formData.group_id"
                  :items="groups"
                  item-text="number"
                  item-value="id"
                  label="GURUH"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <v-autocomplete
                  v-model="formData.student_id"
                  :items="students"
                  item-text="full_name"
                  item-value="id"
                  label="TALABA"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <v-autocomplete
                  v-model="formData.payment_id"
                  :items="monthsYears"
                  item-text="value"
                  item-value="id"
                  label="OY/YIL"
                  dense
                  outlined
                  clearable
                  class="align-start"
                ></v-autocomplete>
              </v-col>

							<v-col cols="6">
                <v-text-field
                  type="text"
                  label="SUMMA"
                  v-model="formData.amount"
                  outlined
                  dense
                  required
                ></v-text-field>
              </v-col>

							<v-col cols="6">
                <v-menu v-model="isDate" :close-on-content-click="false" offset-y min-width="auto">
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                    class="my-date-picker"
                      v-model="formData.date"
                      label="SA'NA"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      outlined
                      clearable
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
import { mdiCalendar, mdiClockTimeFourOutline } from '@mdi/js'

import store from '@/store'
import axios from '@axios'
import moment from 'moment'

require('moment/locale/uz-latn')

import { ref, onMounted, watch } from '@vue/composition-api'

export default {
  props: {
    MODULE_NAME: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    //show, hide

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    const form = ref(null)
    const show = ref(false)
    const emptyFormData = {
      id: null,
      subject_id: null,
      student_id: null,
      payment_id: null,
      group_id: null,
      amount: null,
      date: null,
    }
    const formData = ref({ ...emptyFormData })
    const open = (item = null, data = null) => {
      show.value = true
      if (item) {
        formData.value = {
          ...JSON.parse(JSON.stringify(store.getters[`${props.MODULE_NAME}/getById`](item.id))),
          subject_id: item.payment.group.subject_id,
          group_id: item.payment.group.id,
          student_id: item.payment.student_id,
        }
      }

      if (!item && data) {
        formData.value = {
          ...data,
        }
      }
    }
    const close = () => {
      show.value = false
      formData.value = { ...emptyFormData }
      form.value.resetValidation()
    }
    // on form submit
    const onSubmit = () => {
      if (formData.value.id) {
        if (formData.value.subject_id && formData.value.group_id) {
          store
            .dispatch(`${props.MODULE_NAME}/updateRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('refresh-list')
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
        //create
        if (formData.value.subject_id && formData.value.group_id) {
          store
            .dispatch(`${props.MODULE_NAME}/addRow`, formData.value)
            .then(message => {
              close()
              // emit('notify', { type: 'success', text: message })
              emit('refresh-list')
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

    const days = ref([
      { key: 1, name: 'Dushanba' },
      { key: 2, name: 'Seshanba' },
      { key: 3, name: 'Chorshanba' },
      { key: 4, name: 'Payshanba' },
      { key: 5, name: 'Juma' },
      { key: 6, name: 'Shanba' },
      { key: 7, name: 'Yakshanba' },
    ])
    // const monthOptions = () => {
    //   const arr = [{ value: null, text: 'Oy' }]
    //   for (let i = 1; i <= 12; i++) {
    //     arr.push({ value: i, text: moment(`2000-${i}-01`).format('MMMM') })
    //   }
    //   return arr
    // }

    // Loads
    const subjects = ref(null)
    const loadSubjects = () => {
      axios.get('/api/subjects').then(response => {
        if (response.data.success) {
          subjects.value = response.data.data
        }
      })
    }

    const groups = ref(null)
    const loadGroups = () => {
      const params = {}
      if (formData.value.subject_id) params.subject_id = formData.value.subject_id

      axios.get('/api/groups', { params }).then(response => {
        if (response.data.success) {
          groups.value = response.data.data
        }
      })
    }

    const students = ref(null)
    const loadStudents = () => {
      const params = {}
      if (formData.value.group_id) params.group_id = formData.value.group_id

      axios.get('/api/students', { params }).then(response => {
        if (response.data.success) {
          students.value = response.data.data
        }
      })
    }

    const payments = ref(null)
    const monthsYears = ref([])
    const loadPayments = () => {
      const params = {}
      if (formData.value.subject_id) params.subject_id = formData.value.subject_id
      if (formData.value.group_id) params.group_id = formData.value.group_id
      if (formData.value.student_id) params.student_id = formData.value.student_id

      // if (this.sElectedYear) params.year = this.sElectedYear
      // if (this.sElectedMonth) params.month = this.sElectedMonth

      axios.get('/api/payments', { params }).then(response => {
        if (response.data.success) {
          payments.value = response.data.data

          monthsYears.value = []

          payments.value.forEach((item, i) => {
            const date = new Date(item.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            if (formData.value.payment_id && formData.value.payment_id == item.id) {
              if (!formData.value.amount) {
                formData.value.amount = item.amount
              }
            } else {
              // year, month mosini tanlash
              // if (selectedYear.value == year && selectedMonth.value == month) {
              //   formData.value.payment_id = item.id
              // }
            }

            const payment = {
              id: item.id,
              value: `${moment(`${year}-${month}-01`).format('MMMM')}-${year}`,
            }

            // todo closed ni hisobga olish
            // if (item.closed && item.paid !== 0) payment.disabled = true
            monthsYears.value.push(payment)
          })
        }
      })
    }

    // ! Created
    onMounted(() => {
      loadSubjects()
      loadGroups()
      loadStudents()
      loadPayments()
    })

    // ! Watch
    watch(
      () => formData.value.subject_id,
      () => loadGroups(),
    )
    watch(
      () => formData.value.group_id,
      () => loadStudents(),
    )
    watch(
      () => formData.value.student_id,
      () => loadPayments(),
    )

    return {
      isDate,
      picker,
      form,
      formData,
      show,
      onSubmit,
      open,
      close,
      subjects,
      groups,
      students,
      days,
      monthsYears,

      icons: {
        mdiCalendar,
        mdiClockTimeFourOutline,
      },
    }
  },
}
</script>
