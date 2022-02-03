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
				<!-- <div class="bottom-menu">
					<div class="page-mode">
						<select class="form-control-sm form-control" v-model="limit">
							<option value="10">10</option>
							<option value="20">20</option>
							<option value="50">50</option>
							<option value="100">100</option>
							<option value="-1">Barchasi</option>
						</select>
					</div>
					<div class="pagination" v-if="limit != -1">
						<BPagination v-model="page" :total-rows="totalPages" :per-page="limit" first-number last-number />
					</div>
				</div> -->
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
							Oy
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
							Markaz ulushi
						</th>
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
						<th>olishi mumkin</th>
						<th>Talabalar qarzlarini bergandan so'ng</th>
					</tr>
				</thead>
				<tbody v-if="teacher_payments.length > 0">
					<tr v-for="(item, k) in teacher_payments" :key="item + '-' + k">
						<td>{{ k + 1 }}</td>
						<td style="white-space: nowrap;">{{ item.oy }}</td>
						<td>{{ JSON.parse(item.summalar).cnta }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bks | formatNumber }}</td>
						<td>{{ JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bs | formatNumber }}</td>
						<td>{{ JSON.parse(item.summalar).cnta - JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).bks - JSON.parse(item.summalar).bs) | formatNumber }}
						</td>

						<td style="white-space: nowrap;">
							{{ JSON.parse(item.summalar).markaz_ulushi_fakt | formatNumber }}
						</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).markaz_ulushi - JSON.parse(item.summalar).markaz_ulushi_fakt) | formatNumber }}
						</td>
					</tr>
				</tbody>
			</table>
		</b-card>
	</div>
</template>

<script>
import Multiselect from 'vue-multiselect'
import { BFormSelect, BCard, BButton, BFormGroup, BFormInput, BModal, BTable } from 'bootstrap-vue'
// import moment from 'moment'
import axios from 'axios'
import 'vue-multiselect/dist/vue-multiselect.min.css'
require('moment/locale/uz-latn')

export default {
  name: 'CenterProfit',
  components: {
    BFormSelect,
    BTable,
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
      filters: {
        year: null,
        month: null,
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
    'filters.month': function () {
      this.loadPayments()
    },
    'filters.year': function () {
      this.loadPayments()
    },
  },
  created() {
    this.loadPayments()
    // this.init()
  },
  methods: {
    clearDate(input) {
      this.filters[input] = null
      this.loadPayments()
    },
    loadPayments() {
      if (this.filters.year) {
        const url = this.filters.month
          ? `http://mm.softwork.uz/api/center-income/${this.filters.year.value}/${this.filters.month.id}`
          : `http://mm.softwork.uz/api/center-income/${this.filters.year.value}`
        axios.get(url).then(response => {
          if (response.status === 200) {
            this.teacher_payments = response.data
          }
        })
      }
    },
  },
}
</script>

<style>
.clear-date {
  position: absolute;
  top: 50%;
  right: 3px;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  border: none;
  background-color: unset;
}
.clear-date svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 12px !important;
  min-height: 12px !important;
  width: 12px !important;
  height: 12px !important;
}

.filter-body {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
}

.filter-input {
  flex: 1 1 auto;
  max-width: 260px;
  margin: 0 -10px 10px -10px;
  padding: 0 15px 0 15px;
}

.filter-label {
  position: relative;
  padding-right: 30px;
}

.filter-label span {
  font-size: 11px;
  line-height: 15px;
  text-transform: uppercase;
}
</style>