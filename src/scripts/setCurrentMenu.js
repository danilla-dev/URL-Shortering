import { logout, findLoggedUser } from './accountsManagement.js'
const accUl = document.querySelectorAll('.acc-ul')
const menusLi = document.querySelectorAll('.acc-ul li')
const menuListWindow = document.querySelector('.account-list-window')
const menuListBar = document.querySelector('.account-list-bar')
 
let loggedUser = findLoggedUser()

const deleteButtons = () => {
	menusLi.forEach(li => {
		li.remove()
	})
}
const createButtons = element => {
	const logoutLi = document.createElement('li')
	const nicknameLi = document.createElement('li')

	const logoutBtn = document.createElement('button')
	logoutBtn.textContent = 'Logout'
	logoutBtn.classList.add('logout-btn')
	logoutLi.append(logoutBtn)

	const nicnameText = document.createElement('p')
	nicnameText.textContent = loggedUser.username
	nicnameText.classList.add('menu-nick')
	nicknameLi.append(nicnameText)

	element.append(nicknameLi)
	element.append(logoutLi)

	logoutBtn.addEventListener('click', logout)
}

const createCurrentMenu = () => {
	if (localStorage.getItem('status') == 'true') {
		deleteButtons()
		accUl.forEach(ul => {
			createButtons(ul)
		})
	} else {
		menuListWindow.innerHTML = `
        <li><a href="login.html"><button class="login-btn acc-btn">Login</button></a></li>
        <li><a href="signUp.html" class="signup-link"><button class=" signup-btn acc-btn">Sign Up</button></a>
        </li>
        `
		menuListBar.innerHTML = `
        <li><a href="login.html"><button class="login-btn acc-btn">Login</button></a></li>
        <li><a href="signUp.html" class="signup-link"><button class="signup-btn acc-btn">Sign Up</button></a></li>
        `
	}
}

window.addEventListener('DOMContentLoaded', createCurrentMenu)
