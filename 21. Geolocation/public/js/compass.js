const arrow = document.querySelector('.arrow')
const speed = document.querySelector('.speed-value')

let useFakedApi = false

const params = new URLSearchParams(window.location.search)

// Checks for the `useFakePositionAPI` query parameter to override the default behavour.
if (params.get('useFakePositionAPI') === true) useFakedApi = true


/**
 * Mocked data simulating the geolocation API
 * @typedef {object} FakeLocationData
 * @property {object} coords
 * @property {number} coords.speed The user's speed (0-30)
 * @property {number} coords.heading The user's heading (0-360)
 */

if (useFakedApi) {
	let timer

	/**
	 * Resets a delay before updating the location data.
	 * Delay can be betewen 1s and 10s.
	 */
	function setTimer () {
		clearInterval(timer)
		timer = setTimeout(() => {
			handleLocationUpdate({
				coords: {
					speed: Math.floor(Math.random() * 30),
					heading: Math.floor(Math.random() * 360),
				},
			})
			setTimer()
		}, Math.random() * 9000 + 1000)
	}
	setTimer()
} else {
	navigator.geolocation.watchPosition(handleLocationUpdate, err => console.error(err))
}	

/**
 * Callback for the location watch API.
 * Updates a marker with the user's position.
 * @param {FakeLocationData[]} data Each location-data position
 */
function handleLocationUpdate (data) {
	console.log({ useFakedApi }, data)
	speed.textContent = Number(data.coords.speed).toFixed(2)
	arrow.style.transform = `rotate(${data.coords.heading}deg)`
}