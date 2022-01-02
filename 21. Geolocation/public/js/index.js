const intro = document.querySelector('.intro')
const closeButton = document.querySelector('.closeButton')
const icon = closeButton.querySelector('.fa')

let open = true

/**
 * Toggles the description bar to give more space to the app selectors.
 * Removes the .closed class to the container.
 */
function toggleClose () {
	if (open) {
		intro.classList.add('closed')
		open = false
	} else {
		intro.classList.remove('closed')
		open = true
	}
}

closeButton.onclick = toggleClose