import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope, FaArrowUp, FaPhone, FaMapMarkerAlt, FaCode } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import './Footer.css';

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const updateScrollProgress = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / documentHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    window.addEventListener('scroll', updateScrollProgress);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      window.removeEventListener('scroll', updateScrollProgress);
    };
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <div className="logo">
            <FaCode className="logo-icon" />
            <h3>Kayky Rugani</h3>
          </div>
          <p className="tagline">Desenvolvedor Full Stack & Designer</p>
          <p className="description">Transformando ideias em realidade através de códigos criativos e soluções inovadoras.</p>
          <div className="footer-social">
            <a href="https://github.com/seu-usuario" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub className="social-icon" />
            </a>
            <a href="https://linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin className="social-icon" />
            </a>
            <a href="https://instagram.com/seu-perfil" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="social-icon" />
            </a>
            <a href="mailto:seu-email@exemplo.com" aria-label="Email">
              <SiGmail className="social-icon" />
            </a>
          </div>
        </div>

        <div className="footer-section contact">
          <h3>Contato</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>seu-email@exemplo.com</span>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" />
              <span>(00) 00000-0000</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Kayky Rugani. Todos os direitos reservados.</p>
      </div>

      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }}></div>
      
      <button 
        className={`scroll-to-top ${isVisible ? 'show' : ''}`} 
        onClick={scrollToTop}
        aria-label="Voltar ao topo"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
};

export default Footer;
