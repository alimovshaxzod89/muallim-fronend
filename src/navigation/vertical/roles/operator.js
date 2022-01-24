import { mdiAccountDetailsOutline, mdiPercent } from '@mdi/js'

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
    title: 'Darslar va xonalar',
    icon: mdiAccountDetailsOutline,
    to: 'lessons-rooms',
    resource: 'Group',
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
    to: '',
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
    title: "To'lovlar",
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Qarzdor talabalar',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
]
