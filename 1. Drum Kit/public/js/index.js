const audio = [
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', letter: 'Q', color: '#1bbc9b', clickColor: '#16a086', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', letter: 'W', color: '#2dcc70', clickColor: '#27ae61', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', letter: 'E', color: '#3598db', clickColor: '#297fb8', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', letter: 'A', color: '#9a59b5', clickColor: '#8d44ad', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', letter: 'S', color: '#f1c40f', clickColor: '#f39c11', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', letter: 'D', color: '#f39c11', clickColor: '#e67f22', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', letter: 'Z', color: '#d25400', clickColor: '#e84c3d', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', letter: 'X', color: '#e84c3d', clickColor: '#c1392b', active: false},
  {src: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', letter: 'C', color: '#c1392b', clickColor: '#a01709', active: false}
]

const chars = {
  q: 81,
  w: 87,
  e: 69,
  a: 65,
  s: 83,
  d: 68,
  z: 90,
  x: 88,
  c: 67
}

// ========== Above code functionless, for dev reference only ==========

var showHalo = true

function toggleGrid () {
  let elem = document.getElementById('key-container')
  if (elem.classList.contains('grid')) elem.classList.remove('grid')
  else elem.classList.add('grid')
}

function toggleHalo () {
  showHalo = !showHalo
}

function handleClick (letter) {
  playAudio (letter)
  flashButton (letter)
  if (showHalo) flashHalo (letter)
}

function flashButton (letter) {
  let button = document.getElementById(`button-${letter}`)
  button.classList.add('active')
  setTimeout(() => {
    button.classList.remove('active')
  }, 200)
}

function flashHalo (letter) {
  let halo = document.getElementById(`halo-${letter}`)
  halo.classList.add('anim')
  setTimeout(() => {
    halo.classList.remove('anim')
  }, 210)
}

function playAudio (letter) {
  let audio = document.getElementById(letter)
  audio.currentTime = 0
  audio.play()
}

function handleKeyPress (e) {
  switch (e.keyCode) {
    case 81:
      handleClick ('Q')
      break;
    case 87:
      handleClick ('W')
      break;
    case 69:
      handleClick ('E')
      break;
    case 65:
      handleClick ('A')
      break;
    case 83:
      handleClick ('S')
      break;
    case 68:
      handleClick ('D')
      break;
    case 90:
      handleClick ('Z')
      break;
    case 88:
      handleClick ('X')
      break;
    case 67:
      handleClick ('C')
      break;
    default:
      break;
  }
}

function addKeyListeners () {
  document.addEventListener('keydown', handleKeyPress)
}

document.addEventListener('DOMContentLoaded', addKeyListeners)
