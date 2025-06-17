import React from 'react';
import './SobEu.css';
import kaykyImg from '../../../assets/imgs/kayky.webp';
import ScrollReveal from '../../../components/ScrollReveal/ScrollReveal';

const SobEu = ({ id }) => {
  return (
    <ScrollReveal threshold={0.15} delay={0}>
      <section id={id} className="sob-eu-section">
        <ScrollReveal delay={0.1}>
          <div className="sob-eu-img-wrapper">
            <img src={kaykyImg} alt="Kayky Rugani" className="sob-eu-img" />
            <div className="sob-eu-badge">Freelancer desde 2025</div>
          </div>
        </ScrollReveal>
        <div className="sob-eu-content">
          <ScrollReveal delay={0.2}>
            <h2>Sobre mim</h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}><p>
            Olá! Me chamo <span className="destaque"><span className="icon">👤</span>Kayky Rugani</span>, trabalho com <span className="destaque"><span className="icon">💻</span>criação de sites</span>, 
            <span className="destaque"><span className="icon">🚀</span>landing pages</span>, <span className="destaque"><span className="icon">☁️</span>hospedagem</span> e <span className="destaque"><span className="icon">🛠️</span>manutenção</span>.
          </p></ScrollReveal>
          <ScrollReveal delay={0.4}><p>
            Iniciei minha jornada no mercado em <span className="destaque"><span className="icon">📅</span>2025</span>, mas estudo na área desde <span className="destaque"><span className="icon">📚</span>2023</span>,
            quando entrei na faculdade.
          </p></ScrollReveal>
          <ScrollReveal delay={0.5}><p>
            Estou <span className="destaque"><span className="icon">✅</span>disponível para novos trabalhos</span> e pronto para entregar resultados
            <span className="destaque"><span className="icon">⭐</span>profissionais</span>, com atenção aos detalhes e foco total nas suas necessidades.
          </p></ScrollReveal>
          <ScrollReveal delay={0.6}><p>
            Se quiser <span className="destaque"><span className="icon">💡</span>tirar uma ideia do papel</span> ou <span className="destaque"><span className="icon">🌐</span>melhorar sua presença online</span>,
            será um prazer conversar!
          </p></ScrollReveal>
          <ScrollReveal delay={0.7}>
            <a 
              href="https://wa.me/5516988278840" 
              target="_blank"
              rel="noopener noreferrer"
              className="sob-eu-cta"
              style={{ textDecoration: 'none' }}
            >
              Vamos conversar
            </a>
          </ScrollReveal>
          <ScrollReveal delay={0.8}>
            <div className="sob-eu-signature">
              <div className="sob-eu-name">Kayky Rugani</div>
              <div className="sob-eu-role">Web Developer</div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </ScrollReveal>
  );
};

export default SobEu;
