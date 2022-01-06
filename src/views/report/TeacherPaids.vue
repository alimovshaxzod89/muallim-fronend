<template>
	<div>
		<div class="card shadow filte-container">
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">FILTER</div>
			</div>
			<div class="card-body filter-body">
				<div class="filter-input">
					<div class="filter-label">
						<span>YIL</span>
						<button class="clear-date" @click="clearDate('year')" v-if="this.filters.year">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.year"
						:options="options.years"
						placeholder="Tanlash"
						label="value"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadTeacherPaids()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>oy</span>
						<button class="clear-date" @click="clearDate('month')" v-if="this.filters.month">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.month"
						:options="options.months"
						placeholder="Tanlash"
						label="value"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadTeacherPaids()"
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustoz</span>
						<button class="clear-date" @click="clearDate('teacher_id')" v-if="this.filters.teacher_id">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.teacher_id"
						:options="options.teachers"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
						@input="loadTeacherPaids()"
					></multiselect>
				</div>
			</div>
		</div>

		<b-card>
			<div class="card-header d-flex justify-content-between align-items-center">
				<div class="title font-weight-bold">USTOZLAR BERILGAN PULLAR</div>
				<button class="btn btn-sm btn-primary" @click="openModal">Qo'shish</button>
			</div>
			<table class="table table-bordered text-center">
				<thead>
					<tr>
						<th width="50">#</th>
						<th>Sa'na</th>
						<th>Summa</th>
						<th>Izoh</th>
						<th style="width: 150px" />
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, k) in items" :key="item + k">
						<td>{{ k + 1 }}</td>
						<td>{{ item.date | formatDate }}</td>
						<td>{{ item.amount | formatNumber }}</td>
						<td>{{ item.note || '-' }}</td>
						<td class="d-flex justify-content-center align-items-center">
							<button class="btn btn-sm btn-outline-primary text-uppercase" style="margin-right:4px" @click="editTeacherPaid(item)">
								<feather-icon icon="EditIcon" />
							</button>
							<button class="btn btn-sm btn-outline-danger text-uppercase" @click="removeTeacherPaid(item)">
								<feather-icon icon="TrashIcon" />
							</button>
						</td>
					</tr>
				</tbody>
				<tfoot v-if="items.length > 0">
					<tr class="font-weight-bold">
						<td colspan="2" class="text-left">BARCHASI:</td>
						<td>{{ total | formatNumber }}</td>
						<td>-</td>
						<td>-</td>
					</tr>
				</tfoot>
			</table>
		</b-card>
		<TeacherPaidForm ref="myForm" />
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { BButton, BCard, BFormGroup, BFormInput, BFormSelect, BModal, BTable } from 'bootstrap-vue'
import moment from 'moment'
import axios from 'axios'
// eslint-disable-next-line import/extensions
import TeacherPaidForm from '@/views/report/TeacherPaidForm'
// eslint-disable-next-line import/extensions
import ToastificationContent from '@core/components/toastification/ToastificationContent'
import 'vue-multiselect/dist/vue-multiselect.min.css'
require('moment/locale/uz-latn')

export default {
  name: 'TeacherPaids',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    BTable,
    BFormSelect,
    BCard,
    Multiselect,
    // eslint-disable-next-line vue/no-unused-components
    BButton,
    // eslint-disable-next-line vue/no-unused-components
    BFormGroup,
    BFormInput,
    // eslint-disable-next-line vue/no-unused-components
    BModal,
    TeacherPaidForm,
  },
  filters: {
    formatDate(date) {
      if (date) return moment(date).format('D MMM Y')
      return '-'
    },
  },
  data() {
    return {
      items: [],
      filters: {
        year: null,
        month: null,
        teacher_id: null,
      },
      options: {
        months: [
          {
            value: 'Yanvar',
            text: 'Yanvar',
            id: 1,
          },
          {
            value: 'Fevral',
            text: 'Fevral',
            id: 2,
          },
          {
            value: 'Mart',
            text: 'Mart',
            id: 3,
          },
          {
            value: 'Aprel',
            text: 'Aprel',
            id: 4,
          },
          {
            value: 'May',
            text: 'May',
            id: 5,
          },
          {
            value: 'Iyun',
            text: 'Iyun',
            id: 6,
          },
          {
            value: 'Iyul',
            text: 'Iyul',
            id: 7,
          },
          {
            value: 'Avgust',
            text: 'Avgust',
            id: 8,
          },
          {
            value: 'Sentabr',
            text: 'Sentabr',
            id: 9,
          },
          {
            value: 'Oktabr',
            text: 'Oktabr',
            id: 10,
          },
          {
            value: 'Noyabr',
            text: 'Noyabr',
            id: 11,
          },
          {
            value: 'Dekabr',
            text: 'Dekabr',
            id: 12,
          },
        ],
        years: [
          {
            value: '2020',
            text: '2020',
          },
          {
            value: '2021',
            text: '2021',
          },
        ],
        teachers: [],
      },
    }
  },
  computed: {
    total() {
      let sum = 0
      this.items.forEach(item => {
        sum += item.amount
      })
      return parseInt(sum)
    },
  },
  watch: {
    // 'filters.month': function() {
    // 	this.loadTeacherPaids()
    // },
    // 'filters.year': function() {
    // 	this.loadTeacherPaids()
    // },
    // 'filters.teacher_id': function() {
    // 	this.loadTeacherPaids()
    // }
  },
  created() {
    this.loadTeachers()
    this.init()
  },
  methods: {
    clearDate(input) {
      this.filters[input] = [input] !== 'year' ? null : moment().format('YYYY')
    },
    removeTeacherPaid(item) {
      axios.delete(`teacher-paids/${item.id}`).then(res => {
        if (res.status === 200) {
          this.loadTeacherPaids()
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Notification',
              icon: 'BellIcon',
              text: 'Muvaffaqiyatli',
              variant: 'success',
            },
          })
        }
      })
    },
    editTeacherPaid(item) {
      this.$refs.myForm.open({
        teacher_id: this.options.teachers[item.teacher_id - 1],
        teacher_paid_id: item.id,
        amount: item.amount,
        date: item.date ? moment(item.date).format('Y-MM-DD') : null,
        note: item.note,
      })
    },
    loadTeachers() {
      axios.get('teachers').then(response => {
        if (response.status === 200) {
          this.options.teachers = response.data.data
        }
      })
    },
    init() {
      if (this.$route.query.month) {
        this.filters.month = this.options.months[this.$route.query.month - 1]
      }
      if (this.$route.query.year) {
        const years = this.options.years
        for (let i = 0; i < years.length; i++) {
          if (years[i].value === this.$route.query.year) {
            this.filters.year = this.options.years[i]
          }
        }
      }
      if (this.$route.query.teacher_id) {
        axios.get(`teachers/${this.$route.query.teacher_id}`).then(response => {
          if (response.status === 200) {
            this.filters.teacher_id = response.data.data
            this.loadTeacherPaids()
          }
        })
      }
    },
    loadTeacherPaids() {
      axios
        .get('teacher-paids', {
          params: {
            month: this.filters.month ? this.filters.month.id : null,
            year: this.filters.year ? this.filters.year.value : null,
            teacher_id: this.filters.teacher_id ? this.filters.teacher_id.id : null,
          },
        })
        .then(response => {
          if (response.status === 200) {
            this.items = response.data.data
          }
        })
    },
    openModal() {
      this.$refs.myForm.open({
        teacher_id: this.filters.teacher_id,
      })
    },
  },
}
</script>
