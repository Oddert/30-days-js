

const triggers = document.querySelectorAll('.cool > li')
const background = document.querySelector('.dropdownBackground')
const nav = document.querySelector('.top')


function handleEnter () {
  this.classList.add('trigger-enter')
  setTimeout(
    () => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active')
    , 150
  )
  background.classList.add('open')

  const dropdown = this.querySelector('.dropdown')
  const dropdownCoords = dropdown.getBoundingClientRect()
  const navCoords = nav.getBoundingClientRect()

  const coords = {
    h: dropdownCoords.height,
    w: dropdownCoords.width,
    t: dropdownCoords.top - navCoords.top,
    l: dropdownCoords.left - navCoords.left
  }
  background.style.setProperty('width', `${coords.w}px`)
  background.style.setProperty('height', `${coords.h}px`)
  background.style.setProperty('transform', `translate(${coords.l}px, ${coords.t}px)`)
}

function handleLeave () {
  this.classList.remove('trigger-enter-active')
  setTimeout(
    () => this.classList.remove('trigger-enter')
    , 150
  )
  background.classList.remove('open')
}

triggers.forEach(
  each => each.addEventListener('mouseenter', handleEnter)
)
triggers.forEach(
  each => each.addEventListener('mouseleave', handleLeave)
)
