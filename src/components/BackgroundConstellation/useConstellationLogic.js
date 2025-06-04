import { useEffect } from 'react';

const useConstellationLogic = (
  canvasRef,
  {
    numberOfParticles = 160,
    particleRadius = 1.5,
    lineDistanceThreshold = 110,
    interactionDistance = 220,
    particleColor = '#ffffff88',
    lineColor = '255,255,255',
    mouseLineColor = '255,165,0',
    backgroundGradient = 'radial-gradient(ellipse at center, #0d0d0d, #050505)'
  } = {}
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles = Array.from({ length: numberOfParticles }).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
    }));

    let mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    canvas.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        // --- ATRAÇÃO AO MOUSE ---
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distToMouse = Math.hypot(dx, dy);
          if (distToMouse < interactionDistance) {
            // Força de atração proporcional à distância
            const force = (interactionDistance - distToMouse) / interactionDistance;
            const angle = Math.atan2(dy, dx);
            const attraction = 0.22;
            p.vx += Math.cos(angle) * force * attraction;
            p.vy += Math.sin(angle) * force * attraction;
          }
        }

        // Atualização normal
        p.x += p.vx;
        p.y += p.vy;

        // Fricção menor para mais movimento
        p.vx *= 0.985;
        p.vy *= 0.985;

        // Nunca deixar a partícula parar completamente
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.1;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.1;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        // linhas entre partículas próximas
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < lineDistanceThreshold) {
            // --- LINHAS CURVADAS PELO MOUSE ---
            if (mouse.x !== null && mouse.y !== null) {
              // Se o mouse está próximo do meio da linha, curve a linha em direção ao mouse
              const midX = (p.x + p2.x) / 2;
              const midY = (p.y + p2.y) / 2;
              const distToMouse = Math.hypot(midX - mouse.x, midY - mouse.y);
              if (distToMouse < interactionDistance * 1.1) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                // Curva de Bezier puxando para o mouse
                ctx.quadraticCurveTo(mouse.x, mouse.y, p2.x, p2.y);
                ctx.strokeStyle = `rgba(${lineColor},${0.7 * (1 - dist / lineDistanceThreshold)})`;
                ctx.lineWidth = 1.3;
                ctx.stroke();
                continue;
              }
            }
            // Linha reta padrão
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${lineColor},${1 - dist / lineDistanceThreshold})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // linha com o mouse
        if (mouse.x !== null && mouse.y !== null) {
          const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (distToMouse < interactionDistance) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${mouseLineColor},${1 - distToMouse / interactionDistance})`;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, numberOfParticles, particleRadius, lineDistanceThreshold, interactionDistance, particleColor, lineColor, mouseLineColor]);
};

export default useConstellationLogic; 