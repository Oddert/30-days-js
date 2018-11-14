const player = document.querySelector('.player')

const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress-filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player-slider')

let mousedown = false

function togglePlay () {
  if (video.paused) video.play()
  else video.pause()
}

function updateButton () {
  toggle.textContent = video.paused ? '▶' : '❚❚'
}

function skip () {
  console.log(video.currentTime, this.dataset.skip, parseFloat(this.dataset.skip))
  video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeChange () {
  video[this.name] = this.value
}

function handleProgress () {
  const percent = (video.currentTime / video.duration) * 100
  progressBar.style.flexBasis = `${percent}%`
}

function scrub (e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration
  video.currentTime = scrubTime
}

document.addEventListener('mousedown', () => mousedown = true)
document.addEventListener('mouseup', () => mousedown = false)

video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(each =>
  each.addEventListener('click', skip)
)

ranges.forEach(each => {
  each.addEventListener('change', handleRangeChange)
  // each.addEventListener('mousemove', e => mousedown && handleRangeChange(e))
})

video.addEventListener('timeupdate', handleProgress)

progress.addEventListener('click', scrub)
progress.addEventListener('mousemove', e => mousedown && scrub(e))
