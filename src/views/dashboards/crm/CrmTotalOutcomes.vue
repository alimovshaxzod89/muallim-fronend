<template>
  <v-card>
    <v-card-title class="align-start flex-nowrap">
      <div>
        <p class="text-sm font-weight-semibold mb-2 ">
          Markaz Xarajatlari
        </p>
        <p class="text-no-wrap">
          <span class="text-2xl font-weight-semibold me-1">{{totalMoney_id()}}</span>
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
import axios from '@axios'
import { getVuetify } from '@core/utils'
import { mdiChevronUp, mdiDotsVertical } from '@mdi/js'
import { ref } from '@vue/composition-api'

export default {
  components: {
    VueApexCharts: () => import('vue-apexcharts'),
  },
  setup() {
    // //form options for selects
    const selectsDatas = ref({
      cost: null,
    })
    // ! METHODS
    const loadCost = () => {
      axios
        .get('/api/cashes')
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.cost = response.data.data
          }
        })
        .catch(error => console.log(error))
    }
    loadCost()

    const totalMoney_id = () => {
      return selectsDatas.value.cost.reduce((a, c) => a + c.money_id, 0)
    }
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
      colors: [$vuetify.theme.currentTheme.warning],
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

    return {
      chartOptions,
      chartData,
      selectsDatas,
      totalMoney_id,

      icons: {
        mdiDotsVertical,
        mdiChevronUp,
      },
    }
  },
}
</script>
