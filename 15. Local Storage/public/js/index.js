
const new_item    = document.querySelector('.new_item')
const list        = document.querySelector('.list')
const checkBoxes  = document.querySelectorAll('input[type=checkbox]')

const checkAll    = document.querySelector('.checkAll')
const unCheckAll  = document.querySelector('.unCheckAll')
const clear       = document.querySelector('.clear')
const refresh			= document.querySelector('.refresh')

let items = JSON.parse(localStorage.getItem('items')) || []

function refreshPage () {
	window.location.refreshPage()
}

function addItem (e) {
  e.preventDefault()
  const text = this.querySelector('[name=input]').value
  const item = {
    text,
    done: false
  }
  items.push(item)
  write (items, list)
  this.reset()
}

function populateList (items = [], list) {
  list.innerHTML = items.map((each, idx) => {
    return `
      <li>
        <input type="checkbox" data-index="${idx}" id="item_${idx}" ${each.done ? 'checked' : ''} />
        <label for="item_${idx}">${each.text}</label>
        <button class="delete" data-index="${idx}">✖</button>
      </li>
    `
  }).join('')
}

function write (items = items, list = list) {
  localStorage.setItem('items', JSON.stringify(items))
  populateList (items, list)
}

function toggleDone (e) {
  const elem = e.target
  const idx = Number(elem.dataset.index)
  if (e.target.matches('input')) {
    items[idx].done = !items[idx].done
    write (items, list)
  } else if (e.target.matches('button')) {
    items = [...[...items].splice(0, idx), ...[...items].splice(idx+1)]
    write (items, list)
  } else {
    return
  }
}

new_item.addEventListener('submit', addItem)
list.addEventListener('click', toggleDone)

function checkAllItems () {
  items.forEach(each => each.done = true)
  write (items, list)
}

function unCheckAllItems () {
  items.forEach(each => each.done = false)
  write (items, list)
}

function clearAllItems () {
  items = []
  write (items, list)
}

checkAll.addEventListener('click', checkAllItems)
unCheckAll.addEventListener('click', unCheckAllItems)
clear.addEventListener('click', clearAllItems)

const localStoreItems = JSON.parse(localStorage.getItem('items')) || []
console.log(localStoreItems)
populateList (localStoreItems, list)
document.querySelector('.title').innerHTML = 'Tapas Menu'


refresh.onclick = refreshPage