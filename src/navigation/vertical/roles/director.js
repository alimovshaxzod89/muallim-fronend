import { mdiAccountDetailsOutline, mdiAccountGroup, mdiDoor, mdiFileDocumentEdit, mdiFilterVariant, mdiHome, mdiHumanCapacityDecrease, mdiHumanMaleFemale, mdiPercent, mdiShieldAccount } from '@mdi/js'

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
		subheader: '##',
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
		title: 'Ustozlarga to\'lovlar',
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
		title: 'Darslar va xonalar',
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
		title: 'Guruhlar',
		to: 'groups',
		icon: mdiPercent,

		//casl
		resource: 'Group',
		// action: ['manage', 'create', 'read', 'update', 'delete'],
		action: 'create',
	},
	{
		subheader: '##',
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
