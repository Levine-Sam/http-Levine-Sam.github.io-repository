const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = []; // Array to hold the stars

// Star constructor
function Star(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.opacity = Math.random();
    this.increment = Math.random() * 0.02;
}

// Draw a star
Star.prototype.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
    ctx.fill();
};

// Update a star's opacity to create the twinkling effect
Star.prototype.update = function() {
    if (this.opacity >= 1 || this.opacity <= 0) {
        this.increment = -this.increment;
    }
    this.opacity += this.increment;
    this.draw();
};

// Create stars and add them to the stars array
function initStars() {
    const starCount = 200; // Adjust the number of stars here

    for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        stars.push(new Star(x, y, radius));
    }
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(star => {
        star.update();
    });
}

// Handle window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    stars.length = 0; // Clear the stars array
    initStars(); // Re-initialize the stars
});

initStars();
animate();
