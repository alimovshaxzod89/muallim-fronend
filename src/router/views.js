const views = [
  {
    path: '/main',
    name: 'dashboard-eCommerce',
    component: () => import('@/views/dashboards/ecommerce/Ecommerce.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/rooms',
    name: 'rooms',
    component: () => import('@/views/lists/room/RoomList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/teachers',
    name: 'teachers',
    component: () => import('@/views/lists/teacher/TeacherList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/student',
    name: 'student',
    component: () => import('@/views/lists/student/StudentList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/group',
    name: 'group',
    component: () => import('@/views/lists/group/GroupList.vue'),
    meta: {
      layout: 'content',
    },
  },
  {
    path: '/center-profit',
    name: 'center-profit',
    component: () => import('@/views/report/CenterProfit.vue'),
    meta: {
      layout: 'content',
      // pageTitle: 'Markaz Ulushi',
      // breadcrumb: [
      //   {
      //     text: 'Markaz Ulushi',
      //     active: true,
      //   },
      // ],
    },
  },
]

export default views
