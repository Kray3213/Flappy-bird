let canvas = document.getElementById("canvas")
let context = canvas.getContext("2d")

canvas.width = 256
canvas.height = 512

let bird = new Image()
bird.src = "img/bird.png"
let fly_audio = new Audio()
fly_audio.src = "audio/fly.mp3"
let score_audio = new Audio()
score_audio.src = "audio/score.mp3"
let back = new Image()
back.src = "img/back.png"
let pipeBottom = new Image()
pipeBottom.src = "img/pipeBottom.png"
let pipeUp = new Image()
pipeUp.src = "img/pipeUp.png"
let road = new Image()
road.src = "img/road.png"
let hit_audio = new Audio("audio/hit.mp3")

let xPos = 10
let yPos = 150
let isPaused = false

let velY = 0
let gravity = 0.2
let gap = 120
let pipe = []
pipe[0] = {
	x: canvas.width,
	y: 0
}

function gamepause() {
	isPaused = !isPaused
}

function draw() {
	if (!isPaused){
		context.drawImage(back, 0, 0)
	context.drawImage(bird, xPos, yPos)
	
	if (yPos + bird.height >= canvas.height - road.height) {
		reload()
	}

	velY += gravity
	yPos += velY

	for (let i = 0; i < pipe.length; i++) {
		if (pipe[i].x < -pipeUp.width){
			pipe.shift()
		}
		else {
			context.drawImage(pipeUp, pipe[i].x, pipe[i].y)
			context.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)
			pipe[i].x -= 2
			if (pipe[i].x == 80) {
				pipe.push({
					x: canvas.width,
					y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
				})
			}
		}

		if (xPos + bird.width >= pipe[i].x &&
			xPos <= pipe[i].x + pipeUp.width +10 &&
			(yPos <= pipe[i].y +pipeUp.height ||
			yPos + bird.height >= pipe[i].y + pipeUp.height +gap)) {
			hit_audio.play()
			location.reload()
		 
}
			if (pipe[i].x == 0) {
			score_audio.play()
			updateScore()
			if (isPaused) return
}
	pauseButton.addEventListener('click', () => {  
    isPaused = !isPaused;  
    pauseButton.textContent = isPaused ? 'RESUME' : 'PAUSE';  
});  	
	}

	console.log(pipe)

	context.drawImage(road, 0, canvas.height - road.height)
}}

function reload() {
	xPos = 10
	yPos = 150

	velY = 0
	gravity = 0.2

	 gap = 80
	 pipe = []
	pipe[0] = {
	x: canvas.width,
	y: 0
}
}

canvas.addEventListener("mousedown", moveUp)

document.addEventListener("keydown", function(event) {  
    if (event.code === "ArrowUp") {  
        moveUp()
    }  
})  

function moveUp() {
	velY = -4
	fly_audio.play()
}


let score = 0;  
let bestscore = +localStorage.getItem('bestscore')  ;  
const scoreElement = document.querySelector('.score');  
let bestscoreElement = document.querySelector('.best-score');  
const pauseButton = document.getElementById('pause-button');  
let gameInterval;  
 
 bestscoreElement.textContent = `BEST SCORE: ${bestscore}`; 

function updateScore() {  
    score++;  
    scoreElement.textContent = `SCORE: ${score}`;  
    if (score > bestscore) {  
        bestscore = score;  
        bestscoreElement.textContent = `BEST SCORE: ${bestscore}`;  
        localStorage.setItem('bestscore', bestscore);  
    }  
}  

window.addEventListener('keydown', function(event) {  
    if (event.code === 'Space') {
        gamepause();  
    }  
});  

setInterval(draw, 20)

