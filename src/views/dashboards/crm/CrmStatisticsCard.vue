<template>
  <v-card>
    <v-card-title class="align-start">
      <span class="font-weight-semibold">Qarzdorlar</span>

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

    <v-card-subtitle class='mb-1'>

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
            rounded
            class="elevation-1"
          >
          </v-avatar>

          <div class="ms-3">
            <p class="text-xs mb-0">
              {{ data.title }}
            </p>
            <h2 class=" font-weight-bold bg-primary">
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
import { mdiAccountOutline, mdiTrendingUp, mdiDotsVertical, mdiLabelOutline, mdiCashMultiple, mdiTicketPercentOutline, mdiCurrencyUsd } from '@mdi/js'

export default {
  setup() {
		const selectedYear = '2022'
		const selectedMonth = 'Yanvar'
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
      if (data === 'Talabalar to\'lashi zarur') return { icon: mdiTrendingUp,  }
      if (data === 'Ustozlardan qarz') return { icon: mdiAccountOutline,  }
      if (data === 'Ustozlar mablag\'i') return { icon: mdiLabelOutline,  }
			if (data === 'Talabalar qarzi') return { icon: mdiCashMultiple,  }
			if (data === 'Markaz ulushi') return { icon: mdiTicketPercentOutline,  }
			if (data === 'Markaz ololmayotgan summa') return { icon: mdiCurrencyUsd,  }

      return { icon: mdiAccountOutline,  }
    }

    return {
      statisticsData,
			selectedYear,
			selectedMonth,
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
