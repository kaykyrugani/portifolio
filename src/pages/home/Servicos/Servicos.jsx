import React, { useEffect, useRef, useState } from 'react';
import { FaLaptopCode, FaServer } from 'react-icons/fa';
import './Servico.css';

const Servicos = () => {
  const servicosRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-servicos');
            observer.unobserve(entry.target);
          }
        });
      },
      { 
        threshold: 0.1, 
        rootMargin: '0px 0px -50px 0px' 
      }
    );

    if (servicosRef.current) {
      const items = servicosRef.current.querySelectorAll('.servicos-item');
      items.forEach(item => {
        observer.observe(item);
      });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Adiciona uma classe inicial para garantir que o container esteja visível
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const servicos = [
    {
      icone: <FaLaptopCode className="icon" />,
      titulo: 'Criação de Sites e Landing Pages',
      subtitulo: 'Transforme suas ideias em experiências digitais únicas',
      descricao: (
        <>
          <p>
            Você já teve uma ideia incrível, mas não sabia como colocá-la online de forma profissional e impactante? É aí que eu entro.
          </p>
          <p>
            <b>Sou Kayky Rugani</b>, freelancer especializado na criação de sites e landing pages pensadas para encantar seu público e entregar resultados. Mais do que apenas "colocar algo no ar", meu objetivo é criar experiências digitais que comuniquem sua essência com clareza, agilidade e design de qualidade.
          </p>
          <p>
            Um site bem construído é mais do que uma vitrine — ele é seu cartão de visita digital, disponível 24 horas por dia. E uma landing page bem planejada pode ser a chave para transformar visitantes em clientes.
          </p>
          <ul className="servico-bullets">
            <li>✔️ Você economiza tempo e evita dores de cabeça.</li>
            <li>✔️ Ganha um visual moderno e personalizado.</li>
            <li>✔️ Tem liberdade para focar no que realmente importa: seu negócio.</li>
          </ul>
          <p className="servico-italic">A criatividade? É o único limite!<br/>Cada projeto é único e feito sob medida, com foco total nos seus objetivos.</p>
        </>
      ),
    },
    {
      icone: <FaServer className="icon" />,
      titulo: 'Hospedagem e Manutenção',
      subtitulo: 'Seu site no ar com segurança, velocidade e tranquilidade',
      descricao: (
        <>
          <p>
            Criar um site incrível é só o começo. Manter ele funcionando perfeitamente, seguro e sempre atualizado exige atenção constante — e é por isso que ofereço serviços completos de hospedagem e manutenção.
          </p>
          <p>
            Meu nome é Kayky Rugani e, como freelancer, cuido pessoalmente da estabilidade do seu site, para que ele continue sendo seu melhor aliado online. Nada de páginas lentas, fora do ar ou com erros: comigo, seu site está sempre pronto para receber visitantes.
          </p>
          <ul className="servico-bullets">
            <li>🔧 Atualizações regulares e suporte rápido.</li>
            <li>🔒 Proteção contra falhas e ameaças digitais.</li>
            <li>🚀 Performance otimizada, com carregamento ágil.</li>
            <li>🧠 Mente tranquila para focar no seu crescimento.</li>
          </ul>
          <p className="servico-italic">Você pensou, eu crio. Você precisa de estabilidade, eu mantenho.<br/>Simples assim.</p>
        </>
      ),
    }
  ];

  return (
    <section id='Servicos' className={`Servicos ${isMounted ? 'mounted' : ''}`} ref={servicosRef}>
      <h3 className="servicos-item">Meus Serviços</h3>
      <div className='servico-container'>
        {servicos.map((servico, index) => (
          <div key={index} className="servico-card servicos-item servico-centralizado">
            <div className="servico-icone-centralizado">{servico.icone}</div>
            <h2 className="servico-titulo-centralizado">{servico.titulo}</h2>
            <h4 className="servico-subtitulo servico-subtitulo-centralizado">{servico.subtitulo}</h4>
            <div className="servico-descricao servico-descricao-centralizada">{servico.descricao}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Servicos;
