import { mdiAccountDetailsOutline, mdiCashCheck, mdiPercent } from '@mdi/js'

export default [
  {
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,

    resource: 'Group',
    action: 'read',
  },
  {
    title: 'Talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'students',
    resource: 'Student',
    action: 'read',
  },
  {
    subheader: '#',
    badge: 'New',
    bageColor: 'success',
    resource: 'Public',
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
    title: 'Lidlar',
    icon: mdiAccountDetailsOutline,
    to: 'leads',
    resource: 'Public',
    action: 'read',
  },
  {
    subheader: '##',
    badge: 'New',
    bageColor: 'success',
    resource: 'Public',
    action: 'read',
  },
	{
		title: "Talabadan to\'lovlar",
		icon: mdiCashCheck,
		to: 'student-paids',
		resource: 'StudentPaid',
		action: 'read',
	},
  {
    title: 'Qarzdor talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'student-debts',
    resource: 'StudentDebt',
    action: 'read',
  },
	{
		title: "To'lovlar",
		icon: mdiAccountDetailsOutline,
		to: 'payments',
		resource: 'Public',
		action: 'read',
	},
]
