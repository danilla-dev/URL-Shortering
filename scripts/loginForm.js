const inputs = document.querySelectorAll('input')
const form = document.querySelector('form')
const loginInput = document.querySelector('.email')
const passwordInput = document.querySelector('.password')
const loginBtn = document.querySelector('.login-submit-btn')
let loggedUser
let allUsers = JSON.parse(localStorage.getItem('allUsersJson')).users
console.log(allUsers.length)

const loginUser = () => {
	allUsers.forEach(user => {
		if (user == loggedUser) {
			user.status = 'true'
		}
	})
	localStorage.setItem('status', 'true')
	localStorage.setItem('allUsersJson', `{ "users":${JSON.stringify(allUsers)}}`)
	location.href = './'
}

const findUsers = () => {
	if (allUsers.length == 0) {
		alert('No users in memory')
	}
}

const checkLoginAndEmail = value => {
	allUsers.forEach(user => {
		if (user.username == value || user.email == value) {
			loggedUser = user
			clearError(loginInput)
			checkPassword(passwordInput.value)
		} else {
			showError(loginInput, `User not found`)
		}
	})
}
const checkPassword = input => {
	if (loggedUser.password == input) {
		clearError(passwordInput)
		loginUser()
	} else {
		showError(passwordInput, 'Incorrect password')
	}
}
const showError = (input, msg) => {
	const formBox = input.parentElement
	const error = formBox.querySelector('.error')
	formBox.classList.add('form-error')
	error.textContent = msg
}
const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('form-error')
}
const checkForm = () => {
	inputs.forEach(input => {
		if (input.value == '') {
			showError(input, `Please add correct value`)
		} else {
			clearError(input)
		}
	})
}

loginBtn.addEventListener('click', e => {
	e.preventDefault()
	checkForm()
	findUsers()
	checkLoginAndEmail(loginInput.value)
})
