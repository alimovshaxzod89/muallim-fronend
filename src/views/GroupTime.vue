<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Fan</span>
						<button class="clear-date" @click="clearDate('subjectName')" v-if="this.filter.subjectName">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.subjectName"
						:options="subjects"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadGroups()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustoz</span>
						<button class="clear-date" @click="clearDate('full_name')" v-if="this.filter.full_name">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.full_name"
						:options="full_name"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadGroups()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Kun</span>
						<button class="clear-date" @click="clearDate('group_times')" v-if="this.filter.group_times">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.group_times"
						:options="options.days"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadGroups()"
					></multiselect>
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
			<div class="d-flex justify-content-between align-items-center my-2">
				<h4>Guruh vaqtlari</h4>
			</div>
			<table class="table table-bordered text-center">
				<thead>
					<tr>
						<th>Guruh</th>
						<th>Vaqtlari</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(group, k) in options.groups" :key="k">
						<td class="h5 w-25" v-html="formatGroup(group)"></td>
						<td>
							<table class="table table-sm table-bordered" v-if="group.group_times.length > 0">
								<thead>
									<tr>
										<th>Kun</th>
										<th>Xona</th>
										<th>Vaqt ...dan</th>
										<th>Vaqt ...gacha</th>
										<th></th>
									</tr>
								</thead>
								<tr v-for="(group_time, index) in group_times[group.id]" :key="group_time + '-' + index">
									<td class="font-weight-bold">
										{{ getDay(group_time.week_day) }}
									</td>
									<td>
										{{ group_time.room ? group_time.room.name : '-' }}
									</td>
									<td>{{ formatTime(group_time.time_begin) }}</td>
									<td>{{ formatTime(group_time.time_end) }}</td>
									<td>
										<div class="btn-group btn-group-sm">
											<button
												class="btn btn-sm btn-outline-primary"
												style="width: 60px"
												@click.prevent="editGroupTime(group_time)"
											>
												<feather-icon icon="EditIcon" />
											</button>
											<button
												class="btn btn-sm btn-outline-danger"
												style="width: 60px"
												@click.prevent="removeGroupTime(group_time.id)"
											>
												<feather-icon icon="TrashIcon" />
											</button>
										</div>
									</td>
								</tr>
							</table>

							<div class="form-group text-left pt-1">
								<button class="btn btn-primary" @click.prevent="addRow(group.id)">+</button>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</b-card>

		<b-modal
			id="modal-prevent-closing"
			ref="my-modal"
			size="lg"
			title="Guruh vaqtini qo'shish"
			@ok="submitForm"
			@hidden="resetForm"
			ok-title="Tasdiqlash"
			cancel-title="Bekor qilish"
		>
			<form @submit="submitForm" @keydown.enter="submitForm">
				<div class="row">
					<div class="col-6">
						<div class="form-group">
							<label>Kun</label>
							<b-form-select :options="options.days" v-model="day_id" value-field="key" text-field="name" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Xona</label>
							<b-form-select :options="options.rooms" v-model="room_id" value-field="id" text-field="name" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Vaqt ...dan</label>
							<MaskedInput type="text" mask="##:##" class="form-control" v-model="time_from" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Vaqt ...gacha</label>
							<MaskedInput type="text" mask="11:11" class="form-control" v-model="time_to" />
						</div>
					</div>
				</div>
			</form>
		</b-modal>
	</div>
</template>

<script>
import { BButton, BCard, BFormSelect, BTable, BModal, BFormTimepicker, BPagination } from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
import { get, post, del, put } from '@/helpers/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import MaskedInput from 'vue-masked-input'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	name: 'group-time',
	components: {
		BTable,
		BFormSelect,
		BCard,
		BButton,
		BModal,
		BFormTimepicker,
		MaskedInput,
		Multiselect,
		BPagination
	},
	data() {
		return {
			teacher: [],
			subjects: [],
			full_name: [],
			group_times: [], //umumiy jadvaldagi guruh vaqtlari
			id: null,
			group_id: null,
			room_id: null,
			day_id: null,
			time_from: null,
			time_to: null,
			update: false,
			options: {
				groups: [],
				rooms: [],
				days: [
					{ key: 1, name: 'Dushanba' },
					{ key: 2, name: 'Seshanba' },
					{ key: 3, name: 'Chorshanba' },
					{ key: 4, name: 'Payshanba' },
					{ key: 5, name: 'Juma' },
					{ key: 6, name: 'Shanba' },
					{ key: 7, name: 'Yakshanba' }
				]
			},
			filter: {
				subjectName: null,
				group: null,
				group_times: null,
				full_name: null
			},
			table: {
				group_times: []
			},
			modal: {},
			page: 1,
			totalPages: null,
			limit: 10
		}
	},
	created() {
		this.loadGroups()
		this.loadRooms()
		this.loadSubjects()
		this.loadTime()
		this.loadTeachers()
	},
	methods: {
		clearDate(input) {
			this.filter[input] = null
			this.loadGroups()
		},
		nofity(title, text, type) {
			this.$toast({
				component: ToastificationContent,
				props: {
					title,
					icon: 'BellIcon',
					text: text,
					variant: type
				}
			})
		},
		submitForm(e) {
			e.preventDefault()
			const group_id = this.group_id
			const room_id = this.room_id
			if (!group_id || !room_id) {
				this.nofity('Xato', 'Guruhni tanlang yoki Xonani tanlang', 'danger')
			}

			let data = {
				group_id,
				room_id,
				week_day: this.day_id,
				time_begin: this.time_from,
				time_end: this.time_to
			}

			if (this.update) {
				put('/group-times/' + this.id, data).then(res => {
					if (res.data.success) {
						this.nofity('Notification', 'Muvaffaqiyatli', 'success')
						this.$refs['my-modal'].hide()
						this.resetForm()
						this.loadGroups()
						this.loadTime()
					}
				})
			} else {
				post('/group-times', data).then(res => {
					if (res.data.success) {
						this.nofity('Notification', 'Muvaffaqiyatli', 'success')
						this.$refs['my-modal'].hide()
						this.resetForm()
						this.loadGroups()
						this.loadTime()
					}
				})
			}
		},
		addRow(group_id) {
			this.group_id = group_id
			this.$refs['my-modal'].show()
		},
		loadGroups(skip = 0) {
			const query = {}

			if (this.filter.subjectName) query.subject_id = this.filter.subjectName.id
			if (this.filter.full_name) query.teacher_id = this.filter.full_name.id
			if (this.filter.group_times) query.week_day = this.filter.group_times.key

			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')

			get(`/groups?for_group_times=1&${queryString}&limit=${this.limit}&skip=${skip}`).then(response => {
				if (response.data.success) {
					this.options.groups = response.data.data
					this.totalPages = response.data.total
				}
			})
		},
		loadRooms() {
			get(`/rooms`).then(response => {
				if (response.data.success) {
					this.options.rooms = response.data.data
				}
			})
		},
		loadSubjects() {
			get(`/subjects`).then(response => {
				if (response.data.success) {
					this.subjects = response.data.data
				}
			})
		},
		loadTeachers() {
			let query = {}
			if (this.filter.subjectName) {
				query.subject_id = this.filter.subjectName.id
			}
			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')
			get(`/teachers?${queryString}`).then(response => {
				if (response.data.success) {
					this.full_name = response.data.data
				}
			})
		},
		loadTime() {
			get(`/group-times`).then(response => {
				if (response.data.success) {
					this.group_times = response.data.data
				}
			})
		},
		resetForm() {
			this.group_id = null
			this.room_id = null
			this.day_id = null
			this.time_from = null
			this.time_to = null
		},
		formatGroup(group) {
			return `<div>${group.number} / ${group.subject.name}</div><div>${group.teacher.full_name}</div>`
		},
		formatTime(time) {
			if (time === null) {
				return '-'
			}
			return time.substr(0, 5)
		},
		getDay(day) {
			const result = this.options.days.filter(item => {
				if (item.key === day) {
					return item.name
				}
			})
			return result[0].name
		},
		removeGroupTime(group_time_id) {
			let url = `/group-times/${group_time_id}`
			del(url).then(res => {
				if (res.data.success) {
					this.$toast({
						component: ToastificationContent,
						props: {
							title: 'Notification',
							icon: 'BellIcon',
							text: 'Muvaffaqiyatli',
							variant: 'success'
						}
					})
					this.loadGroups()
					this.loadTime()
					this.loadGroups()
				}
			})
		},
		editGroupTime(group_time) {
			this.update = true
			this.id = group_time.id
			this.group_id = group_time.group_id
			this.room_id = group_time.room_id
			this.day_id = group_time.week_day
			this.time_from = this.formatTime(group_time.time_begin)
			this.time_to = this.formatTime(group_time.time_end)
			this.$refs['my-modal'].show()
		},
		timeTesting(type) {
			if (this[type].length > 4) {
				const firstTime = this[type].slice(0, 2)
				const secondTime = this[type].slice(3, 5)
				if (firstTime > 23 || secondTime > 59) {
					this[type] = '0000'
				}
			}
		}
	},
	watch: {
		time_from() {
			if (this.time_from) {
				this.timeTesting('time_from')
			}
		},
		time_to() {
			if (this.time_to) {
				this.timeTesting('time_to')
			}
		},
		['filter.subjectName']() {
			this.filter.full_name = null
			this.loadTeachers()
			this.loadGroups()
		},
		['page']() {
			this.loadGroups((this.page - 1) * this.limit)
		},
		limit() {
			this.loadGroups()
		}
	}
}
</script>

<style>
.wdth50 {
	width: 50px;
}
.custom_input {
	width: 100px;
	text-align: center;
	border: none;
	background: transparent;
}
</style>
