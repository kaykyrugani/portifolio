import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StepCircle from './StepCircle';
import StepContent from './StepContent';
import styles from '../Servicos.module.css';

const StepMap = ({ steps, activeStep, onStepClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  
  // Verifica se o componente está visível na tela
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Verifica se a tela é menor que 780px
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 780);
    };
    
    // Verifica no carregamento
    checkMobile();
    
    // Adiciona listener para mudanças de tamanho
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Atualiza o caminho da linha quando os passos mudam (apenas em telas grandes)
  useEffect(() => {
    if (isMobile) return; // Não atualiza a linha em telas pequenas
    
    if (!lineRef.current) return;
    
    const updateLinePath = () => {
      const container = containerRef.current;
      if (!container) return;
      
      const circles = Array.from(container.querySelectorAll(`.${styles.stepCircle}`));
      if (circles.length < 2) return;
      
      // Ordena os círculos da esquerda para a direita
      const sortedCircles = circles.sort((a, b) => {
        const aRect = a.getBoundingClientRect();
        const bRect = b.getBoundingClientRect();
        return aRect.left - bRect.left;
      });
      
      // Pega as posições dos círculos
      const positions = sortedCircles.map((circle, index) => {
        const rect = circle.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const x = rect.left + rect.width / 2 - containerRect.left;
        const y = rect.top + rect.height / 2 - containerRect.top;
        
        return { x, y, width: rect.width, height: rect.height };
      });
      
      // Cria um caminho suave que passa por todos os pontos
      if (positions.length < 2) return;
      
      let pathData = `M${positions[0].x},${positions[0].y}`;
      
      for (let i = 1; i < positions.length; i++) {
        const prev = positions[i - 1];
        const curr = positions[i];
        
        // Calcula pontos de controle para uma curva mais suave
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = prev.x + (curr.x - prev.x) * 0.7;
        const cp2y = curr.y;
        
        pathData += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${curr.x},${curr.y}`;
      }
      
      if (lineRef.current) {
        lineRef.current.setAttribute('d', pathData);
        lineRef.current.style.opacity = '0.7';
      }
    };
    
    // Adiciona um pequeno atraso para garantir que o DOM foi atualizado
    const timeoutId = setTimeout(() => {
      updateLinePath();
    }, 300);
    
    // Atualiza também no redimensionamento
    const resizeObserver = new ResizeObserver(updateLinePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      clearTimeout(timeoutId);
      resizeObserver.disconnect();
    };
  }, [steps, activeStep, isMobile]);

  return (
    <div 
      ref={containerRef}
      className={`${styles.stepMap} ${isVisible ? styles.visible : ''}`}
    >
      {/* Linha de conexão (apenas em telas grandes) */}
      {!isMobile && (
        <svg 
          className={styles.connectingLine}
          xmlns="http://www.w3.org/2000/svg"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            overflow: 'visible',
            zIndex: 1
          }}
        >
          <motion.path
            ref={lineRef}
            className={styles.linePath}
            initial={{ opacity: 0 }}
            animate={isVisible ? { 
              opacity: 0.7,
              transition: { 
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1]
              }
            } : { opacity: 0 }}
            style={{
              fill: 'none',
              stroke: 'var(--color-accent)',
              strokeWidth: 4,
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
              vectorEffect: 'non-scaling-stroke'
            }}
          />
        </svg>
      )}
      
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <StepCircle
            key={step.id}
            step={step}
            isActive={activeStep === index}
            onClick={() => onStepClick(activeStep === index ? null : index)}
            index={index}
            totalSteps={steps.length}
          />
        ))}
      </div>
      
      <AnimatePresence>
        {activeStep !== null && (
          <StepContent 
            content={steps[activeStep]} 
            isActive={activeStep !== null}
            onClose={() => onStepClick(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default StepMap;
