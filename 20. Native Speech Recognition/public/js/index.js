window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true

const hat = document.querySelector('.hat-orb')

let p = document.createElement('P')
p.classList.add('text_line')
const words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('speechstart', () => hat.classList.add('lightup'))

recognition.addEventListener('result', e => {
  console.log(e)
  const transcript = Array.from(e.results)
    .map(res => res[0])
    .map(res => res.transcript)
    .join('')

  p.textContent = transcript
  if (e.results[0].isFinal) {
    hat.classList.remove('lightup')
    p = document.createElement('P')
    p.classList.add('text_line')
    words.appendChild(p)
  }
  console.log(transcript)
})

recognition.addEventListener('end', recognition.start)

recognition.start()

function download (filename, text) {
  let elem = document.createElement('a')
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  elem.setAttribute('download', filename)

  elem.style.display = 'none'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

function handleUserDownload () {
  let name = `${new Date().toLocaleString()} download`
  let text = Array.from(document.querySelectorAll('.text_line')).map(e => e.innerText).join('\r\n\r\n')
  console.log(text)
  download(name, text)
}

document.querySelector('.download')
  .addEventListener('click', handleUserDownload)





// ========== Robot Animation Functionality ==========

const leftEye = document.querySelector('.eye.left')
const rightEye = document.querySelector('.eye.right')
const mouth = document.querySelector('.mouth')

let canBlink = true
let canWrite = true

function blink () {
  leftEye.setAttribute('src', '/img/eye closed.png')
  rightEye.setAttribute('src', '/img/eye closed.png')
  setTimeout(() => {
    leftEye.setAttribute('src', '/img/eye default.png')
    rightEye.setAttribute('src', '/img/eye default.png')
  }, 300)
}

async function randomBlink () {
  setTimeout (() => {
    if (canBlink) Math.floor(Math.random()*5) === 1 ? blink() : wink()
    randomBlink()
  }, Math.floor(Math.random()*20000)+5000)
}
setTimeout(randomBlink, 2000)


async function surprise () {
  canBlink = false
  leftEye.setAttribute('src', '/img/eye surprise left.png')
  rightEye.setAttribute('src', '/img/eye surprise right.png')
  mouth.setAttribute('src', '/img/eye default.png')
  mouth.style.height = '25px'
  mouth.style.width = '25px'
  setTimeout(() => {
    leftEye.setAttribute('src', '/img/eye default.png')
    rightEye.setAttribute('src', '/img/eye default.png')
    mouth.setAttribute('src', '/img/mouth default.png')
    mouth.style.height = null
    mouth.style.width = null
    canBlink = true
  }, Math.floor(Math.random()*5000))
}

async function wink () {
  canBlink = false
  leftEye.setAttribute('src', '/img/eye closed.png')
  mouth.setAttribute('src', '/img/mouth smirk.png')
  setTimeout (() => {
    leftEye.setAttribute('src', '/img/eye default.png')
    mouth.setAttribute('src', '/img/mouth default.png')
    canBlink = true
  }, 500)
}
// setTimeout(canBlink ? wink : () => {}, 3000)


let talking = false
function toggleTalking (talkState) {
  if (talkState) {
    canBlink = false
    mouth.setAttribute('src', '/img/eye default.png')
    mouth.style.height = '25px'
    mouth.style.width = '25px'
    hat.classList.add('talking')
    talking = true
  } else {
    mouth.setAttribute('src', '/img/mouth default.png')
    mouth.style.height = null
    mouth.style.width = null
    hat.classList.remove('talking')
    canBlink = true
    talking = false
  }
}

async function write (text) {
  toggleTalking(true)
  const dialogue = document.querySelector('.dialogue')
  const elem = document.createElement('P')
  dialogue.appendChild(elem)
  let i = 0
  function output () {
    elem.textContent = text.substring(0,i)
    i ++
    if (i <= text.length) setTimeout(output, Math.floor(Math.random()*200))
    else toggleTalking(false)
  }
  output()
}

write("Here is a test message for odd bot to output")
setTimeout(() => write("and here is another string after "), 15000)
