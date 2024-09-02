document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const canvas = document.createElement('canvas');
    let effectsActive = false;  // State to track whether effects are active

    // Ensure the initial state is applied
    body.classList.add('initial-state');
    body.insertBefore(canvas, body.firstChild);  // Insert canvas at the bottom of all content

    const ctx = canvas.getContext('2d');
    canvas.style.zIndex = "0";  // Ensure canvas is behind everything else

    logo.addEventListener('click', function() {
        if (!effectsActive) {
            body.classList.remove('initial-state');
            body.classList.add('active-state');
            logo.classList.add('pulsing');  // Start pulsing logo
            initParticles();  // Start particle system
            effectsActive = true;
        } else {
            body.classList.add('initial-state');
            body.classList.remove('active-state');
            logo.classList.remove('pulsing');  // Stop pulsing logo
            ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the particle effects
            effectsActive = false;
        }
    });

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas();

    let particles = [];
    const numParticles = 200;
    const colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b']; // Bright neon colors

    class Particle {
        constructor() {
            this.x = canvas.width * Math.random();
            this.y = canvas.height * Math.random();
            this.size = Math.random() * 5 + 1;
            this.speedX = Math.random() * 3 - 1.5;
            this.speedY = Math.random() * 3 - 1.5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
            if (this.y < 0 or this.y > canvas.height) this.speedY = -this.speedY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    function initParticles() {
        particles = [];  // Reset particles array
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        if (effectsActive) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }
    }
});
