import { mdiCheckboxBlankCircleOutline } from '@mdi/js'
import envParams from '@envParams'

const themeConfig = {
	app: {
		name: envParams.COMPANY_NAME ?? 'MUALLIM',
		// logo: envParams.COMPANY_NAME ? require('@/assets/logo/' + envParams.COMPANY_NAME + '-dark.png') : require('@/assets/images/svg/logo.svg'),
		// logoInLogin: envParams.COMPANY_NAME ? require('@/assets/logo/' + envParams.COMPANY_NAME + '.png') : require('@/assets/images/svg/logo.svg'),
		// isDark: false,
		isRtl: false,
		contentLayoutNav: 'vertical', // vertical, horizontal
		routeTransition: 'scroll-x-transition', // https://vuetifyjs.com/en/styles/transitions/#api
		// ! `semi-dark` isn't available for horizontal nav menu
		skinVariant: 'semi-dark', // default, bordered, semi-dark
		contentWidth: 'full',
	},
	menu: {
		isMenuHidden: false,
		isVerticalNavMini: false,
		verticalMenuAccordion: true,
		groupChildIcon: mdiCheckboxBlankCircleOutline,
		horizontalNavMenuGroupOpenOnHover: true,
	},
	appBar: {
		/*
		! In Content Layout Horizontal Nav type `hidden` value won't work
		! In Content Layout Horizontal Nav type value of `type` will affect both Appbar and Horizontal Navigation Menu
		*/
		type: 'fixed', // fixed, static, hidden
		isBlurred: true,
	},
	footer: {
		type: 'static', // fixed, static, hidden
	},
	themes: {
		light: {
			primary: '#9155FD',
			accent: '#0d6efd',
			secondary: '#8A8D93',
			success: '#56CA00',
			info: '#16B1FF',
			warning: '#FFB400',
			error: '#FF4C51',
		},
		dark: {
			primary: '#9155FD',
			accent: '#0d6efd',
			secondary: '#8A8D93',
			success: '#56CA00',
			info: '#16B1FF',
			warning: '#FFB400',
			error: '#FF4C51',
		},
	},
}

export default themeConfig
