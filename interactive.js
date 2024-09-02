document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const logo = document.getElementById('logo');
    const canvas = document.createElement('canvas');
    body.insertBefore(canvas, body.firstChild); // Ensure canvas is at the back
    const ctx = canvas.getContext('2d');
    let effectsActive = false; // Control flag for toggling effects
    let particles = [];
    let emojiParticles = [];
    const emojis = ["😀", "🎉", "🎸", "🐼", "🔥", "🌟", "💩", "🙈", "🤘"]; // Array of emojis to use as particles

    // Ensure canvas fills the screen and responds to resizing
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Add a new emoji particle
    function addEmojiParticle(x, y) {
        if (!effectsActive) return; // Prevent emoji particles if effects are off
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const size = Math.random() * 24 + 16; // Random size for emojis
        const speedX = Math.random() * 4 - 2; // Random speed X
        const speedY = Math.random() * 4 - 2; // Random speed Y
        emojiParticles.push({ emoji, x, y, size, speedX, speedY });
    }

    // Handle clicks on the canvas to create emoji particles
    canvas.addEventListener('click', function(event) {
        if (!effectsActive) return; // Prevent emoji particles if effects are off
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        addEmojiParticle(x, y);
    });

    // Function to update and draw particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw regular particles
        particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fill();
        });

        // Draw emoji particles
        emojiParticles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
            ctx.font = `${particle.size}px Arial`;
            ctx.fillText(particle.emoji, particle.x, particle.y);
        });

        requestAnimationFrame(animate);
    }
    animate();

    // Function to handle logo click specifically
    logo.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default click behavior
        effectsActive = !effectsActive;
        if (effectsActive) {
            body.classList.add('active-state');
            logo.classList.add('pulsing');
            initParticles(); // Reinitialize regular particles
        } else {
            body.classList.remove('active-state');
            logo.classList.remove('pulsing');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear both types of particles
            particles = []; // Clear regular particles
            emojiParticles = []; // Clear emoji particles
        }
    });

    // Initialize and animate regular particles
    function initParticles() {
        const numParticles = 200;
        const colors = ['#ff0051', '#f56762', '#a53c6c', '#f19fa0', '#72bdbf', '#47689b'];

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 1;
                this.speedX = Math.random() * 4 - 2;
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

        particles = []; // Clear previous regular particles
        for (let i = 0; i < numParticles; i++) {
            particles.push(new Particle());
        }
    }
});
