const player = document.querySelector('.player')

const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress-filled')

const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player-slider')

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


video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

toggle.addEventListener('click', togglePlay)

skipButtons.forEach(each =>
  each.addEventListener('click', skip)
)
