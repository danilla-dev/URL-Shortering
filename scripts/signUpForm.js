const submitBtn = document.querySelector('.signup-submit-btn')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const rePass = document.querySelector('.repeat-password')
const username = document.querySelector('.username')
const inputs = document.querySelectorAll('input')
const emailRegExp =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

// LINK TO PASS REGEXP https://www.thepolyglotdeveloper.com/2015/05/use-regex-to-test-password-strength-in-javascript/
//

const clearForm = () => {
	inputs.forEach(input => {
		input.value = ''
	})
}

const addNewUser = (username, email, password) => {
	let usersMemory = localStorage.getItem('users')

	const newUser = `{ "username":"${username}" , "email":"${email}", "password":"${password}", "links":" ", "status": "true" }`

	usersMemory = usersMemory.concat(',', newUser)
	localStorage.setItem('users', usersMemory)

	let allUsersJson = `{ "users":[${usersMemory}]}`
	localStorage.setItem('allUsersJson', allUsersJson)
	localStorage.setItem('status', 'true')

	location.href = './'
	clearForm()
	
}

const countErrors = () => {
	const errorsCount = document.querySelectorAll('.form-error').length
	if (errorsCount === 0) {
		addNewUser(username.value, email.value, password.value)
	}
}
const checkPasswords = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, 'Passwords is not the same.')
	}
}

const checkLength = (input, min) => {
	if (input.value.length < min) {
		showError(input, `Too short! Minimum ${min} characters.`)
	}
}

const showError = (input, msg) => {
	const formBox = input.parentElement
	const errorMsg = formBox.querySelector('.error')

	formBox.classList.add('form-error')
	errorMsg.textContent = msg
}

const clearError = input => {
	const formBox = input.parentElement
	formBox.classList.remove('form-error')
}

const checkForm = input => {
	if (input.value === '') {
		showError(input, input.placeholder)
	} else {
		clearError(input)
	}
}
const checkEmail = email => {
	if (!emailRegExp.test(email.value)) {
		showError(email, 'Incorrect format of email adress')
	}
}

submitBtn.addEventListener('click', e => {
	e.preventDefault()
	inputs.forEach(input => {
		checkForm(input)
	})
	checkEmail(email)
	checkLength(username, 5)
	checkLength(password, 8)
	checkPasswords(password, rePass)
	countErrors()
	// saveUser()
})
