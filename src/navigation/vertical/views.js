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
        title: 'Guruhlar',
        to: 'groups',
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
    title: 'Kurs',
    icon: mdiFileDocumentEdit,
    to: 'rate',
  },
  {
    title: 'Talabalar',
    icon: mdiFileDocumentEdit,
    to: 'student',
  },
  {
    title: 'Guruhlar',
    icon: mdiFileDocumentEdit,
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
