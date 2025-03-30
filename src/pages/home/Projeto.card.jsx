import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

// Componente de card de projeto que recebe várias props
// O parâmetro tecnologias tem um valor padrão de array vazio para evitar erros
function ProjetoCard({ titulo, descricao, imagem, githubLink, demoLink, tecnologias = [] }) {
  return (
    // Container principal do card
    <div className="projeto-card">
      {/* Imagem do projeto com texto alternativo para acessibilidade */}
      <img src={imagem} alt={titulo} className="projeto-imagem" />
      
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
              <FaExternalLinkAlt />  Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjetoCard;
