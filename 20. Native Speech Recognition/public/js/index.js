window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()
recognition.interimResults = true

let p = document.createElement('P')
p.classList.add('text_line')
const words = document.querySelector('.words')
words.appendChild(p)

recognition.addEventListener('result', e => {
  console.log(e)
  const transcript = Array.from(e.results)
    .map(res => res[0])
    .map(res => res.transcript)
    .join('')

  p.textContent = transcript
  if (e.results[0].isFinal) {
    p = document.createElement('P')
    p.classList.add('text_line')
    words.appendChild(p)
  }
  console.log(transcript)
})

recognition.addEventListener('end', recognition.start)

recognition.start()

function download (filename, text) {
  let elem = document.createElement('a')
  elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  elem.setAttribute('download', filename)

  elem.style.display = 'none'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

function handleUserDownload () {
  let name = `${new Date().toLocaleString()} download`
  let text = Array.from(document.querySelectorAll('.text_line')).map(e => e.innerText).join('\r\n\r\n')
  console.log(text)
  download(name, text)
}

document.querySelector('.download')
  .addEventListener('click', handleUserDownload)
