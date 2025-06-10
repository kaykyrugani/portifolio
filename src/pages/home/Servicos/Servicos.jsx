import React, { useState, useEffect, useRef } from 'react';
import { FaLaptopCode, FaServer, FaGlobe, FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import './Servico.css';

const Servicos = () => {
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const toggleCard = (index) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const servicos = [
    {
      icone: <FaLaptopCode className="servico-icon" />,
      titulo: 'Criação de Sites',
      subtitulo: 'Sites profissionais e personalizados',
      descricao: (
        <>
          <p className="mb-4">
            Desenvolvimento de sites completos, responsivos e otimizados para motores de busca.
          </p>
          <ul className="space-y-2 mb-4">
            <li>• Design moderno e responsivo</li>
            <li>• Otimização para SEO</li>
            <li>• Integração com redes sociais</li>
            <li>• Formulários de contato</li>
          </ul>
        </>
      ),
    },
    {
      icone: <FaGlobe className="servico-icon" />,
      titulo: 'Landing Pages',
      subtitulo: 'Conversão máxima de visitantes',
      descricao: (
        <>
          <p className="mb-4">
            Landing pages otimizadas para conversão, criadas para destacar seus produtos ou serviços.
          </p>
          <ul className="space-y-2 mb-4">
            <li>• Design focado em conversão</li>
            <li>• Integração com ferramentas de marketing</li>
            <li>• Testes A/B</li>
            <li>• Análise de métricas</li>
          </ul>
        </>
      ),
    },
    {
      icone: <FaServer className="servico-icon" />,
      titulo: 'Hospedagem e Manutenção',
      subtitulo: 'Seu site sempre no ar e seguro',
      descricao: (
        <>
          <p className="mb-4">
            Serviços completos de hospedagem e manutenção para garantir que seu site funcione perfeitamente.
          </p>
          <ul className="space-y-2 mb-4">
            <li>• Hospedagem de alta performance</li>
            <li>• Atualizações regulares</li>
            <li>• Backup diário</li>
            <li>• Suporte técnico</li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className={`servicos-container ${isVisible ? 'visible' : ''}`}
      id="servicos"
    >
      <h2 className="text-3xl font-bold text-center mb-12 text-white">Nossos Serviços</h2>
      <div className="servicos-grid">
        {servicos.map((servico, index) => (
          <div 
            key={index} 
            className={`servico-card ${activeCard === index ? 'active' : ''}`}
            onClick={() => toggleCard(index)}
          >
            <div className="card-front">
              <div className="servico-icon-wrapper">
                {servico.icone}
              </div>
              <h3 className="text-xl font-semibold mb-2">{servico.titulo}</h3>
              <p className="text-sm opacity-80 mb-4">{servico.subtitulo}</p>
              <button className="saiba-mais-btn">
                Saiba mais <FaChevronRight className="inline ml-1" />
              </button>
              <div className="card-glow"></div>
            </div>
            <div className="card-back">
              <button 
                className="back-button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCard(index);
                }}
              >
                <FaChevronLeft className="inline mr-1" /> Voltar
              </button>
              <div className="servico-content">
                <h3 className="text-xl font-semibold mb-4">{servico.titulo}</h3>
                <div className="servico-descricao">
                  {servico.descricao}
                </div>
                <button className="cta-button mt-4">Solicitar Orçamento</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicos;
