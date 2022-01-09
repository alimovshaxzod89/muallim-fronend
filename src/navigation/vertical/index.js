import views from './views'

// import appAndPages from './app-and-pages'
// import chartsAndMaps from './charts-and-maps'
// import dashboard from './dashboard'
// import formsAndTables from './forms-and-tables'
// import others from './others'
// import uiElements from './ui-elements'

// Array of sections
// export default [...dashboard, ...appAndPages, ...uiElements, ...formsAndTables, ...chartsAndMaps, ...others]


import admin from './roles/admin'
import operator from './roles/operator'

let roleMenu = []

const userData = localStorage.getItem('userData')

if (userData && userData.role) {
	switch (userData.role) {
		case 'admin':
			roleMenu = admin
			break
		case 'operator':
			roleMenu = operator
			break
	}
} else {
	roleMenu = views
}

export default roleMenu
