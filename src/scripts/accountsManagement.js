export const findLoggedUser = () => {
	let loggedUser
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users
	if (localStorage.getItem('allUsersJson') == null) {
		return
	} else {
		users.forEach(user => {
			if (user.status == 'true') {
				loggedUser = user
			}
		})
		return loggedUser
	}
}

export const logout = () => {
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users
	users.forEach(user => {
		user.status = 'false'
	})
	setStatusAddUsers('false', users)
	location.reload()
}

export const setStatusAddUsers = (status, users) => {
	localStorage.setItem('status', status)
	localStorage.setItem('allUsersJson', `{"users":${JSON.stringify(users)}}`)
}


const setDefaultUser = () => {
	if (localStorage.getItem('allUsersJson') == null) {
		localStorage.setItem('allUsersJson', `{ "users":[]}`)
		localStorage.setItem('Unlogged links', '{"links": []}')
	}
}
setDefaultUser()
