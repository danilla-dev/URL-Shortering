const URL = 'https://api.shrtco.de/v2/shorten?url='
const input = document.querySelector('input')
const form = document.querySelector('form')
const shortenBtn = document.querySelector('.shorten-btn')
const error = document.querySelector('.error')

const resultContainer = document.querySelector('.shorten-results-container')

const regExpURl =
	/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/

let objectsArray = []

const copyLink = e => {
	if (e.target.tagName === 'BUTTON') {
		const shortenLink = e.target.previousElementSibling.textContent
		navigator.clipboard.writeText(shortenLink).then(() => {
			e.target.classList.add('copied')
			e.target.textContent = 'Copied!'
		})
	}
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
	newWindow.addEventListener('click', copyLink)

	localStorage.setItem('Your links', resultContainer.innerHTML)
}

const getShortenURL = url => {
	axios
		.get(URL + url)
		.then(res => {
			const shortLink = res.data.result.full_short_link
			const orginalLink = res.data.result.original_link
			createElement(shortLink, orginalLink)
		})
		.catch(err => console.log('ERROR!!'))
}

const checkURL = url => {
	if (regExpURl.test(url)) {
		form.classList.remove('input-error')
		error.style.display = 'none'
		getShortenURL(url)
	} else if (url == '') {
		form.classList.add('input-error')
		error.style.display = 'block'
		error.textContent = 'Please add a link'
	} else {
		error.style.display = 'block'
		error.textContent = 'Please add a correct link'
	}
}

const shortURL = e => {
	e.preventDefault()
	checkURL(input.value)
}

shortenBtn.addEventListener('click', shortURL)
window.addEventListener('DOMContentLoaded', () => {
	let localLinks = localStorage.getItem('Your links')
	resultContainer.innerHTML = localLinks
})
