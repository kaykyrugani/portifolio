import React, { useState, useEffect } from 'react';
import './TechCard.css';

const TechCard = ({ icon: Icon, name, description, color, onMouseEnter, onMouseLeave }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`tech-card ${isVisible ? 'visible' : ''}`}
      onMouseEnter={e => { setIsHovered(true); if (onMouseEnter) onMouseEnter(e); }}
      onMouseLeave={e => { setIsHovered(false); if (onMouseLeave) onMouseLeave(e); }}
      style={{ '--tech-color': color }}
    >
      <div className="tech-icon">
        <Icon className="icon" />
      </div>
      <div className="tech-content">
        <h4 className="tech-name">{name}</h4>
        <p className="tech-description">{description}</p>
      </div>
      <div className={`tech-glow ${isHovered ? 'active' : ''}`} />
    </div>
  );
};

export default TechCard;
