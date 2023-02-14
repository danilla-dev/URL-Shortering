import { logout } from './logout.js'
const accUl = document.querySelectorAll('.acc-ul')
const menusLi = document.querySelectorAll('.acc-ul li')
const menuListWindow = document.querySelector('.account-list-window')
const menuListBar = document.querySelector('.account-list-bar')

let loggedUser = ''

const findLoggedUser = () => {
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users
	console.log(users)
	users.forEach(user => {
		if (user.status == 'true') {
			loggedUser = user
		}
	})
}

const deleteButtons = () => {
	menusLi.forEach(li => {
		li.remove()
	})
}
const createButtons = (element, nick) => {
	const logoutLi = document.createElement('li')
	const nicknameLi = document.createElement('li')

	const logoutBtn = document.createElement('button')
	logoutBtn.textContent = 'Logout'
	logoutBtn.classList.add('logout-btn')
	logoutLi.append(logoutBtn)

	const nicnameText = document.createElement('p')
	const userIcon = document.createElement('i')
	userIcon.classList.add('fa-solid', 'fa-circle-user')
	nicnameText.classList.add('menu-nick')
	nicnameText.textContent = nick
	nicknameLi.append(userIcon)
	nicknameLi.append(nicnameText)



	element.append(nicknameLi)
	element.append(logoutLi)

	logoutBtn.addEventListener('click', logout)
}

const checkLogedStatus = () => {
	if (localStorage.getItem('status') == 'true') {
		deleteButtons()
		findLoggedUser()
		accUl.forEach(ul => {
			createButtons(ul, loggedUser.username)
		})
	} else {
		menuListWindow.innerHTML = `
        <li><button class="login-btn acc-btn">Login</button></li>
        <li><a href="signUp.html" class="signup-link"><button class=" signup-btn acc-btn">Sign Up</button></a>
        </li>
        `
		menuListBar.innerHTML = `
        <li><button class="login-btn acc-btn">Login</button></li>
        <li><a href="signUp.html" class="signup-link"><button class="signup-btn acc-btn">Sign Up</button></a></li>
        `
	}
}

window.addEventListener('DOMContentLoaded', checkLogedStatus)
