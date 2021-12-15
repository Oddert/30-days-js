/**
 * Controls wether events should capture
 * @type {boolean}
 * @global
 */
let capture = false
/**
 * Controls wether events should propigate
 * @type {boolean}
 * @global
 */
let propigate = true

// Main user interface controls
const button_once = document.querySelector('.button_once')
const button_multi = document.querySelector('.button_multi')
const capture_toggle = document.getElementById('captureControl')
const propigate_toggle = document.getElementById('propigateControl')

// Other element bindings
const buttons = document.getElementsByClassName('rippler')
const layers = document.querySelectorAll('.layer')
const infoOpen = document.querySelector('.infoButton')
const infoPannel = document.querySelector('.infoPannel')
const infoClose = document.querySelector('.infoPannel .close button')

/**
 * Counts the number of clicks on the 'multi click' button
 * @type {number}
 * @global
 */
let button_multi_counter = 0
/**
 * Counts the number of clicks on the 'single click' button
 * @type {number}
 * @global
 */
let button_once_counter = 0

/**
 * If true, events will be entirely handled by JS.
 * If false, bubbling and capturing will be simulated to slow the animations.
 * @type {boolean}
 * @global
 * @constant
 */
let useNativeJS = false

/**
 * Logs the class of an object on click and optionally stops propigation.
 * @param {HTMLClickEvent} e The event object from a click event listner. 
 */
function logText (e) {
	console.log('logText', this.classList.value)
	if (!propigate) e.stopPropagation()
	createRipple(e)
}

/**
 * Initialises the event listneres for the layers.
 * Unbinds previous listners before assigning new ones (to prevent duplication).
 */
function resetListeners () {
	// Either uses default JS functionality or simulates propigation.
	if (useNativeJS) {
		// We need to account for all possible values in the argument object
		layers.forEach(each => each.removeEventListener('click', logText, {
			capture,
		}))
		layers.forEach(each => each.removeEventListener('click', logText, {
			capture: !capture,
		}))

		layers.forEach(each => each.addEventListener('click', logText, {
			capture,
		}))
	} else {
		layers.forEach(each => each.removeEventListener('click', simulateBubble, { capture }))
		layers.forEach(each => each.removeEventListener('click', simulateBubble, { capture: !capture }))
		layers.forEach(each => each.addEventListener('click', simulateBubble, { capture }))
	}
}

/**
 * Toggles the global capture variable on user input.
 * @param {HTMLChangeEvent} e The event from the clicked target
 */
capture_toggle.onchange = (e) => {
	// cature false produces "three two one" in the console (bubble up)
	// capture true produces "one two three" on capture down
	capture = e.target.checked
	resetListeners()
}

/**
 * Toggles the global propigate variable on user input.
 * @param {HTMLChangeEvent} e The event from the click target.
 */
propigate_toggle.onchange = (e) => {
	propigate = e.target.checked
	resetListeners()
}

/**
 * Increments the 'multi click' button.
 */
button_multi.addEventListener('click', () => {
	console.log('button_multi Clicked')
  button_multi_counter ++
  button_multi.innerHTML = `You may click infinitely (${button_multi_counter})`
})

/**
 * Increments the 'single click' button once then unbinds.
 */
button_once.addEventListener('click', () => {
	console.log('button_once Clicked')
  button_once_counter ++
  button_once.innerHTML = `You may only click once (${button_once_counter})`
}, {
	once: true
})

/**
 * Creates a ripple effect at a click target.
 * Intended to be used as the callback for a click event listner.
 * @param {HTMLChangeEvent} e The event from the click target.
 */
function createRipple (e) {
	const elem = e.currentTarget
	// Creates a bounding rect to get the target element's position.
	const rect = elem.getBoundingClientRect()
	// Creates a ripple span and makes it as large as the largest edge of the target.
	const circle = document.createElement('span')
	const diameter = Math.max(elem.clientWidth, elem.clientHeight)
	const radius = diameter / 2
	circle.style.width  = circle.style.height = `${diameter}px`
	// Shifts the ripple to align it's center with the click location.
	circle.style.left = `${e.clientX - (rect.left + radius)}px`
	circle.style.top = `${e.clientY - (rect.top + radius)}px`
	// Adds the ripple class which will shrink the ripple to 0 width / height and expand it outwards.
	circle.classList.add('ripple')
	// If there is already a ripple in progress, find the element and remove it, replacing it with the new ripple.
	const ripple = elem.getElementsByClassName('ripple')[0]
	if (ripple) ripple.remove()
	elem.prepend(circle)
}

/**
 * Creates a ripple effect at a click target.
 * Intended to be used as the callback for a click event listner.
 * 
 * Same functionality as {@link createRipple} with minor changes.
 * 
 * @param {HTMLChangeEvent} e The event from the click target.
 */
function createButtonRipple (e) {
	const elem = e.currentTarget
	const circle = document.createElement('span')
	const diameter = Math.max(elem.clientWidth, elem.clientHeight)
	const radius = diameter / 2
	circle.style.width  = circle.style.height = `${diameter}px`
	circle.style.left = `${e.clientX - (elem.offsetLeft + radius)}px`
	circle.style.top = `${e.clientY - (elem.offsetTop + radius)}px`
	circle.classList.add('buttonRipple')
	const ripple = elem.getElementsByClassName('buttonRipple')[0]
	if (ripple) ripple.remove()
	elem.prepend(circle)
}

/**
 * Assigns the {@link createButtonRipple} to all elements with the .rippler class.
 */ 
for (const button of buttons) {
	button.addEventListener('click', createButtonRipple)
}

/**
 * Alternative change handler for the layers.
 * Simulates the effect of event propigation capture and bubbling.
 * Creates a ripple animation with a slight delay.
 * @param {HTMLChangeEvent} e The event from the click target.
 */
function simulateBubble (e) {
	console.log({ capture, propigate })
	console.log('simulateBubble', e.target.className)
	// Stops the native event.
	e.stopPropagation()
	const delay = 500
	const offset = 0
	// If the click is on a child of the layer (for instance the ripple or text), find the layer.
	const layer = e.target.classList.contains('layer') ? e.target : e.target.closest('.layer')
	// Determins the index of the layer using it's classname
	const idxMap = {
		'layer one': 2,
		'layer two': 1,
		'layer three': 0,	
	}
	// Create a list of all the layers, orders it (to simulate capture vs bubble).
	// Removes any items which would not have otherwise received the event.
	const list = capture ? [...layers] : [...layers].reverse()
	const filteredList = list.slice(idxMap[e.target.className])
	console.log(layer, filteredList)
	console.log('Now watch the event propigate (or not)...')
	// Simulates the stopPropigation feature
	if (propigate) {
		// Loop over each of the applicable layers and create a riplpe on delay.
		filteredList.forEach((each, idx) => directedRipple(each, (idx * delay) + offset, e))
	} else {
		directedRipple(filteredList[0], 0, e)
	}
}

/**
 * Creates a ripple effect on a specific element.
 * Intended to give other parts of the codebase direct control on where ripples appear (as opposed to letting event handlers invoke it).
 * Same basic code as {@link createRipple}. See it for details on how it works.
 * 
 * @param {HTMLElement} elem The HTML elemnt the ripple effect is to be activated on. Does not need the .rippler class.
 * @param {number} offset An optional delay before the ripple effect starts.
 * @param {HTMLClickEvent} e The click event from the event listener, required to get the user's mouse position from e.clientX and e.clientY.
 */
function directedRipple (elem, offset = 0, e) {
	setTimeout(() => {
		console.log(elem.className)
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
		// Testing code, left in for interest's sake.
		// Produces a 'dot' with it's top left corner at the point of origin of the ripple.

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

/**
 * Opens and closes the info panel.
 * @param {boolean} overide (optional) The desired open state of the info pannel. Overrides the toggle.
 */
function toggleInfo (overide) {
	const open = (typeof overide === "boolean") ? !overide : !infoPannel.classList.contains('hide')
	if (open) {
		infoPannel.classList.add('hide')
	} else {
		infoPannel.classList.remove('hide')
	}
}

/**
 * Opens the info panel.
 */
function openInfoPannel () {
	toggleInfo(true)
}
/**
 * Closes the info panel.
 */
function closeInfoPannel () {
	toggleInfo(false)
}
/**
 * Detects if the user has clicked outside of the info panel content and closes the panel.
 * @param {HTMLChangeEvent} e The click event.
 */
function handleOOBInfoPannel (e) {
	if (e.target.className === 'infoPannel') closeInfoPannel()
}

// Assign the open and close listeners.
infoOpen.onclick = openInfoPannel
infoClose.onclick = closeInfoPannel
infoPannel.addEventListener('click', handleOOBInfoPannel)

/**
 * Some browsers persist <input /> states between soft refreshes.
 * This function checks the initial state of control elements as they cannot be assumed.
 */
function readToggleSwitches () {
	propigate = propigate_toggle.checked
	capture = capture_toggle.checked
}

/**
 * Once the document is loaded, these post-render setup scripts will be invoked.
 */ 
function documentLoaded () {
	resetListeners()
	readToggleSwitches()
}

document.addEventListener('DOMContentLoaded', documentLoaded)


/**
 * Standard debouncing function. 
 * Ensures a function cannot be clicked too rapidly.
 * 
 * @param {function} func The function you want to debounce
 * @param {number} wait The delay time between accepted function calls (duration between calls)
 * @param {boolean} immediate Bypasses the debounce method. Used to allow high-priority invocations through.
 * @returns The debounced function
 */
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