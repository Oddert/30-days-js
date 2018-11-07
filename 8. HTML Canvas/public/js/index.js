

const canvas = document.querySelector('#draw')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

ctx.strokeStyle = 'BADA55'
ctx.lineJoin = 'round'
ctx.lineCap = 'round'

let isDrawing = false,
    lastX     = 0,
    lastY     = 0,
    hue       = 0,
    direction = true

function draw (e) {
  if (!isDrawing) return
  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  lastX = e.offsetX
  lastY = e.offsetY
  hue ++
  if (hue > 360) hue = 0
  if (ctx.lineWidth >= 60 || ctx.lineWidth <= 1) direction = !direction
  if (direction) ctx.lineWidth ++
  if (!direction) ctx.lineWidth --
}

canvas.addEventListener('mousemove', draw)
canvas.addEventListener('mousedown', e => {
  isDrawing = true
  lastX = e.offsetX
  lastY = e.offsetY
})
canvas.addEventListener('mouseup', () => isDrawing = false)




const test = {
  altKey: false,
  bubbles: true,
  button: 0,
  buttons: 1,
  cancelBubble: false,
  cancelable: true,
  clientX: 489,
  clientY: 306,
  composed: true,
  ctrlKey: false,
  currentTarget: null,
  defaultPrevented: false,
  detail: 0,
  eventPhase: 0,
  fromElement: null,
  isTrusted: true,
  layerX: 489,
  layerY: 306,
  metaKey: false,
  movementX: 130,
  movementY: 30,
  offsetX: 490,
  offsetY: 307,
  pageX: 489,
  pageY: 306,
  // path: (6) [canvas#draw, div.canvas-flex, body, html, document, Window],
  relatedTarget: null,
  returnValue: true,
  screenX: 489,
  screenY: 377,
  shiftKey: false,
  // sourceCapabilities: InputDeviceCapabilities {firesTouchEvents: false},
  // srcElement: canvas#draw,
  // target: canvas#draw,
  timeStamp: 8309.899999992922,
  // toElement: canvas#draw,
  type: "mousemove",
  // view: Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …},
  which: 1,
  x: 489,
  y: 306,
}
