import {
  mdiAccountCash,
  mdiAccountDetailsOutline,
  mdiAccountGroup,
  mdiBookOpenVariant,
  mdiCashMinus,
  mdiCashMultiple,
  mdiDoor,
  mdiFilterVariant,
  mdiGoogleAnalytics,
  mdiHome,
  mdiHumanCapacityDecrease,
  mdiHumanMaleFemale,
  mdiMapMarkerMultipleOutline,
  mdiMapMarkerRadiusOutline,
  mdiOfficeBuilding,
  mdiPercent,
  mdiShieldAccount,
} from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiHome,
    to: 'dashboard-eCommerce',
  },
  {
    title: "Ro'yxatlar",
    icon: mdiFilterVariant,
    children: [
      {
        title: 'Xonalar',
        to: 'rooms',
        resource: 'Room',
        action: 'read',
        icon: mdiDoor,
      },
      {
        title: 'Ustozlar',
        to: 'teachers',
        resource: 'Teacher',
        action: 'read',
        icon: mdiHumanMaleFemale,
      },
      {
        title: 'Talaba guruhlari',
        to: 'student-groups',
        icon: mdiHumanCapacityDecrease,
      },
      {
        title: 'Ustozlarga tulovlar',
        to: 'teacher-paids',
        resource: 'Public',
        action: 'read',
        icon: mdiAccountCash,
      },
      {
        title: 'Markaz Xarajatlari',
        to: 'costs',
        resource: 'Teacher',
        action: 'read',
        icon: mdiCashMultiple,
      },
      {
        title: 'Fanlar',
        to: 'subjects',
        resource: 'Teacher',
        action: 'read',
        icon: mdiBookOpenVariant,
      },
      {
        title: '!!!Qarzdor talabalar',
        to: 'student-depts',
        resource: 'Teacher',
        action: 'read',
        icon: mdiCashMinus,
      },
      {
        title: 'Bosqichlar',
        to: 'stages',
        resource: 'Teacher',
        action: 'read',
        icon: mdiGoogleAnalytics,
      },
      {
        title: 'Tumanlar',
        to: 'regions',
        resource: 'Teacher',
        action: 'read',
        icon: mdiMapMarkerRadiusOutline,
      },
      {
        title: 'Viloyatlar',
        to: 'provinces',
        resource: 'Teacher',
        action: 'read',
        icon: mdiMapMarkerMultipleOutline,
      },
    ],
  },
  {
    title: 'Markaz ulushi',
    to: 'center-profit',
    icon: mdiPercent,
  },
  {
    title: 'Talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'students',
    resource: 'Student',
    action: 'read',
  },
  {
    title: 'Guruhlar',
    icon: mdiAccountGroup,
    to: 'groups',
    resource: 'Group',
    action: 'read',
  },
  {
    title: "To'lovlar",
    icon: mdiAccountGroup,
    to: 'payments',
    resource: 'payments',
    action: 'read',
  },
  {
    title: 'Guruh vaqtlari',
    icon: mdiAccountDetailsOutline,
    to: 'group-times',
    resource: 'GroupTime',
    action: 'read',
  },
  {
    title: 'Binolar',
    icon: mdiOfficeBuilding,
    to: 'places',
    resource: 'Place',
    action: 'read',
  },

  // {
  //   path: '/group-times',
  //   name: 'group-times',
  //   component: () => import('@/views/lists/group-time/GroupTimeList.vue'),
  //   meta: {
  //     layout: 'content',
  //     resource: 'GroupTime',
  //     action: 'read',
  //   },
  // },
  // {
  //   title: 'Guruh vaqtlari',
  //   icon: mdiFileDocumentEdit,
  //   to: 'group-times',
  // },
  {
    subheader: '#',
    badge: 'New',
    bageColor: 'success',
  },
  {
    title: 'Admin',
    icon: mdiShieldAccount,
    to: 'link',
  },
]
