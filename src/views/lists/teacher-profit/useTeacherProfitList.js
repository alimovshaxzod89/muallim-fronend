import { ref, watch } from '@vue/composition-api'
import axios from '@axios'

export default function useTeacherProfitList(MODULE_NAME) {
  const selectedTableData = ref([])
  const notify = ref({})

  const filter = ref({
    year: '2022',
    month: 3,
  })

  const options = ref({
    sortBy: ['id'],
    sortDesc: [true],
    limit: 10,
    skip: 0,
  })
  const loading = ref(false)
  const teacher_payments = ref([])

  
  const fetchDatas = () => {

    let url = `/api/teachers-income/${filter.value.year}`
      if(filter.value.month) {
        url += `/${filter.value.month}`
      }
      axios
        .get(url)
        .then(response => {
          teacher_payments.value = response.data
          console.log(teacher_payments.value)
        })
        .catch(error => reject(error))
  }

  watch(
    filter,
    () => {
      fetchDatas()
    },
    { deep: true },
  )

  watch(options, () => {
    loading.value = true
    fetchDatas()
    // selectedTableData.value = []
  })


  return {
    filter,
    fetchDatas,
    teacher_payments,

    options,
    loading,
    notify,
    selectedTableData,
  }
}
