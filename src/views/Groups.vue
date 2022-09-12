<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>Nomer</span>
						<button class="clear-date" @click="clearDate('number')" v-if="this.filter.number">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						v-model="filter.number"
						class="table-select"
						:options="groupsSelect"
						placeholder="Tanlash"
						label="number"
						select-label=""
						deselect-label=""
						selected-label=""
						@input="loadGroups()"
					/>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>KURS</span>
						<button class="clear-date" @click="clearDate('subjectSelected')" v-if="this.filter.subjectSelected">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						v-model="filter.subjectSelected"
						class="table-select"
						:options="subjects"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselect-label=""
						selected-label=""
						@input="loadGroups()"
					/>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Bosqich</span>
						<button class="clear-date" @click="clearDate('stageSelected')" v-if="this.filter.stageSelected">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						v-model="filter.stageSelected"
						class="table-select"
						:options="stages"
						placeholder="Tanlash"
						label="name"
						select-label=""
						deselect-label=""
						selected-label=""
						@input="loadGroups()"
					/>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustoz</span>
						<button class="clear-date" @click="clearDate('teacher_full_name')" v-if="this.filter.teacher_full_name">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						v-model="filter.teacher_full_name"
						class="table-select"
						:options="teachers"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselect-label=""
						selected-label=""
						@input="loadGroups()"
					/>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Narx</span>
						<button class="clear-date" @click="clearDate('price')" v-if="this.filter.price">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input v-model="filter.price" type="number" class="form-control form-control-sm" @input="loadGroups()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ulush %</span>
						<button class="clear-date" @click="clearDate('teacher_share')" v-if="this.filter.teacher_share">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input v-model="filter.teacher_share" type="text" class="form-control form-control-sm" @input="loadGroups()" />
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Maks o'quvchi soni</span>
						<button class="clear-date" @click="clearDate('max_students')" v-if="this.filter.max_students">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input v-model="filter.max_students" type="number" class="form-control form-control-sm" @input="loadGroups()" />
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
					<div class="td-flex">
						<input v-model="filter.begin_date" type="date" class="form-control form-control-sm" @input="loadGroups()" />
					</div>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Tugash sanasi</span>
						<button class="clear-date" @click="clearDate('end_date')" v-if="this.filter.end_date">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<input v-model="filter.end_date" type="date" class="form-control form-control-sm" @input="loadGroups()" />
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
				<div class="title font-weight-bold">GURUHLAR <span class="text-primary ml-1" style="font-size: 20px">( {{ this.totalPages }} ta )</span></div>
				<span>
					<button class="btn btn-sm btn-primary" @click="openModal(false)">Guruh ochish</button>
					<button 
					class="btn btn-sm btn-info"
					data-toggle="tooltip"
					title="Guruhlarni bir biriga qo'shish"
					>
					<feather-icon icon="LinkIcon" />
				</button>
				</span>
			</div>
			<div class="card-body">
				<div class="table-responsive">
					<table class="table table-striped table-hover text-center auto-index" ref="excel">
						<thead>
							<tr>
								<th>#</th>
								<th></th>
								<th>Nomer</th>
								<th>Kurs</th>
								<th>Bosqich</th>
								<th>Ustoz</th>
								<th>Narx</th>
								<th>Ulush %</th>
								<th>Maks o'quvchi soni</th>
								<th>Boshlangan sana</th>
								<th>Tugash sanasi</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(group, index) in groups" :key="group + '-' + index">
								<td></td>
								<td>
									<div class="btn-group btn-group-vertical btn-group-sm">
										<button class="btn  btn-sm btn-outline-primary" style="width: 60px; border-radius: 4px" @click="openModal(group)">
											<feather-icon icon="EditIcon" />
										</button>
										<button class="btn btn-sm btn-outline-danger" style="width: 60px; margin-top: 5px; border-radius: 4px" @click="deleteRoom(group.id)">
											<feather-icon icon="TrashIcon" />
										</button>
									</div>
								</td>
								<td>{{ group.number }}</td>
								<td>{{ group.subject.name }}</td>
								<td>{{ group.stage_id ? group.stage_id : '-' }}</td>
								<td>{{ group.teacher.full_name }}</td>
								<td>{{ group.price | formatNumber }}</td>
								<td>{{ group.teacher_share }}</td>
								<td>
									{{ group.max_students ? group.max_students : '-' }}
								</td>
								<td>{{ group.begin_date | formatDate }}</td>
								<td>{{ group.end_date | formatDate }}</td>
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
			title="Guruh qo'shish"
			cancel-title="Bekor qilish"
			ok-title="Tasdiqlash"
			@ok="submitForm"
			@hidden="resetForm"
		>
			<form @submit="submitForm" @keydown.enter="submitForm">
				<div class="row">
					<div class="col-6">
						<div class="form-group">
							<label>Nomer <span class="required-input">*</span></label>
							<input v-model="number" type="text" class="form-control form-control-sm" placeholder="Nomeri" required />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>KURS <span class="required-input">*</span></label>
							<multiselect
								v-model="subjectSelected"
								class="table-select"
								:options="subjects"
								placeholder="Tanlash"
								label="name"
								select-label=""
								deselect-label=""
								selected-label=""
								aria-required=""
								required
							/>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Bosqich</label>
							<multiselect
								v-model="stageSelected"
								class="table-select"
								:options="stages"
								placeholder="Tanlash"
								label="name"
								select-label=""
								deselect-label=""
								selected-label=""
							/>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Ustoz <span class="required-input">*</span></label>
							<multiselect
								v-model="teacher_full_name"
								class="table-select"
								:options="teachers"
								placeholder="Tanlash"
								label="full_name"
								select-label=""
								deselect-label=""
								selected-label=""
								aria-required=""
								required
							/>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Xona</label>
							<multiselect
								v-model="room"
								class="table-select"
								:options="rooms"
								placeholder="Tanlash"
								label="name"
								select-label=""
								deselect-label=""
								selected-label=""
							/>
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Narx <span class="required-input">*</span></label>
							<input v-model="price" type="number" class="form-control form-control-sm" placeholder="Narxi" required />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Ulush</label>
							<input v-model="teacher_share" type="text" class="form-control form-control-sm" placeholder="Ulushi" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group">
							<label>Maks o'quvchi soni</label>
							<input v-model="max_students" type="number" class="form-control form-control-sm" placeholder="Maks o'quvchi soni" />
						</div>
					</div>
					<div class="col-6">
						<div class="form-group form-date-button">
							<label>Boshlangan sana <span class="required-input">*</span></label>
							<input v-model="begin_date" type="date" class="form-control form-control-sm" placeholder="Boshlangan sana" required />
							<button class="clear-date" @click="clearDate('begin_date')" v-if="begin_date">
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
							<label>Tugash sanasi</label>
							<input v-model="end_date" type="date" class="form-control form-control-sm" placeholder="Tugash sanasi" />
							<button class="clear-date" @click="clearDate('end_date')" v-if="end_date">
								<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
									<path
										d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
									/>
								</svg>
							</button>
						</div>
					</div>
					<div class="col-12">
						<div class="form-group">
							<label>Izoh</label>
							<textarea v-model="comment" class="form-control form-control-sm" placeholder="Izoh" />
						</div>
					</div>
					<div class="col-12">
						<div class="form-check">
							<input id="exampleCheck1" v-model="checkbox" type="checkbox" class="form-check-input" required />
							<label class="form-check-label" for="exampleCheck1">Aktiv <span class="required-input">*</span></label>
						</div>
					</div>
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
import moment from 'moment'
import 'vue-multiselect/dist/vue-multiselect.min.css'
require('moment/locale/uz-latn')

export default {
	name: 'Groups',
	components: {
		BModal,
		BPagination,
		Multiselect,
	},
	filters: {
		formatDate(date) {
			if (date) return moment(date).format('DD.MM.Y')

			return '-'
		}
	},
	data() {
		return {
			groups: [],
			groupsSelect: [],
			places: [],
			subjects: [],
			stages: [],
			rooms: [],
			teachers: [],
			number: null,
			stageSelected: null,
			teacher_full_name: null,
			price: null,
			teacher_share: null,
			max_students: null,
			begin_date: null,
			end_date: null,
			checkbox: false,
			room: null,
			subjectSelected: null,
			comment: null,
			place_id: null,
			name: null,
			capacity: null,
			id: null,
			filter: {
				groups: [],
				number: null,
				stageSelected: null,
				teacher_full_name: null,
				price: null,
				teacher_share: null,
				max_students: null,
				begin_date: null,
				end_date: null,
				room: null,
				subjectSelected: null
			},
			page: 1,
			limit: 10,
			totalPages: null
		}
	},
	created() {
		this.loadGroups()
		this.loadGroupsSelect()
		this.loadSubjects()
		this.loadStages()
		this.loadRooms()
		this.loadTeachers()
	},
	methods: {
		clearDate(input) {
			if (input === 'begin_date') {
				this.begin_date = null
				this.filter.begin_date = null
				this.loadGroups()
			} else if (input === 'end_date') {
				this.end_date = null
				this.filter.end_date = null
				this.loadGroups()
			} else {
				this.filter[input] = null
				this.loadGroups()
			}
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
		loadGroups(skip = 0) {
			const query = {}

			if (this.filter.number) query.number = this.filter.number.number
			if (this.filter.stageSelected) query.stage_id = this.filter.stageSelected.id
			if (this.filter.subjectSelected) query.subject_id = this.filter.subjectSelected.id
			if (this.filter.begin_date) query.begin_date = this.filter.begin_date
			if (this.filter.end_date) query.end_date = this.filter.end_date
			if (this.filter.teacher_full_name) query.teacher_id = this.filter.teacher_full_name.id
			if (this.filter.price) query.price = this.filter.price
			if (this.filter.teacher_share) query.teacher_share = this.filter.teacher_share
			if (this.filter.max_students) query.max_students = this.filter.max_students

			const queryString = Object.keys(query)
				.map(key => key + '=' + query[key])
				.join('&')

			get(`/groups?${queryString}&limit=${this.limit}&skip=${skip}`).then(response => {
				if (response.data.success) {
					this.groups = response.data.data
					this.totalPages = response.data.total
				}
			})
		},
		loadGroupsSelect() {
			get('/groups').then(response => {
				if (response.data.success) {
					this.groupsSelect = response.data.data
				}
			})
		},
		loadSubjects() {
			get('/subjects').then(response => {
				if (response.data.success) {
					this.subjects = response.data.data
				}
			})
		},
		loadStages() {
			get('/stages').then(response => {
				if (response.data.success) {
					this.stages = response.data.data
				}
			})
		},
		loadRooms() {
			get('/rooms').then(response => {
				if (response.data.success) {
					this.rooms = response.data.data
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
		openModal(group = false) {
			this.$refs['my-modal'].show()

			const stages = this.stages[group.stage_id - 1]

			if (group) {
				;(this.id = group.id),
					(this.checkbox = group.status !== 0),
					(this.number = group.number),
					(this.subjectSelected = group.subject),
					(this.stageSelected = stages),
					(this.teacher_full_name = group.teacher),
					(this.room = group.room),
					(this.price = group.price),
					(this.teacher_share = group.teacher_share),
					(this.max_students = group.max_students),
					(this.begin_date = group.begin_date ? moment(group.begin_date).format('Y-MM-DD') : null),
					(this.end_date = group.end_date ? moment(group.end_date).format('Y-MM-DD') : null),
					(this.comment = group.description)
			}
		},
		submitForm(e) {
			e.preventDefault()
			if (!this.number && !this.price && !this.begin_date && !this.status && !this.subject_id && !this.teacher_id) {
				this.nofity('Xato', "Hamma majburiy qatorni to'ldiring", 'danger')
				return false
			}

			if (!this.id) {
				post('/groups', {
					number: this.number ? this.number : null,
					price: this.price ? this.price : null,
					subject_id: this.subjectSelected ? this.subjectSelected.id : null,
					stage_id: this.stageSelected ? this.stageSelected.id : null,
					teacher_id: this.teacher_full_name ? this.teacher_full_name.id : null,
					room_id: this.room ? this.room.id : null,
					teacher_share: this.teacher_share ? this.teacher_share : null,
					max_students: this.max_students ? this.max_students : null,
					begin_date: this.begin_date ? moment(this.begin_date).format('Y-MM-DD') : null,
					end_date: this.end_date ? moment(this.end_date).format('Y-MM-DD') : null,
					status: this.checkbox ? 1 : 0,
					description: this.comment ? this.comment : null
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.loadGroups((this.page - 1) * this.limit)
					}
				})
			} else {
				put(`/groups/${this.id}`, {
					number: this.number,
					price: this.price,
					subject_id: this.subjectSelected ? this.subjectSelected.id : null,
					stage_id: this.stageSelected ? this.stageSelected.id : null,
					teacher_id: this.teacher_full_name ? this.teacher_full_name.id : null,
					room_id: this.room ? this.room.id : null,
					teacher_share: this.teacher_share,
					max_students: this.max_students,
					begin_date: this.begin_date ? moment(this.begin_date).format('Y-MM-DD') : null,
					end_date: this.end_date ? moment(this.end_date).format('Y-MM-DD') : null,
					status: this.checkbox ? 1 : 0,
					description: this.comment
				}).then(response => {
					if (response.data.success) {
						this.nofity('Success', 'Muvaffaqiyatli', 'success')
						this.resetForm()
						this.$refs['my-modal'].hide()
						this.loadGroups((this.page - 1) * this.limit)
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
						del('/groups/' + id).then(response => {
							if (response.data.success) {
								this.nofity('Success', 'Muvaffaqiyatli', 'success')
								this.loadGroups((this.page - 1) * this.limit)
							}
						})
					}
				})
		},
		resetForm() {
			// this.id = null
			this.number = null
			this.price = null
			this.subjectSelected = null
			this.stageSelected = null
			this.teacher_full_name = null
			this.room = null
			this.price = null
			this.teacher_share = null
			this.max_students = null
			this.begin_date = null
			this.end_date = null
			this.checkbox = false
			this.comment = null
		}
	},
	watch: {
		['page']() {
			this.loadGroups((this.page - 1) * this.limit)
		},
		limit() {
			this.loadGroups()
		}
	}
}
</script>

<style scoped>
table{
  counter-reset: Serial;
}
.auto-index td:first-child:before
{
  counter-increment: Serial;      /* Increment the Serial counter */
  content: counter(Serial); /* Display the counter */
}
.required-input {
	font-weight: bold;
	color: red;
}
</style>
