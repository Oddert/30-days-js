const url = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json'

const cities = []

fetch(url)
  .then(res => res.json())
  .then(res => {
    cities.push(...res)
    console.log(cities)
  })

function search (word, cities) {
  return cities.filter(each => {
    const regex = new RegExp(word, 'gi')
    return each.city.match(regex) || each.state.match(regex)
  })
}

//    \    |
//why does my keyboard not have a backslash or vertical bar ? :(

const addComma = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

function displayMatches () {
  const matchArr = search (this.value, cities)
  const html = matchArr.map(each => {
    const regex = RegExp(this.value, 'gi')
    const cityName = each.city.replace(regex, `<span class="hl">${this.value}</span>`)
    const stateName = each.state.replace(regex, `<span class="hl">${this.value}</span>`)
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${addComma(each.population)}</span>
      </li>
    `;
  }).join('')
  suggestions.innerHTML = html
}

const searchInput = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions')

searchInput.addEventListener('change', displayMatches)
searchInput.addEventListener('keyup', displayMatches)

setTimeout(() => console.log(search('bos', cities)), 1000)
