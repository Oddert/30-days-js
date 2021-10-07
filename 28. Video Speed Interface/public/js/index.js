const speed     = document.querySelector('.speed')
const speedBar  = speed.querySelector('.speed-bar')
const video     = document.querySelector('.video')

let locked = true

function handleMouseMove (e) {
	if (locked) return
  const y = e.pageY - (this.offsetHeight - this.offsetTop)
  const percent = (this.offsetHeight - y) / /*(speed.getBoundingClientRect().top)*/ this.offsetHeight
	console.log({ pagey: e.pageY, y, thisOffsetTop: this.offsetTop, thisOffsetHeight: this.offsetHeight, percent, bounding: speed.getBoundingClientRect().top })
  const min = .4
  const max = 4
  const height = `${Math.round(percent * 100)}%`
  const playbackRate = (percent * (max - min) + min).toFixed(2)
  speedBar.style.height = height
  speedBar.textContent = `${playbackRate}x`
  video.playbackRate = playbackRate
}

function toggleLockout (e) {
	locked = !locked
	if (locked) speed.classList.add('locked')
	else speed.classList.remove('locked')
}

function domLoaded () {
	const bgs = [`ambient-bg-1.png`, `ambient-bg-2.png`, `ambient-bg-3.png`]
	const selected = bgs[Math.floor(Math.random() * 3)]
	document.body.style.backgroundImage = `url('/28. Video Speed Interface/public/img/${selected}')`
}

domLoaded()

speed.addEventListener('click', toggleLockout)
speed.addEventListener('mousemove', handleMouseMove)
