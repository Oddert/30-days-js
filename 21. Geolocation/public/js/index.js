const intro = document.querySelector('.intro')
const closeButton = document.querySelector('.closeButton')
const icon = closeButton.querySelector('.fa')

let open = true

function toggleClose () {
	console.log('??????')
	if (open) {
		intro.classList.add('closed')
		open = false
	} else {
		intro.classList.remove('closed')
		open = true
	}
}

closeButton.onclick = toggleClose