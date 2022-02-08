const views = [
  {
    path: '/apps/calendar',
    name: 'apps-calendar',
    component: () => import('@/views/apps/calendar/Calendar.vue'),
    meta: {
      layout: 'content',
      resource: 'Public',
      action: 'read',
    },
  },
  {
    path: '/main',
    name: 'dashboard-eCommerce',
    component: () => import('@/views/dashboards/crm/Crm.vue'),
    meta: {
      layout: 'content',
      resource: 'Public',
      action: 'read',
    },
  },
  {
    path: '/leads',
    name: 'leads',
    component: () => import('@/views/lead/LeadList.vue'),
    meta: {
      layout: 'content',
      resource: 'Lead',
      action: 'read',
    },
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import('@/views/lists/room/RoomList.vue'),
    meta: {
      layout: 'content',
      resource: 'Room',
      action: 'manage',
    },
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/lists/teacher/TeacherList.vue'),
    meta: {
      layout: 'content',
      resource: 'Teacher',
      action: 'read',
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/lists/student/StudentList.vue'),
    meta: {
      layout: 'content',
      resource: 'Student',
      action: 'read',
    },
  },
  {
    path: '/student-paids',
    name: 'student-paids',
    component: () => import('@/views/lists/student-paid/StudentPaidList.vue'),
    meta: {
      layout: 'content',
      resource: 'StudentPaid',
      action: 'read',
    },
  },
  {
    path: '/student-groups',
    name: 'student-groups',
    component: () => import('@/views/lists/student-group/StudentGroupList.vue'),
    meta: {
      layout: 'content',
      resource: 'StudentGroup',
      action: 'read',
    },
  },
  {
    path: '/teacher-paids',
    name: 'teacher-paids',
    component: () => import('@/views/lists/teacher-paid/TeacherPaidList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/teachers-profit',
    name: 'teachers-profit',
    component: () => import('@/views/lists/teacher-profit/TeacherProfitList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/costs',
    name: 'costs',
    component: () => import('@/views/lists/cost/CostList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/subjects',
    name: 'subjects',
    component: () => import('@/views/lists/subject/SubjectList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/student-dept',
    name: 'student-dept',
    component: () => import('@/views/lists/student-dept/StudentDeptList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/stages',
    name: 'stages',
    component: () => import('@/views/lists/stage/StageList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/regions',
    name: 'regions',
    component: () => import('@/views/lists/region/RegionList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/provinces',
    name: 'provinces',
    component: () => import('@/views/lists/province/ProvinceList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/student-depts',
    name: 'student-depts',
    component: () => import('@/views/lists/student-dept/StudentDeptList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/groups',
    name: 'groups',
    component: () => import('@/views/lists/group/GroupList.vue'),
    meta: {
      layout: 'content',
      resource: 'Group',
      action: 'read',
    },
  },
  {
    path: '/payments',
    name: 'payments',
    component: () => import('@/views/lists/payment/PaymentList.vue'),
    meta: {
      layout: 'content',
      resource: 'Payment',
      action: 'read',
    },
  },
  {
    path: '/davomat',
    name: 'davomat',
    component: () => import('@/views/lists/davomat/DavomatList.vue'),
    meta: {
      layout: 'content',
      resource: 'Davomat',
      action: 'read',
    },
  },
  {
    path: '/lessons-rooms',
    name: 'lessons-rooms',
    component: () => import('@/views/lists/lessons-rooms/LessonsRooms'),
    meta: {
      layout: 'content',
      resource: 'Group',
      action: 'read',
    },
  },
  {
    path: '/places',
    name: 'places',
    component: () => import('@/views/lists/place/PlaceList.vue'),
    meta: {
      layout: 'content',
      resource: 'Place',
      action: 'read',
    },
  },
  {
    path: '/group-times',
    name: 'group-times',
    component: () => import('@/views/lists/group-time/GroupTime.vue'),
    meta: {
      layout: 'content',
      resource: 'GroupTime',
      action: 'read',
    },
  },
  {
    path: '/managers',
    name: 'managers',
    component: () => import('@/views/lists/manager/ManagerList.vue'),
    meta: {
      layout: 'content',
      resource: 'Manager',
      action: 'read',
    },
  },
  {
    path: '/center-profit',
    name: 'center-profit',
    component: () => import('@/views/lists/center-profit/CenterProfitList.vue'),
    meta: {
      layout: 'content',
      resource: 'CenterProfit',
      action: 'read',
    },
  },
  {
    path: '/cashbox',
    name: 'cashbox',
    component: () => import('@/views/lists/cashbox/CashboxList.vue'),
    meta: {
      layout: 'content',
      resource: 'Cashbox',
      action: 'read',
    },
  },
  {
    path: '/expense-category',
    name: 'expense-category',
    component: () => import('@/views/lists/expense-category/ExpenseCategoryList.vue'),
    meta: {
      layout: 'content',
      resource: 'CenterProfit',
      action: 'read',
    },
  },
  // {
  //   path: '/center-profit',
  //   name: 'center-profit',
  //   component: () => import('@/views/lists/center-profit/CenterProfitList.vue'),
  //   meta: {
  //     layout: 'content',
  //     // pageTitle: 'Markaz Ulushi',
  //     // breadcrumb: [
  //     //   {
  //     //     text: 'Markaz Ulushi',
  //     //     active: true,
  //     //   },
  //     // ],
  //   },
  // },
]

export default views
