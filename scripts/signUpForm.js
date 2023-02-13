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

submitBtn.addEventListener('click', e => {
	e.preventDefault()
	inputs.forEach(input => {
		checkForm(input)
	})
	checkLength(username, 5)
	checkLength(password, 8)
	checkPasswords(password, rePass)
	// saveUser()
})
