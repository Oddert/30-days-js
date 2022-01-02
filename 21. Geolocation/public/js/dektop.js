
const map = L.map('map', {
	center: [57.188221, -3.829367],
	zoom: 13,
})

const osm = L.tileLayer(
	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
	{
  	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}
).addTo(map);

let marker = L.marker([57.188221, -3.829367]).addTo(map)

function handleLocationUpdate (data) {
	console.log(data.coords)
	console.log(marker)
	marker.remove()
	marker.setLatLng([data.coords.latitude, data.coords.longitude])
		.addTo(map)
		.bindPopup(`You are here! <br /> Last updated ${new Date().toLocaleTimeString()}`)
		.openPopup()
}

navigator.geolocation.watchPosition(debounce(handleLocationUpdate), err => console.error(err))

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