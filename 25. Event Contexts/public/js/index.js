
let capture = false
let propigate = true

const button_once = document.querySelector('.button_once')
const button_multi = document.querySelector('.button_multi')
const capture_toggle = document.querySelector('.captureToggle')
const propigate_toggle = document.querySelector('.propigateToggle')

const buttons = document.getElementsByClassName('rippler')
const layers = document.querySelectorAll('.layer')

let useNativeJS = false

function logText (e) {
	console.log('logText', this.classList.value)
	if (!propigate) e.stopPropagation()
	createRipple(e)
}

function resetListeners () {
	if (useNativeJS) {
		// to re-assign the event listeners, the old listeners must first be remmoved (to stop duplication)
		// We need to account for all possible values in the argument object
		layers.forEach(each => each.removeEventListener('click', logText, {
			capture,
		}))
		layers.forEach(each => each.removeEventListener('click', logText, {
			capture: !capture,
		}))

		layers.forEach(each => each.addEventListener('click', logText, {
			capture,
			// once: true
		}))
	} else {
		layers.forEach(each => each.removeEventListener('click', simulateBubble, { capture }))
		layers.forEach(each => each.removeEventListener('click', simulateBubble, { capture: !capture }))
		layers.forEach(each => each.addEventListener('click', simulateBubble, { capture }))
	}
}

capture_toggle.onclick = (e) => {
	capture = !capture
	capture_toggle.textContent = capture ? 'Capture: true' : 'Capture: false'
	resetListeners()
}

propigate_toggle.onclick = (e) => {
	propigate = !propigate
	propigate_toggle.textContent = propigate ? 'Propigate: true' : 'Propigate: false'
	resetListeners()
}

//cature false produces "three two one" in the console (bubble up)
//capture true produces "one two three" on capture down

let button_multi_counter = 0
let button_once_counter = 0

button_multi.addEventListener('click', () => {
  console.log('button_multi Clicked')
  button_multi_counter ++
  button_multi.innerHTML = `You may click infinately (${button_multi_counter})`
})
// once unbinds after click
button_once.addEventListener('click', () => {
	console.log('button_once Clicked')
  button_once_counter ++
  button_once.innerHTML = `You may only click once (${button_once_counter})`
}, {
	once: true
})

function createRipple (e) {
	const elem = e.currentTarget
	const circle = document.createElement('span')
	const diameter = Math.max(elem.clientWidth, elem.clientHeight)
	const radius = diameter / 2
	// console.log(e.clientX, elem.offsetLeft)
	circle.style.width  = circle.style.height = `${diameter}px`
	circle.style.left = `${e.clientX - (elem.offsetLeft + radius)}px`
	circle.style.top = `${e.clientY - (elem.offsetTop + radius)}px`
	circle.classList.add('ripple')
	const ripple = elem.getElementsByClassName('ripple')[0]
	if (ripple) ripple.remove()
	elem.prepend(circle)
}

for (const button of buttons) {
	button.addEventListener('click', createRipple)
}

// calling stop propigation seems to apply to all evt listeners
// considder a way to handle the ripple, event propigation and simulated bubble in correct order
function simulateBubble (e) {
	console.log('simulateBubble', e.target.className)
	e.stopPropagation()
	const delay = 500
	const offset = 250
	const layer = e.target.classList.contains('layer') ? e.target : e.target.closest('.layer')
	const idxMap = {
		'layer one': 2,
		'layer two': 1,
		'layer three': 0,	
	}
	const list = capture ? [...layers] : [...layers].reverse()
	const filteredList = list.slice(idxMap[e.target.className])
	console.log(layer, filteredList)
	filteredList.forEach((each, idx) => directedRipple(each, (idx * delay) + offset, e))
}

function directedRipple (elem, offset = 0, e) {
	setTimeout(() => {
		const rect = elem.getBoundingClientRect()
		const circle = document.createElement('span')
		const diameter = Math.max(elem.clientWidth, elem.clientHeight)
		const radius = diameter / 2

		circle.style.width  = circle.style.height = `${diameter}px`
		circle.style.left = `${e.clientX - (rect.left + radius)}px`
		circle.style.top = `${e.clientY - (rect.top + radius)}px`
		circle.classList.add('ripple')
		const ripple = elem.getElementsByClassName('ripple')[0]
		if (ripple) ripple.remove()
		elem.prepend(circle)
		// const dot = document.createElement('div')
		// const cols = {
		// 	'layer one': 'red',
		// 	'layer two': 'blue',
		// 	'layer three': 'yellow',
		// }
		// dot.className = 'dot'
		// dot.style.width  = dot.style.height = `${10}px`
		// dot.style.top = `${e.clientY - (rect.top + 0)}px`
		// dot.style.left = `${e.clientX - (rect.left + 0)}px`
		// dot.style.background = cols[elem.className]
		// elem.prepend(dot)
	}, offset)
}

document.addEventListener('DOMContentLoaded', resetListeners)



function debounce(func, wait = 20, immediate) {
	var timeout
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}