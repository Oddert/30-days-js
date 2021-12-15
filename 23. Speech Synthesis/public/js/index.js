
const msg = new SpeechSynthesisUtterance()
let voices = []

const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')

msg.text = document.querySelector('[name="text"]').value

/**
 * Reads the browser's available speech synthesis voices and populates the select menu.
 */
function populateVoices () {
  voices = speechSynthesis.getVoices()
  voicesDropdown.innerHTML = voices
    .map(each =>
      `<option value="${each.name}">${each.name} (${each.lang})</option>`
    ).join('')
}

/**
 * Stops the speech synthesiser and optionally restarts ir.
 * @param {boolean} restart Begin the speech reader. Set false to stop only.
 */
function toggle (restart = true) {
  speechSynthesis.cancel()
  if (restart) {
    speechSynthesis.speak(msg)
  }
}

/**
 * Change handler for the select menu.
 * Searches through the available voices to match the target value of 'this'.
 */
function setVoice () {
  msg.voice = voices.find(each => each.name === this.value)
}

/**
 * Change handler for both sliders abd the text input.
 * Restarts the speech synthesiser if the input is a slider.
 */
function setOption () {
	console.log('setOption', this)
  msg[this.name] = this.value
  if (!(this.name === "text")) toggle()
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)

options.forEach(each => each.addEventListener('change', setOption))
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false))

document.addEventListener('DOMContentLoaded', populateVoices)
