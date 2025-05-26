import React, { useEffect, useRef, useState } from 'react';
import { FaLaptopCode, FaGraduationCap } from 'react-icons/fa';
import './Servico.css';

const Servicos = () => {
  const servicosRef = useRef(null);

  useEffect(() => {
    console.log('Efeito do Intersection Observer executado');
    
    const observer = new IntersectionObserver(
      (entries) => {
        console.log('Intersection Observer disparado com', entries.length, 'entradas');
        entries.forEach(entry => {
          console.log('Elemento:', entry.target, 'está visível?', entry.isIntersecting);
          if (entry.isIntersecting) {
            console.log('Adicionando classe animate-servicos ao elemento:', entry.target);
            entry.target.classList.add('animate-servicos');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (servicosRef.current) {
      const items = servicosRef.current.querySelectorAll('.servicos-item');
      console.log('Elementos a serem observados:', items);
      items.forEach(item => {
        console.log('Observando elemento:', item);
        observer.observe(item);
      });
    } else {
      console.error('servicosRef.current não está definido');
    }

    return () => {
      console.log('Limpando Intersection Observer');
      observer.disconnect();
    };
  }, []);

  const servicos = [
    {
      icone: <FaLaptopCode className="icon" />,
      titulo: 'Freelancer',
      descricao: 'Estou iniciando minha jornada no desenvolvimento web e buscando oportunidades para aplicar meus conhecimentos em criação de sites completos, desenvolvimento front-end e projetos freelancer. Posso desenvolver sites modernos e responsivos, transformar layouts em páginas interativas e melhorar a experiência do usuário com animações e efeitos visuais. Além disso, estou aberto a projetos personalizados, seja para criar algo do zero ou otimizar um site existente.'
    },
    {
      icone: <FaGraduationCap className="icon" />,
      titulo: 'Estágio',
      descricao: 'Estou em busca de um estágio, pois minha faculdade exige essa experiência, mas também porque acredito que a melhor forma de aprender é na prática. Quero vivenciar o dia a dia do mercado de trabalho, enfrentar desafios reais e evoluir tanto profissionalmente quanto pessoalmente. Estou ansioso para essa oportunidade, pois vejo o estágio como um passo essencial para me encontrar na carreira.'
    }
  ];

  // Adiciona uma classe inicial para garantir que o container esteja visível
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  return (
    <section id='Servicos' className={`Servicos ${isMounted ? 'mounted' : ''}`} ref={servicosRef}>
      <h3 className="servicos-item">Quais serviços estou procurando?</h3>
      
      <div className='servico-container'>
        {servicos.map((servico, index) => (
          <div key={index} className="servico-card servicos-item">
            {servico.icone}
            <h2>{servico.titulo}</h2>
            <p>{servico.descricao}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicos;
