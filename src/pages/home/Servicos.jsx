import React, { useEffect, useRef } from 'react'

// Criando uma referência para acessar o elemento DOM da seção de serviços
function Servicos() {
  const servicosRef = useRef(null);

  useEffect(() => {
    // Configurando o Intersection Observer para detectar quando a seção entra no viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Quando a seção se torna visível na tela
          if (entry.isIntersecting) {
            // Adiciona a classe que ativa a animação
            entry.target.classList.add('animate-servicos');
            // Para de observar o elemento após a animação ser ativada
            // para que ela não seja repetida
            observer.unobserve(entry.target);
          }
        });
      },
      // Define o threshold (limiar) de 0.2, o que significa que a animação
      // será ativada quando pelo menos 20% da seção estiver visível
      { threshold: 0.2 }
    );

    // Inicia a observação do elemento quando o componente é montado
    if (servicosRef.current) {
      observer.observe(servicosRef.current);
    }

    // Função de limpeza para remover o observer quando o componente for desmontado
    return () => {
      if (servicosRef.current) {
        observer.unobserve(servicosRef.current);
      }
    };
  }, []); // Array de dependências vazio significa que este efeito roda apenas uma vez após a montagem

  return (
    <section id='Servicos' className="Servicos servicos-hidden" ref={servicosRef}>
        {/* Cada elemento com a classe 'servicos-item' será animado individualmente */}
        <h3 className="servicos-item">Quais serviços estou procurando ?</h3>
        <div className='servico-container'>
          {/* Cada card de serviço terá sua própria animação com delay diferente */}
          <div className="Freelancer servicos-item">
            <h2>Freelancer</h2>
            <p>Estou iniciando minha jornada no desenvolvimento web e buscando oportunidades para aplicar meus conhecimentos em criação de sites completos, desenvolvimento front-end e projetos freelancer. Posso desenvolver sites modernos e responsivos, transformar layouts em páginas interativas e melhorar a experiência do usuário com animações e efeitos visuais. <br />Além disso, estou aberto a projetos personalizados, seja para criar algo do zero ou otimizar um site existente. Se precisa de um desenvolvedor dedicado e comprometido, entre em contato e vamos construir algo incrível juntos </p> 
          </div>
          <div className="Estagio servicos-item">
            <h2>Estágio</h2>
            <p>Estou em busca de um estágio, pois minha faculdade exige essa experiência, mas também porque acredito que a melhor forma de aprender é na prática. Quero vivenciar o dia a dia do mercado de trabalho, enfrentar desafios reais e evoluir tanto profissionalmente quanto pessoalmente. <br />Estou ansioso para essa oportunidade, pois vejo o estágio como um passo essencial para me encontrar na carreira. Quero fazer parte de um time, aprender com profissionais experientes e contribuir da melhor forma possível.</p> 
          </div>
        </div>
      </section>
  )
}

export default Servicos
