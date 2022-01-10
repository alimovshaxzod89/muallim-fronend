const views = [
  {
    path: '/main',
    name: 'dashboard-eCommerce',
    component: () => import('@/views/dashboards/ecommerce/Ecommerce.vue'),
    meta: {
      layout: 'content',
			resource: 'Public',
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
			action: 'manage',
    },
  },
  {
    path: '/students',
    name: 'students',
    component: () => import('@/views/lists/student/StudentList.vue'),
    meta: {
      layout: 'content',
			resource: 'Student',
			action: 'manage',
    },
  },
  {
    path: '/student-groups',
    name: 'student-groups',
    component: () => import('@/views/lists/student-group/StudentGroupList.vue'),
    meta: {
      layout: 'content',
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
    path: '/groups',
    name: 'groups',
    component: () => import('@/views/lists/group/GroupList.vue'),
    meta: {
      layout: 'content',
			resource: 'Group',
			action: 'manage',
    },
  },
  {
    path: '/group-time',
    name: 'group-time',
    component: () => import('@/views/lists/group-time/GroupTimeList.vue'),
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
