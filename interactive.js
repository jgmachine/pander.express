document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.createElement('canvas');
    document.body.appendChild(canvas); // Ensure canvas is in the body
    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas, false);
    resizeCanvas(); // Set initial size

    let particles = [];
    const numParticles = 100;
    const particleSize = 5;
    const maxSpeed = 2;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = Math.random() * maxSpeed * 2 - maxSpeed;
            this.vy = Math.random() * maxSpeed * 2 - maxSpeed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
            if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 150, 255, 0.7)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, particleSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function init() {
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
        animate();
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    init();
});
