<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Statistika</span>

      <v-spacer></v-spacer>

      <v-btn
        icon
        small
        class="mt-n2 me-n3"
      >
        <v-icon class="cursor-pointer">
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-subtitle class="mb-7">

			<div class='row justify-content-between'>
				<div class='col'><v-select
					:items="years"
					label="Yil"
					outlined
				></v-select> </div>
				<div class='col'><v-select
					:items="monthes"
					label="Oy"
					outlined
				></v-select></div>
			</div>
			<span class="font-weight-semibold text--primary me-1">Umumiy 48.5% o'sish</span>
			<span>😎 joriy oy</span>
    </v-card-subtitle>

    <v-card-text>
      <v-row>
        <v-col
          v-for="data in statisticsData"
          :key="data.title"
          cols="6"
          sm="4"
          class="d-flex align-center"
        >
          <v-avatar
            size="44"
            :color="resolveStatisticsIconVariation (data.title).color"
            rounded
            class="elevation-1"
          >
            <v-icon
              dark
              color="white"
              size="30"
            >
              {{ resolveStatisticsIconVariation (data.title).icon }}
            </v-icon>
          </v-avatar>

          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h3 class="text-xl font-weight-bold">
              {{ data.total }}
            </h3>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiAccountOutline, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline, mdiCashMultiple, mdiTicketPercentOutline, mdiCurrencyUsd } from '@mdi/js'

export default {
  setup() {
		const years = ['2020', '2021', '2022']
		const monthes = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May', 'Iyun', 'Iyul', 'Avgust', 'Sentabr', 'Oktabr', 'Noyabr', 'Dekabr']

    const statisticsData = [
      {
        title: 'Talabalar to\'lashi zarur',
        total: '245k',
      },
      {
        title: 'Ustozlardan qarz',
        total: '12.5k',
      },
      {
        title: 'Ustozlar mablag\'i',
        total: '1.54k',
      },
			{
				title: 'Talabalar qarzi',
				total: '245k',
			},
			{
				title: 'Markaz ulushi',
				total: '12.5k',
			},
			{
				title: 'Markaz ololmayotgan summa',
				total: '1.54k',
			},
    ]

    const resolveStatisticsIconVariation = data => {
      if (data === 'Talabalar to\'lashi zarur') return { icon: mdiTrendingUp, color: 'primary' }
      if (data === 'Ustozlardan qarz') return { icon: mdiAccountOutline, color: 'success' }
      if (data === 'Ustozlar mablag\'i') return { icon: mdiLabelOutline, color: 'warning' }
			if (data === 'Talabalar qarzi') return { icon: mdiCashMultiple, color: 'info' }
			if (data === 'Markaz ulushi') return { icon: mdiTicketPercentOutline, color: 'warning' }
			if (data === 'Markaz ololmayotgan summa') return { icon: mdiCurrencyUsd, color: 'secondary' }

      return { icon: mdiAccountOutline, color: 'success' }
    }

    return {
      statisticsData,
			years,
			monthes,
      resolveStatisticsIconVariation,

      // icons
      icons: {
        mdiDotsVertical,
      },
    }
  },
}
</script>
