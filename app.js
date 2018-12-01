const express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , path = require('path')

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '/')))

let projects = [
    { title: '1. Drum Kit', workToDo: false, thumbnail: null, thumbnail: '1. Drum Machine.PNG' }
  , { title: '2. CSS Clock', workToDo: false, thumbnail: '2. Clock.PNG' }
  , { title: '3. CSS Variables', workToDo: false, thumbnail: '3. CSS Variables.PNG' }
  , { title: '4. Array Cardio Day 1', workToDo: false, thumbnail: '4. Array Cardio 2.PNG' }
  , { title: '5. Flex Panels Image Gallery', workToDo: true, thumbnail: '5. Flex Image Gallery.PNG' }
  , { title: '6. Ajax Type Ahead', workToDo: false, thumbnail: '6. Ajax Type Ahead2.PNG' }
  , { title: '7. Array Cardio Second', workToDo: false, thumbnail: '7. Array Cardio Second Session.PNG' }
  , { title: '8. HTML Canvas', workToDo: false, thumbnail: '8. Canvas.PNG' }
  , { title: '9. Dev Tools Tips', workToDo: false, thumbnail: '9. Console Dev Tools Tricks.PNG' }
  , { title: '10. Shift to Check Inputs', workToDo: false, thumbnail: '10. Shift Multple Checkboxes 2.PNG' }
  , { title: '11. HTML Video Player', workToDo: false, thumbnail: '11. HTML Video Player.PNG' }
  , { title: '12. Key Sequence Detection', workToDo: false, thumbnail: '12. Key Sequence Detection.PNG' }
  , { title: '13. Slide in on Scroll', workToDo: false, thumbnail: '13. Image Slide In.PNG' }
  , { title: '14. Array Mutability', workToDo: false, thumbnail: '14. Array Mutability.PNG' }
  , { title: '15. Local Storage', workToDo: false, thumbnail: '15. Local Storage.PNG' }
  , { title: '16. CSS Mouse Move', workToDo: false, thumbnail: '16. CSS Mouse Move.PNG' }
  , { title: '17. Sort without Articles', workToDo: true, thumbnail: null }
  , { title: '18. Tally Video Lengths', workToDo: true, thumbnail: null }
  , { title: '19. Webcam Booth', workToDo: true, thumbnail: 'help.PNG' }
  , { title: '20. Native Speech Recognition', workToDo: true, thumbnail: '20. Native Voice Recognition.PNG' }
  , { title: '21. Geolocation', workToDo: false, thumbnail: null }
  , { title: '22. Link Transition Effect', workToDo: false, thumbnail: '22. Link Transition Effect.PNG' }
  , { title: '23. Speech Synthesis', workToDo: true, thumbnail: null }
  , { title: '24. Sticky Nav Bar', workToDo: false, thumbnail: '24. Sticky Nav Bar.PNG' }
  , { title: '25. Event Contexts', workToDo: true, thumbnail: null }
  , { title: '26. Stripe Dropdown Example', workToDo: true, thumbnail: '26. Stripe Dropdown Example.PNG' }
  , { title: '27. Click Drag', workToDo: false, thumbnail: null }
  , { title: '28. Video Speed Interface', workToDo: true, thumbnail: null }
  , { title: '29. Countdown Timer', workToDo: true, thumbnail: null }
  , { title: '30. Whack a Mole Game', workToDo: true, thumbnail: '30. Whack a Mole Game.PNG' }
]

app.get('/', (req, res) =>
  process.env.GLITCH 
    ? res.render('index_glitch', { projects })
    : res.render('index', { projects })
)

app.get('/*', (req, res) =>
  res.render(path.join(
    __dirname
    , `./${req.params['0']}views/host.ejs`
  ))
)

const PORT = process.env.PORT || 3000
app.listen(
  PORT
  , () => console.log(
    `${new Date().toLocaleTimeString('en-GB')}: Server initilised on PORT: ${PORT}...`
  )
)
