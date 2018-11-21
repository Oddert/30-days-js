const video         = document.querySelector('.player')
const canvas        = document.querySelector('.photo')
const ctx           = canvas.getContext('2d')
const strip         = document.querySelector('.strip')
const snap          = document.querySelector('.snap')
const photobutton   = document.querySelector('.photobutton')
const togglehide    = document.querySelector('.toggle_hide')

const videoList     = document.querySelector('.videoList')

let inputOptions    = document.querySelectorAll('.input_option') || []

const filterButtons = document.querySelector('.filters')


// ========== Filter Controls ==========
const color_overlay_control   = document.querySelector('.color_overlay_controls')
const channel_glitch_control  = document.querySelector('.channel_glitch_controls')
const green_screen_control    = document.querySelector('.green_screen_controls')
// ========== Filter Controls ==========


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
      let output = [`<li class="input_option active" data-index=0 data-id="DEFAULT">Default</li>`]
      devices
      .filter(each => (each.label.match(/\W/i) && each.kind.match(/(\w+)(input|output)/i).includes("video")))
      .forEach((each, idx) => {
        let id = each.deviceId
        let elem = `<li class="input_option" data-index=${idx+1} data-id="${id}">${each.label}</li>`
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

function toggleVideoOptions () {
  let options = document.querySelector('.video_list-flex')
  if (options.classList.contains('hide')) options.classList.remove('hide')
  else options.classList.add('hide')
}

function changeVideoInput (e) {
  selectedVideoInput = e.target.dataset.id
  console.log(`Changing source to deviceId: ${selectedVideoInput}`)
  writeSelectedOption()
  getVideo(e.target.dataset.id)
}

function getVideo (deviceId) {
  if (deviceId == "DEFAULT") deviceId = null
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
  console.log(`paintInterval before: ${paintInterval}`)
  console.log(`Filter: ${filter}`)
  clearInterval(paintInterval)

  const width = video.videoWidth
  const height = video.videoHeight
  canvas.width = width
  canvas.height = height

  console.log(`Setting paint canvas interval`)
  console.log(`Selected filter is: ${filter}`)
  paintInterval = setInterval(function() {
    ctx.drawImage(video, 0, 0, width, height)

    let pixels = ctx.getImageData(0, 0, width, height)
    let filterOutput = pixels

    switch(filter) {
      case "color_overlay":
        filterOutput = color_overlay(pixels)
        break
      case "channel_glitch":
        filterOutput = channel_glitch(pixels)
        break
      case "green_screen":
        filterOutput = green_screen(pixels)
        break
      default:
        break
    }

    ctx.putImageData(filterOutput, 0, 0)
  }, 16)
  console.log(`paintInterval after: ${paintInterval}`)
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
let overlay_choice = "red"
document.querySelector('.overlay-red').addEventListener('click', () => overlay_choice = "red")
document.querySelector('.overlay-green').addEventListener('click', () => overlay_choice = "green")
document.querySelector('.overlay-blue').addEventListener('click', () => overlay_choice = "blue")
function color_overlay (pixels) {
  // console.log(`color_overlay debug`) <- CAUTION: Change ctx.putImageData to something like 1000 before using
  switch(overlay_choice) {
    case "red":
      for (var i=0; i<pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] * .5
      }
      break
    case "green":
      for (var i=0; i<pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] - 50
        pixels.data[i + 1] = pixels.data[i + 1] + 100
        pixels.data[i + 2] = pixels.data[i + 2] * .5
      }
      break
    case "blue":
      for (var i=0; i<pixels.data.length; i+=4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100
        pixels.data[i + 1] = pixels.data[i + 1] - 50
        pixels.data[i + 2] = pixels.data[i + 2] * 2
      }
      break
    default:
      break
  }

  return pixels
}

function channel_glitch (pixels) {
  // console.log(`channel_glitch debug`) <- CAUTION: Change ctx.putImageData to something like 1000 before using
  // const offset = document.querySelector('.channel_glitch_controls input').value

  for (var i=0; i<pixels.data.length; i+=4) {
    pixels.data[i - 75] = pixels.data[i + 0]
    pixels.data[i + 50] = pixels.data[i + 1]
    pixels.data[i - 75] = pixels.data[i + 2]
  }
  return pixels
}

function green_screen (pixels) {
  // console.log(`green_screen debug`) <- CAUTION: Change ctx.putImageData to something like 1000 before using
  const levels = {}

  document.querySelectorAll('.green_screen_controls input').forEach(each => levels[each.name] = each.value)

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
      pixels.data[j + 0] = 255
      pixels.data[j + 1] = 255
      pixels.data[j + 2] = 255
      // pixels.data[j + 3] = 0
    }
  }
  return pixels
}
// ========== /End Filters ==========



// ========== Individual Controls ==========
// ========== /End Individual Controls ==========




function changeFilter (e) {
  let effect = e.target.dataset.effect
  paintToCanvas(effect)
  color_overlay_control.classList.add('hidden')
  channel_glitch_control.classList.add('hidden')
  green_screen_control.classList.add('hidden')
  console.log(`Added class hidden, switching: ${effect}`)
  console.log(green_screen_control)
  switch(effect) {
    case "color_overlay":
      color_overlay_control.classList.remove('hidden')
      break
    case "channel_glitch":
      channel_glitch_control.classList.remove('hidden')
      break
    case "green_screen":
      green_screen_control.classList.remove('hidden')
      break
    default:
      console.error(`Error: Swtch statement on input: ${effect}`)
  }
}



// document.querySelector('.color_test').addEventListener('change', e => hexToRgb(e.target.value))


let dev = true
if (dev) getVideo("0d8c1b8e69d25a3f89ae4a9bf8e2a26b7368388138ae9046fe2a7ac3b7671e9d")
else getVideo(selectedVideoInput)



video.addEventListener('canplay', paintToCanvas)
photobutton.addEventListener('click', takePhoto)
videoList.addEventListener('click', changeVideoInput)
filterButtons.addEventListener('click', changeFilter)
togglehide.addEventListener('click', toggleVideoOptions)
