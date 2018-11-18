
const thumbs = [
  'https://www.jamesbondracing.com/backend/News/jssor/img/travel/01.jpg',
  'https://www.joomlaworks.net/images/demos/galleries/abstract/2.jpg',
  'http://visuallightbox.com/images/demo/catalyst/index_files/vlb_images1/2.jpg',
  'https://www.cdc.gov/wcms/3.0/cdcwp/gadgets/images/kitchen_adventurer_caramel.jpg',
  'https://www.w3schools.com/howto/img_forest.jpg',
  'https://i.ytimg.com/vi/NyhO_bxNcxQ/maxresdefault.jpg',
  'http://www.puredestinations.co.uk/wp-content/uploads/2016/06/turks-caicos-luxury-holidays-thumbnail.jpg',
  'https://www.bl.uk/britishlibrary/~/media/subjects%20images/digital%20scholarship/images/dig-schol-thumbnail.jpg?crop=1&cropX=143&cropY=11&cropW=319&cropH=319&w=304&h=304&dispW=304&dispH=304'
]

function populate () {
  let items = []
  for (var i=0; i<100; i++) {
    const time = `${Math.floor(Math.random() * 10)}:${Math.floor(Math.random()*60)}`
    items.push(
      `<li data-time=${time} class="video">
         <img class="thumbnail" src=${thumbs[Math.floor(Math.random()*thumbs.length)]} /> <span>Video number ${i}</span>
       </li>`
    )
  }
  console.log(items)
  document.querySelector('.videos').innerHTML = items.join('')
}

populate()

const videos = [...document.querySelectorAll('[data-time]')]
console.log(videos)

const seconds = videos
  .map(each => each.dataset.time)
  .map(each => {
    const [ mins, secs ] = each.split(':')
    return Number(mins) * 60 + Number(secs)
  })

// console.log(seconds)

const total = seconds.reduce((acc, each) => acc + each, 0)
// console.log(total)

let secondsRemaining = total

const hours = Math.floor(secondsRemaining / 3600)
// console.log(hours)
secondsRemaining = secondsRemaining % 3600

const mins = Math.floor(secondsRemaining / 60)
secondsRemaining = secondsRemaining % 60
// console.log(mins)

// console.log(secondsRemaining)
console.log(hours, mins, secondsRemaining)
