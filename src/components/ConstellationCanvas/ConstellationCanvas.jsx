import React, { useRef, useEffect } from 'react';

const ConstellationCanvas = () => {
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);
  const particles = useRef([]);
  const mouse = useRef({ x: -100, y: -100, radius: 150 }); // Mouse position and interaction radius

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
        this.size = Math.random() * 1.5 + 0.5;
        this.velocity = {
          x: (Math.random() - 0.5) * 0.1,
          y: (Math.random() - 0.5) * 0.1
        };
        this.baseX = this.x; // Store initial position for reset
        this.baseY = this.y;
      }

      draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // Move particles
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        // Boundary check (loop around)
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Mouse interaction
        const dx = mouse.current.x - this.x;
        const dy = mouse.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.current.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxForce = mouse.current.radius / distance;
          const acceleration = 0.5; // Controls how strongly particles move
          this.x -= forceDirectionX * maxForce * acceleration;
          this.y -= forceDirectionY * maxForce * acceleration;
        } else if (distance > mouse.current.radius && distance < mouse.current.radius * 2) {
          // Return to original position if outside mouse radius but still somewhat close
          const returnForceX = (this.baseX - this.x) * 0.02;
          const returnForceY = (this.baseY - this.y) * 0.02;
          this.x += returnForceX;
          this.y += returnForceY;
        }

        this.draw();
      }
    }

    const initParticles = () => {
      particles.current = [];
      const numParticles = Math.floor((width * height) / 9000); // Adjust density
      for (let i = 0; i < numParticles; i++) {
        particles.current.push(new Particle());
      }
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'; // Subtle trail effect from background
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

          if (distance < 100) { // Max distance for lines
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.4 - (distance / 250)})`; // Faded lines
            ctx.lineWidth = 0.3;
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
      mouse.current.x = -100;
      mouse.current.y = -100; // Move mouse position off-canvas to stop interaction
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

  return <canvas ref={canvasRef} className="projetos-background-canvas"></canvas>;
};

export default ConstellationCanvas; 