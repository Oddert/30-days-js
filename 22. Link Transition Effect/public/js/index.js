
const triggers = document.querySelectorAll('a')

const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)

function updateLink () {
  console.log('highlight', this)
  const linkcoords = this.getBoundingClientRect()
  console.log(linkcoords)
  let coords = {
    w: linkcoords.width,
    h: linkcoords.height,
    t: linkcoords.top + window.scrollY,
    l: linkcoords.left + window.scrollX
  }
  highlight.style.width = `${coords.w}px`
  highlight.style.height = `${coords.h}px`
  highlight.style.transform = `translate(${coords.l}px, ${coords.t}px)`
}

triggers.forEach(
  each => each.addEventListener('mouseenter', updateLink)
)
