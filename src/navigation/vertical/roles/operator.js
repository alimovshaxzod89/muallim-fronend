import { mdiAccountDetailsOutline, mdiAccountGroup, mdiDoor, mdiFileDocumentEdit, mdiFilterVariant, mdiHome, mdiHumanCapacityDecrease, mdiHumanMaleFemale, mdiPercent, mdiShieldAccount } from '@mdi/js'

export default [
  {
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,

		//casl
		resource: 'Group',
		// action: ['manage', 'create', 'read', 'update', 'delete'],
		action: 'create',
  },
	{
		title: 'Talabalar',
		icon: mdiAccountDetailsOutline,
		to: 'students',
		resource: 'Student',
		action: 'manage',
	},
	{
		subheader: '#',
		badge: 'New',
		bageColor: 'success',
		resource: 'Public',
		action: 'read',
	},
	{
		title: 'Darslar',
		icon: mdiAccountDetailsOutline,
		to: '',
		resource: 'Public',
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
		title: 'To\'lovlar',
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
