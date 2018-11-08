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
console.assert('oddert' === 'is awake')




// })
