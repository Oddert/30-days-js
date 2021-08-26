const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')
const clear = document.querySelector('.search-clear')

fetch(url)
  .then(res => res.json())
  .then(res => {
    cities.push(...res)
    console.log(cities)
		browserHasRememberedInput()
  })

function search (word, cities) {
  return cities.filter(each => {
    const regex = new RegExp(word, 'gi')
    return each.city.match(regex) || each.state.match(regex)
  })
}

function clearSearch () {
  suggestions.innerHTML = ''
	searchInput.value = ''
}

function browserHasRememberedInput () {
	if (searchInput.value !== '') {
		displayMatches()
	}
}

//    \    |
//why does my keyboard not have a backslash or vertical bar ? :(

const addComma = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

function displayMatches () {
	const value = searchInput.value
  const matchArr = search(value, cities)
  const html = matchArr.map(each => {
    const regex = RegExp(value, 'gi')
    const cityName = each.city.replace(regex, `<span class="hl">${value}</span>`)
    const stateName = each.state.replace(regex, `<span class="hl">${value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${addComma(each.population)}</span>
      </li>
    `;
  }).join('')
  suggestions.innerHTML = html
}

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)
clear.onclick = clearSearch

// setTimeout(() => console.log(search('bos', cities)), 1000)

// document.addEventListener('DOMContentLoaded', browserHasRememberedInput)