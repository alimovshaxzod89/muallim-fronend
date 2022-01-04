<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>FANLAR</span>
						<button class="clear-date" @click="clearDate('subject_id')" v-if="subject_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="subject_id"
						:options="subjects"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustozlar</span>
						<button class="clear-date" @click="clearDate('teacher_id')" v-if="teacher_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="teacher_id"
						:options="teachers"
						placeholder="Tanlash"
						label="first_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Yil</span>
						<button class="clear-date" @click="clearDate('year')" v-if="year">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="year"
						:options="yearOptions"
						placeholder="Tanlash"
						label="value"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Oy</span>
						<button class="clear-date" @click="clearDate('month')" v-if="month">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="month"
						:options="monthOptions"
						placeholder="Tanlash"
						label="text"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Guruh</span>
						<button class="clear-date" @click="clearDate('group_id')" v-if="group_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="group_id"
						:options="groups"
						placeholder="Tanlash"
						label="number"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>FIO</span>
						<button class="clear-date" @click="clearDate('student_name')" v-if="student_name">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="text" class="form-control form-control-sm" v-model="student_name" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Telefon</span>
						<button class="clear-date" @click="clearDate('phone')" v-if="phone">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="phone" class="form-control form-control-sm" v-model="phone" />
				</div>
				<div class="bottom-menu" v-if="payments">
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

		<b-card :title="title">
			<div class="xlsx-body" v-if="payments.length > 0">
				<button class="exportXlsx btn btn-success" @click="ExportExcel">Xlsx formatda yuklab olish</button>
			</div>
			<b-table
				ref="excel"
				striped
				hover
				responsive
				:sticky-header="stickyHeader"
				style="min-height: calc(100vh - 250px)"
				:items="payments"
				:fields="fields"
				:filter="student_name"
				:filter-function="filterTable"
			>
				<!-- A virtual column -->
				<template #cell(index)="data">
					{{ data.index + 1 }}
				</template>
				<template #cell(amount)="data">
					<div class="input-block">
						<input
							id="editable_input"
							ref="focusInput"
							type="number"
							class="editable_input"
							:value="data.item.amount"
							@keypress.enter="updateAmount(data.item, $event, true)"
							@blur="updateAmount(data.item, $event)"
						/>
						<label for="editable_input"></label>
						<button
							style="width: 60px; margin-right: 10px"
							class="btn btn-sm btn-outline-primary focusInputButton"
							@click="inputFocus"
						>
							<feather-icon icon="EditIcon" />
						</button>
					</div>
				</template>
				<template #cell(amount2)="data">
					<!-- `data.value` is the value after formatted by the Formatter -->
					{{ data.item.amount | formatNumber }}
				</template>
				<template #cell(student)="data">
					<!-- `data.value` is the value after formatted by the Formatter -->
					{{ data.value }}
				</template>
				<template #cell(paid)="data">
					<!-- `data.value` is the value after formatted by the Formatter -->
					<button
						class="btn btn-sm btn-outline-success"
						data-toggle="tooltip"
						style="display: block; min-width: 82px"
						title="To'lov amalga oshirish uchun bosing"
						@click="openPaids(data)"
					>
						{{ data.value | formatNumber }}
					</button>
				</template>
				<template #custom-foot="">
					<b-tr>
						<b-th colspan="5" class="text-right nowrap">
							Jami:
						</b-th>
						<b-th colspan="1" class="text-right nowrap">
							{{ totalAmount | formatNumber }}
						</b-th>
						<b-th colspan="1" class="text-right nowrap">
							{{ totalPaid | formatNumber }}
						</b-th>
						<b-th colspan="1" class="text-right nowrap">
							{{ totalDebt | formatNumber }}
						</b-th>
						<b-th />
					</b-tr>
				</template>
			</b-table>

			<b-modal v-model="modalShow" size="xl" title="To'langan pullar" cancel-title="Bekor qilish" ok-title="Tasdiqlash">
				<PaymentPaids ref="paymentPaids" />
			</b-modal>
		</b-card>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import XLSX from 'xlsx'
import { BCard, BButton, BTable, BTr, BTh, BFormSelect, BRow, BCol, BModal, BPagination } from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import PaymentPaids from './../student/Paids'
require('moment/locale/uz-latn')
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	name: 'Payment',
	components: {
		BCard,
		BButton,
		BTable,
		BTr,
		BTh,
		BFormSelect,
		BRow,
		BCol,
		PaymentPaids,
		BModal,
		BPagination,
		Multiselect
	},
	data() {
		return {
			groups: [],
			subjects: [],
			teachers: [],
			group_id: null,
			stickyHeader: false,
			subject: [],
			teacher: [],
			subject_id: null,
			teacher_id: null,
			year: moment().format('Y'),
			month: moment().format('M'),
			group: [],
			// month: 6,
			yearOptions: [
				// { value: '', text: '' },
				{ value: '2020', text: '2020' },
				{ value: '2021', text: '2021' },
				{ value: '2022', text: '2022' }
			],
			monthOptions: [
				{
					value: '1',
					text: 'Yanvar',
					id: 1
				},
				{
					value: '2',
					text: 'Fevral',
					id: 2
				},
				{
					value: '3',
					text: 'Mart',
					id: 3
				},
				{
					value: '4',
					text: 'Aprel',
					id: 4
				},
				{
					value: '5',
					text: 'May',
					id: 5
				},
				{
					value: '6',
					text: 'Iyun',
					id: 6
				},
				{
					value: '7',
					text: 'Iyul',
					id: 7
				},
				{
					value: '8',
					text: 'Avgust',
					id: 8
				},
				{
					value: '9',
					text: 'Sentabr',
					id: 9
				},
				{
					value: '10',
					text: 'Oktabr',
					id: 10
				},
				{
					value: '11',
					text: 'Noyabr',
					id: 11
				},
				{
					value: '12',
					text: 'Dekabr',
					id: 12
				}
			],
			modalShow: false,
			student_name: '',
			phone: '',
			payments: [],
			fields: [
				{ key: 'index', label: '#' },
				{
					key: 'group.number',
					label: 'Guruh',
					sortable: true
				},
				{
					key: 'group.teacher.full_name',
					label: 'Ustoz',
					sortable: true
				},
				{
					key: 'student',
					label: 'Talaba',
					sortable: true,
					formatter: 'fullName'
				},
				{ key: 'student.phone', label: 'Telefon', sortable: true },
				{
					key: 'amount',
					label: "Oylik to'lov",
					sortable: true,
					tdClass: 'text-right nowrap',
					formatter: 'formatNumber'
				},
				{
					key: 'paid',
					label: "To'ladi",
					sortable: true,
					tdClass: 'text-right nowrap',
					formatter: 'formatNumber'
				},
				{
					key: 'debt',
					label: 'Qarz',
					formatter: (value, key, item) => this.formatNumber(item.amount - item.paid),
					sortable: true,
					sortByFormatted: true,
					tdClass: 'text-right nowrap'
				},
				{
					key: 'date',
					label: 'Oy',
					sortable: true,
					tdClass: 'text-center',
					formatter: 'formatDate'
				}
			],
			summaryFields: [{ key: 'a1', value: 'q12e' }],
			page: 1,
			totalPages: null,
			limit: 10,
			titles: null
		}
	},
	computed: {
		title() {
			const string = `
				${this.subject_id ? this.subject_id.name : ''}
				${this.subject_id ? '/' : ''}
				${this.teacher_id ? this.teacher_id.first_name : ''}
				${this.teacher_id ? '/' : ''}
				${this.group_id ? this.group_id.number : ''}
				${this.group_id ? '/' : ''}
			`
			return string
		},
		totalAmount() {
			return this.payments.reduce((a, c) => a + c.amount, 0)
		},
		totalPaid() {
			return this.payments.reduce((a, c) => a + c.paid, 0)
		},
		totalDebt() {
			return this.totalAmount - this.totalPaid
		}
	},
	watch: {
		subject_id(value) {
			if (!this.$route.query.subject_id || this.$route.query.subject_id !== value) {
				this.$router.push({
					query: {
						...this.$route.query,
						subject_id: value.id
					}
				})
			}
			this.loadGroups()
		},
		teacher_id(value) {
			if (!this.$route.query.teacher_id || this.$route.query.teacher_id !== value) {
				this.$router.push({
					query: {
						...this.$route.query,
						teacher_id: value ? value.id : ''
					}
				})
				this.loadGroups()
				this.loadPayments()
			}
		},
		group_id(value) {
			if (!this.$route.query.group_id || this.$route.query.group_id !== value) {
				this.$router.push({
					query: {
						...this.$route.query,
						group_id: value ? value.id : ''
					}
				})
			}
			this.loadPayments()
		},
		year(value) {
			if (!this.$route.query.year || this.$route.query.year !== value.value) {
				this.$router.push({
					query: {
						...this.$route.query,
						year: value ? value.value : ''
					}
				})
				this.loadPayments()
			}
		},
		month(value) {
			let query = {
				...this.$route.query
			}

			if (value != null && value.value) {
				// if (!this.$route.query.month || this.$route.query.month !== value.value) {
				query.month = value.value
				this.loadPayments()
				// }
			} else {
				if (query.hasOwnProperty('month')) {
					delete query.month
				}
			}

			this.$router.replace({
				query: query
			})
		},
		student_name(value) {
			if (!this.$route.query.student_name || this.$route.query.student_name !== value) {
				this.$router.push({
					query: {
						...this.$route.query,
						student_name: value
					}
				})
				this.loadPayments()
			}
		},
		phone(value) {
			if (!this.$route.query.phone || this.$route.query.phone !== value) {
				this.$router.push({
					query: {
						...this.$route.query,
						phone: value
					}
				})
				this.loadPayments()
			}
		},
		['page']() {
			this.loadPayments((this.page - 1) * this.limit)
		},
		limit() {
			this.loadPayments()
		}
	},
	created() {
		const $this = this
		axios.get('/api/teachers').then(response => {
			$this.teachers = response.data.data
		})
		axios.get('/api/subjects').then(response => {
			$this.subjects = response.data.data
		})
		axios.get('/api/groups').then(response => {
			$this.groups = response.data.data
		})
		this.init()
		// axios.get('/api/payments').then(response => {
		// 	if (response.data.success) {
		// 		response.data.data.forEach(item => {
		// 			let date = new Date(item.date)
		// 			this.payments.push({
		// 				id: item.id,
		// 				name: date.getMonth()
		// 			})
		// 		})
		// 	}
		// })
	},
	methods: {
		init() {
			if (this.year && !this.$route.query.year) {
				this.$router.push({
					query: {
						...this.$route.query,
						year: this.year
					}
				})
			}
			if (this.month && !this.$route.query.month) {
				this.$router.push({
					query: {
						...this.$route.query,
						month: this.month
					}
				})
			}
			if (this.$route.query.subject_id) {
				axios.get(`/api/subjects/${this.$route.query.subject_id}`).then(response => {
					if (response.status === 200) {
						this.subject_id = response.data.data
						// this.loadPayments()
					}
				})
			}
			if (this.$route.query.teacher_id) {
				axios.get(`/api/teachers/${this.$route.query.teacher_id}`).then(response => {
					if (response.status === 200) {
						this.teacher_id = response.data.data
						// this.loadPayments()
					}
				})
			}
			if (this.$route.query.month) {
				this.month = this.monthOptions[this.$route.query.month - 1]
			}
			if (this.$route.query.year) {
				const years = this.yearOptions
				for (let i = 0; i < years.length; i++) {
					if (years[i].value === this.$route.query.year) {
						this.year = this.yearOptions[i]
					}
				}
			}
			if (this.$route.query.group_id) {
				axios.get(`/api/groups/${this.$route.query.group_id}`).then(response => {
					if (response.status === 200) {
						this.group_id = response.data.data
					}
				})
			}
			if (this.$route.query.student_name) {
				this.student_name = this.$route.query.student_name
			}
			if (this.$route.query.phone) {
				this.phone = this.$route.query.phone
			}
			// this.loadPayments()
		},
		inputFocus(e) {
			e.target.parentElement.childNodes[0].focus()
		},
		clearDate(input) {
			if (this[input] === 'year') {
				this[input] = moment().format('Y')
				this.loadPayments()
			} else if (this[input] === 'month') {
				this[input] = moment().format('M')
				this.loadPayments()
			} else {
				this[input] = null
				this.loadPayments()
			}
		},
		updateAmount({ id, date, group_id, student_id, amount }, event, entered = false) {
			if (amount === parseInt(event.target.value)) return

			axios
				.put(`/api/payments/${id}`, {
					amount: event.target.value,
					date,
					group_id,
					student_id
				})
				.then(response => {
					if (response.status === 200) {
						if (!entered) {
							this.$toast({
								component: ToastificationContent,
								props: {
									title: 'Xabar',
									icon: 'BellIcon',
									text: 'Muvaffaqiyatli',
									variant: 'success'
								}
							})
						} else {
							event.target.blur()
						}
					}
				})
		},
		fullName(value) {
			return [value.first_name, value.last_name, value.middle_name].filter(item => item !== null).join(' ')
		},
		formatNumber(value) {
			return this.$options.filters.formatNumber(value)
		},
		formatDate(value) {
			return moment(value).format('MMMM Y')
		},
		filterTable(row, filter) {
			return true

			// const f = typeof row.student.first_name === 'string' ? row.student.first_name.toLowerCase() : ''
			// const l = typeof row.student.last_name === 'string' ? row.student.last_name.toLowerCase() : ''
			// const m = typeof row.student.middle_name === 'string' ? row.student.middle_name.toLowerCase() : ''
			//
			// return f.indexOf(filter.toLowerCase()) !== -1 || l.indexOf(filter.toLowerCase()) !== -1 || m.indexOf(filter.toLowerCase()) !== -1
		},
		loadGroups() {
			const params = {}

			if (this.subject_id) params.subject_id = this.subject_id.id

			if (this.teacher_id) params.teacher_id = this.teacher_id.id

			const $this = this

			axios.get('/api/groups', { params }).then(response => {
				$this.groups = response.data.data
			})
		},
		loadPayments(skip = 0) {
			const params = {}

			params.limit = this.limit
			params.skip = skip

			if (this.group_id) params.group_id = this.group_id.id

			if (this.year) params.year = this.year.value

			if (this.month) params.month = this.month.id

			if (this.teacher_id) params.teacher_id = this.teacher_id.id

			if (this.student_name) params.student_name = this.student_name

			if (this.phone) params.phone = this.phone

			if ((this.year && this.month) || this.group_id || this.student_name) {
				const $this = this

				axios.get('/api/payments', { params }).then(response => {
					$this.payments = response.data.data
					$this.totalPages = response.data.total
				})
			} else {
				this.payments = []
			}
		},
		openPaids(data) {
			const query = {}
			if (data.item.id) query.payment_id = data.item.id
			query.student_id = data.item.student_id
			query.group_id = data.item.group_id
			query.subject_id = data.item.group.subject_id
			query.month = this.month
			query.year = this.yearOptions[2].value

			this.$router.push({
				query: {
					...this.$route.query,
					student_id: data.item.student_id,
					payment_id: data.item.id
				}
			})

			this.modalShow = true

			// this.$router.push({name: 'student-paids', query})
		},
		chooseGroup(index) {
			this.group_id = this.groups[index].id
			this.group = this.groups[index]
		},
		chooseSubject(index) {
			this.subject_id = this.subjects[index].id
			this.subject = this.subjects[index]
		},
		chooseTeacher(index) {
			this.teacher_id = this.teachers[index].id
			this.teacher = this.teachers[index]
		},
		removeSubject() {
			this.subject_id = false
			this.subject = false
		},
		removeTeachers() {
			this.teacher_id = false
			this.teacher = false
		},
		removeGroups() {
			this.group_id = false
			this.group = false
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
						type: 'base64'
				  })
				: XLSX.writeFile(wb, fn || 'Jadval.' + 'xlsx')
		}
	}
}
</script>

<style scoped>
.editable_input {
	position: relative;
	background: transparent;
	border: none;
	margin-left: 8px;
}

.input-block {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.input-block label {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	width: 160px;
	margin: 0;
	border: 1px solid #7367f0;
	border-radius: 0.357rem;
	opacity: 0;
	transition: all 0.3s ease 0s;
	pointer-events: none;
}

.editable_input:focus {
	background: transparent;
	border: none;
	outline: none;
}

.editable_input:focus + label {
	opacity: 1;
}

.xlsx-body {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 20px;
}

.focusInputButton svg {
	pointer-events: none;
}
</style>
