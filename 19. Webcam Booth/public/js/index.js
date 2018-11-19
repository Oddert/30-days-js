const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')
const photobutton = document.querySelector('.photobutton')

const videoList = document.querySelector('.videoList')

let inputOptions = document.querySelectorAll('.input_option') || []

const filters = document.querySelector('.filters')


let selector = null

function writeMediaOptions () {
  navigator.mediaDevices.enumerateDevices()
    .then(devices => {
      videoList.innerHTML = ""
      let output = []
      devices
      .filter(each => (each.label.match(/\W/i) && each.kind.match(/(\w+)(input|output)/i).includes("video")))
      .forEach((each, idx) => {
        let elem = `<li class="input_option" data-index=${idx} data-id="${each.deviceId}">${each.label}</li>`
        output.push(elem)
      })
      videoList.innerHTML = output.join('')
      inputOptions = document.querySelectorAll('.input_option')
    })
    .catch(err => console.error(err))
}

writeMediaOptions ()

navigator.mediaDevices.ondevicechange = writeMediaOptions

function changeVideoInput (e) {
  getVideo(e.target.dataset.id)
}

function getVideo (id) {
  let constraints = {
    audio: false,
    video: id ? { deviceId: id } : true
  }
  console.log(`Initialising Video: `, { constraints })
  navigator.mediaDevices.getUserMedia(constraints)
    .then(localMediaStream => {
      video.srcObject = localMediaStream
      video.play()
    })
    .catch(err => {
      console.error('Error:', err)
      document.querySelector('.error').innerHTML = err
    })
}

var paintInterval

function paintToCanvas (filter) {
  clearInterval(paintInterval)

  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  paintInterval = setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height)

    let pixels = ctx.getImageData(0, 0, width, height)
    let filterOutput = pixels

    switch(filter) {
      case "redFilter":
        filterOutput = redFilter(pixels)
      case "rgbSplit":
        filterOutput = rgbSplit(pixels)
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
function redFilter (pixels) {
  for (var i=0; i<pixels.data.length; i+=4) {
    pixels.data[i + 0] = pixels.data[i + 0] + 100
    pixels.data[i + 1] = pixels.data[i + 1] - 50
    pixels.data[i + 2] = pixels.data[i + 2] * .5
  }
  return pixels
}

function rgbSplit (pixels) {
  for (var i=0; i<pixels.data.length; i+=4) {
    pixels.data[i - 75] = pixels.data[i + 0]
    pixels.data[i + 50] = pixels.data[i + 1]
    pixels.data[i - 75] = pixels.data[i + 2]
  }
  return pixels
}

function greenScreen (pixels) {
  const levels = {}

  document.querySelectorAll('.rgb input').forEach(each => levels[each.name] = each.value)

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



// getVideo("666703b5348f01212903ea106bed3b34e1544217f20723127c0d7925452dd57f")
getVideo()

video.addEventListener('canplay', paintToCanvas)
photobutton.addEventListener('click', takePhoto)
videoList.addEventListener('click', changeVideoInput)
filters.addEventListener('click', changeFilter)
