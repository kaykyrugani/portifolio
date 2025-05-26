import React, { useEffect, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Configuração do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Configuração das partículas
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10); // Ajusta o número de partículas com base no tamanho da tela
    
    // Cores baseadas no tema do seu portfólio
    const colors = [
      'rgba(1, 186, 239, 0.5)',  // Azul primário
      'rgba(157, 0, 255, 0.5)',  // Roxo secundário
      'rgba(0, 123, 255, 0.5)',  // Azul acento
      'rgba(255, 255, 255, 0.2)' // Branco suave
    ];
    
    // Criar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    // Função para desenhar as partículas
    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Desenhar gradiente de fundo
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(12, 9, 13, 0.8)');
      gradient.addColorStop(1, 'rgba(25, 0, 51, 0.8)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Atualizar e desenhar partículas
      particles.forEach(particle => {
        // Atualizar posição
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Fazer as partículas voltarem para a tela quando saírem
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        
        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Conectar partículas próximas
        particles.forEach(secondParticle => {
          const distanceX = particle.x - secondParticle.x;
          const distanceY = particle.y - secondParticle.y;
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(1, 186, 239, ${1 - distance/150})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(secondParticle.x, secondParticle.y);
            ctx.stroke();
          }
        });
      });
      
      requestAnimationFrame(drawParticles);
    };
    
    const animationId = requestAnimationFrame(drawParticles);
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="animated-background" />;
};

export default AnimatedBackground;
