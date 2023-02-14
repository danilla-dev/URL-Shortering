
if (localStorage.getItem('users') === null) {
	localStorage.setItem(
		'users',
		`{ "username":"xxx" , "email":"xxx", "password":"xxx", "links": " ", "status": "true" }`
	)
}

// const users = JSON.parse(localStorage.getItem('allUsersJson')).users

// const logoutAccount = () => {
// 	if (localStorage.getItem('status') !== 'true') {
// 		users.forEach(user => {
// 			user.status = 'false'
// 		})
// 		localStorage.setItem('allUsersJson', JSON.stringify(users))
// 	}
// }

// window.addEventListener('DOMContentLoaded', logoutAccount)
