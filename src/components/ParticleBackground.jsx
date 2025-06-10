import { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationId;
    
    // Configuração do mouse
    const mouse = {
      x: null,
      y: null,
      radius: 200,  // Raio de atração
      strength: 0.2,  // Força da atração (0 a 1)
      power: 0.4,    // Potência do efeito
      isActive: false
    };

    // Ajustar tamanho do canvas
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    // Classe das partículas
    class Particle {
      constructor(x, y, dx, dy, size, color) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.size = size;
        this.color = color;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }

      update() {
        // Atração pelo mouse
        if (mouse.isActive && mouse.x && mouse.y) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius && distance > 0) {
            // Normaliza o vetor de direção
            const directionX = dx / distance;
            const directionY = dy / distance;
            
            // Calcula a força baseada na distância (mais forte quando mais perto)
            const force = (1 - distance / mouse.radius) * mouse.strength;
            
            // Aplica a força de atração
            this.x += directionX * force * 10 * mouse.power;
            this.y += directionY * force * 10 * mouse.power;
            
            // Adiciona um leve efeito de inércia
            this.dx += directionX * force * mouse.power * 0.5;
            this.dy += directionY * force * mouse.power * 0.5;
          }
        }
        
        // Retorno suave à posição original quando o mouse sai
        if (!mouse.isActive) {
          const dx = this.baseX - this.x;
          const dy = this.baseY - this.y;
          this.x += dx * 0.05;
          this.y += dy * 0.05;
        }


        // Movimento aleatório suave
        this.x += this.dx;
        this.y += this.dy;

        // Fricção
        this.dx *= 0.985;
        this.dy *= 0.985;


        // Nunca deixar a partícula parar completamente
        if (Math.abs(this.dx) < 0.05) this.dx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(this.dy) < 0.05) this.dy += (Math.random() - 0.5) * 0.1;

        // Colisão com as bordas
        if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.dy *= -1;

        this.draw();
      }
    }


    // Inicializar partículas
    const init = () => {
      particlesArray = [];
      const numberOfParticles = 160; // Número fixo de partículas igual ao ConstellationCanvas
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = 1.5; // Tamanho fixo igual ao ConstellationCanvas
        const x = Math.random() * (canvas.width - size * 2) + size;
        const y = Math.random() * (canvas.height - size * 2) + size;
        const dx = (Math.random() - 0.5) * 1.2; // Velocidade similar ao ConstellationCanvas
        const dy = (Math.random() - 0.5) * 1.2;
        const color = '#ffffff88'; // Cor branca com transparência igual ao ConstellationCanvas
        
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
      }
    };

    // Conectar partículas próximas
    const connect = () => {
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          const dx = particlesArray[a].x - particlesArray[b].x;
          const dy = particlesArray[a].y - particlesArray[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 110) { // Distância de conexão igual ao ConstellationCanvas
            const opacity = 0.7 * (1 - distance / 110);
            
            // Linhas curvas quando o mouse está próximo
            if (mouse.x && mouse.y) {
              const midX = (particlesArray[a].x + particlesArray[b].x) / 2;
              const midY = (particlesArray[a].y + particlesArray[b].y) / 2;
              const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
              
              if (distToMouse < 242) { // 220 * 1.1
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.quadraticCurveTo(mouse.x, mouse.y, particlesArray[b].x, particlesArray[b].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
                ctx.lineWidth = 1.3;
                ctx.stroke();
                continue;
              }
            }
            
            // Linhas retas normais
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
    };

    // Loop de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      
      connect();
      animationId = requestAnimationFrame(animate);
    };

    // Event Listeners
    const handleMouseMove = (event) => {
      mouse.x = event.x;
      mouse.y = event.y;
      mouse.isActive = true;
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = null;
      mouse.y = null;
    };
    
    const handleMouseEnter = () => {
      mouse.isActive = true;
    };

    // Configuração inicial
    resizeCanvas();
    init();
    animate();

    // Adicionar event listeners
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(ellipse at center, #0d0d0d, #050505)',
        pointerEvents: 'none'
      }}
    />
  );
};

export default ParticleBackground;