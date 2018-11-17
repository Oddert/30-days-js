

let age = 100
let anotherAge = age
console.log(age, anotherAge)
// 100, 100
age = 250
console.log(age, anotherAge)
// 250, 100

//Works the same with strings

let name = 'Robyn'
let anotherName = name
console.log(name, anotherName)
// 'Robyn', 'Robyn'

name = 'Oddert'
console.log(name, anotherName)
// 'Oddert', 'Robyn'


const players = ['Scott', 'Felicity', 'Connor', 'Jannet']

const team = players

console.log(players, team)
//Will be the same

team[3] = 'Wess'
console.log(players, team)
// Will still be the same

const newTeam = players.slice()
newTeam[2] = 'Alex'
console.log(players, newTeam)
// players retains the changes above but newTeam is seperate

// Some other methods
const teamCats = [].concat(players)
teamCats[0] = 'Sirius'
console.log(players, teamCats)

const teamButter = [...players]
teamButter[1] = 'Get it? SPREAD ? ?? ge ...I\'ll leave'
console.log(players, teamButter)

const runningOutOfNames = Array.from(players)
runningOutOfNames[3] = 'McVities'
console.log(players, runningOutOfNames)


const person = {
  name: 'Oddert',
  age: 40
}

const captain = person
captain.age = 50
// Both will have age set to 50
console.log(person, captain)


const admiral = Object.assign({}, person, { location: 'London' })
console.log(person, admiral)

const oldOddert = { ...person, location: 'Glasgow' }
console.log(person, oldOddert)



const oddert = {
  name: 'robyn',
  age: 21,
  social: {
    twitter: '@oddert',
    github: 'users/Oddert'
  }
}

const dev = Object.assign({}, oddert)
dev.name = 'wes'

console.log(oddert, dev)

dev.social.twitter = '@dasherez0ne'
console.log(oddert.social, dev.social)

const aFoolAndAFeind = JSON.parse(JSON.stringify(oddert))
aFoolAndAFeind.social.twitter = '@BBCNews'

console.log(oddert, aFoolAndAFeind)
