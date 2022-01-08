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
    title: 'Kurs',
    icon: mdiFileDocumentEdit,
    to: 'rate',
  },
  {
    title: 'Talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'student',
  },
  {
    title: 'Guruhlar',
    icon: mdiAccountGroup,
    to: 'group',
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
