export const findLoggedUser = () => {
	let users = JSON.parse(localStorage.getItem('allUsersJson')).users
	let loggedUser
	console.log(users)
	users.forEach(user => {
		if (user.status == 'true') {
			loggedUser = user
		}
	})
	
	return loggedUser
}

export const logout = () => {
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users

	users.forEach(user => {
		user.status = 'false'
	})
	localStorage.setItem('status', 'false')
	localStorage.setItem('allUsersJson', `{ "users":${JSON.stringify(users)}}`)
	localStorage.setItem('users', localStorage.getItem('users').replaceAll('true', 'false'))
	// .replaceAll('true', 'false')

	location.reload()
}

const setDefaultUser = () => {
	if (localStorage.getItem('users') === null) {
		localStorage.setItem(
			'users',
			`{ "username":"xxx" , "email":"xxx", "password":"xxx", "links": " ", "status": "false" }`
		)
	}
}



window.addEventListener('DOMContentLoaded', setDefaultUser)
