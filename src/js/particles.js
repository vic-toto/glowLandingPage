document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("particle-canvas");
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor(x, y, size, speedX, speedY, life) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
            this.life = life;
            this.opacity = 1;
        }
        draw() {
            ctx.fillStyle = `rgba(255, 215, 0, ${this.opacity})`; // Gold Color with fading effect
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity -= 0.02; // Slowly fade out
            this.life--;
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray = particlesArray.filter(p => p.life > 0);
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
    
    window.addEventListener("mousemove", (event) => {
        let size = Math.random() * 4 + 2;
        let speedX = (Math.random() - 0.5) * 1.5;
        let speedY = (Math.random() - 0.5) * 1.5;
        let life = 50 + Math.random() * 50;
        particlesArray.push(new Particle(event.clientX, event.clientY, size, speedX, speedY, life));
        if (particlesArray.length > 150) {
            particlesArray.shift();
        }
    });
    
    animateParticles();
});
