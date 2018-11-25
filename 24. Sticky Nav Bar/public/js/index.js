
const nav = document.querySelector('#main')
let topOfNav = nav.offsetTop

function fixNav () {
  console.log(window.scrollY, topOfNav)
  if (window.scrollY >= topOfNav) {
    document.body.style.paddingTop = `${nav.offsetHeight}px`
    document.body.classList.add('fixed-nav')
  } else {
    document.body.style.paddingTop = '0px'
    document.body.classList.remove('fixed-nav')
  }
}

window.addEventListener('scroll', fixNav)
window.addEventListener('resize', () => topOfNav = nav.offsetTop)
