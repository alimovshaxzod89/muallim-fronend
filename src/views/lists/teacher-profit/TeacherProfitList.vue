<template>
  <v-card id="data-list">
    <!-- Filter -->
    <v-card-text class="d-flex align-flex-start flex-wrap justify-end my-filter">
      <div class="d-flex pb-5" style="width: 100%">
				<v-autocomplete
          v-model="filter.year"
          :items="filterOptions.years"
          item-text="text"
          item-value="value"
          solo
          label="YIL"
          class="data-list-search me-3"
          dense
          outlined
          hide-details
          clearable
        >
        </v-autocomplete>
        <v-autocomplete
          v-model="filter.month"
          :items="filterOptions.months"
          item-text="text"
          item-value="id"
          label="OY"
          class="data-list-search me-3"
          dense
          solo
          outlined
          hide-details
          clearable
        >
        </v-autocomplete>
      </div>
    </v-card-text>

		<v-simple-table class="my-table-bordered">
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-uppercase text-center">#</th>
						<th colspan="1" class="text-uppercase text-center">O'qituvchi</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LAYDIGAN SUMMA</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LADI</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LAMAGAN QOLDIQ</th>
						<th colspan="2" class="text-uppercase text-center">O'QITUVCHI ULUSHI</th>
            <th colspan="2" class="text-uppercase text-center">TO'LANDI</th>
					</tr>
					<tr>
						<th class="text-uppercase text-center"></th>
						<th class="text-uppercase text-center"></th>
						<th class="text-uppercase text-center">SONI</th>
						<th class="text-uppercase text-center">SUMMA</th>
						<th class="text-uppercase text-center">SONI</th>
						<th class="text-uppercase text-center">SUMMA</th>
						<th class="text-uppercase text-center">SONI</th>
						<th class="text-uppercase text-center">SUMMA</th>
						<th class="text-uppercase text-center">OLISHI MUMKIN</th>
						<th class="text-uppercase text-center">TALABALAR QARZLARINI BERGANDAN SO'NG</th>
            <th class="text-uppercase text-center"></th>
					</tr>
				</thead>
				<tbody v-if="teacher_payments.length > 0">
					<tr v-for="(item, k) in teacher_payments" :key="item + '-' + k">
						<td>{{ k + 1 }}</td>
						<td>{{ fullName(item) }}</td>
						<td>{{ JSON.parse(item.summalar).cnta }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bks }}</td>
						<td>{{ JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).bs }}</td>
						<td>{{ JSON.parse(item.summalar).cnta - JSON.parse(item.summalar).cntb }}</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).bks - JSON.parse(item.summalar).bs) }}
						</td>
						<td style="white-space: nowrap;">{{ JSON.parse(item.summalar).ustoz_ulushi_fakt }}</td>
						<td style="white-space: nowrap;">
							{{ (JSON.parse(item.summalar).ustoz_ulushi - JSON.parse(item.summalar).ustoz_ulushi_fakt) }}
						</td>
						<td
							data-toggle="tooltip"
							title="To'lov amalga oshirish uchun bosing"
							style="cursor: pointer;"
							@click.prevent="openPaids(item)"
						>
							<span style="border-bottom: 1px dashed #e3e3e3; white-space: nowrap;">{{ item.oldi }}</span>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
  </v-card>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import moment from 'moment'
moment.locale('uz-latn')

import numeral from 'numeral'
numeral.locale('ru')

import envParams from '@envParams'

// composition function
import useTeacherProfitList from './useTeacherProfitList'

const MODULE_NAME = 'teacher-profit'

export default {
  setup() {
    const BASE_URL = envParams.BASE_URL

    //logics
    const {
      filter,
      searchQuery,
      fetchDatas,
      teacher_payments,

      options,
      loading,
      notify,
      selectedTableData,
    } = useTeacherProfitList(MODULE_NAME)

    fetchDatas()

    //interface additional elements
    const footerProps = ref({ 'items-per-page-options': [10, 20, 50, 100, -1] })

    const filterOptions = {
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
        {
          value: '2022',
          text: '2022',
        },
        {
          value: '2023',
          text: '2023',
        },
      ],
    }

    const fullName = item => {
      function nn(str) {
        if (str === null) {
          return ''
        } else {
          return str
        }
      }

      return `${nn(item.first_name)} ${nn(item.last_name)} ${nn(item.middle_name)}`
    }

    const openPaids = item => {
      const month = filter.value.month
      const year = filter.value.year
      const query = { month, year, teacher_id: item.id }
      this.$router.push({ name: 'teacher-paids', query })
    }

    // Return
    return {
      MODULE_NAME,
      BASE_URL,
      filter,
      teacher_payments,

      fullName,
      openPaids,

      searchQuery,
      fetchDatas,
      options,
      loading,
      notify,
      selectedTableData,
      filterOptions,

      footerProps,
    }
  },
  watch: {
    ['notify']() {
      this.$toast[this.notify.type](this.notify.text)
    },
  },
}
</script>

<style lang="scss" scoped>
#data-list {
  .data-list-actions {
    max-width: 7.81rem;
  }

  .data-list-search {
    max-width: 10.625rem;
  }
}
.img-user {
  width: 50px;
  height: 50px;
  overflow: hidden;
  object-fit: cover;
}

.my-filter {
  .v-input {
    margin-right: 12px;
    margin-bottom: 12px;
  }
}

.my-table-bordered {
  th {
    border-right: thin solid rgba(94, 86, 105, 0.14);
    // border-left: thin solid rgba(94, 86, 105, 0.14);
  }
}
</style>
