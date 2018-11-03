

function handleChange (e) {
//   let elem = document.getElementById(e)
//   const inputs = document.querySelectorAll('.inputs input');
//   console.log(inputs)
//
}

document.addEventListener('DOMContentLoaded', () => {




const inputs = document.querySelectorAll('.inputs input')

function handleUpdate () {
  let suffix = this.dataset.suffix || ''
  document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix)
}

inputs.forEach(each => {
  each.addEventListener('change', handleUpdate)
  each.addEventListener('mousemove', handleUpdate)
})






})
