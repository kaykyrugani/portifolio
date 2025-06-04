import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaFileAlt, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './Hero.css';


const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section id="Hero" className={`hero ${isVisible ? 'visible' : ''}`}>
        <div className="hero-container">
          <div className="hero-content">
            <motion.div 
              className="hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="greeting">
                <motion.span 
                  className="greeting-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Olá, eu sou
                </motion.span>
                <motion.h1 
                  className="hero-title"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="highlight">Kayky Rugani</span>
                </motion.h1>
              </div>
              
              <motion.div 
                className="typewriter"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <span className="typing-text">Desenvolvedor Full Stack</span>
                <span className="cursor">|</span>
              </motion.div>
              
              <motion.p 
                className="hero-description"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                Transformo ideias em realidade digital através de código limpo e experiências incríveis.
                Atualmente cursando <span className="highlight-text">Sistemas de Informação</span> na <span className="highlight-text">Universidade de Franca</span>.
              </motion.p>
              
              <motion.div 
                className="hero-cta"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <motion.a 
                  href="#contato" 
                  className="cta-button primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <span>Vamos conversar</span>
                  <motion.span 
                    className="arrow"
                    animate={{ x: isHovered ? 8 : 4 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                  >
                    →
                  </motion.span>
                </motion.a>
                
                <motion.a 
                  href="#projetos" 
                  className="cta-button secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaCode className="button-icon" />
                  <span>Ver Projetos</span>
                </motion.a>
                
                <motion.a 
                  href="/curriculo.pdf" 
                  className="cta-button secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FaFileAlt className="button-icon" />
                  <span>Currículo</span>
                </motion.a>
              </motion.div>
              
              <motion.div 
                className="social-links"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
              >
                <motion.a 
                  href="https://github.com/seu-usuario" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -3, color: '#6e5494' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <FaGithub />
                </motion.a>
                <motion.a 
                  href="https://linkedin.com/in/seu-perfil" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                  whileHover={{ y: -3, color: '#0077b5' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <FaLinkedin />
                </motion.a>
              </motion.div>
            </motion.div>
          </div>
        </div>
        

      </section>
    </>
  );
};

export default Hero;
