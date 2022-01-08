import { mdiAccountDetailsOutline, mdiFileDocumentEdit, mdiHome, mdiShieldAccount, mdiFilterVariant, mdiPercent, mdiAccountGroup, mdiFormatListBulleted } from '@mdi/js'

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
      },
      {
        title: 'Ustozlar',
        to: 'teachers',
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
		resource: 'students',
		action: 'manage',
  },
  {
    title: 'Guruhlar',
    icon: mdiAccountGroup,
    to: 'groups',
		resource: 'students',
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
