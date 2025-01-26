// Confetti
const canvasConfetti = document.getElementById("confetti");
const ctxConfetti = canvasConfetti.getContext("2d");
canvasConfetti.width = window.innerWidth;
canvasConfetti.height = window.innerHeight;

// Set z-index to ensure confetti stays behind the cards
canvasConfetti.style.zIndex = '1';

const confettiParticles = [];
function ConfettiParticle(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
}

function createConfetti() {
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(
            new ConfettiParticle(
                Math.random() * canvasConfetti.width, // Random x position
                Math.random() * canvasConfetti.height, // Random y position
                Math.random() * 10 + 5, // Random size
                Math.random() * 2 - 1, // Random horizontal speed
                Math.random() * 2 + 1, // Random vertical speed
                `hsl(${Math.random() * 360}, 100%, 50%)` // Random color
            )
        );
    }
}

function animateConfetti() {
    ctxConfetti.clearRect(0, 0, canvasConfetti.width, canvasConfetti.height);
    confettiParticles.forEach((particle, index) => {
        particle.y += particle.speedY;
        particle.x += particle.speedX;
        if (particle.y > canvasConfetti.height) confettiParticles[index].y = 0;
        if (particle.x > canvasConfetti.width) confettiParticles[index].x = 0;
        if (particle.x < 0) confettiParticles[index].x = canvasConfetti.width;
        ctxConfetti.fillStyle = particle.color;
        ctxConfetti.beginPath();
        ctxConfetti.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctxConfetti.fill();
    });
    requestAnimationFrame(animateConfetti);
}

createConfetti();
animateConfetti();

// Fireworks
const canvasFireworks = document.getElementById("fireworks");
const ctxFireworks = canvasFireworks.getContext("2d");
canvasFireworks.width = window.innerWidth;
canvasFireworks.height = window.innerHeight;

// Set z-index to ensure fireworks stay behind the cards
canvasFireworks.style.zIndex = '1';

function drawFirework(x, y) {
    for (let i = 0; i < 20; i++) {
        ctxFireworks.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ctxFireworks.beginPath();
        ctxFireworks.arc(x + Math.random() * 50 - 25, y + Math.random() * 50 - 25, 5, 0, Math.PI * 2);
        ctxFireworks.fill();
    }
}

function randomFireworks() {
    setInterval(() => {
        // Generate fireworks from different positions across the entire canvas, avoiding the center
        let x = Math.random() * canvasFireworks.width;
        let y = Math.random() * canvasFireworks.height;
        
        // Make sure it's not too close to the center
        while (Math.abs(x - canvasFireworks.width / 2) < 150 && Math.abs(y - canvasFireworks.height / 2) < 150) {
            x = Math.random() * canvasFireworks.width;
            y = Math.random() * canvasFireworks.height;
        }
        
        drawFirework(x, y);
    }, 800);
}
randomFireworks();

// Balloons Movement with random start positions and random directions
const balloons = document.querySelectorAll('.balloon');

balloons.forEach(balloon => {
    let randomStartX = Math.random() * window.innerWidth;
    let randomStartY = window.innerHeight + Math.random() * 100;
    balloon.style.left = `${randomStartX}px`;
    balloon.style.bottom = `${randomStartY}px`;

    balloon.addEventListener('animationiteration', () => {
        let randomXDirection = Math.random() * 2 - 1;
        let randomYDirection = Math.random() * 2 + 1;
        balloon.style.animation = `floatUp ${8 + Math.random() * 2}s infinite ease-in-out, sway 2s infinite ease-in-out`;
    });
});

// Card Swapping
let currentIndex = 0;
const cards = document.querySelectorAll(".card");

function swapCards(direction) {
    // Hide current card
    cards[currentIndex].classList.remove("active");

    // Update currentIndex based on direction
    if (direction === 'left') {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : cards.length - 1;
    } else {
        currentIndex = (currentIndex < cards.length - 1) ? currentIndex + 1 : 0;
    }

    // Show the new card
    cards[currentIndex].classList.add("active");
}

// Initially show the first card
cards[currentIndex].classList.add("active");
