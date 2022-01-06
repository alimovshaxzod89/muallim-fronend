<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Guruh</span>
						<button class="clear-date" @click="clearDate('group_id')" v-if="this.filters.group_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.group_id"
						:options="options.groups"
						placeholder="Tanlash"
						label="number"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="groupFilter()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Talaba</span>
						<button class="clear-date" @click="clearDate('student_id')" v-if="this.filters.student_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.student_id"
						:options="options.students"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Yil</span>
						<button class="clear-date" @click="clearDate('year')" v-if="this.filters.year">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.year"
						:options="options.yearOptions"
						placeholder="Tanlash"
						label="text"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Oy</span>
						<button class="clear-date" @click="clearDate('month')" v-if="this.filters.month">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>

					</div>
					<multiselect
						class="table-select"
						v-model="filters.month"
						:options="options.monthOptions"
						placeholder="Tanlash"
						label="text"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Kalendar</span>
					</div>
					<button style="width: 60px; margin-right: 4px" class="btn btn-sm btn-outline-primary"
							<date-picker v-model="time3" range></date-picker>
					</button>
					 <div>
  </div>
				</div>
				<div class="bottom-menu">
					<div class="page-mode">
						<select class="form-control-sm form-control" v-model="limit">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="-1">Barchasi</option>
						</select>
					</div>
					<div class="pagination" v-if="limit != -1">
						<BPagination v-model="page" :total-rows="totalPages" :per-page="limit" first-number last-number/>
					</div>
				</div>
			</div>
		</div>

		<b-card>
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">TALABALAR TO'LAGAN PULLAR</div>
				<div>
				<b-button class="btn-sm" cancel-title="Bekor qilish" ok-title="Tasdiqlash" variant="primary"
							 @click="createForm()"
				>Qo'shish
				</b-button>
				<b-button
				class="exportXlsx btn-sm"
				ok-title="Tasdiqlash"
				variant="success"
				@click="ExportExcel"

				>Jadvalni yuklab olish
				</b-button
				></div>
			</div>
			<b-table
			striped
			bordered
			hover
			responsive
			text-center
			:items="paids"
			:fields="fields">
				<!-- A virtual column -->
				<template #cell(index)="data">
					{{ data.index + 1 }}
				</template>
				<template #cell(payment)="data">
					{{ data.value.group.number + ' [' + formatMonth(data.value.date) + ']' }}
				</template>

				<template #cell(action)="data">
					<div class="btn-group btn-group-sm">
						<button style="width: 60px; margin-right: 4px" class="btn btn-sm btn-outline-primary"
								  @click="editPayment(data)">
							<feather-icon icon="EditIcon"/>
						</button>
						<button style="width: 60px; margin-right: 4px" class="btn btn-sm btn-outline-danger"
								  @click="removePayment(data)">
							<feather-icon icon="TrashIcon"/>
						</button>

						<button style="width: 60px; margin-right: 4px" class="btn btn-sm btn-outline-info"
								  @click="printCheck(data)">
							<feather-icon icon="PrinterIcon"/>
						</button>
					</div>
				</template>
			</b-table>

			<StudentPayment ref="form"/>
		</b-card>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import XLSX from 'xlsx'
import { BTable, BFormSelect, BCard, BTr, BTh, BButton, BPagination } from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import StudentPayment from './Form'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

require('moment/locale/uz-latn')
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
  name: 'Studentpay',
  components: {
    BTable,
    BFormSelect,
    BCard,
    BButton,
    StudentPayment,
    BPagination,
    Multiselect,
    DatePicker,
    BTr,
    BTh,
  },
  data() {
    return {
      time1: null,
      time2: null,
      time3: null,
      name: '',
      nameState: null,
      dateState: null,
      submittedNames: [],
      // month: moment().format('M'),
      options: {
        yearOptions: [
          // { value: '', text: '' },
          { value: '2020', text: '2020' },
          { value: '2021', text: '2021' },
          { value: '2022', text: '2022' },
        ],
        monthOptions: (function () {
          const arr = [{ value: '', text: '' }]
          for (let i = 1; i <= 12; i++) {
            arr.push({ value: i, text: moment(`2000-${i}-01`).format('MMMM') })
          }
          return arr
        })(),
        subjects: [],
        groups: [],
        students: [],
      },
      filters: {
        year: moment().format('Y'),
        month: 3,
        group: {},
        group_id: null,
        student_id: null,
        subject_id: null,
        student_name: '',
        payment_id: null,
      },
      paids: [],
      fields: [
        { key: 'index', label: '#' },
        { key: 'payment.group.number', label: 'Guruh', sortable: true },
        {
          key: 'payment.date',
          label: "To'lov oyi",
          sortable: true,
          tdClass: 'text-center',
          formatter: 'formatMonth',
        },
        // {
        //   key: 'payment', label: 'Guruh / Oy', sortable: true,
        // },
        { key: 'payment.student.full_name', label: 'Talaba', sortable: true },
        {
          key: 'amount',
          label: "To'ladi",
          sortable: true,
          tdClass: 'text-right nowrap',
          formatter: 'formatNumber',
        },
        {
          key: 'date',
          label: 'Sana',
          sortable: true,
          tdClass: 'nowrap',
          formatter: 'formatDate',
        },
        {
          key: 'action',
          label: 'action',
        },
      ],
      items: [],
      page: 1,
      totalPages: null,
      limit: 10,
      notLoadPaids: false,
    }
  },
  created() {
    this.loadFromQuery()
    this.loadGroups()
    this.loadStudents()
    this.loadSubjects()
  },
  methods: {
    clearDate(input) {
      this.filters[input] = [input] !== 'year' ? null : moment().format('Y')
    },
    groupFilter() {
      this.filters.group = this.filters.group_id
    },
    removePayment(data) {
      const paymentId = data.item.id
      axios
        .delete(`payment-paids/${paymentId}`)
        .then(res => {
          if (res.data.success) {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Notification',
                icon: 'BellIcon',
                text: 'Успешно',
                variant: 'success',
              },
            })
            this.loadPaids()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    printCheck(data) {
      var myWindow = window.open(
        '/print/' + data.item.id,
        'MsgWindow',
        'toolbar=no,status=no,menubar=no,width=600,height=600',
      )
      //myWindow.document.write("<p>This is 'MsgWindow'. I am 200px wide and 100px tall!</p>");
    },
    editPayment(data) {
      const params = {
        subject_id: data.item.payment.group.subject_id,
        student_id: data.item.payment.student_id,
        group_id: data.item.payment.group_id,
      }
      params.month = new Date(data.item.date).getMonth() + 1
      params.year = new Date(data.item.date).getFullYear()
      params.payment_id = data.item.payment_id
      params.date = data.item.date
      params.amount = data.item.amount
      params.paid_id = data.item.id
      this.$refs.form.open(params)
    },
    createForm() {
      this.$refs.form.open({
        subject_id: this.filters.subject_id ? this.filters.subject_id.id : null,
        student_id: this.filters.student_id ? this.filters.student_id.id : null,
        group_id: this.filters.group_id ? this.filters.group_id.id : null,
        month: this.filters.month.value,
        year: this.filters.year.value,
        payment_id: this.filters.payment_id,
      })
    },
    ExportExcel(type, fn, dl) {
      let items = document.querySelectorAll('.sr-only')
      items.forEach(item => {
        item.innerHTML = ''
      })

      let elt = this.$refs.excel.$el.children[0]
      let wb = XLSX.utils.table_to_book(elt, { sheet: 'Sheet JS' })
      return dl
        ? XLSX.write(wb, {
            bookType: type,
            bookSST: true,
            type: 'base64',
          })
        : XLSX.writeFile(wb, fn || 'Jadval.' + 'xlsx')
    },
    formatNumber(value) {
      return this.$options.filters.formatNumber(value)
    },
    formatMonth(value) {
      return moment(value).format('MMM YY')
    },
    formatDate(value) {
      return moment(value).format('D MMM Y')
    },
    loadPaids(skip = 0) {
      if (this.notLoadPaids) return false

      const params = {}

      params.limit = this.limit
      params.skip = skip

      if (this.filters.payment_id) params.payment_id = this.filters.payment_id

      if (this.filters.group_id) params.group_id = this.filters.group_id.id

      if (this.filters.subject_id) params.subject_id = this.filters.subject_id.id

      if (this.filters.student_id) params.student_id = this.filters.student_id.id

      if (this.filters.year.value) params.year = this.filters.year.value

      if (this.filters.month.value) params.month = this.filters.month.value

      if (this.filters.student_name) params.student_name = this.filters.student_name

      // if (this.phone) params.phone = this.phone

      if (this.filters.group_id || this.filters.student_name || this.filters.student_id) {
        const $this = this

        console.log(params)

        axios.get('payment-paids', { params }).then(response => {
          $this.paids = response.data.data
          $this.totalPages = response.data.total
        })
      } else {
        this.paids = []
      }

      if (this.$parent.$parent.$parent.$options.name === 'Payment') this.$parent.$parent.$parent.loadPayments()
    },
    loadStudents() {
      const $this = this
      const params = {}

      if (this.filters.group_id) params.group_id = this.filters.group_id

      axios.get('students', { params }).then(response => {
        $this.options.students = response.data.data
      })
    },
    loadFromQuery() {
      const { group_id, student_id, subject_id, payment_id, year, month } = this.$route.query

      if (payment_id) {
        this.notLoadPaids = false
        this.filters.payment_id = payment_id ?? null
        this.notLoadPaids = true

        let payment
        axios.get('payments/' + payment_id).then(res => {
          payment = res.data.data

          const month = moment(payment.date).format('M')
          const monthLabel = moment(payment.date).format('MMMM')
          const year = moment(payment.date).format('Y')

          this.filters.month = { text: monthLabel, value: month }
          this.filters.year = { text: year, value: year }

          if (payment.group_id) {
            axios.get('groups/' + payment.group_id).then(res => {
              this.filters.group_id = { id: res.data.data.id, number: res.data.data.number }
            })
          }
        })
      } else {
        this.notLoadPaids = false

        this.filters.group_id = group_id ?? null

        // this.filters.month = month ?? null
        // this.filters.year = year ?? null
      }

      if (student_id) {
        axios.get('students/' + student_id).then(res => {
          this.filters.student_id = { id: student_id, full_name: res.data.data.full_name }
        })
      }

      if (subject_id) {
        axios.get('subjects/' + subject_id).then(res => {
          this.filters.subject_id = { id: subject_id, name: res.data.data.name }
        })
      }

      this.notLoadPaids = false
    },
    loadGroups() {
      axios.get('groups').then(response => {
        this.options.groups = response.data.data
      })
    },
    loadSubjects() {
      axios.get('subjects').then(response => {
        this.options.subjects = response.data.data
      })
    },
  },
  watch: {
    'filters.year': function () {
      this.loadPaids()
    },
    'filters.month': function () {
      this.loadPaids()
    },
    'filters.payment_id': function () {
      this.loadPaids()
    },
    'filters.group_id': function () {
      this.loadPaids()
    },
    'filters.student_id': function () {
      this.loadPaids()
    },
    'filters.subject_id': function () {
      this.loadPaids()
    },
    'filters.student_name': function () {
      this.loadPaids()
    },
    ['page']() {
      this.loadPaids((this.page - 1) * this.limit)
    },
    limit() {
      this.loadPaids()
    },
  },
}
</script>
