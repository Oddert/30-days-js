const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

let useFakedApi = true

const params = new URLSearchParams(window.location.search)

if (params.get('useFakePositionAPI') === true) useFakedApi = true

if (useFakedApi) {
	let timer
	function setTimer () {
		timer = setTimeout(() => {
			handleLocationUpdate({
				coords: {
					speed: Math.floor(Math.random() * 30),
					heading: Math.floor(Math.random() * 360),
				},
			})
			setTimer()
		}, Math.random() * 6000 + 1000)
	}
	setTimer()
} else {
	navigator.geolocation.watchPosition(handleLocationUpdate, err => console.error(err))
}	

function handleLocationUpdate (data) {
	console.log({ useFakedApi }, data)
	speed.textContent = Number(data.coords.speed).toFixed(2)
	arrow.style.transform = `rotate(${data.coords.heading}deg)`
}