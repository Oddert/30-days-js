let seeds = []
for (var i=1; i<=100; i++) {
  seeds.push(
    `<div class="item item${i}">${i < 10 ? "0"+i : i}</div>`
  )
}

document.querySelector('.items').innerHTML = seeds.join('')

const slider = document.querySelector('.items')

let mouseIsDown = false
let startX
let scrollLeft


slider.addEventListener('mousedown', e => {
  mouseIsDown = true
  slider.classList.add('active')
  startX = e.pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
})
slider.addEventListener('mouseleave', () => {
  mouseIsDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mouseup', () => {
  mouseIsDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mousemove', e => {
  if (!mouseIsDown) return
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX) * 2
  slider.scrollLeft = scrollLeft - walk
})
