import {
  mdiAccountCash,
  mdiAccountDetailsOutline,
  mdiAccountGroup,
  mdiCashMultiple,
  mdiDoor,
  mdiFilterVariant,
  mdiHome,
  mdiHumanCapacityDecrease,
  mdiHumanMaleFemale,
  mdiPercent,
  mdiShieldAccount,
  mdiBookOpenVariant, 
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
        icon: mdiBookOpenVariant ,
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
