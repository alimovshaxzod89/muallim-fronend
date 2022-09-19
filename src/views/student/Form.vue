<template>
	<div>
		<b-modal
			id="modal-prevent-closing"
			ref="my-modal"
			size="lg"
			title="Talabadan to'lov olish"
			@ok="handleForm"
			ok-title="Tasdiqlash"
			cancel-title="Bekor qilish"
		>
			<form @submit="handleForm" @keydown.enter="handleForm">
				<div class="row">
					<div class="col-6 mb-1">
						<label>Kurs</label>
						<b-form-select v-model="subject_id" :options="options.subjects" value-field="id" text-field="name" />
					</div>
					<div class="col-6 mb-1">
						<label>Guruh</label>
						<b-form-select v-model="group_id" :options="options.groups" value-field="id" text-field="number" />
					</div>
					<div class="col-6 mb-1">
						<label>Talaba</label>
						<b-form-select v-model="student_id" :options="options.students" value-field="id" text-field="full_name" />
					</div>
					<div class="col-6 mb-1">
						<label>Oy/Yil</label>
						<b-form-select v-model="payment_id" :options="options.monthsYears" value-field="id" text-field="value" />
					</div>
					<div class="col-6 mb-1">
						<b-form-group label-for="sum-input" label="Summa">
							<b-form-input id="sum-input" v-model="sum" placeholder="Summa" required />
						</b-form-group>
					</div>
					<div class="col-6 form-date-button-pos form-date-button">
						<label for="example-datepicker">Sa'na</label>
						<input type="date" v-model="date" class="form-control" />
						<button class="clear-date" @click="clearDate('date')" v-if="date">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
				</div>
			</form>
		</b-modal>
	</div>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import { BFormGroup, BFormInput, BFormSelect, BModal, BFormDatepicker } from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

require('moment/locale/uz-latn')

export default {
  name: 'StudentPayment',
  components: {
    BFormSelect,
    BFormGroup,
    BFormInput,
    BModal,
    BFormDatepicker,
  },
  data() {
    return {
      paid_id: null,
      subject_id: null,
      group_id: null,
      student_id: null,
      year: null,
      month: null,
      payment_id: null,
      payments: [],
      sum: null,
      date: null,
      options: {
        groups: [],
        subjects: [],
        students: [],
        monthsYears: [],
        years: [
          { value: null, text: 'Yil' },
          { value: '2020', text: '2020' },
          { value: '2021', text: '2021' },
          { value: '2022', text: '2022' },
        ],
        months: (function () {
          const arr = [{ value: null, text: 'Oy' }]
          for (let i = 1; i <= 12; i++) {
            arr.push({ value: i, text: moment(`2000-${i}-01`).format('MMMM') })
          }
          return arr
        })(),
      },
    }
  },
  watch: {
    subject_id() {
      this.loadGroups()
    },
    group_id() {
      this.loadStudents()
    },
    student_id() {
      this.loadPayments()
    },
    payment_id() {
      // todo fix on change modal payment_id refresh parent month/year
      // this.$parent.filters.payment_id = this.payment_id
    },
    sum() {
      console.log(this.sum)
    },
  },
  created() {
    const $this = this
    axios.get('subjects').then(response => {
      $this.options.subjects = response.data.data
    })

    this.loadGroups()
  },
  methods: {
    clearDate(input) {
      this[input] = null
    },
    open(attr = {}) {
      // this.resetForm()

      this.$refs['my-modal'].show()

      if (attr) {
        if (attr.payment_id) {
        } else {
        }
        this.group_id = attr.group_id
        this.subject_id = attr.subject_id
        this.student_id = attr.student_id
        this.year = attr.year
        this.month = attr.month
        this.payment_id = attr.payment_id
        this.paid_id = attr.paid_id
        this.date = attr.date
        this.sum = attr.amount
      }
    },
    handleForm(e) {
      e.preventDefault()
      const params = {
        payment_id: this.payment_id,
        date: this.date,
        amount: parseInt(this.sum),
      }
      if (this.paid_id) {
        this.updatePaid(params)
      } else {
        this.storePaid(params)
      }
    },
    storePaid(params) {
      axios.post('payment-paids', params).then(res => {
        if (res.data.success) {
          this.$refs['my-modal'].hide()
          this.$parent.loadPaids()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              icon: 'BellIcon',
              text: 'Успешно',
              variant: 'success',
            },
          })
        }
      })
    },
    updatePaid(params) {
      axios.put(`payment-paids/${this.paid_id}`, params).then(res => {
        if (res.data.success) {
          this.$refs['my-modal'].hide()
          this.$parent.loadPaids()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              icon: 'BellIcon',
              text: 'Успешно',
              variant: 'success',
            },
          })
        }
      })
    },
    resetForm() {
      this.student_id = null
      this.group_id = null
      this.subject_id = null
      this.payment_id = null
      this.year = null
      this.month = null

      this.sum = null
      this.date = null

      this.options.groups = []
      this.options.students = []
      this.options.monthsYears = []
    },
    loadGroups() {
      const params = {}

      if (this.subject_id) params.subject_id = this.subject_id

      console.log(params)

      axios.get('groups', { params }).then(response => {
        this.options.groups = response.data.data
      })
    },
    loadStudents() {
      const $this = this
      const params = {}
      if (this.group_id) params.group_id = this.group_id
      axios.get('students', { params }).then(response => {
        $this.options.students = response.data.data
      })
    },
    loadPayments() {
      const params = {}
      if (this.subject_id) params.subject_id = this.subject_id
      if (this.group_id) params.group_id = this.group_id
      if (this.student_id) params.student_id = this.student_id

      // if (this.sElectedYear) params.year = this.sElectedYear
      // if (this.sElectedMonth) params.month = this.sElectedMonth

      axios.get('payments', { params }).then(response => {
        if (response.data.success) {
          this.payments = response.data.data

          this.options.monthsYears = []

          this.payments.forEach((item, i) => {
            const date = new Date(item.date)
            const year = date.getFullYear()
            const month = date.getMonth() + 1

            if (this.payment_id && this.payment_id == item.id) {
              if (!this.sum) {
                this.sum = item.amount
              }
            } else {
              // year, month mosini tanlash

              if (this.selectedYear == year && this.selectedMonth == month) {
                this.payment_id = item.id
              }
            }

            const payment = {
              id: item.id,
              value: `${moment(`${year}-${month}-01`).format('MMMM')}-${year}`,
            }

            // todo closed ni hisobga olish
            // if (item.closed && item.paid !== 0) payment.disabled = true
            this.options.monthsYears.push(payment)
          })
        }
      })
    },
  },
}
</script>
