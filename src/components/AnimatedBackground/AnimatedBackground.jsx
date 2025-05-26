import React, { useEffect, useRef, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  // Efeito para rastrear a posição do mouse
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Efeito principal para a animação
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Configuração do canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    
    // Configuração das partículas
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 15); // Mais partículas para um efeito mais rico
    
    // Cores baseadas no tema do seu portfólio com mais variações
    const colors = [
      'rgba(1, 186, 239, 0.6)',  // Azul primário
      'rgba(157, 0, 255, 0.6)',  // Roxo secundário
      'rgba(0, 123, 255, 0.6)',  // Azul acento
      'rgba(1, 186, 239, 0.4)',  // Azul primário mais suave
      'rgba(157, 0, 255, 0.4)',  // Roxo secundário mais suave
      'rgba(0, 123, 255, 0.4)',  // Azul acento mais suave
      'rgba(255, 255, 255, 0.2)' // Branco suave
    ];
    
    // Classe de partícula para melhor organização
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.density = Math.random() * 10 + 5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.baseX = this.x;
        this.baseY = this.y;
        this.velocityX = 0;
        this.velocityY = 0;
        this.friction = 0.95;
      }
      
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      
      update() {
        // Calcular distância até o mouse
        const dx = mousePosition.x - this.x;
        const dy = mousePosition.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const mouseRadius = 150; // Raio de influência do mouse
        
        // Apenas partículas próximas ao mouse são afetadas
        if (distance < mouseRadius) {
          // Suavizar o efeito com base na distância (mais forte perto do mouse)
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const maxSpeed = 0.5; // Velocidade máxima de movimento
          const force = (mouseRadius - distance) / mouseRadius; // 1 quando perto, 0 quando longe
          
          // Aplicar força de forma mais suave
          this.velocityX += forceDirectionX * force * maxSpeed * 0.1;
          this.velocityY += forceDirectionY * force * maxSpeed * 0.1;
        }
        
        // Aplicar atrito (mais suave para movimento mais fluido)
        this.velocityX *= 0.98;
        this.velocityY *= 0.98;
        
        // Movimento orgânico suave com menos aleatoriedade
        this.x += this.velocityX + (Math.random() - 0.5) * 0.05;
        this.y += this.velocityY + (Math.random() - 0.5) * 0.05;
        
        // Limitar partículas à área visível com bordas suaves
        const margin = 50;
        if (this.x < -margin) this.x = canvas.width + margin;
        if (this.x > canvas.width + margin) this.x = -margin;
        if (this.y < -margin) this.y = canvas.height + margin;
        if (this.y > canvas.height + margin) this.y = -margin;
        
        // Desenhar conexões entre partículas próximas
        this.drawConnections();
      }
      
      drawConnections() {
        // Limitar o número de conexões para melhor desempenho
        let connectionsDrawn = 0;
        const maxConnections = 3; // Número máximo de conexões por partícula
        
        // Ordenar partículas por proximidade (mais próximas primeiro)
        const sortedParticles = [...particles]
          .filter(p => p !== this) // Não conectar consigo mesma
          .map(p => ({
            particle: p,
            distance: Math.hypot(this.x - p.x, this.y - p.y)
          }))
          .sort((a, b) => a.distance - b.distance);
        
        // Desenhar apenas as conexões mais próximas
        for (const { particle, distance } of sortedParticles) {
          if (connectionsDrawn >= maxConnections) break;
          
          const maxDistance = 120; // Distância máxima para conexão (reduzida)
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            
            // Conexões mais sutis
            ctx.strokeStyle = `rgba(1, 186, 239, ${opacity * 0.15})`;
            ctx.lineWidth = 0.3;
            
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(particle.x, particle.y);
            ctx.stroke();
            
            connectionsDrawn++;
          }
        }
      }
    }
    
    // Inicializar partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Função de animação
    const animate = () => {
      // Limpar canvas com gradiente suave
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(12, 9, 13, 0.9)');
      gradient.addColorStop(1, 'rgba(25, 0, 51, 0.9)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Atualizar e desenhar partículas
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Iniciar animação
    animate();
    
    // Limpar na desmontagem
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition, windowSize]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="animated-background"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        opacity: 0.7,
        transition: 'opacity 0.5s ease-in-out'
      }}
    />
  );
};

export default AnimatedBackground;
