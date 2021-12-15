
const msg = new SpeechSynthesisUtterance()
let voices = []

const voicesDropdown = document.querySelector('[name="voice"]')
const options = document.querySelectorAll('[type="range"], [name="text"]')
const speakButton = document.querySelector('#speak')
const stopButton = document.querySelector('#stop')

msg.text = document.querySelector('[name="text"]').value

function populateVoices () {
  voices = speechSynthesis.getVoices()
  voicesDropdown.innerHTML = voices
    .map(each =>
      `<option value="${each.name}">${each.name} (${each.lang})</option>`
    ).join('')
}

function toggle (restart = true) {
  speechSynthesis.cancel()
  if (restart) {
    speechSynthesis.speak(msg)
  }
}

function setVoice () {
  msg.voice = voices.find(each => each.name === this.value)
}

function setOption () {
  msg[this.name] = this.value
  if (!(this.name === "text")) toggle()
}

speechSynthesis.addEventListener('voiceschanged', populateVoices)
voicesDropdown.addEventListener('change', setVoice)

options.forEach(each => each.addEventListener('change', setOption))
speakButton.addEventListener('click', toggle)
stopButton.addEventListener('click', () => toggle(false))

document.addEventListener('DOMContentLoaded', populateVoices)
