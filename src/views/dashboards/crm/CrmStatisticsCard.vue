<template>
	<v-card>
		<v-card-title class='align-start'>
			<div class=''>Qarzdorlar</div>

			<v-spacer></v-spacer>

			<v-btn
				icon
				small
				class='mt-n2 me-n3'
			>
				<v-icon class='cursor-pointer'>
					{{ icons.mdiDotsVertical }}
				</v-icon>
			</v-btn>
		</v-card-title>

		<!-- <v-card-subtitle class='mb-1'>

			<div class='row justify-content-between'>
				<div class='col'><v-select
					:items="years"
					v-model='selectedYear'

					outlined
				></v-select> </div>
				<div class='col'><v-select
					:items="monthes"
					v-model='selectedMonth'
					outlined
				></v-select></div>
			</div>
		</v-card-subtitle> -->

		<v-card-text>
			<v-row>
				<v-col
					v-for='data in statisticsData1'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ totalAmount() }}
						</h2>
					</div>

				</v-col>

				<v-col
					v-for='data in statisticsData2'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ data.total }}
						</h2>
					</div>
				</v-col>

				<v-col
					v-for='data in statisticsData3'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ data.total }}
						</h2>
					</div>
				</v-col>

				<v-col
					v-for='data in statisticsData4'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ totalDept() }}
						</h2>
					</div>
				</v-col>

				<v-col
					v-for='data in statisticsData5'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ data.total }}
						</h2>
					</div>
				</v-col>

				<v-col
					v-for='data in statisticsData6'
					:key='data.title'
					cols='6'
					sm='4'
					class='d-flex align-center'
				>
					<v-avatar
						size='44'
						rounded
						class='elevation-1'
					>
					</v-avatar>

					<div class='ms-3'>
						<p class='text-xs mb-0'>
							{{ data.title }}
						</p>
						<h2 class=' font-weight-bold bg-primary'>
							{{ data.total }}
						</h2>
					</div>
				</v-col>
			</v-row>
		</v-card-text>


	</v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
	mdiAccountOutline,
	mdiTrendingUp,
	mdiDotsVertical,
	mdiLabelOutline,
	mdiCashMultiple,
	mdiTicketPercentOutline,
	mdiCurrencyUsd,
} from '@mdi/js'
import axios from '@axios'
import { computed, ref } from '@vue/composition-api'
import store from '@/store'

export default {
	setup() {

		const branch_id = computed(() => store.state.branch_id)

		const selectedYear = '2022'
		const selectedMonth = 'Yanvar'
		const years = ['2020', '2021', '2022']
		const monthes = [
			'Yanvar',
			'Fevral',
			'Mart',
			'Aprel',
			'May',
			'Iyun',
			'Iyul',
			'Avgust',
			'Sentabr',
			'Oktabr',
			'Noyabr',
			'Dekabr',
		]

		const statisticsData1 = [
			{
				title: 'Talabalar to\'lashi zarur',
				total: '245k',
			},
		]
		const statisticsData2 = [
			{
				title: 'Ustozlardan qarz',
				total: '12.5k',
			},
		]
		const statisticsData3 = [
			{
				title: 'Ustozlar mablag\'i',
				total: '1.54k',
			},
		]
		const statisticsData4 = [
			{
				title: 'Talabalar qarzi',
				total: '245k',
			},
		]
		const statisticsData5 = [
			{
				title: 'Markaz ulushi',
				total: '12.5k',
			},
		]
		const statisticsData6 = [
			{
				title: 'Markaz ololmayotgan summa',
				total: '1.54k',
			},
		]

		const resolveStatisticsIconVariation = data => {
			if (data === 'Talabalar to\'lashi zarur') return { icon: mdiTrendingUp }
			if (data === 'Ustozlardan qarz') return { icon: mdiAccountOutline }
			if (data === 'Ustozlar mablag\'i') return { icon: mdiLabelOutline }
			if (data === 'Talabalar qarzi') return { icon: mdiCashMultiple }
			if (data === 'Markaz ulushi') return { icon: mdiTicketPercentOutline }
			if (data === 'Markaz ololmayotgan summa') return { icon: mdiCurrencyUsd }

			return { icon: mdiAccountOutline }
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

		const selectsDatas = ref({
			amount: null,
			paid: null,
			dept: null,
		})
		// methods
		const loadPayment = () => {
			const params = clearParams({
				place_id: branch_id.value,
			})
			axios
				.get('/api/payments', { params })
				.then(response => {
					if (response.data.success) {
						selectsDatas.value.amount = response.data.data
						selectsDatas.value.paid = response.data.data
					}
				})
				.catch(error => console.log(error))
		}
		loadPayment()

		const totalAmount = () => {
			return selectsDatas.value.amount.reduce((a, c) => a + c.amount, 0)
		}
		const totalPaid = () => {
			return selectsDatas.value.paid.reduce((a, c) => a + c.paid, 0)
		}
		const totalDept = () => {
			return totalAmount() - totalPaid()
		}

		return {
			statisticsData1,
			statisticsData2,
			statisticsData3,
			statisticsData4,
			statisticsData5,
			statisticsData6,
			selectedYear,
			selectedMonth,
			years,
			monthes,
			resolveStatisticsIconVariation,

			selectsDatas,
			totalAmount,
			totalPaid,
			totalDept,

			// icons
			icons: {
				mdiDotsVertical,
			},
		}
	},
}
</script>
