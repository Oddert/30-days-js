// document.addEventListener('DOMContentLoaded', () => {

const dogs = [
  { name: 'Rusty', age: 2 },
  { name: 'Hugo', age: 8 }
]

function handleClick () {
  const elem = document.querySelector('p')
  elem.style.color = '#BADA55'
  elem.style.fontSize = '50px'
}


// Regular
console.log('Hello')

//Interpolated
console.log('Hello I am a %s string!', 'fancy')
console.log(`Thats just the poor mans string partial says ${Math.floor(Math.random()*1000)} people`)


//Styled
console.log('%c No one is as fancy as I', 'text-transform: uppercase; font-size: 1.4em; color: teal;')

// Warning
console.warn('lol its just like being shouted at cuase I annoyed creat-react-app')

// Error
console.error('create-react-app now on it\'s way to your flat now to kick ur ass')

// Info
console.info('Did u know that automobiles are tawdery hold overs from the early 20th centruy')

// Testing
console.assert('oddert' === 'is awake', 'As it turns out "oddert" !== "is awake"')

// Clearing
// console.clear()

// Viewing DOM Elems
const elem = document.querySelector('p')
console.log(elem)
console.dir(elem)

// Grouping logs
dogs.forEach(each => {
  console.group(`${each.name}`)
  console.log(`The first dug is ${each.name}`)
  console.log(`${each.name} is ${each.age} old`)
  console.log(`which means they are ${each.age * 7} in dug years`)
  console.groupEnd(`${each.name}`)
})

// Count
console.count('Scott')
console.count('Scott')
console.count('Scott')
console.count('Jim')
console.count('Scott')
console.count('Jim')
console.count('Jim')
console.count('Scott')
console.count('Jim')
console.count('Scott')
console.count('Jim')


// Timing
console.time('fetching data...')
fetch('https://api.github.com/users/Oddert')
.then(res => res.json())
.then(res => {
  console.log(res)
  console.timeEnd('fetching data...')
})

// Table
console.table(dogs)

// })
