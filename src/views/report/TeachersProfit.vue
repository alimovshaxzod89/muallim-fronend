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
					></multiselect>
				</div>
				<div class="filter-input">
					<div class="filter-label">
						<span>Ustoz</span>
						<button class="clear-date" @click="clearDate('teacher')" v-if="this.filters.teacher">
							<svg height="512pt" viewBox="0 0 512 512" width="512pt" xmlns="http://www.w3.org/2000/svg">
								<path
									d="m437.019531 74.980469c-48.351562-48.351563-112.640625-74.980469-181.019531-74.980469s-132.667969 26.628906-181.019531 74.980469c-48.351563 48.351562-74.980469 112.640625-74.980469 181.019531 0 68.382812 26.628906 132.667969 74.980469 181.019531 48.351562 48.351563 112.640625 74.980469 181.019531 74.980469s132.667969-26.628906 181.019531-74.980469c48.351563-48.351562 74.980469-112.636719 74.980469-181.019531 0-68.378906-26.628906-132.667969-74.980469-181.019531zm-70.292969 256.386719c9.761719 9.765624 9.761719 25.59375 0 35.355468-4.882812 4.882813-11.28125 7.324219-17.679687 7.324219s-12.796875-2.441406-17.679687-7.324219l-75.367188-75.367187-75.367188 75.371093c-4.882812 4.878907-11.28125 7.320313-17.679687 7.320313s-12.796875-2.441406-17.679687-7.320313c-9.761719-9.765624-9.761719-25.59375 0-35.355468l75.371093-75.371094-75.371093-75.367188c-9.761719-9.765624-9.761719-25.59375 0-35.355468 9.765624-9.765625 25.59375-9.765625 35.355468 0l75.371094 75.367187 75.367188-75.367187c9.765624-9.761719 25.59375-9.765625 35.355468 0 9.765625 9.761718 9.765625 25.589844 0 35.355468l-75.367187 75.367188zm0 0"
								/>
							</svg>
						</button>
					</div>
					<multiselect
						class="table-select"
						v-model="filters.teacher"
						:options="teachers"
						placeholder="Tanlash"
						label="full_name"
						select-label=""
						deselectLabel="O'chirish"
						selectedLabel=""
					></multiselect>
				</div>
			</div>
		</div>

		<b-card>
			<table class="table table-bordered text-center table-responsive">
				<thead>
					<tr>
						<th width="50" class="align-middle">
							#
						</th>
						<th class="align-middle">
							O'qituvchi
						</th>
						<th class="align-middle" colspan="2">
							Talabalar to'laydigan summa
						</th>
						<th class="align-middle" colspan="2">
							Talabalar to'ladi
						</th>
						<th class="align-middle" colspan="2">
							Talabalar to'lamagan qoldiq
						</th>
						<th class="align-middle" colspan="2">
							O'qituvchi ulushi
						</th>
						<th>To'landi</th>
					</tr>
					<tr>
						<th />
						<th />
						<th>Soni</th>
						<th>Summa</th>
						<th>Soni</th>
						<th>Summa</th>
						<th>Soni</th>
						<th>Summa</th>
						<th>Olishi mumkin</th>
						<th>Talabalar qarzlarini bergandan so'ng</th>
						<th></th>
					</tr>
				</thead>
				<tbody v-if="teacher_payments.length > 0">
					<tr v-for="(item, k) in teacher_payments" :key="item + '-' + k">
						<td>{{ k + 1 }}</td>
						<td>{{ fullName(item) }}</td>
						<td>{{ JSON.parse(item.summalar).cnta }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bks | formatNumber }}</td>
						<td>{{ JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bs | formatNumber }}</td>
						<td>{{ JSON.parse(item.summalar).cnta - JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).bks - JSON.parse(item.summalar).bs) | formatNumber }}
						</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).ustoz_ulushi_fakt | formatNumber }}</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).ustoz_ulushi - JSON.parse(item.summalar).ustoz_ulushi_fakt) | formatNumber }}
						</td>
						<td
							data-toggle="tooltip"
							title="To'lov amalga oshirish uchun bosing"
							style="cursor: pointer;"
							@click.prevent="openPaids(item)"
						>
							<span style="border-bottom: 1px dashed #e3e3e3; white-space: nowrap;">{{ item.oldi | formatNumber }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</b-card>
	</div>
</template>

<script>
import { BTable, BFormSelect, BCard, BButton, BFormGroup, BFormInput, BModal, BTableSimple } from 'bootstrap-vue'
import Multiselect from 'vue-multiselect'
// import moment from 'moment'
import axios from 'axios'
import 'vue-multiselect/dist/vue-multiselect.min.css'
require('moment/locale/uz-latn')

export default {
  name: 'TeachersProfit',
  components: {
    BTable,
    BTableSimple,
    BFormSelect,
    BCard,
    BButton,
    BFormGroup,
    BFormInput,
    BModal,
    Multiselect,
  },
  data() {
    return {
      teacher_payments: [],
      teachers: [],
      filters: {
        month: null,
        year: null,
        teacher: null,
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
      },
    }
  },
  watch: {
    ['filters.month']() {
      this.loadPayments()
    },
    ['filters.year']() {
      this.loadPayments()
    },
  },
  created() {
    this.loadPayments()
    this.loadTeachers()
    this.init()
  },
  methods: {
    clearDate(input) {
      this.filters[input] = null
      this.loadPayments()
    },
    loadPayments() {
      if (this.filters.month && this.filters.year) {
        axios.get(`teachers-income/${this.filters.month.id}/${this.filters.year.value}`).then(response => {
          if (response.status === 200) {
            this.teacher_payments = response.data
          }
        })
      }
    },
    loadTeachers() {
      axios.get(`teachers`).then(response => {
        if (response.data.success) {
          this.teachers = response.data.data
        }
      })
    },
    fullName(item) {
      function nn(str) {
        if (str === null) {
          return ''
        } else {
          return str
        }
      }

      return `${nn(item.first_name)} ${nn(item.last_name)} ${nn(item.middle_name)}`
    },
    openPaids(item) {
      const month = this.filters.month.id
      const year = this.filters.year.value
      const query = { month, year, teacher_id: item.id }
      this.$router.push({ name: 'teacher-paids', query })
    },
    init() {
      if (this.$route.query.month) {
        this.filters.month = this.$route.query.month
      }
      if (this.$route.query.year) {
        this.filters.year = this.$route.query.year
      }
      this.loadPayments()
    },
  },
}
</script>
