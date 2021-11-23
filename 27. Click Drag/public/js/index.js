let seeds = []
// for (var i=1; i<=100; i++) {
//   seeds.push(
//     `<div class="item item${i}">${i < 10 ? "0"+i : i}</div>`
//   )
// }

const articles = [
	{
		title: 'Pacer 2: Tories confused as to why people are not happy with their "alternative" to building HS2 properly.',
		sub: '"Surviving climate change and not having to service their own private vehicle would make life too good for people; once they realise better things are achievable they might start to get ideas" says Grant Shapps, transport secretary and big-brain\'d thinker.',
		img: '/27. Click Drag/public/img/pacer.jpg'
	},
	{
		title: 'Walking Away from Walking Away from Frameworks: Javascript Frameworks are cool again becuase I said so',
		sub: 'Its no longer controversial to be anti-framework, even my gran is now talking about "how redux might just be too much".',
		// img: '/27. Click Drag/public/img/walking-away.jpg'
		img: '/27. Click Drag/public/img/walking-away-contemplating.jpg'
		// img: 'https://cdn.pixabay.com/photo/2020/01/21/11/39/running-4782722_960_720.jpg'
	},
	{
		// title: '"What is a Jamesbond?" Man assumed to be Daniel Craig too embarased to leave Guardian interview',
		title: '"What is a \'Jamesbond\'? You can\'t just concatinate words" Daniel Craig calls out the Guardian\'s use of transphobic dog-whistles amoungst its transphobia',
		sub: 'The use of words like "transwoman" instead of "trans woman" is used to delegitimise trans people which really gets in the way whe you\'re trying to enjoy your daily transphobic think piece.',
		img: '/27. Click Drag/public/img/daniel-craig-2.jpg'
	},
	{
		title: 'Heartbreaking: The worst thing you\'ve ever had to look at is being sold for exorbarant money by people who hate the environment',
		sub: 'What are NFT\'s? Meet the people trying to put you off technology forever and go live in the woods until climate collapse ruins that too.',
		img: '/27. Click Drag/public/img/nft-2.jpg'
	},
	{
		title: 'Impress your dog with these cool tricks',
		sub: 'You ever feel like your border colie is playing you like a fiddle? Thats because they are, now finish the wall.',
		img: '/27. Click Drag/public/img/dog-painter-top-margins.jpg'
	},
	{
		title: 'A Stretch of a Metaphor: code review is just like a pancake',
		sub: 'You just see the mess while others see the good bits, its fraught, makes you sweat and is always unpredictable. And then you have to go to a code review.',
		img: '/27. Click Drag/public/img/pancake-plain-bottom-margin.jpg'
	},
	{
		title: 'What is the OSI model? This rat doesn\'t know and doesnt care',
		sub: 'Whilst you were learning about networking and other nerd stuff this guy was working out. He\'s going to steal your partner.',
		img: '/27. Click Drag/public/img/rat-workout-tall-bottom-margin.jpg'
	},
	{
		title: 'Practical Breakup Guide: What to do when someone you respected advocates for NFT\'s',
		sub: 'They say "never meet your heros" but what do you do when twitter means you can\'t escape them.',
		img: '/27. Click Drag/public/img/nft-1.png'
	},
	{
		title: '"I don\'t this this is where the Python conference is" 12 of the best Map / Location API\'s',
		sub: 'When Jhonas Clonk, 27 arrived at what he thought the national Python conferance, a sinking feeling dawned on him. It wasn\'t long before he suspected that his custom map software might have a bad API.',
		img: '/27. Click Drag/public/img/seaside-food.jpg'
	},
]

const articleDate = new Date()
const months = ['Jan', 'Feb', 'March', 'April', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

articles.forEach((article, idx) => {
	// <div class='image'>
	// 			<img src="${article.img}" alt="">
	// 		</div>
	const formatDate = `${articleDate.getDate()} ${months[articleDate.getMonth()]}`
	seeds.push(
		`
		<div class='article' style='background-image: url("${article.img}");'>
			<h3>${article.title}</h3>
			<div class='article-text'>
				<p>${article.sub}</p>
				<sub>
					${
						idx === 0 
							? '2 hours ago' 
							: formatDate
					}
				</sub>
			</div>
		</div>
		`
	)
})

document.querySelector('.items').innerHTML = seeds.join('')

const slider = document.querySelector('.items')

let mouseIsDown = false
let startX
let scrollLeft


slider.addEventListener('mousedown', e => {
  mouseIsDown = true
  slider.classList.add('active')
  startX = e.pageX - slider.offsetLeft
  scrollLeft = slider.scrollLeft
	console.log('mouseDown', mouseIsDown, startX, scrollLeft)
})
slider.addEventListener('mouseleave', () => {
  mouseIsDown = false
  slider.classList.remove('active')
	console.log('mouse leave', mouseIsDown, startX, scrollLeft)
})
slider.addEventListener('mouseup', () => {
  mouseIsDown = false
  slider.classList.remove('active')
	console.log('mouse up', mouseIsDown, startX, scrollLeft)
})
slider.addEventListener('mousemove', e => {
	console.log('mouse move')
  if (!mouseIsDown) return
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX) * 2
	console.log(x, startX, walk)
  slider.scrollLeft = scrollLeft - walk
	console.log('mouseDown', mouseIsDown, startX, scrollLeft)
})
