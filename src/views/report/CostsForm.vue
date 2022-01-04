<template>
	<div>
		<b-modal ref="my-modal" title="Xarajat kiritish" @ok="handleForm" ok-title="Tasdiqlash" cancel-title="Bekor qilish">
			<form @submit="handleForm" @keydown.enter="handleForm">
				<div class="form-group form-date-button">
					<label>Sa'na</label>
					<!-- <b-form-datepicker
					id="example-datepicker"
					v-model="date"
					class="mb-2"
					locale="ru"
					:class="errors.date ? 'is-invalid' : ''"
				/> -->
					<input type="date" v-model="date" class="form-control" :class="errors.date ? 'is-invalid' : ''" />
					<button class="clear-date" @click="clearDate('date')" v-if="date">
						<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
							<path
								d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
							/>
						</svg>
					</button>
					<div v-if="errors.date" class="invalid-feedback">
						{{ errors.date }}
					</div>
				</div>
				<div class="form-group">
					<label>Summa</label>
					<input v-model="amount" type="number" class="form-control" :class="errors.amount ? 'is-invalid' : ''" />
					<div v-if="errors.amount" class="invalid-feedback">
						{{ errors.amount }}
					</div>
				</div>
				<div class="form-group">
					<label>Izoh</label>
					<textarea v-model="note" class="form-control" :class="errors.amount ? 'is-invalid' : ''" />
					<div v-if="errors.note" class="invalid-feedback">
						{{ errors.note }}
					</div>
				</div>
			</form>
		</b-modal>
	</div>
</template>
<script>
import { BTable, BFormSelect, BCard, BButton, BFormGroup, BFormInput, BModal, BFormDatepicker } from 'bootstrap-vue'
import axios from 'axios'
import ToastificationContent from '@core/components/toastification/ToastificationContent'

export default {
	name: 'CostsForm',
	components: {
		BTable,
		BFormSelect,
		BCard,
		BButton,
		BFormGroup,
		BFormInput,
		BModal,
		BFormDatepicker
	},
	data() {
		return {
			date: null,
			note: null,
			amount: null,
			errors: {
				amount: null,
				date: null,
				note: null
			}
		}
	},
	watch: {
		amount() {
			this.resetErrors()
		},
		date() {
			this.resetErrors()
			this.$parent.filters.month = new Date(this.date).getMonth() + 1
			this.$parent.filters.day = new Date(this.date).getDay() + 1
			this.$parent.loadTeacherPaids()
		},
		note() {
			this.resetErrors()
			this.$parent.filters.note = this.note
			this.$parent.loadTeacherPaids()
		}
	},
	mounted() {
		this.loadTeachers()
	},
	methods: {
		clearDate(input) {
			this[input] = null
		},
		resetErrors() {
			this.errors.note = this.errors.date = this.errors.amount = null
		},
		loadTeachers() {
			axios.get('/api/teachers').then(response => {
				if (response.status === 200) {
					this.options.days = response.data.data
				}
			})
		},
		open(attr = {}) {
			this.$refs['my-modal'].show()
			if (attr) {
				this.date = attr.date
				this.amount = attr.amount
				this.note = attr.note
			}
		},
		storePaid(params) {
			axios
				.post('/api/teacher-paids', params)
				.then(res => {
					if (res.status === 200) {
						this.$refs['my-modal'].hide()
						this.$parent.loadTeacherPaids()
						this.$toast({
							component: ToastificationContent,
							props: {
								title: 'Notification',
								icon: 'BellIcon',
								text: 'Muvaffaqiyatli',
								variant: 'success'
							}
						})
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		updatePaid(params) {
			axios
				.put(`/api/teacher-paids/${this.teacher_paid_id}`, params)
				.then(res => {
					if (res.status === 200) {
						this.$refs['my-modal'].hide()
						this.$parent.loadTeacherPaids()
						this.$toast({
							component: ToastificationContent,
							props: {
								title: 'Notification',
								icon: 'BellIcon',
								text: 'Muvaffaqiyatli',
								variant: 'success'
							}
						})
					}
				})
				.catch(err => {
					console.log(err)
				})
		},
		handleForm(e) {
			e.preventDefault()
			if (!this.amount) this.errors.amount = "Summa ni to'ldiring"
			if (!this.date) this.errors.date = "Sa'na ni to'ldiring"
			if (!this.note) this.errors.note = "Izoh ni to'ldiring"
			if (this.errors.amount || this.errors.date || this.errors.note) {
				this.$toast({
					component: ToastificationContent,
					props: {
						title: 'Xatolik',
						icon: 'BellIcon',
						text: "Iltimos xato to'g'irlang",
						variant: 'danger'
					}
				})
				return
			}

			const params = {
				date: parseInt(this.date),
				note: parseInt(this.note),
				amount: parseInt(this.amount)
			}
			if (this.teacher_paid_id) {
				this.updatePaid(params)
			} else {
				this.storePaid(params)
			}
		}
	}
}
</script>
