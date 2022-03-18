<template>
  <div class="container">
    <div style="margin-bottom: 15px">
      <b-form-select
        v-model="year"
        :options="yearOptions"
        style="width: 100px"
      ></b-form-select>
      <b-form-select
        v-model="month"
        :options="monthOptions"
        style="width: 200px"
      ></b-form-select>
    </div>
    <div class="row d-flex mt-1">
      <div class="col">
        <p>Talabalar to'laydigan summa:</p>
        <h3>{{ moneys.student_payment | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Talabalar qarzi:</p>
        <h3>{{ moneys.student_debt | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Talabalar qarzi:</p>
        <h3>{{ moneys.student_debt_s | formatNumber }}</h3>
      </div>
    </div>
    <div class="row d-flex mt-2">
      <div class="col">
        <p>Ustozlar oladigan summa:</p>
        <h3>{{ moneys.teachers_debt | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Ustozlar ololmayotgan summa (qarz hisobiga):</p>
        <h3>{{ moneys.debtfromteachers | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Ustozlar ololmayotgan summa (qarz hisobiga):</p>
        <h3>{{ moneys.debtfromteachers_t | formatNumber }}</h3>
      </div>
    </div>
    <div class="row d-flex mt-2">
      <div class="col">
        <p>Markaz ulushi:</p>
        <h3>{{ moneys.center_part | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Markaz ololmayotgan summa (qarz hisobiga):</p>
        <h3>{{ moneys.debtcenter | formatNumber }}</h3>
      </div>
      <div class="col">
        <p>Markaz ololmayotgan summa (qarz hisobiga):</p>
        <h3>{{ moneys.debtcenter_d | formatNumber }}</h3>
      </div>
    </div>
    <div
      class="container"
      style="margin-top: 30px"
    >
      <div class="row">
        <div class="col">
          <b-card
            no-body
            style="padding: 30px"
          >
            <b-card-header>
              <b-card-title>Latest Statistics</b-card-title>
            </b-card-header>

            <b-card-body>
              <chartjs-component-bar-chart
                :height="325"
                :data="chartjsData.latestBarChart.data"
                :options="chartjsData.latestBarChart.options"
              />
            </b-card-body>
          </b-card>
        </div>
        <div class="col">
          <b-card>
            <b-card-title class="mb-1">
              Fanlar ulushi
            </b-card-title>
            <b-card-sub-title class="mb-2">
              talabalar soni va tushum
            </b-card-sub-title>
            <vue-apex-charts
              type="donut"
              height="400"
              :options="apexChatData.donutChart.chartOptions"
              :series="apexChatData.donutChart.series"
            />
          </b-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  BFormSelect, BCard, BCardTitle, BCardSubTitle, BCardBody, BCardHeader,
} from 'bootstrap-vue'
import moment from 'moment'
import VueApexCharts from 'vue-apexcharts'
import ChartjsComponentBarChart from '@/views/charts-and-maps/charts/chartjs/charts-components/ChartjsComponentBarChart'
import chartjsData from '@/views/charts-and-maps/charts/chartjs/chartjsData'
import apexChatData from '@/views/charts-and-maps/charts/apex-chart/apexChartData'

export default {
  name: 'Home',
  components: {
    VueApexCharts,
    BFormSelect,
    BCard,
    BCardTitle,
    BCardSubTitle,
    BCardBody,
    BCardHeader,
    ChartjsComponentBarChart,
  },
  data() {
    return {
      chartjsData,
      apexChatData,
      year: moment().format('Y'),

      // month: moment().format('M'),
      month: 3,
      yearOptions: [{ value: '', text: '' }, { value: '2020', text: '2020' }, { value: '2021', text: '2021' }, {
        value: '2022',
        text: '2022',
      }],
      moneys: {
        student_payment: '36000000',
        student_debt: '12000000',
        student_debt_s: '12000000',
        teachers_debt: '14400000',
        debtfromteachers: '4800000',
        debtfromteachers_t: '4800000',
        center_part: '21600000',
        debtcenter: '7200000',
        debtcenter_d: '7200000',
      },
      monthOptions: (function () {
        const arr = [{ value: '', text: '' }]
        for (let i = 1; i <= 12; i++) {
          arr.push({ value: i, text: moment(`2000-${i}-01`).format('MMMM') })
        }

        return arr
      }()),
    }
  },
}
</script>

<style scoped>

</style>
