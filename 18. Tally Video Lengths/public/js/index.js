
const columns = document.querySelector('.columns')
const column = document.querySelectorAll('.column')
const data = document.querySelector('.output__data')
const queueElement = document.querySelector('.column.queue')

let videos = document.querySelectorAll('.video')

const availableVideos = []
const queueVideos = []

let dragging = null
let targetColumn = null

// const thumbs = [
//   'https://www.jamesbondracing.com/backend/News/jssor/img/travel/01.jpg',
//   'https://www.joomlaworks.net/images/demos/galleries/abstract/2.jpg',
//   'http://visuallightbox.com/images/demo/catalyst/index_files/vlb_images1/2.jpg',
//   'https://www.w3schools.com/howto/img_forest.jpg',
//   'https://i.ytimg.com/vi/NyhO_bxNcxQ/maxresdefault.jpg',
//   'https://www.bl.uk/britishlibrary/~/media/subjects%20images/digital%20scholarship/images/dig-schol-thumbnail.jpg?crop=1&cropX=143&cropY=11&cropW=319&cropH=319&w=304&h=304&dispW=304&dispH=304'
// ]
const thumbs = [
  '/18. Tally Video Lengths/public/img/blur.jpg',
  '/18. Tally Video Lengths/public/img/cards.jpg',
  '/18. Tally Video Lengths/public/img/forest.jpg',
  '/18. Tally Video Lengths/public/img/network.jpg',
  '/18. Tally Video Lengths/public/img/street.jpg',
  '/18. Tally Video Lengths/public/img/temple.jpg',
]

const addTrailingZeros = n => n < 10 ? `0${n}` : `${n}`

function populate () {
	availableVideos.length = 0
	function pushVideo (time, index) {
		const src = thumbs[Math.floor(Math.random()*thumbs.length)]
		const id = index
		const name = `Video number ${index}`
		availableVideos.push({ src, time, id, name })
	}
  for (let i=0; i<10; i++) {
		const coinFlip = Math.floor(Math.random() * 2)
		const mins = coinFlip 
			? addTrailingZeros(Math.floor(Math.random() * 10)) 
			: addTrailingZeros(Math.floor(Math.random() * 30) + 20)
		const secs = addTrailingZeros(Math.floor(Math.random() * 60 + 20))
    const time = `${mins}:${secs}`
		pushVideo(time, i)
  }
}

function render () {
	const tln = 'video'
	const videoItems = availableVideos.map(video => 
		`<li data-time=${video.time} data-id=${video.id} class='${tln}' draggable=true>
			<img class='thumbnail' src="${video.src}" draggable=false /> 
			<span class='${tln}__number'>${video.name}</span>
			<span class='${tln}__time'>${video.time}</span>
		</li>`
	)
	console.log(queueVideos)
	const queueItems = queueVideos.map(video => 
		`<li data-time=${video.time} data-id=${video.id} class='${tln}' draggable=true>
			<img class='thumbnail' src="${video.src}" draggable=false /> 
			<span class='${tln}__number'>${video.name}</span>
			<span class='${tln}__time'>${video.time}</span>
		</li>`
	)
	videoItems.push(`<div class='bg'></div>`)
	queueItems.push(`<div class='bg'></div>`)
  document.querySelector('.videos').innerHTML = videoItems.join('')
  document.querySelector('.queue').innerHTML = queueItems.join('')
	videos = document.querySelectorAll(`.${tln}`)
	assignEvtListners()
}

function assignEvtListners () {
	column.forEach(col => {
		col.removeEventListener('dragover', dragOver)	
		col.removeEventListener('dragend', clearDraggingColumn)
		col.addEventListener('dragover', dragOver)
		col.addEventListener('dragend', clearDraggingColumn)
	})
	videos.forEach(each => {
		each.removeEventListener('dragstart', handleClick)
		each.addEventListener('dragstart', handleClick)
	})
}

function handleClick (e) {
	setDragging(e)
}

function setDragging (e) {
	columns.classList.add('dragging')
	e.target.closest('.column').classList.add('dragon')
	dragging = e.target
	console.log(dragging)
}

function clearDraggingColumn (e) {
	const target = e.target

	if (!targetColumn) return
	if (targetColumn === dragging.closest('.column')) {		
		columns.classList.remove('dragging')
		target.closest('.column').classList.remove('dragon')
		dragging = null
		return
	}
	
	const isQueueVideoColumn = targetColumn.classList.contains('queue')
	const fromData = isQueueVideoColumn ? availableVideos : queueVideos
	const toData = isQueueVideoColumn ? queueVideos : availableVideos

	const id = Number(dragging.dataset.id)
	const foundVideo = fromData.find(vid => vid.id === id)
	const targetIdx = fromData.indexOf(foundVideo)
	const removedItem = fromData.splice(targetIdx, 1)

	console.log(removedItem[0])
	columns.classList.remove('dragging')
	target.closest('.column').classList.remove('dragon')
	toData.push(removedItem[0])
	dragging = null

	render()
	calculateTotal()
}

function clearDraggingGlobal () {
	columns.classList.remove('dragging')
	column.forEach(col => col.classList.remove('dragon'))
}

function dragOver (e) {
	targetColumn = e.target.closest('.column')
	column.forEach(col => col.classList.remove('dragon'))
	e.target.closest('.column').classList.add('dragon')
}

function calculateTotal () {
	const queue = [...queueElement.querySelectorAll('[data-time]')]

	const seconds = queue
		.map(each => each.dataset.time)
		.map(each => {
			const [ mins, secs ] = each.split(':')
			return Number(mins) * 60 + Number(secs)
	})
	
	const total = seconds.reduce((acc, each) => acc + each, 0)
	
	let secondsRemaining = total
	
	const hours = Math.floor(secondsRemaining / 3600)
	
	secondsRemaining = secondsRemaining % 3600
	
	const mins = Math.floor(secondsRemaining / 60)
	secondsRemaining = secondsRemaining % 60
	
	console.log(hours, mins, secondsRemaining)
	data.innerHTML = `${addTrailingZeros(hours)}:${addTrailingZeros(mins)}:${addTrailingZeros(secondsRemaining)}`
}

populate()
render()
calculateTotal()

document.addEventListener('DOMContentLoaded', () => {
	document.addEventListener('dragend', clearDraggingGlobal)
})