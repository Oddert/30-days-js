let seeds = []
// for (var i=1; i<=100; i++) {
//   seeds.push(
//     `<div class="item item${i}">${i < 10 ? "0"+i : i}</div>`
//   )
// }

const articles = [
	{
		title: 'Walking Away from Walking Away from Frameworks: Javascript Frameworks are cool again becuase I said so',
		sub: 'Its no longer controversial to be anti-framework, even my gran is now talking about "how redux might just be too much". Have you ever made a complex app without a framework? You can do it but it\'ll take extra effort and probably be more fragile and less maintainable.',
		img: '/27. Click Drag/public/img/walking-away.jpg'
	},
	{
		// title: '"What is a Jamesbond?" Man assumed to be Daniel Craig too embarased to leave Guardian interview',
		title: '"What is a Jamesbond? You can\'t just concatinate words" Daniel Craig calls out the Guardian\'s use of transphobic dog-whistles amoungst its transphobia',
		sub: 'The use of words like "transwoman" instead of "trans woman" is used to delegitimise trans people which really gets in the way whe you\'re trying to enjoy your daily transphobic think piece.',
		img: '/27. Click Drag/public/img/daniel-craig.jpg'
	},
	{
		title: 'Impress your dog with these cool tricks',
		sub: 'You ever feel like your border colie is playing you like a fiddle? Thats because they are, now finish the wall.',
		img: '/27. Click Drag/public/img/dog-painter.jpg'
	},
	{
		title: 'Heartbreaking: The worst thing you\'ve ever had to look at is being sold for exorbarant money by people who hate the environment',
		sub: 'What are NFT\'s? Meet the people trying to put you off technology forever and go live in the woods until climate collapse ruins that too.',
		img: '/27. Click Drag/public/img/nft-2.jpg'
	},
	{
		title: 'A Stretch of a Metaphor: code review is just like a pancake',
		sub: 'You just see the mess while others see the good bits, its fraught, makes you sweat and is always unpredictable. And then you have to go to a code review.',
		img: '/27. Click Drag/public/img/pancake.jpg'
	},
	{
		title: 'What is the OSI model? This rat doesn\'t know but who cares',
		sub: 'Whilst you were learning about networking and other nerd stuff this guy was working out. He\'s going to steal your partner.',
		img: '/27. Click Drag/public/img/rat-workout.jpg'
	},
	{
		title: 'Practical Breakup Guide: What to do when someone you respected advocates for NFT\'s',
		sub: 'They say "never meet your heros" but what do you do when twitter means you can\'t escape them.',
		img: '/27. Click Drag/public/img/nft-1.png'
	},
	{
		title: '"I don\'t this this is where the Python conference is" 12 of the best Map / Location API\'s',
		sub: 'Including practical guides and usecases.',
		img: '/27. Click Drag/public/img/seaside-food.jpg'
	},
]

articles.forEach(article => {
	seeds.push(
		`
		<article>
			<img src="${article.img}" alt="">
			<h3>${article.title}</h3>
			<p>${article.sub}</p>
		</article>
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
})
slider.addEventListener('mouseleave', () => {
  mouseIsDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mouseup', () => {
  mouseIsDown = false
  slider.classList.remove('active')
})
slider.addEventListener('mousemove', e => {
  if (!mouseIsDown) return
  e.preventDefault()
  const x = e.pageX - slider.offsetLeft
  const walk = (x - startX) * 2
  slider.scrollLeft = scrollLeft - walk
})
