import {
  mdiAccountDetailsOutline,
  mdiAccountGroup,
  mdiDoor,
  mdiFileDocumentEdit,
  mdiFilterVariant,
  mdiHome,
  mdiHumanCapacityDecrease,
  mdiHumanMaleFemale,
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
        action: 'manage',
        icon: mdiDoor,
      },
      {
        title: 'Ustozlar',
        to: 'teachers',
        resource: 'Teacher',
        action: 'manage',
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
        action: 'manage',
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
    action: 'manage',
  },
  {
    title: 'Guruhlar',
    icon: mdiAccountGroup,
    to: 'groups',
    resource: 'Group',
    action: 'manage',
  },
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
