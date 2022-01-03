const DARKMODE_CLASS = 'darkmode'
const STORAGE_KEY = 'ODDERT_JS30_LIGHTMODE'

const body = document.querySelector('body')
const toggle = document.querySelector('.rocker')
const toggleInput = toggle.querySelector('input')

function toggleDarkMode (preference = null) {
	if (typeof preference === 'boolean') {
		if (preference === true) {
			activateDarkMode(true)
		} else {
			deactivateDarkMode(true)
		}
	} else {
		const isChecked = readBodyClass()
		if (isChecked) {
			activateDarkMode(false)
		} else {
			deactivateDarkMode(false)
		}
	}
}

/**
 * Adds the darkmode class and optionally updates the toggle (for two-way binding).
 * @param {boolean} updateToggle If true, the state of the toggle switch will be forced to true.
 */
function activateDarkMode (updateToggle = false) {
	console.log('switching to dark mode')
	body.classList.add(DARKMODE_CLASS)
	writeLocalStorage(true)
	if (updateToggle) toggleInput.checked = true
}

/**
 * Removes the darkmode class and optionally updates the toggle (for two-way binding).
 * @param {boolean} updateToggle If true, the state of the toggle switch will be forced to false.
 */
function deactivateDarkMode (updateToggle = false) {
	console.log('switching to light mode')
	body.classList.remove(DARKMODE_CLASS)
	writeLocalStorage(false)
	if (updateToggle) toggleInput.checked = false
}

/**
 * @returns {boolean} True if the dark mode calss exists on the body.
 */
function readBodyClass () {
	return body.classList.contains(DARKMODE_CLASS)
}

/**
 * @returns {boolean} True if the toggle has darkmode activated.
 */
function readSwitchState () {
	return toggleInput.checked
}

/**
 * Read the user's dark mode preference.
 * @returns {boolean} True if the user's client agent prefers dark mode.
 */
function readClientPreference () {
	return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function readLocalStorage () {
	return localStorage.getItem(STORAGE_KEY)
}

function writeLocalStorage (switchState) {
	return localStorage.setItem(STORAGE_KEY, switchState)
}

/**
 * On document load, read various inputs to optionally actiavate dark mode.
 */
function handleDOMLoaded () {
	const preferDarkMode = readClientPreference()
	const localStoreDarkMode = readLocalStorage()
	console.log('Client has a dark mode prefernece: ', preferDarkMode)
	console.log('Client has previous state: ', localStoreDarkMode)
	if (localStoreDarkMode !== null) {
		if (localStoreDarkMode === "true") {
			activateDarkMode(true)
		} else {
			deactivateDarkMode(true)
		}
	} else if (preferDarkMode) {
		activateDarkMode(true)
	} else {
		const switchState = readSwitchState()
		console.log('Toggle switch current state: ', switchState)
		if (switchState) {
			activateDarkMode()
		} else if (readBodyClass()) {
			deactivateDarkMode(true)
		}
	}
}

toggleInput.onchange = (e) => toggleDarkMode(e.target.checked)
window.addEventListener('DOMContentLoaded', handleDOMLoaded())