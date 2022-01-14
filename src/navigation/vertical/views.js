import {
  mdiAccountDetailsOutline,
  mdiAccountGroup,
  mdiCash,
  mdiDoor,
  mdiFilterVariant,
  mdiHome,
  mdiHumanCapacityDecrease,
  mdiHumanMaleFemale,
  mdiPercent,
  mdiShieldAccount,
} from '@mdi/js'

export default [
  {
    title: 'Asosiy panel',
    icon: mdiHome,
    to: 'dashboard-eCommerce',
  },
	{
		title: 'Bron',
		to: '',
		resource: 'Public',
		action: 'read',
		icon: mdiCash,
	},
	{
		title: 'Xonalar',
		to: 'rooms',
		resource: 'Room',
		action: 'manage',
		icon: mdiDoor,
	},
	{
		title: 'Hisobot',
		to: '',
		resource: 'Public',
		action: 'read',
		icon: mdiFilterVariant,
	},
  // {
  //   title: 'Admin',
  //   icon: mdiShieldAccount,
  //   to: 'link',
  // },
]
