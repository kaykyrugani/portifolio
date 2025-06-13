import React, { useEffect, useRef } from 'react';
import styles from '../Servicos.module.css';

const StepContent = ({ content, isActive, onClose }) => {
  const contentRef = useRef(null);

  // Fechar ao clicar fora do conteúdo
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isActive, onClose]);

  if (!isActive) return null;

  return (
    <div 
      ref={contentRef}
      className={`${styles.stepContent} ${isActive ? styles.active : ''}`}
      aria-hidden={!isActive}
    >
      <button 
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Fechar detalhes"
      >
        &times;
      </button>
      
      <div className={styles.stepContentHeader}>
        <span className={styles.stepContentIcon}>{content.icon}</span>
        <h3 className={styles.stepContentTitle}>{content.title}</h3>
      </div>
      
      <div className={styles.stepContentBody}>
        <p>{content.description}</p>
        
        {content.details && (
          <ul className={styles.stepContentDetails}>
            {content.details.map((detail, index) => (
              <li key={index} className={styles.stepContentDetailItem}>
                <span className={styles.stepContentDetailIcon}>✓</span>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div className={styles.stepContentFooter}>
        <button className={styles.ctaButton}>
          Saiba mais sobre {content.title.toLowerCase()}
        </button>
      </div>
    </div>
  );
};

export default StepContent;
