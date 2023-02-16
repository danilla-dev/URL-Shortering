import { findLoggedUser } from './accountsManagement.js'
const URL = 'https://api.shrtco.de/v2/shorten?url='
const input = document.querySelector('input')
const form = document.querySelector('form')
const shortenBtn = document.querySelector('.shorten-btn')
const error = document.querySelector('.error')
const resultContainer = document.querySelector('.shorten-results-container')
const regExpURl =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

let loggedUser = findLoggedUser()
let logoutLinks = JSON.parse(localStorage.getItem('Unlogged links')).links

const copyLink = e => {
	if (e.target.tagName === 'BUTTON') {
		const shortenLink = e.target.previousElementSibling.textContent
		navigator.permissions.query({ name: 'clipboard-write' }).then(result => {
			if (result.state == 'granted' || result.state == 'prompt') {
				alert('Write access ranted!')
			}
		})
		navigator.clipboard.writeText(shortenLink).then(() => {
			e.target.classList.add('copied')
			e.target.textContent = 'Copied!'
		})
	}
}
const shortURL = e => {
	e.preventDefault()
	checkURL(input.value)
}

const checkURL = url => {
	if (regExpURl.test(url)) {
		form.classList.remove('input-error')
		error.style.display = 'none'
		checkLogedStatus(url)
	} else if (url == '') {
		form.classList.add('input-error')
		error.style.display = 'block'
		error.textContent = 'Please add a link'
	} else {
		error.style.display = 'block'
		error.textContent = 'Please add a correct link'
	}
}

const checkLogedStatus = url => {
	let status = localStorage.getItem('status')
	if (status === 'true') {
		checkURLCount(9999999999, url)
	} else {
		checkURLCount(5, url)
	}
}
const checkURLCount = (limit, url) => {
	let URlCount = document.querySelectorAll('.shorten-result-window').length
	if (URlCount >= limit) {
		alert('If you want short more links please signUp or login')
	} else {
		getShortenURL(url)
	}
}

const getShortenURL = url => {
	axios
		.get(URL + url)
		.then(res => {
			const shortLink = res.data.result.full_short_link
			const orginalLink = res.data.result.original_link
			createElement(shortLink, orginalLink)
			setLinkstoAccount(orginalLink, shortLink)
		})
		.catch(err => console.log('ERROR!!'))
}

const createElement = (short, orginal) => {
	const newWindow = document.createElement('div')
	newWindow.classList.add('shorten-result-window', 'wrapper')

	const orginalLinkDiv = document.createElement('div')
	orginalLinkDiv.classList.add('original')

	const orginalLinkText = document.createElement('p')
	orginalLinkText.classList.add('original-link')
	orginalLinkText.textContent = orginal

	const resultLinkDiv = document.createElement('div')
	resultLinkDiv.classList.add('result')

	const resultLinkText = document.createElement('p')
	resultLinkText.classList.add('result-link')
	resultLinkText.textContent = short

	const copyBtn = document.createElement('button')
	copyBtn.classList.add('copy-btn')
	copyBtn.innerText = 'Copy!'

	newWindow.append(orginalLinkDiv)
	newWindow.append(resultLinkDiv)
	newWindow.append(copyBtn)
	orginalLinkDiv.append(orginalLinkText)
	resultLinkDiv.append(resultLinkText)
	resultContainer.prepend(newWindow)
}

const findAndSet = (long, short) => {
	const users = JSON.parse(localStorage.getItem('allUsersJson')).users
	users.forEach(user => {
		if (user.status == 'true') {
			let loggedUser 
			loggedUser = user
			loggedUser.links.push({ orginal: long, short: short })
		}
	})
	localStorage.setItem('allUsersJson', `{ "users":${JSON.stringify(users)}}`)
}

const setLinkstoAccount = (orginal, short) => {
	if (localStorage.getItem('status') !== 'true') {
		logoutLinks.push({ orginal: orginal, short: short })
		localStorage.setItem('Unlogged links', `{"links":${JSON.stringify(logoutLinks)}}`)
	} else {
		findAndSet(orginal, short)
	}
}

const showCurrentLinks = () => {
	if (localStorage.getItem('status') !== 'true') {
		logoutLinks.forEach(element => {
			createElement(element.short, element.orginal)
		})
	} else {
		const userLinks = loggedUser.links
		userLinks.forEach(element => {
			createElement(element.short, element.orginal)
		})
	}
}

shortenBtn.addEventListener('click', shortURL)
resultContainer.addEventListener('click', copyLink)
window.addEventListener('DOMContentLoaded', showCurrentLinks)
