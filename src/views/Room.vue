<template>
	<div>
		<div class="card shadow filter-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Bino</span>
						<button class="clear-date" @click="clearDate('place_id')" v-if="this.filter.place_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.place_id"
						:options="places"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadRooms()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Nomi</span>
						<button class="clear-date" @click="clearDate('name')" v-if="this.filter.name">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="text" class="form-control form-control-sm" v-model="filter.name" @input="loadRooms()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Sig'imi</span>
						<button class="clear-date" @click="clearDate('capacity')" v-if="this.filter.capacity">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="text" class="form-control form-control-sm" v-model="filter.capacity" @input="loadRooms()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Aktiv</span>
						<button class="clear-date" @click="clearDate('status')" v-if="this.filter.status">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<select class="form-control-sm form-control" v-model="filter.status" @change="loadRooms()">
						<option value="" selected>Tanlash</option>
						<option value="1">Aktiv</option>
						<option value="0">Noaktiv</option>
					</select>
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

		<div class="card shadow">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">XONALAR</div>
				<button class="btn btn-sm btn-primary" @click="openModal">Qo'shish</button>
			</div>
			<div class="card-body">
				<table class="table table-striped table-bordered text-center">
					<thead>
						<tr>
							<th></th>
							<th>Bino</th>
							<th>Nomi</th>
							<th>Sig'imi</th>
							<th>Aktiv</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="(room, index) in rooms" :key="room + '-' + index">
							<td>
								<div class="btn-group btn-group-sm">
									<button style="width: 60px; margin-right: 4px" class="btn btn-sm btn-outline-primary" @click="openModal(room)">
										<feather-icon icon="EditIcon" />
									</button>
									<button
										style="width: 60px; margin-right: 4px"
										class="btn btn-sm btn-outline-danger"
										@click="deleteRoom(room.id)"
									>
										<feather-icon icon="TrashIcon" />
									</button>
								</div>
							</td>
							<td>{{ room.place.name }}</td>
							<td>{{ room.name }}</td>
							<td>{{ room.capacity }}</td>
							<td>
								<select class="form-control form-control-sm w-50 m-auto" @change="updateStatus(room, $event)">
									<option value="1" :selected="room.status === 1">Ha</option>
									<option value="0" :selected="room.status === 0">Yo'q</option>
								</select>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<b-modal
			id="modal-prevent-closing"
			ref="my-modal"
			size="sm"
			title="Xona qo'shish"
			@ok="submitForm"
			@hidden="resetForm"
			cancel-title="Bekor qilish"
			ok-title="Tasdiqlash"
		>
			<form @submit="submitForm" @keydown.enter="submitForm">
				<div class="form-group">
					<label>Bino</label>
					<multiselect
						class="table-select"
						v-model="place_id"
						:options="places"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
				<div class="form-group">
					<label>Nomi</label>
					<input type="text" class="form-control form-control-sm" placeholder="Nomi" v-model="name" />
				</div>
				<div class="form-group">
					<label>Sig'imi</label>
					<input type="number" class="form-control form-control-sm" placeholder="Sig'imi" v-model="capacity" />
				</div>
				<div class="form-check">
					<input type="checkbox" class="form-check-input" id="exampleCheck1" v-model="active" />
					<label class="form-check-label" for="exampleCheck1">Aktiv</label>
				</div>
			</form>
		</b-modal>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { get, post, del, put } from '@/helpers/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { BModal, BPagination } from 'bootstrap-vue'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	name: 'room',
	components: {
		BModal,
		BPagination,
		Multiselect
	},
	data() {
		return {
			rooms: [],
			places: [],
			place_id: null,
			name: null,
			capacity: null,
			active: true,
			id: null,
			filter: {
				place_id: null,
				name: null,
				capacity: null,
				status: null
			},
			page: 1,
			limit: 10,
			totalPages: null
		}
	},
	created() {
		this.loadRooms()
		this.loadPlaces()
	},
	methods: {
		clearDate(input) {
			this.filter[input] = null
			this.loadPlaces()
			this.loadRooms()
		},
		nofity(title, text, variant) {
			this.$toast({
				component: ToastificationContent,
				props: {
					title,
					icon: 'BellIcon',
					text,
					variant
				}
			})
		},
		updateStatus(room, event) {
			const status = event.target.value
			this.filter.status = null
			put(`/rooms/${room.id}`, {
				name: room.name,
				place_id: room.place_id,
				status
			}).then(response => {
				if (response.data.success) {
					this.nofity('Success', 'Muvaffaqiyatli', 'success')
					this.loadRooms()
				}
			})
		},
		loadPlaces() {
			get('/places').then(response => {
				if (response.data.success) {
					this.places = response.data.data
				}
			})
		},
		loadRooms(skip = 0) {
			const query = {}

			if (this.filter.name) query.name = this.filter.name
			if (this.filter.place_id) query.place_id = this.filter.place_id.id
			if (this.filter.capacity) query.capacity = this.filter.capacity
			if (this.filter.status) query.status = this.filter.status

			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')

			get(`/rooms?${queryString}&limit=${this.limit}&skip=${skip}`).then(response => {
				if (response.data.success) {
					this.rooms = response.data.data
					this.totalPages = response.data.total
				}
			})
		},
		openModal(room = false) {
			this.$refs['my-modal'].show()

			if (room) {
				    (this.place_id = room.place),
					(this.name = room.name),
					(this.capacity = room.capacity),
					(this.active = room.status === 0 ? false : true),
					(this.id = room.id)
			}
		},
		submitForm(e) {
			e.preventDefault()
			if (!this.name && !this.capacity && !this.place_id) {
				this.nofity('Xato', "Hamma majburiy qatorni to'ldiring", 'danger')
			}

			if (!this.id) {
				post('/rooms', {
					place_id: this.place_id.id,
					name: this.name,
					capacity: this.capacity,
					status: this.active ? 1 : 0
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.loadRooms((this.page - 1) * this.limit)
					}
				})
			} else {
				put('/rooms/' + this.id, {
					place_id: this.place_id.id,
					name: this.name,
					capacity: this.capacity,
					status: this.active ? 1 : 0
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.loadRooms((this.page - 1) * this.limit)
					}
				})
			}
		},
		deleteRoom(id) {
			this.$bvModal
				.msgBoxConfirm("O'chirishga aminmisiz?", {
					cancelVariant: 'outline-secondary',
					okTitle: 'Tasdiqlash',
					cancelTitle: 'Bekor qilish'
				})
				.then(value => {
					if (value == true) {
						del('/rooms/' + id).then(response => {
							if (response.data.success) {
								this.nofity('Success', 'Muvaffaqiyatli', 'success')
								this.loadRooms((this.page - 1) * this.limit)
							}
						})
					}
				})
		},
		resetForm() {
			this.place_id = null
			this.id = null
			this.name = null
			this.capacity = null
			this.active = true
		}
	},
	watch: {
		['page']() {
			this.loadRooms((this.page - 1) * this.limit)
		},
		limit() {
			this.loadRooms()
		}
	}
}
</script>

<style scoped>
.pagination-mt {
	margin-top: 15px;
}
</style>
