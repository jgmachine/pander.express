document.addEventListener('DOMContentLoaded', function() {
    const body = document.body;
    const canvas = document.createElement('canvas');
    const logo = document.getElementById('logo'); // Assuming your logo has an ID 'logo'
    body.insertBefore(canvas, body.firstChild); // Ensures canvas is at the back
    const ctx = canvas.getContext('2d');
    let effectsActive = false; // Control flag for toggling effects
    const emojis = ["😀", "🎉", "🎸", "🐼", "🔥", "🌟"]; // Array of emojis to use as particles
    let particles = [];

    // Set up the canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Adjust canvas size on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Emoji particle creation function
    function addParticle(x, y) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        const size = Math.random() * 24 + 16; // Random size for emojis
        const speedX = Math.random() * 4 - 2; // Random speed X
        const speedY = Math.random() * 4 - 2; // Random speed Y
        particles.push({ emoji, x, y, size, speedX, speedY });
    }

    // Handle clicks on the canvas to create emoji particles
    canvas.addEventListener('click', function(event) {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        addParticle(x, y);
    });

    // Function to update and draw particles
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => {
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
    logo.addEventListener('click', function() {
        effectsActive = !effectsActive;
        if (effectsActive) {
            body.classList.add('active-state');
            logo.classList.add('pulsing'); // Assumes CSS animations for pulsing
        } else {
            body.classList.remove('active-state');
            logo.classList.remove('pulsing');
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        }
    });
});
