const getStartBtns = document.querySelectorAll('.get-startet-btn')
const header = document.querySelector('.header-container')
getStartBtns.forEach(btn => {
	btn.addEventListener('click', () => {
		window.scrollTo(0, header.scrollHeight)
	})
})
