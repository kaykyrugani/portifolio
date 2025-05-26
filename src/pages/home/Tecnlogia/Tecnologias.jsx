import React, { useState, useRef, useEffect } from 'react';
import { FaCss3Alt, FaHtml5, FaJs, FaReact, FaFigma, FaPython } from 'react-icons/fa';
import TechCard from '../../../components/TechCard';
import './Tecnologias.css';

const technologies = [
  {
    id: 'html',
    name: 'HTML5',
    icon: FaHtml5,
    color: '#E34F26',
    description: 'Conheci junto com o CSS, na faculdade, achei uma linguagem bacana de se trabalhar, já que ela é de marcação, e não achei tão complexo aprender e dar os primeiros passos nela.'
  },
  {
    id: 'css',
    name: 'CSS3',
    icon: FaCss3Alt,
    color: '#1572B6',
    description: 'Conheci na faculdade a um ano, desde então é a matéria que mais venho estudado e me aprofundado. Me despertando uma curiosidade de trabalhar com Front-End, com interação com o usuário, interfaces e responsividade.'
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: FaJs,
    color: '#F7DF1E',
    description: 'Também tive meu primeiro contato com essa linguagem na faculdade, há dois anos, onde venho trabalhando e aprendendo mais sobre ela a cada dia, não só para programação web.'
  },
  {
    id: 'react',
    name: 'React',
    icon: FaReact,
    color: '#61DAFB',
    description: 'A tecnologia que mais venho estudando recentemente, tentando trabalhar sempre com ela para aprender realmente. No começo achei um pouco difícil, porém me acostumei rápido, e agora acho que já estou progredindo com ela, porém ainda falta aprender muito.'
  },
  {
    id: 'figma',
    name: 'Figma',
    icon: FaFigma,
    color: '#F24E1E',
    description: 'Meus amigos de Design me apresentaram o Figma a um ano e meio, onde me fascinei pela facilidade de construir interfaces, layouts e protótipos, e a facilidade de compartilhar e trabalhar, senti facilidade por já ter familiaridade com Photoshop.'
  },
  {
    id: 'python',
    name: 'Python',
    icon: FaPython,
    color: '#3776AB',
    description: 'Foi a primeira linguagem que aprendi, um pouco antes de entrar na faculdade, porém ainda não trabalhei muito com ela. Vou me aprofundar mais com ela assim que possível.'
  }
];

function Tecnologias() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleCards, setVisibleCards] = useState(0);

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    }
  };

  useEffect(() => {
    // Anima os cards um por um
    const timer = setTimeout(() => {
      if (visibleCards < technologies.length) {
        setVisibleCards(prev => prev + 1);
      }
    }, 150);
    
    return () => clearTimeout(timer);
  }, [visibleCards, technologies.length]);

  return (
    <section 
      className="technologies-section" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        '--mouse-x': `${mousePosition.x}%`,
        '--mouse-y': `${mousePosition.y}%`
      }}
    >
      <div className="section-header">
        <h2 className="section-title">Tecnologias</h2>
        <p className="section-subtitle">Ferramentas e tecnologias que utilizo</p>
      </div>
      
      <div className="technologies-grid">
        {technologies.map((tech, index) => (
          <div 
            key={tech.id} 
            className={`tech-card-wrapper ${index < visibleCards ? 'visible' : ''}`}
            style={{
              '--delay': `${index * 0.1}s`,
              '--tech-color': tech.color
            }}
          >
            <TechCard 
              icon={tech.icon} 
              name={tech.name} 
              description={tech.description}
              color={tech.color}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Tecnologias;