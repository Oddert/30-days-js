
const difficultyLevels = [
	{ min: 1500, max: 2000 },
	{ min: 1250, max: 1750 },
	{ min: 1000, max: 1250 },
	{ min: 450, max: 1000 },
	{ min: 300, max: 750 },
]

const startingDifficulty = 2
const gameTime = 10000


const holeContainer   			= document.querySelector('.holes')
const holes       					= document.querySelectorAll('.hole')
const moles       					= document.querySelectorAll('.mole')
const score       					= document.querySelector('.score')
const gameButton  					= document.querySelector('.start-game')
const power 								= document.querySelector('.holes_container--power')
const powerIndicator				= document.querySelector('.holes_container--power-inner')
const instructionsContainer = document.querySelector('.instructions--container')
const instructionClose 			= document.querySelector('.instructions-close')
const instructionOpen 			= document.querySelector('.open-instructions')
const difficultySelector 		= document.querySelector('.difficulty_selector')

const randomTime = (min, max) => Math.round(Math.random() * (max-min) + min)

let lockout = false
let lastHole
let gameOver = false
let points = 0
let difficulty = startingDifficulty
let minAppearTime = difficultyLevels[startingDifficulty].min
let maxAppearTime = difficultyLevels[startingDifficulty].max


function randomHole (holes) {
  const idx = Math.floor(Math.random() * holes.length)
  const hole = holes[idx]
  if (hole === lastHole) return randomHole (holes)
  lastHole = hole
  return hole
}

function appear () {
  const time = randomTime (minAppearTime, maxAppearTime)
  const hole = randomHole(holes)
  hole.classList.add('up')
  setTimeout(() => {
    hole.classList.remove('up')
    if (!gameOver) appear()
  }, time)
}

function handleStartClick () {
	// do a count down
	gameButton.style.display = 'none'
	startGame()
}

function startGame () {
	if (lockout) return
  score.textContent = '0'
  gameOver = false
  points = 0
  appear()
  setTimeout(endGame, gameTime)
}

function endGame () {
	gameOver = true
	setTimeout(() => {
		if (!lockout) gameButton.style.display = null
	}, maxAppearTime)
}

function hit (e) {
  if (!e.isTrusted) return
  points ++
	const hole = this.closest('.hole')
	hole.classList.add('ouch')
	setTimeout(() => hole.classList.remove('ouch'), 100)
  hole.classList.remove('up')
  score.textContent = points
}

/**
 * Toggles the lockout variable. 
 * Will toggle between true and false unless prefernce is used to specifically set the state.
 * 
 * @param {boolean} preference (optional) boolean state to set lockout to
 */
function toggleLockout (preference) {

	const shutdown = () => {
		lockout = true
		gameOver = true
		holeContainer.style.backgroundImage = 'url("")'
		holeContainer.style.backgroundColor = 'black'
		powerIndicator.style.backgroundColor = '#c1392b'
		gameButton.style.display = 'none'
	}
	const startup = () => {
		lockout = false
		gameOver = false
		points = 0
		lastHole = undefined
		holeContainer.style.backgroundImage = null
		holeContainer.style.backgroundColor = null
		powerIndicator.style.backgroundColor = null
		gameButton.style.display = null
	}

	if (preference === true) {
		startup()
	} else if (preference === false) {
		shutdown()
	} else if (lockout === true) {
		startup()
	} else if (lockout === false) {
		shutdown()
	}
}

function handleInstructionsOOB (e) {
	console.log(e.target.className)
	if (e.target.className.includes('instructions--container')) {
		closeInstructions()
	}
}

function closeInstructions () {
	instructionsContainer.style.display = 'none'
	instructionOpen.style.opacity = '1'
}

function openInstructions () {
	instructionsContainer.style.display = 'flex'
	instructionOpen.style.opacity = '0'
}

function handleDifficultyChange (e) {
	const newLevel = e.target.value
	const diffSet = difficultyLevels[newLevel]
	minAppearTime = diffSet.min
	maxAppearTime = diffSet.max
	difficulty = newLevel
}


gameButton.addEventListener('click', handleStartClick)
moles.forEach(each => each.addEventListener('click', hit))
power.addEventListener('click', () => toggleLockout())
instructionClose.onclick = closeInstructions
instructionOpen.onclick = openInstructions
difficultySelector.onchange = handleDifficultyChange
instructionsContainer.addEventListener('click', handleInstructionsOOB)

function gameLoaded () {
	difficultySelector.value = difficulty
}

document.addEventListener('DOMContentLoaded', gameLoaded)