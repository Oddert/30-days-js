

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
    hue       = 0

function draw (e) {
  e.preventDefault()
  if (!isDrawing) return
  console.log(e.pressure);
  // ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
  ctx.lineWidth = e.pressure * 10
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(e.offsetX, e.offsetY)
  ctx.stroke()
  lastX = e.offsetX
  lastY = e.offsetY
  hue ++
  if (hue > 360) hue = 0
}

// canvas.addEventListener('pointermove', draw)
// canvas.addEventListener('pointerdown', e => {
//   console.log('pointerdown')
//   e.preventDefault()
//   isDrawing = true
//   lastX = e.offsetX
//   lastY = e.offsetY
// })
// canvas.addEventListener('pointerup', () => {
//   console.log('pointerup')
//   isDrawing = false
// })


canvas.addEventListener('pointerover', e => {  // Fired when a pointing device is moved into an elements hit test bounderies
  console.log('pointerover')
  // console.log(e)
})
canvas.addEventListener('pointerenter', e => { // Fired when a pointing device is moved into the hit test bounderies of an element
  console.log('pointerenter')                  // or one of its decendants, including as a result of a pointerdown event from a device
  // console.log(e)                               // that does not support hover
})
canvas.addEventListener('pointerdown', e => {  // Fired when a pointer becomes 'active'
  console.log('pointerdown')
  // console.log(e)
})
// canvas.addEventListener('pointermove', e => {  // Fired when a pointer changes coordinates
//   console.log('pointermove')
//   // console.log(e)
// })
canvas.addEventListener('pointerup', e => {    // Fired when a pointer is no longer 'active'
  console.log('pointerup')
  // console.log(e)
})
canvas.addEventListener('pointercancel', e => {  // A browser fires this event if it concludes the pointer will no longer be able to
  console.log('pointercancel')                   // generate events (e.g. the device is deactivated)
  // console.log(e)
})
canvas.addEventListener('pointerout', e => {   // Fired for several reasons including:
  console.log('pointerout')                    //    * Pointing device is moved out of the hit test bounderies of an elem
  // console.log(e)                               //    * Firing the pointerup event for a device that does not support hover (see hoverup)
})                                                //    * After firing pointercancel event when a pen stylus leaves the hover range

canvas.addEventListener('pointerleave', e => { // Fired when a pointing device is moved out of the hit test bounderies of an elem.
  console.log('pointerleave')                  // For pen devices this event is fired when the stylus leaves hover range
  // console.log(e)
})
canvas.addEventListener('gotpointercapture', e => { // Fired when an elem recives pointer capture
  console.log('gotpointercapture')
  // console.log(e)
})
canvas.addEventListener('lostpointercapture', e => { // Fired after pointer capture is released for a pointer
  console.log('lostpointercapture')
  // console.log(e)
})


// canvas.addEventListener('pointerleave', () => console.log('pointerleave')) // out hover -hit test boundery => pointerenter
// canvas.addEventListener('pointerout', () => console.log('pointerout')) // general up => pointerover



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
