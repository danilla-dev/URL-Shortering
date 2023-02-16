const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')
const loginInput = document.querySelector('.email')
const passwordInput = document.querySelector('.password')
const loginBtn = document.querySelector('.login-submit-btn')
let loggedUser
let allUsers = JSON.parse(localStorage.getItem('allUsersJson')).users

const checkLoginAndEmail = input => {
	allUsers.forEach(user => {
		if (user.username == input || user.email == input) {
			loggedUser = user
			checkPassword(passwordInput.value)
		} else {
			const loginFormBox = loginInput.parentElement
			loginFormBox.classList.add('form-error')
		}
	})
}
const checkPassword = input => {
	if (loggedUser.password == input) {
		alert('zalogowano')
	} else {
		alert('zle haslo')
	}
}

loginBtn.addEventListener('click', e => {
	e.preventDefault()
	checkLoginAndEmail(loginInput.value)
	// countErrors()
})
