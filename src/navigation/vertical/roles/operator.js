import { mdiAccountDetailsOutline, mdiAccountGroup, mdiDoor, mdiFileDocumentEdit, mdiFilterVariant, mdiHome, mdiHumanCapacityDecrease, mdiHumanMaleFemale, mdiPercent, mdiShieldAccount } from '@mdi/js'

export default [
  {
    title: 'Guruhlar',
    to: 'groups',
    icon: mdiPercent,
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
	},
	{
		title: 'Darslar',
		icon: mdiAccountDetailsOutline,
		to: '',
	},
	{
		title: 'Lidlar',
		icon: mdiAccountDetailsOutline,
		to: '',
	},
	{
		subheader: '#',
		badge: 'New',
		bageColor: 'success',
	},
	{
		title: 'To\'lovlar',
		icon: mdiAccountDetailsOutline,
		to: '',
	},
	{
		title: 'Qarzdor talabalar',
		icon: mdiAccountDetailsOutline,
		to: '',
	},
]
