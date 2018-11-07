

const people = [
  { name: 'Wes', year: 1988 },
  { name: 'Kait', year: 1986 },
  { name: 'Irv', year: 1970 },
  { name: 'Lux', year: 2015 }
]

const comments = [
  { text: 'Love this!', id: 523423 },
  { text: 'Super good', id: 823423 },
  { text: 'You are the best', id: 2039842 },
  { text: 'Ramen is my fav food ever', id: 123523 },
  { text: 'Nice Nice Nice!', id: 542328 },
]


document.addEventListener('DOMContentLoaded', () => {

  function postAnswers (target, data) {
    const elem = document.getElementById(target)
    elem.append(data)
  }

  // 1) Array.prototype.some() - Is at least one person 19?
  let one = people.some(each => each.year >= 2018-19)
  postAnswers('one', JSON.stringify(one))
  console.log('1) Someone is 19 or older? ', one)

  // 2) Array.prototype.every() - Is everyone 19?
  let two = people.every(each => each.year === 2018-19)
  postAnswers('two', JSON.stringify(two))
  console.log('2) Is everyone 19 or older?', two)

  // 3) Array.prototype.find() Find comment id: 823423
  let three = comments.find(each => each.id == 823423)
  postAnswers('three', JSON.stringify(three))
  console.log('3) Comment id: 823423', three)

  // 4) Array.prototype.findIndex() Find comment id: 823423 and delete
  let fourIdx = comments.findIndex(each => each.id == 823423)
  let four = [...comments.splice(0, fourIdx), ...comments.splice(fourIdx + 1)]
  postAnswers('four', JSON.stringify(four))
  console.log('4) Array minus comment id: 823423...')
  console.table(four)





})
