

const container = document.querySelector('.container')
const text = container.querySelector('h1')

const walk = 250

function shadow (e) {
  const { offsetWidth: width, offsetHeight: height } = container
  let { offsetX: x, offsetY: y } = e
  if (this !== e.target) {
    x = x + e.target.offsetLeft
    y = y + e.target.offsetTop
  }
  const xWalk = ((x / width * walk) - (walk / 2)) *2
  const yWalk = ((y / height * walk) - (walk / 2)) *2

  text.style.color = 'black'
  text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 rgba(232,76,61,.7),
    ${-xWalk}px ${yWalk}px 0 rgba(45,204,112,.7),
    ${xWalk}px ${-yWalk}px 0 rgba(53,152,219,.7),
    ${-xWalk}px ${-yWalk}px 0 rgba(154,89,181,.7)
  `
}

container.addEventListener('mousemove', shadow)
