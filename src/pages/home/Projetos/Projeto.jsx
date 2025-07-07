import React from 'react';
import ProjetoCard from '../ProjetoCard/Projeto.card'; 
import ScrollReveal from '../../../components/ScrollReveal/ScrollReveal';
import ConstellationCanvas from '../../../components/ConstellationCanvas/ConstellationCanvas.jsx';
import RefrisImg from '../../../assets/imgs/TesteRefri.png';
import TestePortifolioImg from '../../../assets/imgs/TestePortifolio.png';
import Onlywave from '../../../assets/imgs/OnlyWave.png';
import AIC from '../../../assets/imgs/AIC.png';
import UCan from '../../../assets/imgs/U-Can.png';
import TopLocacoes from '../../../assets/imgs/Toplocacoes.png';
import './Projeto.css';

// Array de dados dos projetos - facilita a manutenção e adição de novos projetos
// Cada objeto representa um projeto com suas informações específicas
const projetosData = [

  {
    id: 1,
    titulo: "AIC",
    descricao: "Um site para uma agenica de propriedade intelectual, contando sobre a empresa e seus serviços.",
    imagem: AIC,
    githubLink: "https://github.com/kaykyrugani/AIC",
    demoLink: "https://www.agenciadeinteligencia.com.br",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "React", "Figma"],
  },
  {
    id: 2,
    descricao: "Um site para uma empresa de alguel de andaimes.",
    titulo: "Top locações",
    imagem: TopLocacoes,
    githubLink: "https://github.com/kaykyrugani/LocacoesTop",
    demoLink: "https://locacoestop.com.br",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "React", "Figma"] 
  },
  {
    id: 3,
    titulo: "U Can (Em desenvolvimento)",
    descricao: "Um site para um agencia de marketing, com chat robo, para captar leads, ainda em desenvolvimento.",
    imagem: UCan,
    githubLink: "https://github.com/kaykyrugani/ucan",
    demoLink: "https://ucan-eosin.vercel.app",
    tecnologias: ["HTML5", "CSS3", "JavaScript", "React", "Figma", "Firebase"] 
  },
  {
    id: 4,
    titulo: "Dev Refri",
    descricao: "O Dev Refri é um site interativo desenvolvido para apresentar diferentes sabores de refrigerantes de forma visualmente atraente.",
    imagem: RefrisImg, // Caminho para a imagem do projeto
    githubLink: "https://github.com/kaykyrugani/refris.test", 
    demoLink: "https://devkaykyrefris.netlify.app", 
    tecnologias: ["HTML5", "CSS3", "JavaScript",] 
  },
  {
    id: 5,
    titulo: "Teste Portifólio",
    descricao: "Este portfólio foi desenvolvido como um projeto didático para aprimorar habilidades em desenvolvimento web, explorando animações e manipulação de fuso horário",
    imagem: TestePortifolioImg , 
    githubLink: "https://github.com/kaykyrugani/testePortifolio",
    demoLink: "https://testeportifoliokayky.netlify.app",
    tecnologias: ["HTML5", "CSS3", "JavaScript" ,"AOS (Animate On Scroll) "]
  },
  {
    id: 6,
    titulo: "OnlyWave (Em desenvolvimento)",
    descricao: "O OnlyWave é um projeto em desenvolvimento que visa criar uma plataforma de marcketplace para a venda de produtos de moda.",
    imagem: Onlywave,
    githubLink: "https://github.com/kaykyrugani/onlywavestore",
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
