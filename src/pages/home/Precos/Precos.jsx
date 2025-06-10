import React from 'react';
import './Precos.css';
import RocketImg from '../../../assets/imgs/Rocket.png';

const Precos = () => {
  const planos = [
    {
      nome: '1 Mês',
      precoMensal: 'R$ 95',
      precoAvista: 'R$ 95',
      periodo: 'por mês',
      destaque: false,
      beneficios: [
        'Hospedagem segura e rápida',
        'Suporte 24/7',
        'Backup diário',
        'SSL grátis',
        'E-mail profissional'
      ]
    },
    {
      nome: '3 Meses',
      precoMensal: 'R$ 85',
      precoAvista: 'R$ 215',
      periodo: 'por mês',
      destaque: true,
      economia: 'Economize R$ 40',
      beneficios: [
        'Tudo do Plano Mensal',
        'Domínio grátis*',
        'Otimização SEO básica',
        'Atualizações mensais',
        'Relatório de desempenho'
      ]
    },
    {
      nome: '6 Meses',
      precoMensal: 'R$ 75',
      precoAvista: 'R$ 390',
      periodo: 'por mês',
      destaque: false,
      economia: 'Economize R$ 120',
      beneficios: [
        'Tudo do Plano Trimestral',
        'Otimização SEO avançada',
        'Relatórios mensais detalhados',
        'Prioridade no suporte',
        'Desconto em serviços adicionais'
      ]
    }
  ];

  return (
    <section id="precos" className="precossection">
      {/* Neon Green Dashed Line */}
      <svg className="neon-line" width="100%" height="100%" viewBox="0 0 1440 800" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M-100 700 C 200 650, 300 500, 600 400 C 900 300, 1100 250, 1440 150" 
          stroke="#00ff9d" 
          strokeWidth="2" 
          strokeDasharray="10, 6" 
          strokeLinecap="round"
          fill="none"
          className="neon-path"
        />
      </svg>
      <div className="rocket-container">
        <img 
          src={RocketImg} 
          alt="Foguete" 
          className="rocket-img" 
        />
      </div>
      <div className="container">
        <h2 className="sectiontitle">Planos de Hospedagem</h2>
        <p className="sectionsubtitle">Preços especiais para manutenção e hospedagem do seu site</p>
        
        <div className="precogrid">
          {planos.map((plano, index) => (
            <div 
              key={index} 
              className={`planocard ${plano.destaque ? 'destaque' : ''}`}
            >
              {plano.destaque && <div className="destaquebadge">Mais Popular</div>}
              <h3>{plano.nome}</h3>
              <div className="preco">
                <span className="valor">{plano.precoMensal}</span>
                <span className="periodo">{plano.periodo}</span>
                {plano.precoAvista && (
                  <div className="avista-container">
                    <span className="ou">ou</span>
                    <span className="avista">
                      {plano.precoAvista} <span className="avista-label">à vista</span>
                    </span>
                  </div>
                )}
              </div>
              {plano.economia && (
                <div className="economia">
                  <span>{plano.economia}</span>
                </div>
              )}
              <ul className="beneficios">
                {plano.beneficios.map((beneficio, i) => (
                  <li key={i}>{beneficio}</li>
                ))}
              </ul>
              <button className="btncontato">
                Contratar Agora
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Precos;
