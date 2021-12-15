

const triggers = document.querySelectorAll('.cool > li')
const background = document.querySelector('.dropdownBackground')
const nav = document.querySelector('.top')

/**
 * Event hander for a mouseover event.
 * Used to show a menu dropdown and animate the "stripe" effect.
 */
function handleEnter () {
	// Adds a class which shows the menu but not the background.
  this.classList.add('trigger-enter')
	// On a delay, a class is added that fades in the opacity.
	// It first checks the .trigger-enter class is still present and has not been removed by the mouseleave listner.
  setTimeout(
    () => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active')
    , 150
  )
	// Shows the background third.
  background.classList.add('open')
	
  const dropdown = this.querySelector('.dropdown')
	// Get the positions and dimensions of the target nav menu to position the background .
  const dropdownCoords = dropdown.getBoundingClientRect()
	// Get the positions of the menu item to position the chevron. 
  const navCoords = nav.getBoundingClientRect()

  const coords = {
    h: dropdownCoords.height,
    w: dropdownCoords.width,
    t: dropdownCoords.top - navCoords.top,
    l: dropdownCoords.left - navCoords.left
  }
	// Position the background
  background.style.setProperty('width', `${coords.w}px`)
  background.style.setProperty('height', `${coords.h}px`)
  background.style.setProperty('transform', `translate(${coords.l}px, ${coords.t}px)`)
}

/**
 * Event hander for a mouseout event.
 * Hides the background then fades out the menu content.
 */
function handleLeave () {
  this.classList.remove('trigger-enter-active')
  setTimeout(
    () => {
			this.classList.remove('trigger-enter-active')
			this.classList.remove('trigger-enter')
		}
    , 150
  )
  background.classList.remove('open')
}

// Assign each of the mouse event listeners.
triggers.forEach(
  each => each.addEventListener('mouseenter', handleEnter)
)
triggers.forEach(
  each => each.addEventListener('mouseleave', handleLeave)
)
