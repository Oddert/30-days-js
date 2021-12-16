
const triggers = document.querySelectorAll('a')

// Create the highlight background
const highlight = document.createElement('span')
highlight.classList.add('highlight')
document.body.append(highlight)

/**
 * Change handler for each link.
 * Moves the highlight background behind the hovered link.
 */
function updateLink () {
  console.log('highlight', this)
  const linkcoords = this.getBoundingClientRect()
  console.log(linkcoords)
	// Get the dimensions of the link hovered.
  let coords = {
    w: linkcoords.width,
    h: linkcoords.height,
    t: linkcoords.top + window.scrollY,
    l: linkcoords.left + window.scrollX
  }
	// Manipulate the highlight to position and size it behind the link.
  highlight.style.width = `${coords.w}px`
  highlight.style.height = `${coords.h}px`
  highlight.style.transform = `translate(${coords.l}px, ${coords.t}px)`
}

// Assign the event listner to all anchor tags.
triggers.forEach(
  each => each.addEventListener('mouseenter', updateLink)
)
