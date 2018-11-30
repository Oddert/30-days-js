const timerDisplay      = document.querySelector('.display__time-left')
const endTimeDisplay    = document.querySelector('.display__end-time')
const toggleTwelveHour  = document.querySelector('.timer__toggleTwelveHour')

const timeInputs        = document.querySelectorAll('[data-time]')

let countdown
let twelveHourTime = true

function timer (secs) {
  clearInterval(countdown)
  const start = Date.now()
  const end = start + secs * 1000
  displayRemainingTime(secs)
  displayEndTime(end)

  countdown = setInterval(() => {
    const timeLeft = Math.round((end - Date.now()) / 1000)
    if (timeLeft <= 0) clearInterval(countdown)
    displayRemainingTime(timeLeft)
  }, 1000)
}

function displayRemainingTime (secs) {
  const mins = Math.floor(secs / 60)
  const remainder = secs % 60
  const displayOut = `${mins < 10 ? '0'+mins : mins}:${remainder < 10 ? '0'+remainder : remainder}`
  timerDisplay.textContent = displayOut
  document.title = `Time Remaining: ${displayOut}`
}

function displayEndTime (timestamp) {
  const end = new Date(timestamp)
  const hour = end.getHours()
  const minutes = end.getMinutes()
  const amPm = 0
  endTimeDisplay.textContent = twelveHourTime
    ? `Be Back At ${hour > 12 ? hour-12 : hour}:${minutes} ${twelveHourTime ? hour > 12 ? 'PM' : 'AM' : ''}`
    : `Be Back At ${hour}:${minutes}`
}

function toggleFormat () {
  twelveHourTime = !twelveHourTime
  toggleTwelveHour.textContent = `${twelveHourTime ? '12' : '24'} Hour`
}

function initTimer () {
  const seconds = parseInt(this.dataset.time)
  timer(seconds)
}

toggleTwelveHour.addEventListener('click', toggleFormat)
timeInputs.forEach(each => each.addEventListener('click', initTimer))
document.customForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const mins = this.minutes.value
  console.log(mins)
  if (typeof mins == 'number') timer(mins * 60)
  else alert(`Please enter a number value`)
  this.reset()
})






















//
