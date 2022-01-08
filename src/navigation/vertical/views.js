import { mdiFileDocumentEdit, mdiHomeOutline, mdiShieldAccount, mdiViewHeadline } from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiHomeOutline,
    to: 'dashboard-eCommerce',
  },
  {
    title: "Ro'yxatlar",
    icon: mdiViewHeadline,
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
    icon: mdiFileDocumentEdit,
  },
  {
    title: 'Talabalar',
    icon: mdiFileDocumentEdit,
    to: 'students',
  },
  {
    title: 'Guruhlar',
    icon: mdiFileDocumentEdit,
    to: 'groups',
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
