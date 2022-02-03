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
          outlined
          hide-details
          clearable
        >
        </v-autocomplete>
      </div>
    </v-card-text>

    <!-- Table -->
    <!-- <v-data-table
      v-model="selectedTableData"
      :headers="tableColumns"
      :items="state.rows"
      :options.sync="options"
      :server-items-length="state.total"
      :loading="loading"
      :items-per-page="options.itemsPerPage"
      :footer-props="footerProps"
      class="text-no-wrap"
			:headers-length="2"
    >

      <template slot="item.index" scope="props">
        {{ props.index + 1 + (options.page - 1) * options.itemsPerPage }}
      </template>

    </v-data-table> -->

		<v-simple-table class="my-table-bordered">
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-uppercase text-center">#</th>
						<th class="text-uppercase text-center">OY</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LAYDIGAN SUMMA</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LADI</th>
						<th colspan="2" class="text-uppercase text-center">TALABALAR TO'LAMAGAN QOLDIQ</th>
						<th colspan="2" class="text-uppercase text-center">MARKAZ ULUSHI</th>
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
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in desserts" :key="item.dessert">
						<td>{{ item.dessert }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
  </v-card>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import moment from 'moment'
moment.locale('uz-latn')

import numeral from 'numeral'
numeral.locale('ru')

import envParams from '@envParams'

// composition function
import useCenterProfitList from './useCenterProfitList'
import CenterProfitStoreModule from '@/views/lists/center-profit/CenterProfitStoreModule'

const MODULE_NAME = 'center-profit'

export default {
  setup() {
    // Register module
    if (!store.hasModule(MODULE_NAME)) {
      store.registerModule(MODULE_NAME, CenterProfitStoreModule)
    }
    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(MODULE_NAME)) store.unregisterModule(MODULE_NAME)
    })

    //store state
    const state = ref(store.state[MODULE_NAME])

    const BASE_URL = envParams.BASE_URL

    //logics
    const {
      filter,
      searchQuery,
      tableColumns,
      fetchDatas,

      options,
      loading,
      notify,
      selectedTableData,
    } = useCenterProfitList(MODULE_NAME)

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
      ],
    }

    // Return
    return {
      MODULE_NAME,
      BASE_URL,
      state,
      filter,

      tableColumns,
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
