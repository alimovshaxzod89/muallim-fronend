<template>
	<div>
		<v-row>
			<v-col
				cols='12'
				md='3'
				sm='6'
				order='1'
				class='align-self-end'
			>
				<statistics-card-with-images
					:avatar='ratingsOptions.avatar'
					:avatar-width='ratingsOptions.avatarWidth'
					:chip-color='ratingsOptions.chipColor'
					:chip-text='ratingsOptions.chipText'
					:statistics='selectsDatas.student'
					:stat-title='ratingsOptions.statTitle'
				></statistics-card-with-images>
			</v-col>

			<v-col
				cols='12'
				md='3'
				sm='6'
				order='2'
				class='align-self-end'
			>
				<statistics-card-with-images
					:avatar='sessionsOptions.avatar'
					:avatar-width='sessionsOptions.avatarWidth'
					:chip-color='sessionsOptions.chipColor'
					:chip-text='sessionsOptions.chipText'
					:statistics='selectsDatas.group'
					:stat-title='sessionsOptions.statTitle'
				></statistics-card-with-images>
			</v-col>

			<v-col
				cols='12'
				md='3'
				sm='6'
				order='3'
				class='align-self-end'
			>
				<statistics-card-with-images
					:avatar='sessionsOptions2.avatar'
					:avatar-width='sessionsOptions2.avatarWidth'
					:chip-color='sessionsOptions2.chipColor'
					:chip-text='sessionsOptions2.chipText'
					:statistics='selectsDatas.lead'
					:stat-title='sessionsOptions2.statTitle'
				></statistics-card-with-images>
			</v-col>

			<v-col
				cols='12'
				md='3'
				sm='6'
				order='2'
				class='align-self-end'
			>
				<statistics-card-with-images
					:avatar='ratingsOptions2.avatar'
					:avatar-width='ratingsOptions2.avatarWidth'
					:chip-color='ratingsOptions2.chipColor'
					:chip-text='ratingsOptions2.chipText'
					:statistics='selectsDatas.teacher'
					:stat-title='ratingsOptions2.statTitle'
				></statistics-card-with-images>
			</v-col>
		</v-row>

		<div v-if='USER_ROLE && ["manager", "director", "admin", "founder", "Direktor"].includes(USER_ROLE)'>
			<v-row>

				<v-col cols='6' order='1'>

					<v-card>
						<v-card-text>
							<h2>{{ `${filter.year}-${filter.month}-01` | year_month }}</h2>
							<hr>

							<v-simple-table>
								<template v-slot:default>
									<tbody>
									<tr>
										<td><h3>Oylik to'lov:</h3></td>
										<td style='text-align: right; white-space: nowrap;'>
											<span v-if='payment'>{{ payment.amount | summa }}</span></td>
									</tr>
									<tr>
										<td><h3>Shundan to'landi:</h3></td>
										<td style='text-align: right; white-space: nowrap;'>
											<span v-if='payment'>{{ payment.paid | summa }}</span>
										</td>
									</tr>
									<tr>
										<td><h3>Shundan qarzdorlar:</h3></td>
										<td style='text-align: right; white-space: nowrap;'>
											<span v-if='payment'>{{ (payment.amount - payment.paid) | summa }}</span></td>
									</tr>
									</tbody>
								</template>
							</v-simple-table>
							<br>

						</v-card-text>
					</v-card>

				</v-col>

			</v-row>

			<v-row>
				<v-col cols='6' order='6'>
					<v-card>
						<v-card-text>
							<h2>Tushumlar oylar bo'yicha: {{ filter.year }}</h2>
							<hr>

							<v-simple-table>
								<template v-slot:default>
									<tbody>
									<tr v-for='item in paidByMonth'>
										<td><h4>{{ `${item.year}-${item.month}-01` | year_month }}</h4></td>
										<td style='text-align: right; white-space: nowrap;'>
											<span>{{ item.amount | summa }}</span></td>
									</tr>
									<tr v-if='paidByMonth'>
										<td><h4>Jami:</h4></td>
										<td style='text-align: right; white-space: nowrap;'>
											<b>{{ paidByMonth.reduce((s, item) => s += item.amount, 0) | summa }}</b>
										</td>
									</tr>
									</tbody>
								</template>
							</v-simple-table>

						</v-card-text>
					</v-card>
				</v-col>

				<v-col cols='6' order='7'>
					<v-card>
						<v-card-text>
							<h2>
								Tushumlar kunlar bo'yicha:
								<span v-if='filter.month'> {{ filter.month | month }}</span>
								<span v-if='filter.year'> {{ filter.year | year }}</span>
							</h2>
							<hr>

							<v-simple-table>
								<template v-slot:default>
									<tbody>
									<tr v-for='item in paidByDate'>
										<td><h4>{{ item.date | date_month }}</h4></td>
										<td style='text-align: right; white-space: nowrap;'>
											<span>{{ item.amount | summa }}</span></td>
									</tr>
									<tr v-if='paidByDate'>
										<td><h4>Jami:</h4></td>
										<td style='text-align: right; white-space: nowrap;'>
											<b>{{ paidByDate.reduce((s, item) => s += item.amount, 0) | summa }}</b>
										</td>
									</tr>
									</tbody>
								</template>
							</v-simple-table>

						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</div>

		<!--			<v-col-->
		<!--				cols='12'-->
		<!--				md='6'-->
		<!--				sm='12'-->
		<!--				order='6'-->
		<!--			>-->
		<!--				<crm-sales-overview></crm-sales-overview>-->
		<!--			</v-col>-->

		<!--			<v-col-->
		<!--				cols='12'-->
		<!--				md='6'-->
		<!--				sm='12'-->
		<!--				order='6'-->
		<!--			>-->
		<!--				<crm-subjects-overview></crm-subjects-overview>-->
		<!--			</v-col>-->

		<!--    <v-row>-->
		<!--      <v-col-->
		<!--        cols="12"-->
		<!--        sm="6"-->
		<!--        md="4"-->
		<!--      >-->
		<!--        <crm-weekly-sales></crm-weekly-sales>-->
		<!--      </v-col>-->

		<!--      <v-col-->
		<!--        cols="12"-->
		<!--        md="2"-->
		<!--      >-->
		<!--        <v-row>-->
		<!--          <v-col-->
		<!--            cols="12"-->
		<!--            sm="6"-->
		<!--            md="12"-->
		<!--          >-->
		<!--            <statistics-card-area-chart-->
		<!--              :stat-title="growthAreaChart.statTitle"-->
		<!--              :statistics="growthAreaChart.statistics"-->
		<!--              :chart-series="growthAreaChart.series"-->
		<!--              chart-height="100"-->
		<!--            ></statistics-card-area-chart>-->
		<!--          </v-col>-->
		<!--          <v-col-->
		<!--            cols="12"-->
		<!--            sm="6"-->
		<!--            md="12"-->
		<!--          >-->
		<!--            <statistics-card-vertical-->
		<!--              :change="newProjectOptions.change"-->
		<!--              :color="newProjectOptions.color"-->
		<!--              :icon="newProjectOptions.icon"-->
		<!--              :statistics="newProjectOptions.statistics"-->
		<!--              :stat-title="newProjectOptions.statTitle"-->
		<!--              :subtitle="newProjectOptions.subtitle"-->
		<!--            ></statistics-card-vertical>-->
		<!--          </v-col>-->
		<!--        </v-row>-->
		<!--      </v-col>-->
		<!--			-->
		<!--    </v-row>-->

	</div>
</template>

<script>
import StatisticsCardVertical from '@/@core/components/statistics-card/StatisticsCardVertical.vue'
import CrmSubjectsOverview from '@/views/dashboards/crm/CrmSubjectsOverview'
import CrmTotalOutcomes from '@/views/dashboards/crm/CrmTotalOutcomes'
import StatisticsCardAreaChart from '@core/components/statistics-card/StatisticsCardAreaChart.vue'
import StatisticsCardWithImages from '@core/components/statistics-card/StatisticsCardWithImages.vue'
// icons
import CrmActivityTimeline from './CrmActivityTimeline.vue'
import CrmCardDeveloperMeetup from './CrmCardDeveloperMeetup.vue'
import CrmCardMeetingSchedule from './CrmCardMeetingSchedule.vue'
import CrmCardUpgradePlan from './CrmCardUpgradePlan.vue'
import CrmRevenueReport from './CrmRevenueReport.vue'
import CrmSalesOverview from './CrmSalesOverview.vue'
// demos
import CrmStatisticsCard from './CrmStatisticsCard.vue'
import CrmTotalSales from './CrmTotalSales.vue'
import CrmWeeklySales from './CrmWeeklySales.vue'

import { mdiLabelVariantOutline } from '@mdi/js'
import { computed, ref, watch } from '@vue/composition-api'
import axios from '@axios'
import store from '@/store'
import moment from 'moment'

export default {
	components: {
		StatisticsCardWithImages,
		StatisticsCardAreaChart,
		StatisticsCardVertical,

		CrmStatisticsCard,
		CrmTotalSales,
		CrmTotalOutcomes,
		CrmRevenueReport,
		CrmSalesOverview,
		CrmActivityTimeline,
		CrmWeeklySales,
		CrmCardUpgradePlan,
		CrmCardMeetingSchedule,
		CrmCardDeveloperMeetup,
		CrmSubjectsOverview,
	},
	setup() {
		const branch_id = computed(() => store.state.branch_id)

		// card with images
		const ratingsOptions = {
			statTitle: 'Talabalar',
			chipText: '2022-yil',
			chipColor: 'primary',
			avatar: require('@/assets/images/avatars/9.png'),
			avatarWidth: '111',
		}
		const sessionsOptions = {
			statTitle: 'Guruhlar',
			chipText: '2022-yil',
			chipColor: 'primary',
			avatar: require('@/assets/images/avatars/10.png'),
			avatarWidth: '86',
		}
		const sessionsOptions2 = {
			statTitle: 'Lidlar',
			chipText: '2022-yil',
			chipColor: 'success',
			avatar: require('@/assets/images/avatars/9.png'),
			avatarWidth: '111',
		}
		const ratingsOptions2 = {
			statTitle: 'Ustozlar',
			chipText: '2022-yil',
			chipColor: 'primary',
			avatar: require('@/assets/images/avatars/10.png'),
			avatarWidth: '86',
		}

		const growthAreaChart = {
			statTitle: 'Total Growth',
			series: [
				{
					name: 'Subscribers',
					data: [28, 40, 36, 52, 38, 60, 55],
				},
			],
		}

		// vertical card options
		const newProjectOptions = {
			statTitle: 'New Project',
			icon: mdiLabelVariantOutline,
			color: 'primary',
			subtitle: 'Yearly Project',
		}

		const clearParams = (params) => {
			return Object.keys(params)
				.filter((key) => params[key] !== null && params[key] !== '')
				.reduce((obj, key) => {
					return Object.assign(obj, {
						[key]: params[key],
					})
				}, {})
		}

		//

		const selectsDatas = ref({
			student: null,
			group: null,
			teacher: null,
			lead: null,
		})
		const loadStudents = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios
				.get('/api/students', { params })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.student = response.data.data.length
					}
				})
				.catch(error => console.log(error))
		}
		const loadGroups = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios
				.get('/api/groups', { params })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.group = response.data.data.length
					}
				})
				.catch(error => console.log(error))
		}
		const loadTeachers = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios
				.get('/api/teachers', { params })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.teacher = response.data.data.length
					}
				})
				.catch(error => console.log(error))
		}
		const loadLeads = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios
				.get('/api/leads', { params })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.lead = response.data.data.length
					}
				})
				.catch(error => console.log(error))
		}
		loadGroups()
		loadStudents()
		loadTeachers()
		loadLeads()

		const filter = ref({
			year: moment().format('Y'),
			month: moment().format('M'),
			place_id: branch_id.value,
		})
		watch(branch_id, val => filter.value.place_id = val)

		const payment = ref({})
		const loadPayment = () => {
			const params = clearParams({
				year: filter.value.year,
				month: filter.value.month,
				place_id: filter.value.place_id,
			})
			axios
				.get('/api/statistics/payment', { params })
				.then(response => {
					payment.value = response.data.data
				})
				.catch(error => console.log(error))
		}
		loadPayment()

		const paidByMonth = ref([])
		const loadPaidByMonth = () => {
			const params = clearParams({
				year: filter.value.year,
				place_id: filter.value.place_id,
			})
			axios
				.get('/api/statistics/paid-by-month', { params })
				.then(response => {
					paidByMonth.value = response.data.data
				})
				.catch(error => console.log(error))
		}
		loadPaidByMonth()

		const paidByDate = ref([])
		const loadPaidByDate = () => {
			const params = clearParams({
				year: filter.value.year,
				month: filter.value.month,
				place_id: filter.value.place_id,
			})
			axios
				.get('/api/statistics/paid-by-date', { params })
				.then(response => {
					paidByDate.value = response.data.data
				})
				.catch(error => console.log(error))
		}
		loadPaidByDate()

		watch(() => filter.value.place_id, () => {
			loadPayment()
			loadPaidByMonth()
			loadPaidByDate()
		})
		watch(() => filter.value.year, () => {
			loadPayment()
			loadPaidByMonth()
			loadPaidByDate()
		})
		watch(() => filter.value.month, () => {
			loadPayment()
			loadPaidByDate()
		})

		return {
			ratingsOptions,
			sessionsOptions,
			ratingsOptions2,
			sessionsOptions2,
			growthAreaChart,
			newProjectOptions,
			selectsDatas,

			filter,
			payment,
			paidByMonth,
			paidByDate,
		}
	},
}
</script>
