import React from 'react';
import ProjetoCard from '../ProjetoCard/Projeto.card'; 
import ScrollReveal from '../../../components/ScrollReveal/ScrollReveal';
import ConstellationCanvas from '../../../components/ConstellationCanvas/ConstellationCanvas.jsx';
import RefrisImg from '../../../assets/imgs/TesteRefri.png';
import TestePortifolioImg from '../../../assets/imgs/TestePortifolio.png';
import Onlywave from '../../../assets/imgs/OnlyWave.png';
import './Projeto.css';

// Array de dados dos projetos - facilita a manutenção e adição de novos projetos
// Cada objeto representa um projeto com suas informações específicas
const projetosData = [
  {
    id: 1, // Identificador único para o React usar como key
    titulo: "Dev Refri",
    descricao: "O Dev Refri é um site interativo desenvolvido para apresentar diferentes sabores de refrigerantes de forma visualmente atraente. O projeto utiliza HTML, CSS e JavaScript para criar uma experiência dinâmica e intuitiva para o usuário.",
    imagem: RefrisImg, // Caminho para a imagem do projeto
    githubLink: "https://github.com/kaykyrugani/refris.test", // Link para o repositório no GitHub
    demoLink: "https://devkaykyrefris.netlify.app", // Link para a demonstração ao vivo
    tecnologias: ["HTML5", "CSS3", "JavaScript",] // Array com as tecnologias utilizadas
  },
  {
    id: 2,
    titulo: "Teste Portifólio",
    descricao: "Este portfólio foi desenvolvido como um projeto didático para aprimorar habilidades em desenvolvimento web, explorando animações, manipulação de fuso horário e interações dinâmicas. O site serve como uma vitrine das competências do desenvolvedor, destacando minha jornada e objetivos profissionais.",
    imagem: TestePortifolioImg , 
    githubLink: "https://github.com/kaykyrugani/testePortifolio",
    demoLink: "https://testeportifoliokayky.netlify.app",
    tecnologias: ["HTML5", "CSS3", "JavaScript" ,"AOS (Animate On Scroll) "]
  },
  {
    id: 3,
    titulo: "OnlyWave (Em progresso)",
    descricao: "O OnlyWave é um projeto em desenvolvimento que visa criar uma plataforma de marcketplace para a venda de produtos de moda. Sendo meu primeiro projeto fullstack.",
    imagem: Onlywave,
    githubLink: "https://github.com/kaykyrugani/onlywavestore",
    demoLink: "onlywavestore-ptk2.vercel.app",
    tecnologias: ["ViteReact", "Java Script", "TypeScript", "Node.js","PostgreSQL", "Prisma"],
  }
];

function Projetos() {
  return (
    <section id="Projetos" className="Projetos">
      <ConstellationCanvas />
      <ScrollReveal>
        <h3 className="projetos-titulo">Projetos</h3>
      </ScrollReveal>
      
      <ScrollReveal delay={0.3}>
        <div className="projetos-intro">
          <p>
            Aqui estão alguns dos meus projetos mais recentes. 
            Cada projeto representa uma oportunidade de aprendizado e aplicação de diferentes tecnologias.
            Clique nos links para ver o código fonte ou a demonstração ao vivo.
          </p>
        </div>
      </ScrollReveal>
      
      <div className="projetos-container">
        {projetosData.map((projeto) => (
          <ScrollReveal key={projeto.id}>
            <ProjetoCard
              titulo={projeto.titulo}
              descricao={projeto.descricao}
              imagem={projeto.imagem}
              githubLink={projeto.githubLink}
              demoLink={projeto.demoLink}
              tecnologias={projeto.tecnologias}
            />
          </ScrollReveal>
        ))}
      </div>
      
      <div className="ver-mais-container">
        <a 
          href="https://github.com/kaykyrugani?tab=repositories" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="ver-mais"
        >
          Ver Mais Projetos
        </a>
      </div>
    </section>
  );
}

export default Projetos; 
