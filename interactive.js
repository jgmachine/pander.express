document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const canvas = document.createElement('canvas');
    body.insertBefore(canvas, body.firstChild); // Make sure canvas is at the back
    const ctx = canvas.getContext('2d');
    let effectsActive = false; // Control flag for toggling effects
    let mouseX = 0, mouseY = 0; // Mouse position variables

    // Ensure the canvas fills the screen and responds to resizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    canvas.addEventListener('mousemove', function(event) {
        const rect = canvas.getBoundingClientRect();
        mouseX = event.clientX - rect.left;
        mouseY = event.clientY - rect.top;
    });

    // Toggling effects on and off
    logo.addEventListener('click', function() {
        effectsActive = !effectsActive; // Toggle the state
        if (effectsActive) {
            body.classList.add('active-state');
            logo.classList.add('pulsing');
            initParticles();
        } else {
            body.classList.remove('active-state');
            logo.classList.remove('pulsing');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the particle effects
        }
    });

    // Initialize and animate particles and light rays
    function initParticles() {
        const numParticles = 200;
        const particles = [];
        const colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 4 - 2; // Increased speed for more dynamic movement
                this.speedY = Math.random() * 4 - 2;
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

        // Create all particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }

        // Animation loop for particles and light rays
        function animate() {
            if (!effectsActive) return; // Stop animation when effects are off
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawRays(); // Draw light rays
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();
    }

    // Function to draw light rays based on mouse position
    function drawRays() {
        let logoCenterX = canvas.width / 2;
        let logoCenterY = canvas.height / 2;
        ctx.beginPath();
        ctx.moveTo(logoCenterX, logoCenterY);
        ctx.lineTo(mouseX, mouseY);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - Math.sqrt(Math.pow(mouseX - logoCenterX, 2) + Math.pow(mouseY - logoCenterY, 2)) / canvas.width})`;
        ctx.stroke();
    }
});
