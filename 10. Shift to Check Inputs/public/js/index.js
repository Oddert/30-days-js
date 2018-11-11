
var shift = false

window.addEventListener('keydown', e => {
  if (e.keyCode === 16) shift = true
})
window.addEventListener('keyup', e => {
  if (e.keyCode === 16) shift = false
})

const formGroups = document.querySelectorAll('.form-group')
console.table(formGroups)

var lastIdx = null

function handleClick (e) {
  const idx = e.target.dataset.idx
  const willCheck = e.target.checked
  // console.log(`willCheck: ${willCheck}`)
  // console.log(idx, lastIdx, shift)
  if (shift && lastIdx !== idx) {
    let direction = idx > lastIdx
    let range = []
    if (direction) {
      for (let i=Number(lastIdx); i<=Number(idx); i++) {
        range.push(i)
      }
    } else {
      for (let i=Number(idx); i<=Number(lastIdx); i++) {
        range.push(i)
      }
    }
    // console.log(range)
    for (let i=0; i<range.length; i++) {
      let each = range[i]
      let elem = document.querySelector(`[data-idx='${each}']`).checked = willCheck
    }
  }
  lastIdx = idx
}

formGroups.forEach(each => each.addEventListener('change', handleClick))
