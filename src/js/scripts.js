document.addEventListener("DOMContentLoaded", () => {
    // Particle Background Setup
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    
    class Particle {
        constructor(x, y, size, speedX, speedY) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.speedX = speedX;
            this.speedY = speedY;
        }
        draw() {
            ctx.fillStyle = "rgba(255, 215, 0, 0.8)"; // Gold Color
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
    }
    
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < 50; i++) {
            let size = Math.random() * 3 + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speedX = (Math.random() - 0.5) * 2;
            let speedY = (Math.random() - 0.5) * 2;
            particlesArray.push(new Particle(x, y, size, speedX, speedY));
        }
    }
    
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particlesArray.forEach(particle => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    
    // Resize canvas on window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
    
    // Mouse Interaction
    window.addEventListener("mousemove", (event) => {
        let size = Math.random() * 3 + 2;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        particlesArray.push(new Particle(event.x, event.y, size, speedX, speedY));
        if (particlesArray.length > 80) {
            particlesArray.shift();
        }
    });
    
    initParticles();
    animateParticles();
});