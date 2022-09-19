import {
	mdiAccountDetailsOutline,
	mdiCashCheck,
	mdiFileImportOutline,
	mdiFilterVariant,
	mdiHumanCapacityDecrease,
	mdiPercent,
} from '@mdi/js'

export default [
	{
		title: 'Ustozlar',
		icon: mdiAccountDetailsOutline,
		to: 'teachers',
		resource: 'Teacher',
		action: 'read',
	},
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
		title: 'Guruh talabalari',
		to: 'student-groups',
		icon: mdiHumanCapacityDecrease,
		resource: 'StudentGroup',
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
		resource: 'Lead',
    action: 'read',
  },
  {
    subheader: 'To\'lov',
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
		title: "Oylik to'lovlar",
		icon: mdiAccountDetailsOutline,
		to: 'payments',
		resource: 'Public',
		action: 'read',
	},
  {
    title: "Ustozlarga to'lovlar",
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Xarajatlar',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    subheader: 'Qo\'shimcha',
    badge: 'New',
    bageColor: 'success',
    resource: 'Public',
    action: 'read',
  },
	{
		title: "Ro'yxatlar",
		icon: mdiFilterVariant,
		children: [
			{
				title: 'Fanlar',
				icon: mdiAccountDetailsOutline,
				to: 'subjects',
				resource: 'Subject',
				action: 'read',
			},
			{
				title: 'Xonalar',
				icon: mdiAccountDetailsOutline,
				to: 'rooms',
				resource: 'Room',
				action: 'read',
			},
		],
	},
	{
		title: 'Import qilish',
		to: 'import',
		resource: 'Public',
		action: 'read',
		icon: mdiFileImportOutline,
	},
]
