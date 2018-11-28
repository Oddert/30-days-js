const speed     = document.querySelector('.speed')
const speedBar  = speed.querySelector('.speed-bar')
const video     = document.querySelector('.video')

function handleMouseMove (e) {
  const y = e.pageY - this.offsetTop
  const percent = y / this.offsetHeight
  const min = .4
  const max = 4
  const height = `${Math.round(percent * 100)}%`
  const playbackRate = (percent * (max - min) + min).toFixed(2)
  speedBar.style.height = height
  speedBar.textContent = `${playbackRate}x`
  video.playbackRate = playbackRate
}

speed.addEventListener('mousemove', handleMouseMove)
