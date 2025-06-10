import React, { useRef, useEffect } from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import "./ProjetoCard.css";

// Componente de card de projeto que recebe várias props
// O parâmetro tecnologias tem um valor padrão de array vazio para evitar erros
function ProjetoCard({ titulo, descricao, imagem, githubLink, demoLink, tecnologias = [] }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element.
    const y = e.clientY - rect.top;  // y position within the element.

    // Calculate rotation based on mouse position relative to the center of the card
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10; // Max tilt 10deg
    const rotateY = ((x - centerX) / centerX) * -10; // Max tilt -10deg

    cardRef.current.style.setProperty('--x', `${x}px`);
    cardRef.current.style.setProperty('--y', `${y}px`);
    cardRef.current.style.setProperty('--rotateX', `${rotateX}deg`);
    cardRef.current.style.setProperty('--rotateY', `${rotateY}deg`);

    cardRef.current.classList.add('is-hovered');
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.classList.remove('is-hovered');
    // Reset rotation values to smooth transition back
    cardRef.current.style.setProperty('--rotateX', '0deg');
    cardRef.current.style.setProperty('--rotateY', '0deg');
  };

  return (
    // Container principal do card
    <div
      className="projeto-card"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Container da imagem com efeito de máscara */}
      <div className="projeto-imagem-container">
        <img src={imagem} alt={titulo} className="projeto-imagem" />
      </div>
      
      {/* Container para o conteúdo textual do card */}
      <div className="projeto-texto">
        {/* Título do projeto */}
        <h2>{titulo}</h2>
        
        {/* Descrição do projeto */}
        <p>{descricao}</p>
        
        {/* 
          Seção de tecnologias - só é renderizada se o array de tecnologias não estiver vazio
          Usa o operador && para renderização condicional
        */}
        {tecnologias.length > 0 && (
          <div className="projeto-tecnologias">
            <h4>Tecnologias:</h4>
            <ul>
              {/* Mapeia o array de tecnologias para criar itens de lista */}
              {tecnologias.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          </div>
        )}
        
        {/* Container para os links do projeto */}
        <div className="projeto-links">
          {/* 
            Link para o GitHub - só é renderizado se githubLink existir */}
          {githubLink && (
            <a href={githubLink} target="_blank" rel="noopener noreferrer" className="projeto-link">
              <FaGithub /> Código
            </a>
          )}
          
          {/* Link para a demo - só é renderizado se demoLink existir */}
          {demoLink && (
            <a href={demoLink} target="_blank" rel="noopener noreferrer" className="projeto-link">
              <FaExternalLinkAlt /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjetoCard;
