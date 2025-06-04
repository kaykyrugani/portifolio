import React, { useState, useEffect, useRef } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaWhatsapp } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import CurriculoPDF from '../../../assets/pdf/Curriculo.pdf';
import './Contato.css';

const ContactCard = ({ icon: Icon, title, subtitle, link, onClick, isEmail = false, isActive = false, isVisible = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div 
      className={`contact-card ${isVisible ? 'visible' : ''} ${isActive ? 'active' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="contact-icon">
        <Icon className="icon" />
      </div>
      <div className="contact-content">
        <h4 className="contact-title">{title}</h4>
        <p className="contact-subtitle">{subtitle}</p>
      </div>
      <div className={`contact-glow ${isHovered ? 'active' : ''}`} />
    </div>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="contact-button">
        {content}
      </button>
    );
  }

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="contact-link">
      {content}
    </a>
  );
};

function Contato() {
  const [copySuccess, setCopySuccess] = useState(false);
  const email = "kayky.rugani@gmail.com";
  const whatsappNumber = "+5511970000000"; // Substitua pelo seu número
  const whatsappMessage = "Olá Kayky, vim pelo seu portfólio!";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const [visibleCards, setVisibleCards] = useState(0);
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Intersection Observer para animar ao scroll
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;
    if (visibleCards < 5) { // 5 cards
      const timer = setTimeout(() => {
        setVisibleCards(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [visibleCards, sectionVisible]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
      })
      .catch(err => {
        console.error('Erro ao copiar texto: ', err);
      });
  };

  return (
    <section id="contato" className="contact-section" ref={sectionRef}>
      <div className="section-header">
        <h2 className="section-title">Vamos Conversar</h2>
        <p className="section-subtitle">Entre em contato para projetos ou apenas para dizer olá!</p>
      </div>
      <div className="contact-grid">
        <ContactCard
          icon={FaGithub}
          title="GitHub"
          subtitle="Veja meus projetos"
          link="https://github.com/kaykyrugani"
          isVisible={visibleCards > 0}
        />
        <ContactCard
          icon={FaLinkedin}
          title="LinkedIn"
          subtitle="Conecte-se comigo"
          link="https://linkedin.com/in/kaykyrugani"
          isVisible={visibleCards > 1}
        />
        <ContactCard
          icon={SiGmail}
          title="Email"
          subtitle={email}
          onClick={copyToClipboard}
          isEmail={true}
          isActive={copySuccess}
          isVisible={visibleCards > 2}
        />
        <ContactCard
          icon={FaWhatsapp}
          title="WhatsApp"
          subtitle="Mensagem direta"
          link={whatsappUrl}
          isVisible={visibleCards > 3}
        />
        <ContactCard
          icon={FaFileAlt}
          title="Currículo"
          subtitle="Baixar em PDF"
          link={CurriculoPDF}
          download="Kayky_Curriculo.pdf"
          isVisible={visibleCards > 4}
        />
      </div>
      {copySuccess && (
        <div className="copy-notification">
          <span>Email copiado para a área de transferência!</span>
        </div>
      )}
    </section>
  );
}

export default Contato;
