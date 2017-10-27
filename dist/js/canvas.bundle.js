/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Initial Setup
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;
var mouseDownFlag = false;
var pressCount = 0;

// Variables
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2
};

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#2D5F73', '#FF7F66'];

// Event Listeners
addEventListener('mousemove', function (event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});

addEventListener('keypress', function () {
	switch (pressCount++ % 4) {
		case 0:
			//Bubblegum
			colors = ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C'];
			break;
		case 1:
			//Forrest
			colors = ['#165873', '#124C59', '#428C5C', '#4EA64B', '#ADD96C'];
			break;
		case 2:
			//Sky
			colors = ['#194045', '#82B596', '#F2D022', '#F2BD1D', '#D98B2B'];
			break;
		case 3:
			//City
			colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#2D5F73', '#FF7F66'];
			break;
	}
});

addEventListener('resize', function () {
	canvas.width = innerWidth;
	canvas.height = innerHeight;

	init();
});

addEventListener('mousedown', function () {
	mouseDownFlag = true;
});

addEventListener('mouseup', function () {
	mouseDownFlag = false;
});

addEventListener('click', function () {
	for (var j = 0; j < 7; j++) {
		var x = mouse.x + randomIntFromRange(-40, 40);
		var y = mouse.y + randomIntFromRange(-40, 40);
		var color = randomColor(colors);
		circles.push(new Circle(x, y, 50, color));
	}
});

// Utility Functions
function randomIntFromRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
	return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
	var xDist = x2 - x1;
	var yDist = y2 - y1;

	return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

// Objects
function Circle(x, y, radius, color) {
	var _this = this;

	this.x = x;
	this.y = y;
	this.radius = radius;
	this.color = color;
	this.lastX = x;
	this.lastY = y;
	this.xDir = randomIntFromRange(0, 1) ? -1 : 1;
	this.yDir = randomIntFromRange(0, 1) ? -1 : 1;

	this.update = function () {
		if (_this.radius > 0) {
			_this.x = _this.lastX + randomIntFromRange(4 * -1 * _this.xDir, 4 * _this.xDir);
			_this.y = _this.lastY + randomIntFromRange(4 * -1 * _this.yDir, 4 * _this.yDir);
			_this.radius -= .5;
			var color = randomColor(colors);
			_this.lastX = _this.x;
			_this.lastY = _this.y;
		}
		_this.draw();
	};

	this.draw = function () {
		c.beginPath();
		c.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2, false);
		c.fillStyle = _this.color;
		c.fill();
		c.stroke();
		c.closePath();
	};
}

// Implementation
var circles = void 0;
function init() {
	circles = [];
}

// Animation Loop
function animate() {
	requestAnimationFrame(animate);
	if (mouseDownFlag) {
		for (var j = 0; j < 1; j++) {
			var x = mouse.x + randomIntFromRange(-40, 40);
			var y = mouse.y + randomIntFromRange(-40, 40);
			var color = randomColor(colors);
			circles.push(new Circle(x, y, 50, color));
		}
	}
	circles.forEach(function (circle) {
		circle.update();
	});
	var colorCount = 0;
	var radius = 20;
	colors.forEach(function (color) {
		c.beginPath();
		c.arc(canvas.width - radius * 1.3 - colorCount * 10, canvas.height - radius * 1.3, 20, 0, Math.PI * 2, false);
		c.fillStyle = color;
		c.fill();
		c.stroke();
		c.closePath();
		colorCount++;
	});
}

init();
animate();

/***/ })
/******/ ]);
//# sourceMappingURL=canvas.bundle.js.map