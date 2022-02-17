<template>
  <v-card>
    <v-card-title class="align-start flex-nowrap">
      <div>
        <p class="text-sm font-weight-semibold mb-2 ">
          Markaz Ulushi
        </p>
        <p class="text-no-wrap">
          {{ selectsDatas.center_profit }}
        </p>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        icon
        small
        class="mt-n2 me-n3"
      >
        <v-icon size="22">
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <!-- Chart -->
    <v-card-text>
      <vue-apex-charts
        height="180"
        :options="chartOptions"
        :series="chartData"
      ></vue-apex-charts>
    </v-card-text>
  </v-card>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import { mdiDotsVertical, mdiChevronUp } from '@mdi/js'
import axios from '@axios'

import { ref } from '@vue/composition-api'

import { getVuetify } from '@core/utils'

export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  setup() {
    const $vuetify = getVuetify()

    const chartOptions = {
      grid: {
        show: false,
        padding: {
          left: 0,
          top: -100,
          bottom: -10,
        },
      },
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 0.4,
          stops: [0, 100, 100],
        },
      },
      stroke: {
        width: 5,
        curve: 'smooth',
        lineCap: 'round',
      },
      colors: [$vuetify.theme.currentTheme.primary],
      legend: {
        show: false,
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        labels: {
          // show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: false,
        },
        min: 0,
      },
    }

    const chartData = [
      {
        name: 'Total Sales',
        data: [0, 258, 30, 240, 150, 400],
      },
    ]

    const selectsDatas = ref({
      center_profit: null
    })
    const loadCenterProfit = () => {
      axios
        .get('/api/center-income', {params: {itemsPerPage: -1}})
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.center_profit = response.data.data.length
            console.log(selectsDatas.value)
          }
        })
        .catch(error => console.log(error))
    }
    loadCenterProfit()

    return {
      chartOptions,
      chartData,

      icons: {
        mdiDotsVertical,
        mdiChevronUp,
      },
      selectsDatas,
    }
  },
}
</script>
