function updateHand(hand, angle) {
  let elem = document.getElementById(hand)
  if (angle - 90 == 360 || angle - 90 == 0) {
    console.log(`intervention, angle: ${angle}, angle - 90: ${angle - 90}`)
    elem.style.transition = `none`
    elem.style.transform = `rotate(${angle}deg)`
    elem.style.transition = null
  } else {
    elem.style.transform = `rotate(${angle}deg)`
  }
}

const timer = setInterval (() => {
  let date = new Date()
  console.log('second: ', date.getSeconds())
  console.log('angle: ', (360/60) * date.getSeconds())
  updateHand ('seconds', ((360/60) * date.getSeconds()) + 90)
  updateHand ('minutes', ((360/60) * date.getMinutes()) + 90)
  updateHand ('hours', ((360/12) * date.getHours()) + 90)
}, 1000)

let backgrounds = {
  morning: "https://stmed.net/sites/default/files/lake-wallpapers-27927-377315.jpg",
  afternoon: "https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BcZfIvWQiol01l2w/sun-sparkles-on-rippling-sea-waves-at-noon-slow-motion_hxp0t5i3_thumbnail-full01.png",
  evening: "https://wallpaper.wiki/wp-content/uploads/2017/04/wallpaper.wiki-Protection-sea-calm-evening-images-1920x1080-PIC-WPB0012967.jpg",
  night: "https://www.wallpaperflare.com/static/240/832/1006/evening-night-sea-lake-wallpaper.jpg"
}

document.addEventListener('DOMContentLoaded', () => {
  let hours = new Date().getHours()
  var timeOfDay = 'afternoon'
  if (hours >= 4 && hours < 12) timeOfDay = 'morning'
  if (hours >= 12 && hours < 18) timeOfDay = 'afternoon'
  if (hours >= 18 && hours < 24) timeOfDay = 'evening'
  if (hours >= 22 || hours < 4) timeOfDay = 'night'
  document.getElementsByTagName("BODY")[0].style.backgroundImage = `url('${backgrounds[timeOfDay]}')`
})
