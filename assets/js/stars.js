/* Source: https://gist.github.com/A973C/3856600 (edited to remove jQuery dependency) */
var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 15;
var numStars = 2000;

// Calculate the screen size
screenH = document.documentElement.clientHeight;
screenW = document.documentElement.clientWidth;

// Get the canvas
canvas = document.querySelector('#stars');

// Fill out the canvas
canvas.setAttribute('height', screenH);
canvas.setAttribute('width', screenW);
context = canvas.getContext('2d');

// Create all the stars
var i = 0;
for (var i = 0; i < numStars; i++) {
    var x = Math.round(Math.random() * screenW);
    var y = Math.round(Math.random() * screenH);
    var length = 1 + Math.random() * 2;
    var opacity = Math.random();

    // Create a new star and draw
    var star = new Star(x, y, length, opacity);

    // Add the the stars array
    stars.push(star);
}

window.requestAnimationFrame(animate);

/**
 * Animate the canvas
 */
function animate() {
    context.clearRect(0, 0, screenW, screenH);
    stars.forEach(function(item, i) {
        item.draw(context);
    });
    window.requestAnimationFrame(animate);
}

function Star(x, y, length, opacity) {
    this.x = parseInt(x);
    this.y = parseInt(y);
    this.length = parseInt(length);
    this.opacity = opacity;
    this.factor = 1;
    this.increment = Math.random() * 0.03;
}

Star.prototype.draw = function() {
    context.rotate((Math.PI * 1 / 10));

    // Save the context
    context.save();

    // move into the middle of the canvas, just to make room
    context.translate(this.x, this.y);

    // Change the opacity
    if(this.opacity > 1) {
        this.factor = -1;
    }
    else if(this.opacity <= 0) {
        this.factor = 1;

        this.x = Math.round(Math.random() * screenW);
        this.y = Math.round(Math.random() * screenH);
    }

    this.opacity += this.increment * this.factor;

    context.beginPath();
    var i;
    for (i = 5; i--;) {
        context.lineTo(0, this.length);
        context.translate(0, this.length);
        context.rotate((Math.PI * 2 / 10));
        context.lineTo(0, - this.length);
        context.translate(0, - this.length);
        context.rotate(-(Math.PI * 6 / 10));
    }

    context.lineTo(0, this.length);
    context.closePath();
    context.fillStyle = "rgba(255, 255, 200, " + this.opacity + ")";
    context.shadowBlur = 5;
    context.shadowColor = '#ffffff';
    context.fill();

    context.restore();
};
