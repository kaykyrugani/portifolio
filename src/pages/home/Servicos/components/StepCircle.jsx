import React from 'react';
import styles from '../Servicos.module.css';

const StepCircle = ({ 
  step, 
  isActive, 
  onClick,
  index,
  totalSteps
}) => {
  return (
    <div 
      className={`${styles.stepCircle} ${isActive ? styles.active : ''}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`Passo ${step.id}: ${step.title}`}
      data-index={index}
      data-total={totalSteps}
    >
      <div className={styles.stepCircleInner}>
        <span className={styles.stepIcon}>{step.icon}</span>
        <span className={styles.stepNumber}>0{step.id}</span>
      </div>
      <div className={styles.stepTooltip}>
        <h4>{step.title}</h4>
        <p>{step.description}</p>
      </div>
      
      {isActive && (
        <div className={styles.stepPulse} aria-hidden="true"></div>
      )}
    </div>
  );
};

export default StepCircle;
