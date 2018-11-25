

const divs = document.querySelectorAll('div')
const button_once = document.querySelector('.button_once')
const button_multi = document.querySelector('.button_multi')

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

let button_multi_counter = 0
let button_once_counter = 0

button_multi.addEventListener('click', () => {
  console.log('button_multi Clicked')
  button_multi_counter ++
  button_multi.innerHTML = `You may click infinately (${button_multi_counter})`
})
// once unbinds after click
button_once.addEventListener('click', () => {
  console.log('button_once Clicked')
  button_once_counter ++
  button_once.innerHTML = `You may only click once (${button_once_counter})`
}, {
  once: true
})
