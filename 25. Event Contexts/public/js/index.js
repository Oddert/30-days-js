

const divs = document.querySelectorAll('div')
const button = document.querySelector('.button')

function logText (e) {
  console.log(this.classList.value)
  e.stopPropagation() // <- Stop Bubbling
}

divs.forEach(each => each.addEventListener('click', logText, {
  // capture: true,
  // once: true
}))

//cature false produces "three two one" in the console (bubble up)
//capture true produces "one two three" on capture down


// once unbinds after click
button.addEventListener('click', () => {
  console.log('Button Clicked')
}, {
  once: true
})
