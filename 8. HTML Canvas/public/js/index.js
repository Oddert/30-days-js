

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
