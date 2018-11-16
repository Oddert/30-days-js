const keys = []

const code = 'oddert'

const display = document.querySelector('.display-out')
const body = document.getElementsByTagName("BODY")[0]

window.addEventListener('keyup', e => {
  console.log(e.key)
  keys.push(e.key)
  keys.splice(-code.length-1, keys.length - code.length)
  console.log(keys)
  display.innerHTML = keys.join(', ')
  if (keys.join('').includes(code)) {
    console.log('#############')
    body.style.backgroundImage = `url('https://img1.picmix.com/output/stamp/normal/5/5/9/3/363955_62298.gif')`
  } else {
    body.style.backgroundImage = 'none'
  }
})
