<template>
  <div>
    <v-row>
      <v-col
        cols="12"
        md="3"
        sm="6"
        order="1"
        class="align-self-end"
      >
        <statistics-card-with-images
          :avatar="ratingsOptions.avatar"
          :avatar-width="ratingsOptions.avatarWidth"
          :chip-color="ratingsOptions.chipColor"
          :chip-text="ratingsOptions.chipText"
          :statistics="selectsDatas.student"
          :stat-title="ratingsOptions.statTitle"
        ></statistics-card-with-images>
      </v-col>

			<v-col
				cols="12"
				md="3"
				sm="6"
				order="2"
				class="align-self-end"
			>
				<statistics-card-with-images
					:avatar="sessionsOptions.avatar"
					:avatar-width="sessionsOptions.avatarWidth"
					:chip-color="sessionsOptions.chipColor"
					:chip-text="sessionsOptions.chipText"
					:statistics="selectsDatas.group"
					:stat-title="sessionsOptions.statTitle"
				></statistics-card-with-images>
			</v-col>

			<v-col
        cols="12"
        md="3"
        sm="6"
        order="3"
        class="align-self-end"
      >
        <statistics-card-with-images
          :avatar="sessionsOptions2.avatar"
          :avatar-width="sessionsOptions2.avatarWidth"
          :chip-color="sessionsOptions2.chipColor"
          :chip-text="sessionsOptions2.chipText"
          :statistics="selectsDatas.lead"
          :stat-title="sessionsOptions2.statTitle"
        ></statistics-card-with-images>
      </v-col>

			<v-col
				cols="12"
				md="3"
				sm="6"
				order="2"
				class="align-self-end"
			>
				<statistics-card-with-images
					:avatar="ratingsOptions2.avatar"
					:avatar-width="ratingsOptions2.avatarWidth"
					:chip-color="ratingsOptions2.chipColor"
					:chip-text="ratingsOptions2.chipText"
					:statistics="selectsDatas.teacher"
					:stat-title="ratingsOptions2.statTitle"
				></statistics-card-with-images>
			</v-col>


      <v-col
        cols="12"
        md="6"
        sm="12"
        order="5"
        order-md="3"
      >
        <crm-statistics-card></crm-statistics-card>
      </v-col>

      <v-col
        cols="12"
        md="3"
        sm="6"
        order="3"
        order-md="4"
      >
        <crm-total-sales></crm-total-sales>
      </v-col>

			<v-col
				cols="12"
				md="3"
				sm="6"
				order="3"
				order-md="4"
			>
				<crm-total-outcomes></crm-total-outcomes>
			</v-col>

      <v-col
        cols="12"
        md="6"
        sm="12"
        order="6"
      >
        <crm-sales-overview></crm-sales-overview>
      </v-col>

			<v-col
				cols="12"
				md="6"
				sm="12"
				order="6"
			>
				<crm-subjects-overview></crm-subjects-overview>
			</v-col>
    </v-row>

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
import axios from '@axios'
import StatisticsCardAreaChart from '@core/components/statistics-card/StatisticsCardAreaChart.vue'
import StatisticsCardWithImages from '@core/components/statistics-card/StatisticsCardWithImages.vue'
// icons
import { mdiLabelVariantOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
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

    // //form options for selects
    const selectsDatas = ref({
      student: null,
      group: null,
      teacher: null,
      lead: null,
    })
    // ! METHODS
    const loadStudents = () => {
      axios
        .get('/api/students', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.student = response.data.data.length
            console.log(selectsDatas.value)
          }
        })
        .catch(error => console.log(error))
    }
    const loadGroups = () => {
      axios
        .get('/api/groups', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.group = response.data.data.length
            console.log(selectsDatas.value)
          }
        })
        .catch(error => console.log(error))
    }
    const loadTeachers = () => {
      axios
        .get('/api/teachers', { params: { itemsPerPage: -1 } })
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.teacher = response.data.data.length
            console.log(selectsDatas.value)
          }
        })
        .catch(error => console.log(error))
    }
    const loadLeads = () => {
      axios
        .get('/api/leads', {params: {itemsPerPage: -1}})
        .then(response => {
          if (response.data.success) {
            selectsDatas.value.lead = response.data.data.length
            console.log(selectsDatas.value)
          }
        })
        .catch(error => console.log(error))
    }
    loadGroups()
    loadStudents()
    loadTeachers()
    loadLeads()

    return {
      ratingsOptions,
      sessionsOptions,
      ratingsOptions2,
      sessionsOptions2,
      growthAreaChart,
      newProjectOptions,
      selectsDatas,
    }
  },
}
</script>
