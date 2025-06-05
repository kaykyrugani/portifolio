import React, { useRef, useEffect } from 'react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: 0, y: 0, radius: 100 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.clientWidth;
    let height = canvas.height = canvas.parentElement.clientHeight;

    const resizeCanvas = () => {
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initParticles();
    };

    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor(x, y) {
        this.x = x || Math.random() * width;
        this.y = y || Math.random() * height;
        this.radius = Math.random() * 2 + 1;
        this.color = 'rgba(255, 255, 255, 0.8)';
        this.velocity = {
          x: (Math.random() - 0.5) * 0.5,
          y: (Math.random() - 0.5) * 0.5
        };
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        if (this.x + this.radius > width || this.x - this.radius < 0) {
          this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > height || this.y - this.radius < 0) {
          this.velocity.y = -this.velocity.y;
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Interaction with mouse
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius + this.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.current.radius + this.radius - distance) / (mouse.current.radius + this.radius);
          this.x -= forceDirectionX * force * 1;
          this.y -= forceDirectionY * force * 1;
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles.current = [];
      const numParticles = (width * height) / 10000; // Adjust density
      for (let i = 0; i < numParticles; i++) {
        particles.current.push(new Particle());
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < particles.current.length; i++) {
        particles.current[i].update();
      }

      // Draw lines between close particles
      for (let a = 0; a < particles.current.length; a++) {
        for (let b = a; b < particles.current.length; b++) {
          const dx = particles.current[a].x - particles.current[b].x;
          const dy = particles.current[a].y - particles.current[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 80) { // Max distance for lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles.current[a].x, particles.current[a].y);
            ctx.lineTo(particles.current[b].x, particles.current[b].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.current.x = -Infinity; // Move mouse out of canvas to stop interaction
      mouse.current.y = -Infinity;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return <canvas ref={canvasRef} className="projeto-card-canvas"></canvas>;
};

export default ParticleCanvas; 