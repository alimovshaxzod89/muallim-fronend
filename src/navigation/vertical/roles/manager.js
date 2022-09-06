import {
  mdiAccountDetailsOutline, mdiFilterVariant, mdiPercent
} from '@mdi/js'

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
		resource: 'Lead',
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
    title: "To'lovlar",
    icon: mdiAccountDetailsOutline,
    to: 'payments',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Qarzdor talabalar',
    icon: mdiAccountDetailsOutline,
    to: 'student-depts',
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
    subheader: '###',
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
			{
				title: 'Ustozlar',
				icon: mdiAccountDetailsOutline,
				to: 'teachers',
				resource: 'Teacher',
				action: 'read',
			},
		],
	},
]
