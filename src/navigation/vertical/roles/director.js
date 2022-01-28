import { mdiAccountDetailsOutline, mdiPercent } from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Markaz daromadi',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
  {
    title: 'Ustozlar daromadi',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
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
    title: 'Tushumlar',
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
  {
    title: 'Xarajatlar',
    icon: mdiAccountDetailsOutline,
    to: '',
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
    subheader: '##',
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
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,
    resource: 'Group',
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
    title: 'Admin',
    icon: mdiAccountDetailsOutline,
    to: '',
    resource: 'Public',
    action: 'read',
  },
]
