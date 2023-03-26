const burgerBtn = document.querySelector('.burger-btn')
const menuWindow = document.querySelector('.menu-window')

const showBurgerMenu = () => {
	menuWindow.classList.toggle('show-menu')
}

burgerBtn.addEventListener('click', showBurgerMenu)

window.addEventListener('resize', () => {
	if (window.innerWidth > 767) {
		menuWindow.classList.remove('show-menu')
	}
})
