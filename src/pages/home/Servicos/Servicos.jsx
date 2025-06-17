import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ServiceTabs from './components/ServiceTabs';
import StepMap from './components/StepMap';
import { servicesData } from './data/servicesData';
import styles from './Servicos.module.css';

const Servicos = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(null);
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

  const handleTabChange = (index) => {
    setActiveTab(index);
    setActiveStep(null); // Reseta o passo ativo ao trocar de aba
  };

  const handleStepClick = (index) => {
    setActiveStep(activeStep === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      className={`${styles.servicosContainer} ${isVisible ? styles.visible : ''}`}
      id="Servicos"
    >
      <div className={styles.servicosContent}>
        <motion.h2 
          className={styles.sectionTitle}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          Como Trabalhamos
        </motion.h2>
        
        <motion.div 
          className={styles.tabsWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <ServiceTabs 
            tabs={servicesData} 
            activeTab={activeTab} 
            onTabChange={handleTabChange} 
          />
        </motion.div>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.stepMapContainer}
          >
            <StepMap 
              steps={servicesData[activeTab].steps} 
              activeStep={activeStep}
              onStepClick={handleStepClick}
            />
          </motion.div>
        </AnimatePresence>
        
        <motion.div 
          className={styles.ctaContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className={styles.ctaText}>Pronto para transformar sua presença digital?</p>
          <a 
            href="https://wa.me/5516988278840" 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.ctaButton}
            style={{ textDecoration: 'none' }}
          >
            Solicitar Orçamento
            <span className={styles.ctaIcon}>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Servicos;
