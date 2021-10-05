const timerDisplay      = document.querySelector('.display__time-left')
const endTimeDisplay    = document.querySelector('.display__end-time')
const toggleTwelveHour  = document.querySelector('.timer__toggleTwelveHour')
const timeInputs        = document.querySelectorAll('[data-time]')
const circle 						= document.querySelector('.ring__circle')
const timetitle 				= document.querySelector('.timeblock__title')
const queueList 				= document.querySelector('.queue')
const toggleAutoplay 		= document.getElementById('toggle__autoplay-checkbox')

const radius = circle.r.baseVal.value
const circumferance = radius * 2 * Math.PI

const queue = []
let countdown = undefined
let twelveHourTime = false
let autoplay = true
let globaltime = 0
let globalStartTime = 0
let lastIDUsed = 0

circle.style.strokeDasharray = `${circumferance} ${circumferance}`
circle.style.strokeDashoffset = `${circumferance}`

const mixInZero = n => n < 10 ? `0${n}` : n

const queueItem = (seconds, title, id) => ({
	time: seconds,
	title,
	id,
})

function conditionalTimerPrompt () {
	// console.log({ autoplay, countdown, queuelength: queue.length })
	if (autoplay) {
		if (!countdown) {
			if (globaltime > 0) {
				timer(globaltime)
			} else if (queue.length) {
				const item = queue.shift()
				const queueListItem = document.querySelector('.queue .queue__listitem')
				queueListItem.remove()
				// console.log(item, queue, queueListItem)
				timetitle.textContent = item.title
				timer(item.time, true)
			} 
		} 
	}
}

function timer (secs, reset) {
	clearInterval(countdown)
  const start = Date.now()
  const end = start + (secs * 1000)
  const diff = (end-start) / 1000
	
	if (reset) {
		globalStartTime = diff
		setCircleVal(100)
	} else {
	}

	const endFOrDisplay = Date.now() + (secs * 1000)
  displayRemainingTime(secs)
  displayEndTime(endFOrDisplay)

  countdown = setInterval(() => {
    const timeLeft = Math.round((end - Date.now()) / 1000)
    const percent = timeLeft / globalStartTime * 100
    // const inversePercent = 100 - percent
    if (timeLeft < 0) return handleTimerComplete()
    displayRemainingTime(timeLeft)
    setCircleVal(percent)
  }, 1000)

	function handleTimerComplete () {
		clearInterval(countdown)
		countdown = undefined
		conditionalTimerPrompt()
	}
}

function setCircleVal (percent) {
  const offset = circumferance - percent / 100 * circumferance
  circle.style.strokeDashoffset = offset
}

function clearCurrentTimer () {
	clearInterval(countdown)
	countdown = undefined
	globaltime = 0
	globalStartTime = 0
	conditionalTimerPrompt()
}

/**
 * Displays the actual clock value for time left on the clock
 * format minuites:seconds
 * e.g 01:32
 * 
 * @param {secs} secs seconds to be converted to the time remaining
 */
function displayRemainingTime (secs) {
	globaltime = secs
  const mins = Math.floor(secs / 60)
  const remainder = secs % 60
  const displayOut = `${mixInZero(mins)}:${mixInZero(remainder)}`
  timerDisplay.textContent = displayOut
  document.title = `Time Remaining: ${displayOut}`
}

/**
 * Formats a timestamp to 12hr formating
 * 
 * @param {number} hours the number of hours in 24hr format
 * @param {number} minuites the number of minutes
 * @returns {string} string representation of 12hr time format
 */
function format12hTime (hours, minuites) {
	const ampm = hours > 12 ? 'PM' : 'AM'
	const adjustedHour = hours > 12 ? hours-12 : mixInZero(hours)
	const adjustedMins = mixInZero(minuites)
	return `Be back ${adjustedHour}:${adjustedMins} ${ampm}`
}

/**
 * Formats a timestamp to 24hr formating
 * 
 * @param {number} hours the number of hours in 24hr format
 * @param {number} minuites the number of minutes
 * @returns {string} string representation of 24hr time format
 */
function formatNormalTime (hours, minuites) { 
	return `Be back ${mixInZero(hours)}:${mixInZero(minuites)}`
}

/**
 * returns the result of either format12hTime() or formatNormalTime() depending on global variable setting
 * 
 * @param {number} hours the number of hours in 24hr format
 * @param {number} minuites the number of minutes
 * @returns {string} string representation of the timestamp from either format12hTime() or formatNormalTime()
 */
function formatAnyTime (hours, minutes) {
	if (twelveHourTime) return format12hTime(hours, minutes)
  return formatNormalTime(hours, minutes)
}

/**
 * Formats the string displaying the end time
 * e.g. "Be back at 13:24"
 * 
 * @param {number|string} secs seconds to be converted to a time string
 */
function displayEndTime (secs) {
  const end = new Date(secs)
  const hours = end.getHours()
  const minutes = end.getMinutes()
  endTimeDisplay.textContent = formatAnyTime(hours, minutes)
}

function toggleFormat () {
  twelveHourTime = !twelveHourTime
  toggleTwelveHour.textContent = `${twelveHourTime ? '12' : '24'} Hour Time`
}

/**
 * Click handler for each time input button.
 */
function initTimer () {
  const seconds = parseInt(this.dataset.time)
	const title = this.dataset.title
	enqueueTimeBlock(seconds, title)
	conditionalTimerPrompt()
}

/**
 * 
 * 
 * @param {number} seconds 
 * @param {string} title 
 */
function enqueueTimeBlock (seconds, title) {
	const id = lastIDUsed++
	queue.push(queueItem(seconds, title, id))
	const secondsQueued = queue.reduce((acc, each) => acc + each.time, 0)
	const formatedTime = formatTimeToEnd(seconds)
	// console.log({ queue, secondsQueued })

	const startTimeObj = new Date(new Date().getTime() + (secondsQueued * 1000))
	const finishTimeObj = new Date(new Date().getTime() + ((secondsQueued + globaltime) * 1000))

	// console.log({ startTimeObj, finishTimeObj })
	
	const formatedStartTime = startTimeObj.toLocaleTimeString('en-GB')
	const formatedEndTime = finishTimeObj.toLocaleTimeString('en-GB')

	// console.log({ formatedStartTime, formatedEndTime })

	const queueListItem = createQueueListItem(title, formatedTime, id)

	queueList.appendChild(queueListItem)
}

function createQueueListItem (title, formatedTime, id) {
	const queueListItem = document.createElement('li')
	queueListItem.className = 'queue__listitem'
	queueListItem.dataset.id = id

	const draggableElem = document.createElement('div')
	const titleElem = document.createElement('p')
	const timeElem = document.createElement('p')
	const deleteElem = document.createElement('button')

	const bumpButtonsElem = document.createElement('div')
	bumpButtonsElem.className = 'queue__listitem-position_buttons'

	const bumpUpElem = document.createElement('button')
	bumpUpElem.textContent = '▲'
	bumpUpElem.className = 'queue__listitem-position_buttons--bump_up'
	bumpUpElem.title = 'move item up queue'
	bumpUpElem.onclick = bumpItemUp

	const bumpDownElem = document.createElement('button')
	bumpDownElem.textContent = '▼'
	bumpUpElem.className = 'queue__listitem-position_buttons--bump_down'
	bumpUpElem.title = 'move item down queue'
	bumpDownElem.onclick = bumpItemDown

	bumpButtonsElem.appendChild(bumpUpElem)
	bumpButtonsElem.appendChild(bumpDownElem)
	queueListItem.appendChild(bumpButtonsElem)

	draggableElem.className = 'queue__listitem-dragarea'
	titleElem.className = 'queue__listitem-title'
	titleElem.textContent = title
	timeElem.className = 'queue__listitem-time'
	// timeElem.textContent = `${formatedStartTime} - ${formatedEndTime}`
	timeElem.textContent = formatedTime
	deleteElem.className = 'queue__listitem-delete'
	deleteElem.textContent = '✖'
	deleteElem.title = 'remove this item from the queue'
	deleteElem.onclick = handleDeleteQueueItem

	queueListItem.appendChild(draggableElem)
	queueListItem.appendChild(titleElem)
	queueListItem.appendChild(timeElem)
	queueListItem.appendChild(deleteElem)

	return queueListItem
}

function formatTimeToEnd(secs) {
	const { hours, minutes, seconds } = destructSeconds(secs)
	let components = []
	if (hours) components.push(`${hours}h`)
	if (minutes) components.push(`${minutes}m`)
	if (seconds) components.push(`${seconds}s`)
	return components.join(' ')
}

function destructSeconds (secs) {
	let val = secs
	const hours = Math.floor(secs / (60 * 60))
	val = val % (60 * 60)
	const minutes = Math.floor(val / 60)
	val = val % 60
	const seconds = val
	return { hours, minutes, seconds }
}

function handleFormSubmit (e) {
	// TODO: move this to the new enueue method
  e.preventDefault()
  const mins = Number(this.minutes.value)
	console.log(mins)
  const title = "Custom Timer"
  if (typeof mins == 'number') {
		if (mins <= 0) return
		enqueueTimeBlock(mins * 60, title)
		conditionalTimerPrompt()
  } else {
    alert(`Please enter a number value`)
  }
  this.reset()
}

function handleToggleAutoplay (e) {
	const newState = e.target.checked
	autoplay = newState
	if (newState === true) {
		conditionalTimerPrompt()
	} else {
		clearInterval(countdown)
		countdown = undefined
	}
}

function domLoaded () {
	autoplay = toggleAutoplay.checked
}

function handleDeleteQueueItem (e) {
	const elem = e.target.closest('.queue__listitem')
	const id = elem.dataset.id
	queue.filter(each => each.id !== id)
	elem.remove()
}

function bumpItemUp (e) {
	const elem = e.target.closest('.queue__listitem')
	const id = Number(elem.dataset.id)
	const idx = queue.findIndex(each => each.id === id)
	if (idx <= 0) {
		elem.classList.add('bounce')
		setTimeout(() => {
			elem.classList.remove('bounce')
		}, 500)
		return
	}
	const upperIdx = idx - 1
	const upperId = queue[upperIdx].id
	const upperElem = document.querySelector(`[data-id='${upperId}']`)
	elem.style.position = 'relative'
	upperElem.style.position = 'relative'

	let move = Math.max(elem.getBoundingClientRect().height, upperElem.getBoundingClientRect().height)
	let i = 0
	let ms = 150 / move

	let animInterval = undefined

	animInterval = setInterval(() => {
		if (i >= move || i > 1000) {
			clearInterval(animInterval)
			finish()
			return
		}
		elem.style.top = `-${i}px`
		upperElem.style.top = `${i}px`
		i += 5
	}, ms)

	arrSwap(queue, idx, upperIdx)
	function finish () {
		setTimeout(regenerateQueueList, 100)
	}
}

function bumpItemDown (e) {
	const elem = e.target.closest('.queue__listitem')
	const id = Number(elem.dataset.id)
	const idx = queue.findIndex(each => each.id === id)
	if (idx >= queue.length - 1) {
		elem.classList.add('bounce')
		setTimeout(() => {
			elem.classList.remove('bounce')
		}, 500)
		return
	}
	const lowerIdx = idx + 1
	const lowerId = queue[lowerIdx].id
	const lowerElem = document.querySelector(`[data-id='${lowerId}']`)
	elem.style.position = 'relative'
	lowerElem.style.position = 'relative'

	let move = Math.max(elem.getBoundingClientRect().height, lowerElem.getBoundingClientRect().height)
	let i = 0
	let ms = 150 / move

	let animInterval = undefined

	animInterval = setInterval(() => {
		if (i >= move || i > 1000) {
			clearInterval(animInterval)
			finish()
			return
		}
		elem.style.top = `${i}px`
		lowerElem.style.top = `-${i}px`
		i += 5
	}, ms)

	arrSwap(queue, idx, lowerIdx)
	function finish () {
		setTimeout(regenerateQueueList, 100)
	}

}

function regenerateQueueList () {
	// let newQueueList = ``
	queueList.innerHTML = ''
	queue.forEach(item => {
		const queueListItem = createQueueListItem(item.title, formatTimeToEnd(item.time), item.id)
		queueList.appendChild(queueListItem)
	})
	// queueList.style.display = 'none'
	// queueList.style.display = 'flex'
	// queueList.innerHTML = newQueueList
}

function arrSwap (arr, idx1, idx2) {
	let temp = arr[idx1]
	arr[idx1] = arr[idx2]
	arr[idx2] = temp
	return arr
}

timeInputs.forEach(each => each.addEventListener('click', initTimer))

toggleTwelveHour.onclick = toggleFormat
toggleAutoplay.onchange = handleToggleAutoplay
document.customForm.addEventListener('submit', handleFormSubmit)

document.addEventListener('DOMContentLoaded', domLoaded)