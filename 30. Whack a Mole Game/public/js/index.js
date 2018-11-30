

const holes       = document.querySelectorAll('.hole')
const moles       = document.querySelectorAll('.mole')
const score       = document.querySelector('.score')
const gameButton  = document.querySelector('.start-game')

const randomTime = (min, max) => Math.round(Math.random() * (max-min) + min)

let lastHole
let gameOver = false
let points = 0

function randomHole (holes) {
  const idx = Math.floor(Math.random()* holes.length)
  const hole = holes[idx]
  if (hole === lastHole) return randomHole (holes)
  lastHole = hole
  return hole
}

function appear () {
  const time = randomTime (200, 1000)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!gameOver) appear()
  }, time)
}

function startGame () {
  score.textContent = '0'
  gameOver = false
  points = 0
  appear()
  setTimeout(() => gameOver = true, 10000)
}

function hit (e) {
  if (!e.isTrusted) return
  points ++
  this.classList.remove('up')
  score.textContent = points
}


gameButton.addEventListener('click', startGame)
moles.forEach(each => each.addEventListener('click', hit))
