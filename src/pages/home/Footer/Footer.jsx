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
    <footer className="footer" role="contentinfo" aria-label="Rodapé">
      <div className="footer-content">
        <div className="footer-section about" aria-labelledby="about-heading">
          <div className="logo">
            <FaCode className="logo-icon" aria-hidden="true" />
            <h3 id="about-heading">Kayky Rugani</h3>
          </div>
          <p className="tagline">Desenvolvedor Full Stack</p>
          <p className="description">Transformando ideias em realidade através de códigos criativos e soluções inovadoras.</p>
          <div className="footer-social" aria-label="Redes sociais">
            <a 
              href="https://github.com/kaykyrugani" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="GitHub (abre em nova aba)"
            >
              <FaGithub className="social-icon" aria-hidden="true" />
            </a>
            <a 
              href="https://www.linkedin.com/in/kaykyrugani/?originalSubdomain=br" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="LinkedIn (abre em nova aba)"
            >
              <FaLinkedin className="social-icon" aria-hidden="true" />
            </a>
            <a 
              href="https://instagram.com/seu-perfil" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              aria-label="Instagram (abre em nova aba)"
            >
              <FaInstagram className="social-icon" aria-hidden="true" />
            </a>
            <a 
              href="mailto:Kaykyrugani@gmail.com" 
              className="social-link"
              aria-label="Enviar e-mail"
            >
              <SiGmail className="social-icon" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="footer-section contact" aria-labelledby="contact-heading">
          <h3 id="contact-heading">Contato</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaEnvelope className="contact-icon" aria-hidden="true" />
              <a href="mailto:Kaykyrugani@gmail.com" className="contact-link">Kaykyrugani@gmail.com</a>
            </div>
            <div className="contact-item">
              <FaPhone className="contact-icon" aria-hidden="true" />
              <a href="tel:+5516988278840" className="contact-link">+55 16 98827-8840</a>
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
