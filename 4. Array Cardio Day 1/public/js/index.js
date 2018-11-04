const inventors = [
  { first: 'Albert', last: 'Einstain', year: 1879, passed: 1955 },
  { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
  { first: 'Galileo', last: 'Gelilei', year: 1564, passed: 1642 },
  { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
  { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
  { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
  { first: 'Max', last: 'Plank', year: 1858, passed: 1947 }
]

const people = [
  'Beck, Glen', 'Becker, tubel', 'Becket, Samuel', 'Beddoes, Mick',
  'Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire',
  'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana',
  'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano',
  'Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi',
  'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Anerin', 'Bevel, Ken',
  'Biden, Joseph', 'Berce, Ambrose', 'Biko, Seteve', 'Billings, Josh', 'Biondo, Frank',
  'Birrell, Augistine', 'Black, Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'
]

document.addEventListener('DOMContentLoaded', () => {



  function postAnswers (target, data) {
    const elem = document.getElementById(target)
    elem.append(data)
  }


  // 1) Filter the list of inventors for those who were born in the 1500's
  let one = inventors.filter(each => each.year >= 1500 && each.year < 1600)
  postAnswers('one', JSON.stringify(one))
  // console.table(one)

  // 2) Give us an array of the inventors first and last names
  let two = inventors.map(each => ({
    first: each.first,
    last: each.last
  }))
  postAnswers('two', JSON.stringify(two))

  // 3) Sort the inventors by birthdate, oldest to youngest
  let three = inventors.sort((a, b) => a.year < b.year ? 1 : -1)
  postAnswers('three', JSON.stringify(three))

  // 4) How many years did all the invenotrs live?
  let four = inventors.map(each =>
    Object.assign({}, each, {
      lived: each.passed - each.year
    })
  )
  postAnswers('four', JSON.stringify(four))

  // 5) Sort the inventors by years lived
  let five = inventors.sort((a, b) => a.passed - a.year > b.passed - b.year ? 1 : -1)
  postAnswers('five', JSON.stringify(five))

  // 6) Create a list of boulevards in Paris that contain the 'de' anywhere in the name
  // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris

  function passThisIntoTheWikipediaPage () {
    const category = document.querySelector('.mw-category')
    const links = [...category.querySelectorAll('a')]
    const de = links.map(each => each.textContent).filter(each => each.includes('de'))
  }


  // 7) Sort the people alphabetically by last name
  let seven = people
    .map(each =>
      each.split(', ')
    )
    .sort((a, b) =>
      a[0] > b[0] ? 1 : -1
    )
  postAnswers('seven', JSON.stringify(seven))

  // 8) Talley up the instancs of these
  const data = ['tube', 'tube', 'overground', 'overground', 'bike', 'walk', 'tube', 'DLR', 'bike', 'walk', 'tube', 'DLR', 'tube', 'overground']
  let eight = data.reduce((acc, each) => {
    if (!acc[each]) acc[each] = 0
    acc[each] ++
    return acc
  }, {})
  postAnswers('eight', JSON.stringify(eight))




})
