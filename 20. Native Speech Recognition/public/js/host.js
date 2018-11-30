window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true

const hat = document.querySelector('.hat-orb')

let p = document.createElement('P')
p.classList.add('text_line')
const words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('speechstart', () => hat.classList.add('lightup'))

function debounce (func, wait=0, immediate=true) {
  console.log('debouncing')
  var timeout;
  return function () {
    var context = this, args = arguments
    var later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }
    var callNow = immediate && !timeout
    clearTimeout (timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

recognition.addEventListener('result', e => {
  console.log(e)
  const transcript = Array.from(e.results)
    .map(res => res[0])
    .map(res => res.transcript)
    .join('')

  if (transcript.includes('love you')) love()
  if (transcript.includes('weather')) getWeather()
  if (transcript.includes('download')) voiceDownload()
  if (transcript.includes('I\'m back')) welcomeBack()
  if (
    transcript.includes('good bot') ||
    transcript.includes('well done') ||
    transcript.includes('I like you') ||
    transcript.includes('I like this') ||
    transcript.includes('so good') ||
    transcript.includes('clever bot')
  ) thanks()
  if (
    transcript.includes('good job') ||
    transcript.includes('nice') ||
    transcript.includes('thanks') ||
    transcript.includes('thank you')
  ) welcome()

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
let talking = false

let animateDebounceActive = false


function blink () {
  leftEye.setAttribute('src', './public/img/eye closed.png')
  rightEye.setAttribute('src', './public/img/eye closed.png')
  setTimeout(() => {
    leftEye.setAttribute('src', './public/img/eye default.png')
    rightEye.setAttribute('src', './public/img/eye default.png')
  }, 300)
}

async function randomBlink () {
  setTimeout (() => {
    if (canBlink && !talking) Math.floor(Math.random()*5) === 1 ? blink() : wink()
    randomBlink()
  }, Math.floor(Math.random()*20000)+5000)
}
setTimeout(randomBlink, 2000)


function toggleSurprise (surpriseState) {
  if (surpriseState) {
    leftEye.setAttribute('src', './public/img/eye surprise left.png')
    rightEye.setAttribute('src', './public/img/eye surprise right.png')
    mouth.setAttribute('src', './public/img/eye default.png')
    mouth.style.height = '25px'
    mouth.style.width = '25px'
  } else {
    leftEye.setAttribute('src', './public/img/eye default.png')
    rightEye.setAttribute('src', './public/img/eye default.png')
    mouth.setAttribute('src', './public/img/mouth default.png')
    mouth.style.height = null
    mouth.style.width = null
  }
}

async function surprise () {
  canBlink = false
  toggleSurprise(true)
  setTimeout(() => {
    toggleSurprise(false)
    canBlink = true
  }, Math.floor(Math.random()*5000))
}


function toggleWink (winkState) {
  if (winkState) {
    leftEye.setAttribute('src', './public/img/eye closed.png')
    rightEye.setAttribute('src', './public/img/eye default.png')
    mouth.setAttribute('src', './public/img/mouth smirk.png')
  } else {
    leftEye.setAttribute('src', './public/img/eye default.png')
    rightEye.setAttribute('src', './public/img/eye default.png')
    mouth.setAttribute('src', './public/img/mouth default.png')
  }
}

async function wink () {
  canBlink = false
  toggleWink(true)
  setTimeout (() => {
    toggleWink(false)
    canBlink = true
  }, 500)
}
// setTimeout(canBlink ? wink : () => {}, 3000)



function toggleTalking (talkState) {
  if (talkState) {
    canBlink = false
    mouth.setAttribute('src', './public/img/eye default.png')
    mouth.style.height = '25px'
    mouth.style.width = '25px'
    hat.classList.add('talking')
    talking = true
  } else {
    mouth.setAttribute('src', './public/img/mouth default.png')
    mouth.style.height = null
    mouth.style.width = null
    hat.classList.remove('talking')
    canBlink = true
    talking = false
  }
}

async function write (text, fast) {
  toggleTalking(true)
  const dialogue = document.querySelector('.dialogue')
  const elem = document.createElement('P')
  dialogue.appendChild(elem)
  let i = 0
  function output () {
    elem.textContent = text.substring(0,i)
    i ++
    if (i <= text.length) setTimeout(output, Math.floor(Math.random()*(fast ? 20 : 150)))
    else toggleTalking(false)
  }
  output()
}


function heart (heartState) {
  if (heartState) {
    leftEye.setAttribute('src', './public/img/eye heart.png')
    rightEye.setAttribute('src', './public/img/eye heart.png')
  } else {
    leftEye.setAttribute('src', './public/img/eye default.png')
    rightEye.setAttribute('src', './public/img/eye default.png')
  }
}

function love () {
  if (!animateDebounceActive) {
    animateDebounceActive = true
    heart(true)
    write ("You love me?! I love you back friend! 💖", true)
    setTimeout(() => {
      wink()
      animateDebounceActive = false
    }, 4200)
  }
}

function thanks () {
  if (!animateDebounceActive) {
    animateDebounceActive = true
    heart(true)
    write ("Thank you for your kindness!", true)
    setTimeout(() => {
      leftEye.setAttribute('src', './public/img/eye default.png')
      rightEye.setAttribute('src', './public/img/eye default.png')
      mouth.setAttribute('src', './public/img/mouth default.png')
      animateDebounceActive = false
    }, 3600)
  }
}

function welcome () {
  if (!animateDebounceActive) {
    animateDebounceActive = true
    heart(true)
    write ("You're very welcome! Any time", true)
    setTimeout(() => {
      leftEye.setAttribute('src', './public/img/eye default.png')
      rightEye.setAttribute('src', './public/img/eye default.png')
      mouth.setAttribute('src', './public/img/mouth default.png')
      animateDebounceActive = false
    }, 3600)
  }
}

function welcomeBack () {
  if (!animateDebounceActive) {
    animateDebounceActive = true
    surprise ()
    write ("Ah, Welcome back!")
    setTimeout(() => {
      animateDebounceActive = false
    }, 2000)
  }
}

function toggleRadar (radarState) {
  if (radarState) {
    hat.classList.add('talking')
  } else {
    hat.classList.remove('talking')
  }
}

const convTemp = temp => Math.round(temp-273.15)

function getWeather () {
  if (!animateDebounceActive) {
    animateDebounceActive = true
    canBlink = false
    toggleRadar(true)
    navigator.geolocation.getCurrentPosition(position => {
      let weather = `http://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&APPID=a48e5c0a6ce401edc508797ffd0f530c`
      fetch(weather)
        .then(res => res.json())
        .then(res => {
          console.log(res)
          let lineOne = `The current weather in ${res.name} is ${res.weather[0].main} at ${convTemp(res.main.temp)} degrees, with highs of ${convTemp(res.main.temp_max)} and lows of ${convTemp(res.main.temp_min)}`
          write(lineOne, true)
          setTimeout(() => {
            toggleRadar()
            animateDebounceActive = false
            canBlink = true
          }, 5000)
        })
    })
  }
}



function voiceDownload () {
  // if (!animateDebounceActive) {
  //   animateDebounceActive = true
  //   write("I heard you say \"download\". Do you want to download what you have writen? (Say YES or NO)")
  //   setTimeout(() => {animateDebounceActive=false}, 10000)
  // }
}



// write("Here is a test message for odd bot to output")
// setTimeout(() => write("and here is another string after "), 2000)
// setTimeout(() => write("and here is another string after we need a really long sentance to properly test how the animations override. Do you think there is an easier wya to do this? Maybe I should go backto using some lorem ipsum text. Feasably none of the genreated content will ever be longer than this..."), 15000)
write("Hello! I'm OddBot, the @Oddert robot. I'll write down your speech for you to download!", true)
navigator.webkitGetUserMedia({ audio: true }
    , () => {console.log('User has allowed microphone')}
    , () => {
      console.log('User has disabled microphone')
      write("Uh oh! You need to enable a microphone for this to work, am no psychic...")
    })

setTimeout(() => {
  write("")
}, 5000)
