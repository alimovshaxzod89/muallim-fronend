<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Sa'na</span>
						<button class="clear-date" @click="clearDate('week_day')" v-if="filters.week_day">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="date" class="form-control form-control-sm" v-model="filters.week_day" @input="loadPaids()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>soat</span>
						<button class="clear-date" @click="clearDate('time')" v-if="filters.time">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<MaskedInput type="text" mask="##:##" class="form-control form-control-sm" v-model="filters.time" @input="loadPaids()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>fan</span>
						<button class="clear-date" @click="clearDate('subject_id')" v-if="filters.subject_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.subject_id"
						:options="options.subjects"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="
							loadPaids()
							loadTeachers()
						"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>ustoz</span>
						<button class="clear-date" @click="clearDate('teacher_id')" v-if="filters.teacher_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.teacher_id"
						:options="options.teachers"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="
							loadPaids()
							loadTeachers()
						"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>guruh</span>
						<button class="clear-date" @click="clearDate('group_id')" v-if="filters.group_id">
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
						@input="loadPaids()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>fio</span>
						<button class="clear-date" @click="clearDate('student_name')" v-if="filters.student_name">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="text" class="form-control form-control-sm" v-model="filters.student_name" @input="loadPaids()" />
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
						<BPagination v-model="page" :total-rows="totalPages" :per-page="limit" first-number last-number />
					</div>
				</div>
			</div>
		</div>

		<b-card>
			<b-table responsive :items="paids" :fields="fields">
				<template #cell(index)="data">{{ data.index + 1 }}</template>
			</b-table>
		</b-card>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import MaskedInput from 'vue-masked-input'
import { BTable, BFormSelect, BCard, BButton, BFormDatepicker, BFormTimepicker, BPagination } from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import 'vue-multiselect/dist/vue-multiselect.min.css'
require('moment/locale/uz-latn')

export default {
	name: 'Debt',
	components: {
		BCard,
		BTable,
		BButton,
		BFormSelect,
		BFormDatepicker,
		BFormTimepicker,
		BPagination,
		Multiselect,
		MaskedInput
	},
	data() {
		return {
			options: {
				subjects: [],
				groups: [],
				students: [],
				teachers: []
			},
			filters: {
				week_day: null,
				group: {},
				time: null,
				group_id: null,
				student_id: null,
				subject_id: null,
				student_name: null
			},
			paids: [],
			fields: [
				{ key: 'index', label: '#' },
				{ key: 'group.number', label: 'Guruh', sortable: true },
				{ key: 'group.teacher.full_name', label: 'Ustoz', sortable: true },
				{ key: 'student.first_name', label: 'Talaba', sortable: true, formatter: 'fullName' },
				{ key: 'student.phone', label: 'Telefon', sortable: true },
				{
					key: 'amount',
					label: "Oylik to'lov",
					sortable: true,
					tdClass: 'text-right nowrap',
					formatter: 'formatNumber'
				},
				{ key: 'paid', label: "To'ladi", sortable: true, tdClass: 'text-right nowrap', formatter: 'formatNumber' },
				{
					key: 'debt',
					label: 'Qarz',
					formatter: (value, key, item) => this.formatNumber(item.amount - item.paid),
					sortable: true,
					sortByFormatted: true,
					tdClass: 'text-right nowrap'
				},
				{ key: 'date', label: 'Oy', sortable: true, tdClass: 'text-center', formatter: 'formatDate' }
			],
			page: 1,
			totalPages: null,
			limit: 10
		}
	},
	watch: {
		// ['filters.group_id']() {
		// 	this.loadPaids()
		// },
		// ['filters.teacher_id']() {
		// 	this.loadPaids()
		// 	this.loadGroups()
		// },
		// ['filters.student_id']() {
		// 	this.loadPaids()
		// },
		// ['filters.subject_id']() {
		// 	console.log('dsen')
		// 	this.loadPaids()
		// 	this.loadTeachers()
		// },
		// ['filters.student_name']() {
		// 	this.loadPaids()
		// },
		// ['filters.time']() {
		// 	this.loadPaids()
		// },
		// ['filters.week_day']() {
		// 	this.loadPaids()
		// },
		['page']() {
			this.loadPaids((this.page - 1) * this.limit)
		},
		limit() {
			this.loadPaids()
		},
		['filters.teacher_id']() {
			this.filters.group_id = null
			this.loadGroups()
			this.loadPaids()
		}
		// 'filters.time': function (){
		// 	if (this.filters.time) {
		// 		this.timeTesting('time')
		// 	}
		// }
	},
	created() {
		this.loadGroups()
		this.loadStudents()
		this.loadSubjects()
		this.loadTeachers()
	},
	methods: {
		clearDate(input) {
			if (this.filters[input] === 'year') {
				this.filters[input] = moment().format('YYYY')
				this.loadPaids()
			} else if (this.filters[input] === 'month') {
				this.filters[input] = moment().format('M')
				this.loadPaids()
			} else {
				this.filters[input] = null
				this.loadPaids()
				this.loadGroups()
			}
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
			const params = { only_debt: 1 }

			params.limit = this.limit
			params.skip = skip

			if (this.filters.time) params.time = this.filters.time

			if (this.filters.group_id) params.group_id = this.filters.group_id.id

			if (this.filters.subject_id) params.subject_id = this.filters.subject_id.id

			if (this.filters.teacher_id) params.teacher_id = this.filters.teacher_id.id

			if (this.filters.week_day) params.week_day = this.filters.week_day

			if (this.filters.student_name) params.student_name = this.filters.student_name

			if (
				this.filters.week_day ||
				this.filters.group_id ||
				this.filters.student_name ||
				this.filters.student_id ||
				this.filters.teacher_id ||
				this.filters.subject_id
			) {
				const $this = this

				axios.get('/api/payments', { params }).then(response => {
					$this.paids = response.data.data
					$this.totalPages = response.data.total
				})
			} else {
				this.paids = []
			}
		},
		loadStudents() {
			const $this = this
			const params = {}
			if (this.filters.group_id) params.group_id = this.filters.group_id
			axios.get('/api/students', { params }).then(response => {
				$this.options.students = response.data.data
			})
		},
		loadTeachers() {
			const $this = this
			const params = {}
			if (this.filters.subject_id) params.subject_id = this.filters.subject_id
			axios.get('/api/teachers', { params }).then(response => {
				$this.options.teachers = response.data.data
			})
		},
		loadGroups() {
			const params = {}

			if (this.filters.subject_id) params.subject_id = this.filters.subject_id.id

			if (this.filters.teacher_id) params.teacher_id = this.filters.teacher_id.id

			axios.get('/api/groups', { params }).then(response => {
				if (response.data.success) {
					this.options.groups = response.data.data
				}
			})
		},
		loadSubjects() {
			axios.get('/api/subjects').then(response => {
				this.options.subjects = response.data.data
			})
		},
		timeTesting(type) {
			if (this.filters[type].length > 4) {
				const firstTime = this.filters[type].slice(0, 2)
				const secondTime = this.filters[type].slice(3, 5)
				if (firstTime > 23 || secondTime > 59) {
					this.filters[type] = '0000'
				}
			}
		}
	}
}
</script>
