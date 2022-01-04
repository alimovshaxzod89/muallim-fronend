<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustoz</span>
						<button class="clear-date" @click="clearDate('teacher')" v-if="this.filter.teacher">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.teacher"
						:options="teachers"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadStudentGroup()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Guruh</span>
						<button class="clear-date" @click="clearDate('group')" v-if="this.filter.group">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filter.group"
						:options="groups"
						placeholder="Tanlash"
						label="number"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadStudentGroup()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Talaba</span>
						<button class="clear-date" @click="clearDate('student')" v-if="this.filter.student">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="text" class="form-control form-control-sm" v-model="filter.student" @input="loadStudentGroup()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Boshlangan sana</span>
						<button class="clear-date" @click="clearDate('begin_date')" v-if="this.filter.begin_date">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="date" class="form-control form-control-sm" v-model="filter.begin_date" @input="loadStudentGroup()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Tugagan sana</span>
						<button class="clear-date" @click="clearDate('end_date')" v-if="this.filter.end_date">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input type="date" class="form-control form-control-sm" v-model="filter.end_date" @input="loadStudentGroup()" />
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
					<select class="form-control-sm form-control" v-model="filter.status" @change="loadStudentGroup()">
						<option value="" selected>Tanlash</option>
						<option value="1">Ha</option>
						<option value="0">Yo'q</option>
					</select>
				</div>
				<div class="bottom-menu">
					<div class="page-mode">
						<select class="form-control form-control-sm" v-model="limit">
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
				<div class="title font-weight-bold">TALABA GURUHLARI</div>
				<button class="btn btn-sm btn-primary" @click="openModal(false)">Qo'shish</button>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table class="table table-striped  table-hover text-center auto-index">
						<thead>
							<tr>
								<th>#</th>
								<th></th>
								<th>Ustoz</th>
								<th>Guruh</th>
								<th>Talaba</th>
								<th>Boshlangan sana</th>
								<th>Tugagan sana</th>
								<th>Aktiv</th>
								<!-- <th>Talaba sonlari</th> -->
							</tr>
						</thead>
						<tbody>
							<tr v-for="(student, index) in studentGroup" :key="student + '-' + index">
								<td></td>
								<td>
									<div class="btn-group btn-group-sm">
										<button class="btn btn-sm btn-outline-primary" @click="openModal(student)">
											<feather-icon icon="EditIcon" />
										</button>
										<button class="btn btn-sm btn-outline-danger" style="margin-left: 4px" @click="deleteStudent(student.id)">
											<feather-icon icon="TrashIcon" />
										</button>
									</div>
								</td>
								<td>{{ student.group.teacher.full_name }}</td>
								<td>{{ student.group.number }}</td>
								<td>{{ student.student ? student.student.full_name : '-' }}</td>
								<td>{{ student.begin_date ? formatDate(student.begin_date) : '-' }}</td>
								<td>{{ student.end_date ? formatDate(student.end_date) : '-' }}</td>
								<td>
									<select class="form-control form-control-sm w-50 m-auto" @change="updateStatus(student, $event)">
										<option value="1" :selected="student.status == 1">Ha</option>
										<option value="0" :selected="student.status == 0">Yo'q</option>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>

		<b-modal
			id="modal-prevent-closing"
			ref="my-modal"
			size="lg"
			title="Talaba guruh qo'shish"
			@ok="submitForm"
			@hidden="resetForm"
			cancel-title="Bekor qilish"
			ok-title="Tasdiqlash"
		>
			<form @submit="submitForm" @keydown.enter="submitForm">
				<div class="row">
					<div class="col-6">
						<div class="form-group">
							<label>Talaba</label>
							<div class="btn-wra">
								<multiselect
									class="modal-select"
									v-model="form.student"
									:options="students"
									placeholder="Tanlash"
									label="full_name"
									select-label=""
									deselectLabel="O'chirish"
									selectedLabel=""
								></multiselect>
								<button class="btn btn-primary" v-if="!form.id" @click="openStudentModal">+</button>
							</div>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Guruh</label>
							<multiselect
								class="modal-select"
								v-model="form.group"
								:options="groups"
								placeholder="Tanlash"
								label="number"
								select-label=""
								deselectLabel="O'chirish"
								selectedLabel="2"
							></multiselect>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group form-date-button">
							<label>Boshlangan sana</label>
							<input type="date" placeholder="Boshlangan sana" v-model="form.begin_date" class="form-control" />
							<button class="clear-date" @click="clearDate('begin_date')" v-if="form.begin_date">
								<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
									<path
										d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group form-date-button">
							<label>Tugagan sana</label>
							<input type="date" placeholder="Tugagan sana" v-model="form.end_date" class="form-control" />
							<button class="clear-date" @click="clearDate('end_date')" v-if="form.end_date">
								<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
									<path
										d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div class="col-6">
						<div class="form-check">
							<input type="checkbox" class="form-check-input" id="checkbox" v-model="form.status" checked />
							<label class="form-check-label" for="checkbox">Aktiv</label>
						</div>
					</div>
				</div>
			</form>
		</b-modal>

		<b-modal
			ref="student-modal"
			size="lg"
			title="Talaba qo'shish"
			@ok="submitStudentForm"
			@hidden="resetStudentForm"
			cancel-title="Bekor qilish"
			ok-title="Tasdiqlash"
		>
			<form @submit="submitForm" @keydown.enter="submitForm">
				<div class="row">
					<div class="col-4">
						<div class="form-group">
							<label>Ism <i class="text-danger">*</i></label>
							<input type="text" placeholder="Ism..." class="form-control" v-model="student_form.first_name" />
						</div>
					</div>
					<div class="col-4">
						<div class="form-group">
							<label>Familiya <i class="text-danger">*</i></label>
							<input type="text" placeholder="Familiya..." class="form-control" v-model="student_form.last_name" />
						</div>
					</div>
					<div class="col-4">
						<div class="form-group">
							<label>Sharifi</label>
							<input type="text" placeholder="Sharifi..." class="form-control" v-model="student_form.middle_name" />
						</div>
					</div>
					<div class="col-6">
						<label>Telefon</label>
						<div class="input-group">
							<div class="input-group-prepend">
								<span class="input-group-text" id="basic-addon1">+998</span>
							</div>
							<input
								type="number"
								:min="'000000001'"
								:max="'999999999'"
								:class="phone_mask"
								class="form-control"
								v-model="student_form.phone"
								placeholder="Telefon..."
							/>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Tug'ilgan kun</label>
							<input type="date" placeholder="Tug'gilgan kun..." v-model="student_form.birthday" class="form-control" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Tuman</label>
							<multiselect
								class="modal-select"
								v-model="student_form.region_id"
								:options="regions"
								placeholder="Tanlash"
								label="name"
								select-label=""
								deselectLabel="O'chirish"
								selectedLabel=""
							></multiselect>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>D.y. Tuman</label>
							<multiselect
								class="modal-select"
								v-model="student_form.permanent_region_id"
								:options="regions"
								placeholder="Tanlash"
								label="name"
								select-label=""
								deselectLabel="O'chirish"
								selectedLabel=""
							></multiselect>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Manzil</label>
							<input type="text" class="form-control" v-model="student_form.address" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>D.y. manzili</label>
							<input type="text" class="form-control" v-model="student_form.permanent_address" />
						</div>
					</div>
				</div>
				<div class="form-group">
					<label>Jinsi <i class="text-danger">*</i></label>
					<div class="form-check">
						<input type="radio" class="form-check-input" id="radio-male" name="gender" v-model="student_form.gender" :value="1" />
						<label class="form-check-label font-weight-normal" for="radio-male">Erkak</label>
					</div>
					<div class="form-check">
						<input type="radio" class="form-check-input" id="radio-female" name="gender" v-model="student_form.gender" :value="2" />
						<label class="form-check-label font-weight-normal" for="radio-female">Ayol</label>
					</div>
				</div>
				<div class="form-group">
					<div class="form-check">
						<input type="checkbox" class="form-check-input" id="radio_2086394" name="discount" v-model="student_form.discount" />
						<label class="form-check-label" for="radio_2086394">Chegirma</label>
					</div>
				</div>
				<div class="form-group" v-if="student_form.discount">
					<label>Chegirma sababi</label>
					<textarea class="form-control" v-model="student_form.discount_text" :required="student_form.discount"></textarea>
				</div>
			</form>
		</b-modal>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { get, post, del, put } from '@/helpers/api'
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import { BPagination, BButton, BModal } from 'bootstrap-vue'
import moment from 'moment'
import 'vue-multiselect/dist/vue-multiselect.min.css'

export default {
	name: 'students-group',
	components: {
		BModal,
		BPagination,
		BButton,
		Multiselect
	},
	data() {
		return {
			regions: [],
			studentGroup: [],
			students: [],
			groups: [],
			teachers: [],
			form: {
				id: null,
				student: null,
				group: null,
				begin_date: null,
				end_date: null,
				status: true
			},
			filter: {
				teacher: null,
				student: null,
				group: null,
				begin_date: null,
				end_date: null,
				status: null
			},
			limit: 10,
			student_form: {
				id: null,
				discount: false,
				discount_text: null,
				first_name: null,
				last_name: null,
				middle_name: null,
				phone: null,
				birthday: null,
				region_id: null,
				address: null,
				permanent_region_id: null,
				permanent_address: null,
				gender: null
			},
			phone_mask: null,
			page: 1,
			totalPages: null
		}
	},
	created() {
		this.loadStudentGroup()
		this.loadStudents()
		this.loadGroups()
		this.loadTeachers()
		this.loadRegions()
	},
	methods: {
		nameWithLang({ number }) {
			return `${number}`
		},
		nameWithLang2({ group }) {
			return `${group.teacher.full_name}`
		},
		clearDate(input) {
			if (input === 'begin_date') {
				this.form.begin_date = null
				this.filter.begin_date = null
				this.loadStudentGroup()
			} else if (input === 'end_date') {
				this.form.end_date = null
				this.filter.end_date = null
				this.loadStudentGroup()
			} else {
				this.filter[input] = null
				this.loadStudentGroup()
			}
		},
		updateStatus(student, event) {
			const status = event.target.value
			this.filter.status = null
			put(`/student-groups/${student.id}`, {
				student_id: student.student_id,
				group_id: student.group_id,
				status: status
			}).then(response => {
				if (response.data.success) {
					this.nofity('Success', 'Muvaffaqiyatli', 'success')
					this.loadStudentGroup()
				}
			})
		},
		deleteStudent(id) {
			this.$bvModal
				.msgBoxConfirm("O'chirishga aminmisiz?", {
					cancelVariant: 'outline-secondary',
					okTitle: 'Tasdiqlash',
					cancelTitle: 'Bekor qilish'
				})
				.then(value => {
					if (value == true) {
						del('/student-groups/' + id).then(response => {
							if (response.data.success) {
								this.nofity('Success', 'Muvaffaqiyatli', 'success')
								this.loadStudentGroup((this.page - 1) * this.limit)
							}
						})
					}
				})
		},
		formatDate(value) {
			return moment(value).format('DD.MM.Y')
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
		async loadStudents() {
			await get('/students').then(response => {
				if (response.data.success) {
					this.students = response.data.data
					this.totalStudent = response.data.total
				}
			})
		},
		loadStudentGroup(skip = 0) {
			const query = {}

			if (this.filter.student) query.student_name = this.filter.student
			if (this.filter.group) query.group_id = this.filter.group.id
			if (this.filter.begin_date) query.begin_date = this.filter.begin_date
			if (this.filter.end_date) query.end_date = this.filter.end_date
			if (this.filter.status) query.status = this.filter.status
			if (this.filter.teacher) query.teacher_id = this.filter.teacher.id

			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')

			get(`/student-groups?${queryString}&limit=${this.limit}&skip=${skip}`).then(response => {
				if (response.data.success) {
					this.studentGroup = response.data.data
					this.totalPages = response.data.total
				}
			})
		},
		loadRegions() {
			get('/regions').then(response => {
				if (response.data.success) {
					this.regions = response.data.data
				}
			})
		},
		loadTeachers() {
			get('/teachers').then(response => {
				if (response.data.success) {
					this.teachers = response.data.data
				}
			})
		},
		loadGroups() {
			let query = {}
			if (this.filter.teacher) {
				query.teacher_id = this.filter.teacher.id
			}
			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')
			get(`/groups?${queryString}`).then(response => {
				if (response.data.success) {
					this.groups = response.data.data
				}
			})
		},
		openModal(student = false) {
			this.$refs['my-modal'].show()

			this.form.group = this.filter.group

			if (student) {
				this.form.id = student.id
				this.form.student = student.student
				this.form.group = student.group
				this.form.begin_date = student.begin_date ? moment(student.begin_date).format('Y-MM-DD') : null
				this.form.end_date = student.end_date ? moment(student.end_date).format('Y-MM-DD') : null
				this.form.status = student.status
			}
		},
		openStudentModal() {
			this.$refs['student-modal'].show()
		},
		submitForm(e) {
			e.preventDefault()

			if (!this.form.student && !this.form.group && !this.form.begin_date && !this.form.end_date) {
				this.nofity('Xato', "Hamma majburiy qatorni to'ldiring", 'danger')
			}

			if (!this.form.id) {
				post('/student-groups', {
					student_id: this.form.student.id,
					group_id: this.form.group.id,
					begin_date: this.form.begin_date,
					end_date: this.form.end_date,
					status: this.form.status
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.page = 1
						this.loadStudentGroup()
					}
				})
			} else {
				put('/student-groups/' + this.form.id, {
					student_id: this.form.student.id,
					group_id: this.form.group.id,
					begin_date: this.form.begin_date,
					end_date: this.form.end_date,
					status: this.form.status
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.loadStudentGroup()
					}
				})
			}
		},
		resetForm(e) {
			this.form.id = null
			this.form.student = null
			this.form.group = null
			this.form.begin_date = null
			this.form.end_date = null
			this.form.status = true
		},
		submitStudentForm(e) {
			e.preventDefault()

			if (!this.student_form.first_name || !this.student_form.last_name || !this.student_form.gender) {
				this.nofity('Xato', "Hamma qatorni to'ldiring", 'danger')
				return
			}

			post('/students', {
				first_name: this.student_form.first_name,
				last_name: this.student_form.last_name,
				middle_name: this.student_form.middle_name,
				phone: this.student_form.phone,
				birth_date: this.student_form.birthday,
				status: 1,
				gender: this.student_form.gender,
				sale: this.student_form.discount,
				sale_cause: this.student_form.discount_text,
				region_id: this.student_form.region_id ? this.student_form.region_id.id : null,
				address: this.student_form.address,
				permanent_region_id: this.student_form.permanent_region_id ? this.student_form.permanent_region_id.id : null,
				permanent_address: this.student_form.permanent_address
			}).then(async response => {
				if (response.data.success) {
					this.nofity('Success', 'Muvaffaqiyatli', 'success')
					this.students.push(response.data.data)
					this.form.student = response.data.data
					this.resetStudentForm()
					this.$refs['student-modal'].hide()
				}
			})
		},
		resetStudentForm(e) {
			this.student_form.discount = false
			this.student_form.discount_text = null
			this.student_form.first_name = null
			this.student_form.last_name = null
			this.student_form.middle_name = null
			this.student_form.phone = null
			this.student_form.birthday = null
			this.student_form.region_id = null
			this.student_form.address = null
			this.student_form.permanent_region_id = null
			this.student_form.permanent_address = null
			this.student_form.gender = null
		}
	},
	watch: {
		['student_form.phone']() {
			if (this.student_form.phone.length < 9 || this.student_form.phone.length > 9) {
				this.phone_mask = 'is-invalid'
			} else {
				this.phone_mask = null
			}
		},
		['page']() {
			this.loadStudentGroup((this.page - 1) * this.limit)
		},
		['filter.teacher']() {
			this.filter.group = null
			this.loadGroups()
			this.loadStudentGroup()
		},
		limit() {
			this.loadStudentGroup()
		}
	}
}
</script>

<style>
table{
  counter-reset: Serial;
}
.auto-index td:first-child:before
{
  counter-increment: Serial;      /* Increment the Serial counter */
  content: counter(Serial);    /* Display the counter */
}
label {
	font-weight: bold;
	text-transform: uppercase;
}
</style>
