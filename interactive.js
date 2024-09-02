document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const canvas = document.createElement('canvas');
    canvas.style.zIndex = 0; // Ensure the canvas is behind other elements
    body.insertBefore(canvas, body.firstChild); // Ensure canvas is at the back
    const ctx = canvas.getContext('2d');

    let effectsActive = false; // State to track whether effects are active

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function toggleEffects() {
        if (!effectsActive) {
            body.classList.add('active-state');
            logo.classList.add('pulsing');
            initParticles();
            effectsActive = true;
        } else {
            body.classList.remove('active-state');
            logo.classList.remove('pulsing');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            effectsActive = false;
        }
    }

    logo.addEventListener('click', toggleEffects);

    function initParticles() {
        const particles = [];
        const numParticles = 200;
        const colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
                if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
                ctx.fill();
            }
        }

        function animate() {
            if (!effectsActive) return; // Stop animation when effects are off
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
        animate();
    }
});
