
const bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog']

const strip = name => name.replace(/^(a |the |an )/i, '').trim()

const sortedBands = bands.sort((a, b) => strip(a) > strip(b) ? 1 : -1)

console.log(sortedBands)

document.querySelector('.bands').innerHTML = sortedBands.map(each => `<li>${each}</li>`).join('')