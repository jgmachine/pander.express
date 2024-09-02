document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const canvas = document.createElement('canvas');
    body.insertBefore(canvas, body.firstChild); // Ensure canvas is at the back
    const ctx = canvas.getContext('2d');
    const emojis = ["😀", "🎉", "🎸", "🐼", "🔥", "🌟"]; // Array of emojis to use as particles
    let particles = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Particle class for emoji particles
    class Particle {
        constructor(emoji, x, y) {
            this.emoji = emoji;
            this.x = x || Math.random() * canvas.width;
            this.y = y || Math.random() * canvas.height;
            this.size = Math.random() * 24 + 16; // Emoji size
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.font = `${this.size}px Arial`;
            ctx.fillText(this.emoji, this.x, this.y);
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animate);
    }

    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        particles.push(new Particle(emoji, x, y));
    });

    animate();
});
