const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')
const photobutton = document.querySelector('.photobutton')

const videoList = document.querySelector('.videoList')

let inputOptions = document.querySelectorAll('.input_option') || []

const filters = document.querySelector('.filters')


function handleError (err) {
  console.error('Error:', err)
  let errorBox = document.querySelector('.error')
  errorBox.innerHTML = err
  errorBox.classList.remove('hide')
}

let selectedVideoInput = null

function writeMediaOptions () {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      videoList.innerHTML = ""
      let output = []
      devices
      .filter(each => (each.label.match(/\W/i) && each.kind.match(/(\w+)(input|output)/i).includes("video")))
      .forEach((each, idx) => {
        let id = each.deviceId
        let elem = `<li class="input_option" data-index=${idx} data-id="${id}">${each.label}</li>`
        output.push(elem)
      })
      videoList.innerHTML = output.join('')
      inputOptions = document.querySelectorAll('.input_option')
    })
    .catch(err => console.error(err))
}

writeMediaOptions ()

navigator.mediaDevices.ondevicechange = writeMediaOptions

function writeSelectedOption () {
  document.querySelectorAll('.input_option').forEach(each => {
    console.log(each, selectedVideoInput)
    if (each.dataset.id == selectedVideoInput) each.classList.add('active')
    else each.classList.remove('active')
  })
}

function changeVideoInput (e) {
  selectedVideoInput = e.target.dataset.id
  console.log(`Changing source to deviceId: ${selectedVideoInput}`)
  writeSelectedOption()
  getVideo(e.target.dataset.id)
}

function getVideo (deviceId) {
  let constraints = {
    audio: false,
    video: deviceId ? { deviceId } : true
  }
  console.log(`Initialising Video: `, { constraints })
  navigator.mediaDevices.getUserMedia(constraints)
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => handleError(err))
}

var paintInterval

function paintToCanvas (filter) {
  clearInterval(paintInterval)

  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  console.log(`Setting paint canvas interval`)
  console.log(`Selected filter is: ${filter}`)
  paintInterval = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    let pixels = ctx.getImageData(0, 0, width, height)
    let filterOutput = pixels

    switch(filter) {
      case "overlay":
        filterOutput = overlay(pixels)
      case "channel_glitch":
        filterOutput = channel_glitch(pixels)
      case "greenScreen":
        filterOutput = greenScreen(pixels)
      default:
        break
    }

    ctx.putImageData(filterOutput, 0, 0)
  }, 16)
}

function takePhoto () {
  snap.currentTime = 0;
  snap.play()

  const data = canvas.toDataURL('image/jpeg')
  const link = document.createElement('a')

  link.href = data
  link.setAttribute('download', 'oddert')
  link.innerHTML = `<img src="${data}" alt="oddert" />`
  strip.insertBefore(link, strip.firstChild)
}



// ========== Filters ==========
function overlay (pixels) {
  for (var i=0; i<pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100
    pixels.data[i + 1] = pixels.data[i + 1] - 50
    pixels.data[i + 2] = pixels.data[i + 2] * .5
  }
  return pixels
}

function channel_glitch (pixels) {
  for (var i=0; i<pixels.data.length; i+=4) {
    pixels.data[i - 75] = pixels.data[i + 0]
    pixels.data[i + 50] = pixels.data[i + 1]
    pixels.data[i - 75] = pixels.data[i + 2]
  }
  return pixels
}

function greenScreen (pixels) {
  const levels = {}

  document.querySelectorAll('.gscreen input').forEach(each => levels[each.name] = each.value)

  for (var j=0; j<pixels.data.length; j+=4) {
    red = pixels.data[j + 0]
    green = pixels.data[j + 1]
    blue = pixels.data[j + 2]
    alpha = pixels.data[j + 3]

    if (
      red >= levels.rmin &&
      green >= levels.gmin &&
      blue >= levels.bmin &&
      red <= levels.rmax &&
      green <= levels.gmax &&
      blue <= levels.bmax
    ) {
      pixels.data[j + 3] = 0
    }
  }
  return pixels
}
// ========== /End Filters ==========


function changeFilter (e) { paintToCanvas(e.target.dataset.effect) }


// document.querySelector('.color_test').addEventListener('change', e => hexToRgb(e.target.value))


let dev = true
if (dev) getVideo("0d8c1b8e69d25a3f89ae4a9bf8e2a26b7368388138ae9046fe2a7ac3b7671e9d")
else getVideo(selectedVideoInput)



video.addEventListener('canplay', paintToCanvas)
photobutton.addEventListener('click', takePhoto)
videoList.addEventListener('click', changeVideoInput)
filters.addEventListener('click', changeFilter)
