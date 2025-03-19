document.addEventListener("DOMContentLoaded", () => {
    // Particle Background Setup
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];

    class Particle {
        constructor(x, y, size, speedX, speedY, opacity) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.opacity = opacity;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Gold color with opacity
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02; // Gradually fade out
            
            if (this.opacity <= 0) {
                this.opacity = 0;
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray = particlesArray.filter(p => p.opacity > 0); // Remove fully faded particles
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);

    // Mouse Interaction - Particles appear directly where the mouse moves
    window.addEventListener("mousemove", (event) => {
        let size = Math.random() * 4 + 2;
        let speedX = (Math.random() - 0.5) * 1.5;
        let speedY = (Math.random() - 0.5) * 1.5;
        let opacity = 1;
        
        particlesArray.push(new Particle(event.clientX, event.clientY, size, speedX, speedY, opacity));
        
        if (particlesArray.length > 150) {
            particlesArray.shift();
        }
    });

    animateParticles();
});