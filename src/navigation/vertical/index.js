import views from './views'

// import appAndPages from './app-and-pages'
// import chartsAndMaps from './charts-and-maps'
// import dashboard from './dashboard'
// import formsAndTables from './forms-and-tables'
// import others from './others'
// import uiElements from './ui-elements'

// Array of sections
// export default [...dashboard, ...appAndPages, ...uiElements, ...formsAndTables, ...chartsAndMaps, ...others]


// import admin from './roles/admin'
// import director from './roles/director'
// import manager from './roles/manager'
// import operator from './roles/operator'
// import teacher from './roles/teacher'
//
let roleMenu = []
//
// const userData = JSON.parse(localStorage.getItem('userData'))
// if (userData && userData.role) {
// 	switch (userData.role) {
// 		case 'admin':
// 			roleMenu = admin
// 			break
// 		case 'director':
// 			roleMenu = director
// 			break
// 		case 'manager':
// 			roleMenu = manager
// 			break
// 		case 'operator':
// 			roleMenu = operator
// 			break
// 		case 'teacher':
// 			roleMenu = teacher
// 			break
// 	}
// } else {
	roleMenu = views
// }

export default roleMenu
