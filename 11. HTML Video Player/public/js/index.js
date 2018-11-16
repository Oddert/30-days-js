const player        = document.querySelector('.player')

const video         = player.querySelector('.viewer')
const progress      = player.querySelector('.progress')
const progressBar   = player.querySelector('.progress-filled')

const toggle        = player.querySelector('.toggle')
const skipButtons   = player.querySelectorAll('[data-skip]')
const ranges        = player.querySelectorAll('.player-slider')

const fullscreen    = player.querySelector('.fullscreen')

let mousedown     = false
let isFullScreen  = false

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

function toggleFullScreen () {
  if (!isFullScreen) {
    if (video.requestFullScreen) {
      video.requestFullScreen()
      isFullScreen = true
    } else if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen()
      isFullScreen = true
    } else if (video.webkitRequestFullScreen) {
      video.webkitRequestFullScreen()
      isFullScreen = true
    }
  }
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

fullscreen.addEventListener('click', toggleFullScreen)


let backgrounds = {
  morning: "https://stmed.net/sites/default/files/lake-wallpapers-27927-377315.jpg",
  afternoon: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BcZfIvWQiol01l2w/sun-sparkles-on-rippling-sea-waves-at-noon-slow-motion_hxp0t5i3_thumbnail-full01.png",
  evening: "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Protection-sea-calm-evening-images-1920x1080-PIC-WPB0012967.jpg",
  night: "https://www.wallpaperflare.com/static/240/832/1006/evening-night-sea-lake-wallpaper.jpg"
}

document.addEventListener('DOMContentLoaded', () => {
  let hours = new Date().getHours()
  var timeOfDay = 'afternoon'
  if (hours >= 4 && hours < 12) timeOfDay = 'morning'
  if (hours >= 12 && hours < 18) timeOfDay = 'afternoon'
  if (hours >= 18 && hours < 24) timeOfDay = 'evening'
  if (hours >= 22 || hours < 4) timeOfDay = 'night'
  document.querySelector('.blur').style.backgroundImage = `url('${backgrounds[timeOfDay]}')`
})
