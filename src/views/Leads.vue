<template>
	<div>
		<div class="card shadow">
			<div class="card-header d-flex justify-content-between align-items-center overflow-x-scroll">
				<div class="title font-weight-bold "><B>LIDLAR</B></div>
			</div>
			<div class="card-body d-flex justify-content-between overflow-x-scroll">
				<!--- 1-blok --->
				<div class="registered rounded-lg d-inline justify-content-center overflow-y-scroll p-1"  onmouseover="this.style.border='2px solid gray';" onmouseout="this.style.border='transparent';">

					<div class="title d-flex justify-content-between ">
						<div class="text  font-weight-bold text-primary ml-1" style="margin-top: 15px"><b>Ro'yxatdan o'tganlar</b></div>

						<div>
							<button
								class="btn btn-flat-primary btn-lg mb-1"
								@click=""
							>
								<feather-icon class="text-dark" icon="PlusIcon" />
							</button>
							<b-dropdown no-caret variant="flat-primary" >
								<template #button-content>
									<button
										class="btn"
										@click=""
									>
										<feather-icon class="text-dark" icon="MenuIcon" />
									</button>
								</template>

								<b-dropdown-item
									variant="primary"
								> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowRightIcon" /> &nbsp; O'ngdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowLeftIcon" /> &nbsp; Chapdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
								</b-dropdown-item>
							</b-dropdown>

							<b-dropdown no-caret  variant="flat-primary" size="sm" >
								<b-dropdown-item
									variant="primary"
								>Edit
								</b-dropdown-item>
								<b-dropdown-item
									variant="danger"
									@click=""
								>Delete</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
					<!--- 1-card --->
					<draggable class="draggable-list" :list="list1" group="my-group">
						<div class="list-item" v-for="element in list1" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name7" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>

					<!--- 2-card --->
					<draggable class="draggable-list" :list="list1" group="my-group">
						<div class="list-item" v-for="element in list1" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>

					<!--- 3-card --->
					<div  class="card d-flex p-0" >
						<div class="card-header">
							<div class="title">
								<b>{{ teacher }} / {{ subject }}</b>

							</div>
							<div class="icons">
								<b-dropdown no-caret class="past" variant="gradient-primary" >
									<template #button-content>
										<feather-icon class="text-light" icon="MenuIcon" />
									</template>
									<b-dropdown-item
										variant="primary"
									> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
									</b-dropdown-item>
								</b-dropdown>

							</div>
						</div>

						<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
							<b-table hover  :fields="fields" :items="items" responsive class="text-center">
								<!-- A virtual column -->
								<template #cell(index)="data">
									{{ data.index + 1 }}
								</template>

								<!-- A custom formatted column -->
								<template #cell(name)="data">
									<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
								</template>

								<!-- A virtual composite column -->
								<template #cell(nameage)="data">
									{{ data.item.name.first }} is {{ data.item.age }} years old
								</template>

								<!-- Optional default data cell scoped slot -->
								<template #cell(Tahrirlash)="data">
									<button class="btn btn-group btn-group-sm d-flex" >
										<button
											class="btn btn-outline-info"
											@click=""
										>
											<feather-icon  icon="EyeIcon" />
										</button>
										<button
											class="btn btn-outline-danger"
											style="margin-left: 3px"
											@click=""
										>
											<feather-icon  icon="TrashIcon" />
										</button>
									</button>
								</template>
							</b-table>
						</div>
					</div>
				</div>

				<!--- 2-blok --->
				<div class="entered rounded-lg d-inline justify-content-center overflow-y-scroll p-1"  onmouseover="this.style.border='2px solid gray';" onmouseout="this.style.border='transparent';">

					<div class="title d-flex justify-content-between ">
						<div class="text  font-weight-bold text-primary ml-1" style="margin-top: 15px"><b>Ro'yxatdan o'tganlar</b></div>

						<div>
							<button
								class="btn btn-flat-primary btn-lg mb-1"
								@click=""
							>
								<feather-icon class="text-dark" icon="PlusIcon" />
							</button>
							<b-dropdown no-caret variant="flat-primary" >
								<template #button-content>
									<button
										class="btn"
										@click=""
									>
										<feather-icon class="text-dark" icon="MenuIcon" />
									</button>
								</template>

								<b-dropdown-item
									variant="primary"
								> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowRightIcon" /> &nbsp; O'ngdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowLeftIcon" /> &nbsp; Chapdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
								</b-dropdown-item>
							</b-dropdown>

							<b-dropdown no-caret  variant="flat-primary" size="sm" >
								<b-dropdown-item
									variant="primary"
								>Edit
								</b-dropdown-item>
								<b-dropdown-item
									variant="danger"
									@click=""
								>Delete</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
					<!--- 1-card --->
					<draggable class="draggable-list" :list="list2" group="my-group">
						<div class="list-item" v-for="element in list2" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name5" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>

					<!--- 2-card --->
					<draggable class="draggable-list" :list="list2" group="my-group">
						<div class="list-item" v-for="element in list2" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name6" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>


					<!--- 3-card --->
					<div  class="card d-flex p-0" >
						<div class="card-header">
							<div class="title">
								<b>{{ teacher }} / {{ subject }}</b>

							</div>
							<div class="icons">
								<b-dropdown no-caret class="past" variant="gradient-primary" >
									<template #button-content>
										<feather-icon class="text-light" icon="MenuIcon" />
									</template>
									<b-dropdown-item
										variant="primary"
									> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
									</b-dropdown-item>
								</b-dropdown>

							</div>
						</div>

						<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
							<b-table hover  :fields="fields" :items="items" responsive class="text-center">
								<!-- A virtual column -->
								<template #cell(index)="data">
									{{ data.index + 1 }}
								</template>

								<!-- A custom formatted column -->
								<template #cell(name)="data">
									<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
								</template>

								<!-- A virtual composite column -->
								<template #cell(nameage)="data">
									{{ data.item.name.first }} is {{ data.item.age }} years old
								</template>

								<!-- Optional default data cell scoped slot -->
								<template #cell(Tahrirlash)="data">
									<button class="btn btn-group btn-group-sm d-flex" >
										<button
											class="btn btn-outline-info"
											@click=""
										>
											<feather-icon  icon="EyeIcon" />
										</button>
										<button
											class="btn btn-outline-danger"
											style="margin-left: 3px"
											@click=""
										>
											<feather-icon  icon="TrashIcon" />
										</button>
									</button>
								</template>
							</b-table>
						</div>
					</div>
				</div>

				<!--- 3-blok --->
				<div class="ignored rounded-lg d-inline justify-content-center overflow-y-scroll p-1"  onmouseover="this.style.border='2px solid gray';" onmouseout="this.style.border='transparent';">

					<div class="title d-flex justify-content-between ">
						<div class="text  font-weight-bold text-primary ml-1" style="margin-top: 15px"><b>Ro'yxatdan o'tganlar</b></div>

						<div>
							<button
								class="btn btn-flat-primary btn-lg mb-1"
								@click=""
							>
								<feather-icon class="text-dark" icon="PlusIcon" />
							</button>
							<b-dropdown no-caret variant="flat-primary" >
								<template #button-content>
									<button
										class="btn"
										@click=""
									>
										<feather-icon class="text-dark" icon="MenuIcon" />
									</button>
								</template>

								<b-dropdown-item
									variant="primary"
								> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowRightIcon" /> &nbsp; O'ngdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="ArrowLeftIcon" /> &nbsp; Chapdan
								</b-dropdown-item>
								<b-dropdown-item
									variant="primary"
									@click=""
								><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
								</b-dropdown-item>
							</b-dropdown>

							<b-dropdown no-caret  variant="flat-primary" size="sm" >
								<b-dropdown-item
									variant="primary"
								>Edit
								</b-dropdown-item>
								<b-dropdown-item
									variant="danger"
									@click=""
								>Delete</b-dropdown-item>
							</b-dropdown>
						</div>
					</div>
					<!--- 1-card --->
					<draggable class="draggable-list" :list="list3" group="my-group">
						<div class="list-item" v-for="element in list3" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name1" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>

					<!--- 2-card --->
					<draggable class="draggable-list" :list="list3" group="my-group">
						<div class="list-item" v-for="element in list3" :key="element.name">
							{{ element.name }}
							<div  class="card d-flex p-0" >
								<div class="card-header">
									<div class="title">
										<div class="field">
											<span class="field-value" v-show="!showField('name')" @click="focusField('name')">{{user.name}}</span>
											<b><input placeholder="Fan / Ustoz / Guruh" v-model="user.name" v-show="showField('name')" id="user-name2" type="text" class="field-value form-control" @focus="focusField('name')" @blur="blurField"></b>
										</div>

									</div>
									<div class="icons">
										<b-dropdown no-caret class="past" variant="gradient-primary" >
											<template #button-content>
												<feather-icon class="text-light" icon="MenuIcon" />
											</template>
											<b-dropdown-item
												variant="primary"
											> <feather-icon class="text-primary" icon="EditIcon"  /> &nbsp; Tahrirlash
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
											</b-dropdown-item>
											<b-dropdown-item
												variant="primary"
												@click=""
											><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
											</b-dropdown-item>
										</b-dropdown>

									</div>
								</div>

								<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
									<b-table hover  :fields="fields" :items="items" responsive class="text-center">
										<!-- A virtual column -->
										<template #cell(index)="data">
											{{ data.index + 1 }}
										</template>

										<!-- A custom formatted column -->
										<template #cell(name)="data">
											<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
										</template>

										<!-- A virtual composite column -->
										<template #cell(nameage)="data">
											{{ data.item.name.first }} is {{ data.item.age }} years old
										</template>

										<!-- Optional default data cell scoped slot -->
										<template #cell(Tahrirlash)="data">
											<button class="btn btn-group btn-group-sm d-flex" >
												<button
													class="btn btn-outline-info"
													@click=""
												>
													<feather-icon  icon="EyeIcon" />
												</button>
												<button
													class="btn btn-outline-danger"
													style="margin-left: 3px"
													@click=""
												>
													<feather-icon  icon="TrashIcon" />
												</button>
											</button>
										</template>
									</b-table>
								</div>
							</div>
						</div>
					</draggable>


					<!--- 3-card --->
					<div  class="card d-flex p-0" >
						<div class="card-header">
							<div class="title">
								<b>{{ teacher }} / {{ subject }}</b>

							</div>
							<div class="icons">
								<b-dropdown no-caret class="past" variant="gradient-primary" >
									<template #button-content>
										<feather-icon class="text-light" icon="MenuIcon" />
									</template>
									<b-dropdown-item
										variant="primary"
									> <feather-icon class="text-primary" icon="EditIcon" /> &nbsp; Tahrirlash
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="PlusIcon" /> &nbsp; Qo'shish
									</b-dropdown-item>
									<b-dropdown-item
										variant="primary"
										@click=""
									><feather-icon class="text-primary" icon="LinkIcon" /> &nbsp; Link
									</b-dropdown-item>
								</b-dropdown>

							</div>
						</div>

						<div class="card-body" style="box-shadow: 0px 8px 24px -6px rgba(0, 0, 0, 0.15); border-radius: 15px; padding: 25px;">
							<b-table hover  :fields="fields" :items="items" responsive class="text-center">
								<!-- A virtual column -->
								<template #cell(index)="data">
									{{ data.index + 1 }}
								</template>

								<!-- A custom formatted column -->
								<template #cell(name)="data">
									<b>{{ data.value.first }}</b>	<b>{{ data.value.last}}</b>
								</template>

								<!-- A virtual composite column -->
								<template #cell(nameage)="data">
									{{ data.item.name.first }} is {{ data.item.age }} years old
								</template>

								<!-- Optional default data cell scoped slot -->
								<template #cell(Tahrirlash)="data">
									<button class="btn btn-group btn-group-sm d-flex" >
										<button
											class="btn btn-outline-info"
											@click=""
										>
											<feather-icon  icon="EyeIcon" />
										</button>
										<button
											class="btn btn-outline-danger"
											style="margin-left: 3px"
											@click=""
										>
											<feather-icon  icon="TrashIcon" />
										</button>
									</button>
								</template>
							</b-table>
						</div>
					</div>
				</div>
			</div>
		</div>



	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { BFormSelect, BCard, BButton, BFormGroup, BFormInput, BModal, BTable, BDropdown, BDropdownItem } from 'bootstrap-vue'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import draggable from "vuedraggable"
require('moment/locale/uz-latn')

export default {
	name: 'Leads',
	components: {
		BFormSelect,
		BTable,
		BCard,
		BButton,
		BFormGroup,
		BFormInput,
		BDropdown,
		BDropdownItem,
		BModal,
		Multiselect,
		draggable,
	},
	data() {
		return {
			fields: [
				// A virtual column that doesn't exist in items
				'index',
				// A column that needs custom formatting
				{ key: 'name', label: 'F.I.Sh' },
				// A regular column
				'Tahrirlash',
				// A virtual column made up from two fields
			],
			user : {
				name: '',
				email: ''
			},
			editField : '',
			items: [
				{ name: { first: 'Name', last: 'Surname' }},
				{ name: { first: 'Name', last: 'Surname' }},
				{ name: { first: 'Name', last: 'Surname' }},
				{ name: { first: 'Name', last: 'Surname' }}
			],
			subject: 'Fan',
			teacher: 'Ustoz',
			group: 'Guruhi',
			list1: [{ name: "" }],
			list2: [{ name: "" }],
			list3: [{ name: "" }],

		}
	},
	methods: {
		focusField(name){
			this.editField = name;
		},
		blurField(){
			this.editField = '';
		},
		showField(name){
			return (this.user[name] == '' || this.editField == name)
		}
	}
}
</script>

<style>
.registered {
	max-width: 510px;
	max-height: 750px;
}
.ignored {
	max-width: 510px;
	max-height: 750px;
}
.entered {
	max-width: 510px;
	max-height: 750px;
}
.past {
	margin-right: 30px;
}


</style>