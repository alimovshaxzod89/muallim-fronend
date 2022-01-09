import { mdiAccountDetailsOutline, mdiAccountGroup, mdiDoor, mdiFileDocumentEdit, mdiFilterVariant, mdiHome, mdiHumanCapacityDecrease, mdiHumanMaleFemale, mdiPercent, mdiShieldAccount } from '@mdi/js'

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
        title: 'Guruh talabalari',
        to: 'student-groups',
        icon: mdiHumanCapacityDecrease,
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
    title: 'Guruh vaqtlari',
    icon: mdiFileDocumentEdit,
    to: 'group-time',
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
