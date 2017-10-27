// Initial Setup
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
var mouseDownFlag = false;
var pressCount = 0;

// Variables
const mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = [
	'#2185C5',
	'#7ECEFD',
	'#FFF6E5',
	'#2D5F73',
	'#FF7F66'
];


// Event Listeners
addEventListener('mousemove', event => {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('keypress', () => {
	switch (pressCount++ % 4) {
		case 0: //Bubblegum
			colors = [
				'#2D5F73',
				'#538EA6',
				'#F2D1B3',
				'#F2B8A2',
				'#F28C8C'
			];
			break
		case 1: //Forrest
			colors = [
				'#165873',
				'#124C59',
				'#428C5C',
				'#4EA64B',
				'#ADD96C'
			];
			break
		case 2: //Sky
			colors = [
				'#194045',
				'#82B596',
				'#F2D022',
				'#F2BD1D',
				'#D98B2B'
			];
			break
		case 3: //City
			colors = [
				'#2185C5',
				'#7ECEFD',
				'#FFF6E5',
				'#2D5F73',
				'#FF7F66' 
			];
			break
	}

})

addEventListener('resize', () => {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener('mousedown', () => {
	mouseDownFlag = true;
})

addEventListener('mouseup', () => {
	mouseDownFlag = false;
})

addEventListener('click', () => {
	for (let j = 0; j < 7; j++) {
		var x = mouse.x + randomIntFromRange(-40, 40);
		var y = mouse.y + randomIntFromRange(-40, 40);
		var color = randomColor(colors);
		circles.push(new Circle(x, y, 50, color));
	}
})


// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
	const xDist = x2 - x1;
	const yDist = y2 - y1;

	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}


// Objects
function Circle(x, y, radius, color) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.lastX = x;
	this.lastY = y;
	this.xDir = (randomIntFromRange(0, 1)) ? -1 : 1;
	this.yDir = (randomIntFromRange(0,1)) ? -1 : 1;

	this.update = () => {
		if (this.radius > 0) {
			this.x = this.lastX + (randomIntFromRange(4 * -1 * this.xDir, 4 * this.xDir));
			this.y = this.lastY + (randomIntFromRange(4 * -1 * this.yDir, 4 * this.yDir));
			this.radius -= .5;
			var color = randomColor(colors);
			this.lastX = this.x;
			this.lastY = this.y;
		}
		this.draw();
	};

	this.draw = () => {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		c.fillStyle = this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}


// Implementation
let circles;
function init() {
	circles = []

}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	if (mouseDownFlag) {
		for (let j = 0; j < 1; j++) {
			var x = mouse.x + randomIntFromRange(-40, 40);
			var y = mouse.y + randomIntFromRange(-40, 40);
			var color = randomColor(colors);
			circles.push(new Circle(x, y, 50, color));
		}
	}
	circles.forEach(circle => {
		circle.update();
	});
	var colorCount = 0;
	var radius = 20;
	colors.forEach(color => {
		c.beginPath();
		c.arc(canvas.width - (radius*1.3) - (colorCount*10), (canvas.height - radius*1.3), 20, 0, Math.PI * 2, false);
		c.fillStyle = color;
		c.fill();
		c.stroke();
		c.closePath();
		colorCount++;
	})
}

init();
animate();