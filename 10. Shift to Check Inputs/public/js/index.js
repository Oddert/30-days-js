

const formGroups = document.querySelectorAll('.form-group')
console.table(formGroups)

function handleClick (e) {
  console.log(e)
}

formGroups.forEach(each => each.addEventListener('change', handleClick(each)))
