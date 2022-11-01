<template>
	<!-- form dialog -->
	<v-dialog
		v-model='show'
		@keydown.esc='close()'
		@click:outside='close()'
		@keydown.enter='onSubmit()'
		max-width='1000px'
		width='1000px'
	>
		<v-card>
			<v-form ref='form'>
				<v-card-title>
					<span class='headline'>Talabadan tulov olish</span>
				</v-card-title>
				<v-card-text>
					<v-container>
						<v-row>

							<v-col cols='4'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.student_id'
									:items='students'
									:item-text='(item) => (item.phone ? `${item.full_name} — ${item.phone}` : item.full_name)'
									item-value='id'
									label='TALABA'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
									required
								>
								</v-autocomplete>
							</v-col>
							<v-col cols='4'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-text-field
									v-model='formData.amount'
									type='text'
									label='SUMMA'
									outlined
									dense
									:rules='selectRule'
								></v-text-field>
							</v-col>
							<v-col cols='4'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-select
									v-model='formData.cashbox_id'
									label="TO'LOV TURI"
									:items='cashboxes'
									item-value='id'
									item-text='name'
									hide-details
									dense
									outlined
									:rules='selectRule'
								></v-select>
							</v-col>

							<v-col cols='8'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-autocomplete
									v-model='formData.group_id'
									:items='groups'
									:item-text='(item) => `${item.number} — ${item.subject.name} — ${item.teacher.full_name}`'
									item-value='id'
									label='GURUH'
									dense
									outlined
									hide-details
									clearable
									:rules='selectRule'
								>
								</v-autocomplete>
							</v-col>

							<v-col cols='4'>
								<h4 class='text-required no-text'><span>*</span></h4>
								<v-menu v-model='isDate' :close-on-content-click='false' offset-y min-width='auto'>
									<template v-slot:activator='{ on, attrs }'>
										<v-text-field
											v-model='formData.date'
											label="SA'NA"
											readonly
											v-bind='attrs'
											v-on='on'
											hide-details
											outlined
											:append-icon='icons.mdiCalendar'
										></v-text-field>
									</template>
									<v-date-picker
										v-model='formData.date'
										color='primary'
										@input='isDate = false'
										no-title
										:first-day-of-week='1'
										locale='ru-ru'
									></v-date-picker>
								</v-menu>
							</v-col>

							<!--							<v-col cols='4'>-->
							<!--								<h4 class='text-required no-text'></h4>-->
							<!--								<v-autocomplete-->
							<!--									v-model='formData.subject_id'-->
							<!--									:items='subjects'-->
							<!--									item-text='name'-->
							<!--									item-value='id'-->
							<!--									label='KURS / Guruhlarni filtrlash'-->
							<!--									dense-->
							<!--									outlined-->
							<!--									hide-details-->
							<!--									clearable-->
							<!--								>-->
							<!--								</v-autocomplete>-->
							<!--							</v-col>-->

							<v-col cols='6'>
								<h4 class='text-required no-text'><span>*</span></h4>

								<!--									:item-text='item => `${item.month}-${item.year}`'-->
								<v-select
									v-model='formData.payment_id'
									label='QAYSI OY UCHUN'
									:items='payments'
									:item-text='item => `${months[item.month-1].name}-${item.year}`'
									item-value='id'
									hide-details
									dense
									outlined
									:rules='selectRule'
								></v-select>
							</v-col>

							<v-col cols='3'>
								<h4 class='no-text' style='margin-top: 20px'>Oylik to'lov:</h4>
								<div v-if='formData.payment_id && payment'>
									{{ payment.amount | summa }}
								</div>
							</v-col>
							<v-col cols='3' v-if="bonus">
								<h4 class='no-text' style='margin-top: 20px'>Chegirma:</h4>
								<div v-if='formData.payment_id && payment'>
									{{ (( payment.amount * 10 ) / 100) | summa }}
								</div>
							</v-col>

						</v-row>
					</v-container>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color='gray' outlined @click='close()'>Bekor qilish</v-btn>
					<v-btn
						color='success'
						type='button'
						@click='onSubmit'
						:disabled='submitDisabled'
					>
						<v-icon
							class='loading-animation'
							v-if='submitDisabled'
						>
							{{ icons.mdiLoading }}
						</v-icon>
						Saqlash
					</v-btn>
				</v-card-actions>
			</v-form>

			<template #[`item.date`]='{ item }'> {{ item.date | date }}</template>
			<template #[`item.amount`]='{ item }'> {{ item.amount | summa }}</template>
		</v-card>

		<subject-form ref='subjectForm' v-on:add-subject-to-options='addSubjectToOptions($event)' />
		<student-form ref='studentForm' v-on:add-student-to-options='addStudentToOptions($event)' />
		<group-form ref='groupForm' v-on:add-group-to-options='addGroupToOptions($event)' />


	</v-dialog>
</template>

<script>
import { mdiPlusCircleOutline, mdiCalendar } from '@mdi/js'

// formats
import moment from 'moment'

moment.locale('uz')

import numeral from 'numeral'

import store from '@/store'
import StudentPaidStoreModule from './PaymentPaidStoreModule'

import axios from '@axios'

import { ref, watch, computed } from '@vue/composition-api'
import { required, minLengthValidator } from '@core/utils/validation'
import StudentForm from '@/views/lists/student/StudentForm.vue'
import SubjectForm from '@/views/lists/subject/SubjectForm.vue'
import GroupForm from '@/views/lists/group/GroupForm.vue'
import Button from '../../components/button/Button'

const MODULE_NAME = 'paymentPaid'

export default {
  components: {
    SubjectForm,
    StudentForm,
    GroupForm,
    Button,
  },

  setup(props, { emit }) {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, StudentPaidStoreModule)
    }

    const parentFilter = ref({})

    // show, hide
    const show = ref(false)
    const open = (item, data = null) => {
      show.value = true
      if (item && item.id !== undefined && item.id) {
        const paymentPaid = JSON.parse(JSON.stringify(store.getters[`${MODULE_NAME}/getById`](item.id)))
        // formData.value = paymentPaid

        formData.value = {
          id: paymentPaid.id,
          payment_id: paymentPaid.payment_id,
          cashbox_id: paymentPaid.cashbox_id,
          amount: paymentPaid.amount,
          date: paymentPaid.date,

          student_id: paymentPaid.payment.student_id,
          group_id: paymentPaid.payment.group_id,

          subject_id: paymentPaid.payment.group.subject_id,
        }
      } else if (data) {
        formData.value = {
          ...formData.value,
          student_id: data.student_id,
          group_id: data.group_id,
        }

        parentFilter.value = data
      }
    }
    // Default date time
    const datePicker = ref(new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10))
    const defaultDate = datePicker.value

    const close = () => {
      show.value = false
      form.value.resetValidation()
      formData.value = { ...emptyFormData }
      parentFilter.value = {}
    }
    const form = ref(null)
    const emptyFormData = {
      id: null,
      payment_id: null,
      amount: null,
      date: defaultDate,
      cashbox_id: null,

      student_id: null,
      group_id: null,
      subject_id: null,
    }

    const bonus = ref(false)

    const picker = new Date().toISOString().substr(0, 10)
    const isDate = ref(false)

    //validation
    const formData = ref({ ...emptyFormData })
    const selectRule = [v => !!v || 'Biron qiymatni tanlang!']
    const validate = () => {
      form.value.validate()
    }

    const branch_id = computed(() => store.state.branch_id)
    watch(branch_id, value => {
      filter.value.place_id = value
    })

    const filter = ref(props.value)

    //default fields
    filter.value = Object.assign(
      {
        place_id: branch_id.value ?? '',
      },
      props.value,
    )

    //return with default fields
    emit('input', filter.value)

    watch(
      filter,
      value => {
        emit('input', value)
      },
      { deep: true },
    )

    const clearParams = params => {
      return Object.keys(params)
        .filter(key => params[key] !== null && params[key] !== '')
        .reduce((obj, key) => {
          return Object.assign(obj, {
            [key]: params[key],
          })
        }, {})
    }

    // ! METHODS
    const subjects = ref([])
    const loadSubject = () => {
      axios
        .get('/api/subjects', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            subjects.value = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    loadSubject()

    const students = ref([])
    const loadStudent = () => {
      const params = clearParams({
        place_id: filter.value.place_id,
      })
      axios
        .get('/api/students', { params })
        .then(response => {
          if (response.data.success) {
            students.value = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    loadStudent()

    const cashboxes = ref([])
    const loadCashbox = () => {
      axios
        .get('/api/cashboxes', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            cashboxes.value = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    loadCashbox()

    const groups = ref([])
    // const loadGroup = () => {
    // 	axios
    // 		.get('/api/groups', { params: { itemsPerPage: -1 } })
    // 		.then(response => {
    // 			if (response.data.success) {
    // 				groups.value = response.data.data
    // 			}
    // 		})
    // 		.catch(error => console.log(error))
    // }
    // loadGroup()

    const loadStudentGroups = student_id => {
      const params = clearParams({
        place_id: filter.value.place_id,
        student_id,
      })
      axios
        .get('/api/student-groups', { params })
        // axios.get('/api/student-groups', { params: { itemsPerPage: -1, student_id } })
        .then(response => {
          if (response.data.success) {
            groups.value = []
            response.data.data.forEach(item => {
              groups.value.push(item.group)
            })

            if (groups.value.length == 1)
              setTimeout(() => {
                formData.value.group_id = groups.value[0].id
              }, 500)
          } else {
            groups.value = []
          }
        })
        .catch(error => {
          groups.value = []
          console.log(error)
        })
    }
    watch(
      () => formData.value.student_id,
      value => {
        if (value) loadStudentGroups(value)
        else groups.value = []
      },
    )

    const payments = ref([])
    const loadPayments = (student_id, group_id) => {
      axios
        .get('/api/payments', { params: { itemsPerPage: -1, student_id, group_id } })
        .then(response => {
          if (response.data.success) {
            payments.value = response.data.data

            setPayment()
          } else {
            payments.value = []
          }
        })
        .catch(error => {
          payments.value = []
          console.log(error)
        })
    }
    watch([() => formData.value.student_id, () => formData.value.group_id], ({ 0: student_id, 1: group_id }) => {
      if (group_id && student_id) {
        loadPayments(student_id, group_id)
      } else {
        payments.value = []
      }
    })

    const payment = ref({})
    function setPayment() {
      payment.value = {}

      payments.value.forEach(item => {
        if (item.id == formData.value.payment_id) payment.value = item
        else if (
          parentFilter.value &&
          String(parentFilter.value.year) === String(item.year) &&
          String(parentFilter.value.month) === String(item.month)
        ) {
          payment.value = item
          formData.value.payment_id = item.id
        }
      })
    }

    watch(
      () => formData.value.payment_id,
      val => {
        if (val) {
          setPayment()
        } else payment.value = {}
      },
    )

    // Bonus

    watch(
      () => formData.value,
      value => {
        setTimeout(() => {
          // Bugungi sana
          const selectedDay = value.date.split('').splice(8, 9).join('') * 1
          // Joriy oy
          const selectedMonth = value.date.split('-')[1] * 1
          // Tanlangan oy id si
          const month_year = value.payment_id

          if (selectedDay <= 10) {
            payments.value.forEach(el => {
              if (month_year == el.id) {
                const monthForPayment = el.month * 1
                if (monthForPayment == selectedMonth) {
                  const day_is_true = () => {
                    // bonus.value = true

										//hozircha bonus kerak emas
										bonus.value = true
                  }
                  day_is_true()
                }
              }
            })
          }
        }, 800)
      },
    )

    watch(
      [payment, bonus],
      val => {
        calcAmount()
      },
      { deep: true },
    )

    const calcAmount = () => {
      if (formData.value.id) return

      if (payment.value.amount) {
        let amount = payment.value.amount

        //minus if bonus has
        if (bonus.value) {
          amount = amount * (1 - 0.1)
        }
        formData.value.amount = amount
      } else {
        formData.value.amount = null
      }
    }

    // on form submit
    const submitDisabled = ref(false)
    const onSubmit = () => {
      if (submitDisabled.value === true) return
      else submitDisabled.value = true

      if (!form.value.validate()) {
        console.log('form inputs not valid!')

        submitDisabled.value = false
        return
      }

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
            .finally(() => {
              submitDisabled.value = false
              emit('refresh-list')
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
              emit('refresh-list')
            })
        }
      }
    }

    // SubjectForm
    const subjectForm = ref(null)
    const addSubject = (id = null) => {
      subjectForm.value.open(id)
    }
    const addSubjectToOptions = row => {
      subjects.value = subjects.value.concat([row])
      formData.value.subject_id = row.id
    }
    // GroupForm
    const groupForm = ref(null)
    const addGroup = (id = null) => {
      groupForm.value.open(id)
    }
    const addGroupToOptions = row => {
      groups.value = groups.value.concat([row])
      formData.value.group_id = row.id
    }

    const months = [
      { id: 1, name: 'Yanvar' },
      { id: 2, name: 'Fevral' },
      { id: 3, name: 'Mart' },
      { id: 4, name: 'Aprel' },
      { id: 5, name: 'May' },
      { id: 6, name: 'Iyun' },
      { id: 7, name: 'Iyul' },
      { id: 8, name: 'Avgust' },
      { id: 9, name: 'Sentabr' },
      { id: 10, name: 'Oktabr' },
      { id: 11, name: 'Noyabr' },
      { id: 12, name: 'Dekabr' },
    ]

    return {
      form,
      picker,
      isDate,
      required,
      minLengthValidator,
      formData,
      selectRule,

      submitDisabled,

      students,
      subjects,
      groups,
      payments,
      payment,
      cashboxes,

      months,

      validate,
      show,
      onSubmit,
      open,
      close,

      datePicker,
      defaultDate,

      subjectForm,
      addSubject,
      addSubjectToOptions,
      groupForm,
      addGroup,
      addGroupToOptions,
      bonus,

      place_id: branch_id,
      branch_id,

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
