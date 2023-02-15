export const logout = () => {
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users
	console.log(users)
	users.forEach(user => {
		user.status = 'false'
	})
	localStorage.setItem('status', 'false')
	localStorage.setItem('allUsersJson', JSON.stringify(users))
	location.replace()
}
