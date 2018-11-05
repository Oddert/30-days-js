document.addEventListener('DOMContentLoaded', () => {

  const pannels = document.querySelectorAll('.flex')

  function toggleOpen () {
    this.classList.toggle('open')
  }

  function toggleActive (e) {
    if (e.propertyName.includes('flex')) {
      this.classList.toggle('active')
    }
  }

  pannels.forEach(each => each.addEventListener('click', toggleOpen))
  pannels.forEach(each => each.addEventListener('transitionend', toggleActive))

})
