
/**
 * Generate the map using Leaflet and center it on Aviemore, Scotland, UK.
 */
const map = L.map('map', {
	center: [57.188221, -3.829367],
	zoom: 13,
})

/**
 * Generate the tiles using Open Street Maps
 */
const osm = L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	{
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}
).addTo(map);

let marker = L.marker([57.188221, -3.829367]).addTo(map)

/**
 * Callback for the location watch API.
 * Updates a marker with the user's position.
 * @param {Geolocation} data Each location-data position
 */
function handleLocationUpdate (data) {
	console.log(data.coords)
	if (marker) {
		console.log(marker)
		marker.remove()
		marker.setLatLng([data.coords.latitude, data.coords.longitude])
			.addTo(map)
			.bindPopup(`You are here! <br /> Last updated ${new Date().toLocaleTimeString()}`)
			.openPopup()
	}
}

// Assign the callback
navigator.geolocation.watchPosition(debounce(handleLocationUpdate), err => console.error(err))

/**
 * Debounces a function
 * @param {function} func The function you want to debounce
 * @param {number} wait The minimum time before the function can be called again
 * @param {boolean} immediate If true, the function will be invoked imediately (skips debounce)
 * @returns {function}
 */
function debounce(func, wait = 100, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments
		var later = function() {
			timeout = null
			if (!immediate) func.apply(context, args)
		}
		var callNow = immediate && !timeout
		clearTimeout(timeout)
		timeout = setTimeout(later, wait)
		if (callNow) func.apply(context, args)
	}
}