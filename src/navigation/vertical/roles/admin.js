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
  mdiHumanMaleFemale, mdiMapMarkerMultipleOutline, mdiMapMarkerRadiusOutline, mdiOfficeBuilding, mdiPercent,
  mdiShieldAccount,
  mdiChartLine,
  mdiAccountPlus,
  mdiAccountSwitch,
  mdiCashCheck,
  mdiAccountTie,
  mdiCurrencyUsd,
  mdiAccountTieVoice,
  mdiCreditCardMultiple,
  mdiCurrencyEur,
  mdiCashRegister,
  mdiFileImportOutline,
} from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiHome,
    to: 'dashboard-eCommerce',
  },
  {
    title: 'Lidlar',
    to: 'leads',
    resource: 'Lead',
    action: 'read',
    icon: mdiChartLine,
  },
  {
    title: 'Guruh vaqtlari',
    icon: mdiAccountDetailsOutline,
    to: 'group-times',
    resource: 'GroupTime',
    action: 'read',
  },
  {
    title: 'Markaz ulushi',
    to: 'center-profit',
    icon: mdiPercent,
  },
  {
    title: 'Markaz Xarajatlari',
    to: 'expenses',
    resource: 'Teacher',
    action: 'read',
    icon: mdiCashMultiple,
  },
  {
    title: "To'lovlar",
    icon: mdiAccountGroup,
    to: 'payments',
    resource: 'payments',
    action: 'read',
  },
  {
    title: "Davomat",
    icon: mdiAccountPlus,
    to: 'davomat',
    resource: 'davomat',
    action: 'read',
  },
  {
    title: "Talabalar",
    icon: mdiAccountSwitch,
    children: [
      {
        title: "Talabalar Ro'yxati",
        icon: mdiAccountDetailsOutline,
        to: 'students',
        resource: 'Student',
        action: 'read',
      },
      {
        title: "Talabalar to'laganlar",
        to: 'student-paids',
        resource: 'Teacher',
        action: 'read',
        icon: mdiCashCheck ,
      },
      {
        title: 'Qarzdor talabalar',
        to: 'student-debts',
        resource: 'StudentDebt',
        action: 'read',
        icon: mdiCashMinus,
      },
    ],
  },
  {
    title: 'Guruhlar',
    icon: mdiAccountGroup,
    to: 'groups',
    resource: 'Group',
    action: 'read',
  },
  {
    title: 'Talabalar guruhlari',
    to: 'student-groups',
    icon: mdiHumanCapacityDecrease,
  },
  {
    title: "Ustozlar",
    icon: mdiAccountTie ,
    children: [
      {
        title: "Ustozlar ro'yxati",
        to: 'teachers',
        resource: 'Teacher',
        action: 'read',
        icon: mdiHumanMaleFemale,
      },
      {
        title: "Ustozlarga to'lovlar",
        to: 'teacher-paids',
        resource: 'Public',
        action: 'read',
        icon: mdiAccountCash,
      },
      {
        title: "Ustozlarga daromadi",
        to: 'teachers-profit',
        resource: 'Teachers-Profit',
        action: 'read',
        icon: mdiCurrencyUsd ,
      },
    ],
  },
  {
    title: "Ro'yxatlar",
    icon: mdiFilterVariant,
    children: [
      {
        title: 'Menejerlar',
        icon: mdiAccountTieVoice ,
        to: 'managers',
        resource: 'Manager',
        action: 'read',
      },
      {
        title: 'Binolar',
        icon: mdiOfficeBuilding,
        to: 'places',
        resource: 'Place',
        action: 'read',
      },
      {
        title: 'Xonalar',
        to: 'rooms',
        resource: 'Room',
        action: 'read',
        icon: mdiDoor,
      },
      {
        title: 'Fanlar',
        to: 'subjects',
        resource: 'Teacher',
        action: 'read',
        icon: mdiBookOpenVariant,
      },
      {
        title: 'Bosqichlar',
        to: 'stages',
        resource: 'Teacher',
        action: 'read',
        icon: mdiGoogleAnalytics,
      },
      {
        title: 'Viloyatlar',
        to: 'provinces',
        resource: 'Teacher',
        action: 'read',
        icon: mdiMapMarkerMultipleOutline,
      },
      {
        title: 'Tumanlar',
        to: 'regions',
        resource: 'Teacher',
        action: 'read',
        icon: mdiMapMarkerRadiusOutline,
      },
    ],
  },
  {
    title: 'Kassa nomlari',
    to: 'cashbox',
    resource: 'Cashbox',
    action: 'read',
    icon: mdiCreditCardMultiple,
  },
  {
    title: 'Xarajat turlari',
    to: 'expense-category',
    resource: 'ExpenseCategory',
    action: 'read',
    icon: mdiCashRegister,
  },
  {
    title: 'Valyuta',
    to: 'currency',
    resource: 'currency',
    action: 'read',
    icon: mdiCurrencyEur,
  },
  {
    title: 'Import',
    to: 'import',
    resource: 'import',
    action: 'read',
    icon: mdiFileImportOutline,
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
