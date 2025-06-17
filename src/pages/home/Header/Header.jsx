import React, { useState, useEffect, useRef } from "react";
import LogoKK from '../../../assets/imgs/logoKK.png';
import { FaBars, FaTimes } from "react-icons/fa";
import './Header.css';

function Header() {
  const [activeSection, setActiveSection] = useState("Hero");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Efeito para adicionar classe quando o scroll for maior que 50px
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = lastScrollY > 50;
          if (isScrolled !== scrolled) {
            setScrolled(isScrolled);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Adiciona o listener de scroll com debounce
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(handleScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [scrolled]);

  // Fechar o menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && 
          menuRef.current && 
          !menuRef.current.contains(event.target) && 
          menuButtonRef.current && 
          !menuButtonRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [menuOpen]);

  // Fechar menu ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
        if (menuButtonRef.current) {
          menuButtonRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [menuOpen]);

  // Função para rolagem suave personalizada
  const smoothScrollTo = (targetPosition, duration = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // Função de animação
    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = easeInOutQuad(
        timeElapsed,
        startPosition,
        distance,
        duration
      );
      window.scrollTo(0, run);
      if (timeElapsed < duration) window.requestAnimationFrame(animation);
    };

    // Função de easing para suavizar a animação
    const easeInOutQuad = (t, b, c, d) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    window.requestAnimationFrame(animation);
  };

  // Função para lidar com o clique nos links de navegação
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Atualiza imediatamente a seção ativa
      setActiveSection(sectionId);
      
      // Calcula a posição de rolagem com um fallback para 0
      const headerOffset = window.innerWidth < 900 ? 70 : 90; // Ajuste para mobile
      const elementPosition = targetSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      const targetPosition = Math.max(offsetPosition, 0);

      // Adiciona classe de transição ao body para melhor desempenho
      document.body.style.scrollBehavior = 'auto';
      
      // Usa a rolagem suave personalizada
      smoothScrollTo(targetPosition);

      // Atualiza a URL sem recarregar a página
      if (window.history.pushState) {
        const newUrl = `${window.location.pathname}#${sectionId}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
      
      // Adiciona um pequeno atraso para garantir que a rolagem comece antes de fechar o menu
      setTimeout(() => {
        // Fechar o menu mobile após clicar em um link
        setMenuOpen(false);
      }, 100);
    } else {
      console.warn(`Section with id "${sectionId}" not found.`);
      // Fechar o menu mobile mesmo se a seção não for encontrada
      setMenuOpen(false);
    }
  };

  // Função para alternar o estado do menu mobile
  const toggleMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const newState = !menuOpen;
    console.log('Alternando menu para:', newState);
    
    // Forçar nova renderização garantindo que o estado mude
    setMenuOpen(prevState => {
      const nextState = !prevState;
      console.log('Estado anterior:', prevState, 'Próximo estado:', nextState);
      
      // Atualizar o overflow do body
      document.body.style.overflow = nextState ? 'hidden' : 'auto';
      
      // Se estiver abrindo, focar no primeiro item
      if (nextState) {
        setTimeout(() => {
          const firstMenuItem = document.querySelector('.mobile-menu a');
          console.log('Primeiro item do menu:', firstMenuItem);
          if (firstMenuItem) firstMenuItem.focus();
        }, 100);
      }
      
      return nextState;
    });
  };
  
  // Fecha o menu ao clicar no overlay
  const closeMenu = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Fechando menu pelo overlay');
    setMenuOpen(false);
    document.body.style.overflow = 'auto';
  };
  
  // Efeito para gerenciar o estado do menu
  useEffect(() => {
    console.log('Estado do menu alterado para:', menuOpen);
    
    // Adiciona/remove a classe no body quando o menu é aberto/fechado
    if (menuOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    
    // Função de limpeza
    return () => {
      document.body.classList.remove('menu-open');
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);
  
  // Efeito para limpar o estilo de overflow quando o componente for desmontado
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Função para destacar o link ativo durante a rolagem
  useEffect(() => {
    let ticking = false;
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = 100; // Altura do header para cálculo de offset
    
    const highlightActiveLink = () => {
      const scrollPosition = window.scrollY + (headerHeight / 2); // Ajuste fino na posição
      
      // Se estiver no topo da página, define como Hero
      if (scrollPosition < 100) {
        setActiveSection('Hero');
        return;
      }
      
      // Verifica cada seção para ver qual está ativa
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop - headerHeight;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        // Verifica se a posição de rolagem está dentro dos limites da seção
        if (scrollPosition >= sectionTop && (scrollPosition < sectionTop + sectionHeight)) {
          if (sectionId !== activeSection) {
            setActiveSection(sectionId);
          }
          break; // Sai do loop quando encontrar a seção ativa
        }
      }
    };
    
    // Verificação inicial
    highlightActiveLink();

    // Função para otimizar o evento de scroll
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          highlightActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Adiciona o evento de rolagem
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Verificação inicial
    highlightActiveLink();
    
    // Limpa o evento quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Removida a dependência de activeSection para evitar loops desnecessários

  return (
    <header className={`Header ${scrolled ? 'scrolled' : ''}`} ref={headerRef}>
      <div className="Header-container">
        {/* Logo */}
        <div className="Logo">
          <a 
            href="#Hero" 
            onClick={(e) => handleNavClick(e, "Hero")}
            aria-label="Kayky Rugani - Voltar ao topo"
          >
            <img 
              src={LogoKK} 
              alt="Kayky Rugani - Desenvolvedor Full Stack" 
              width="160"
              height="50"
              loading="eager"
            />
          </a>
        </div>

        {/* Ícone do menu mobile */}
        <button 
          ref={menuButtonRef}
          className={`mobile-menu-icon ${menuOpen ? 'open' : ''}`} 
          onClick={(e) => {
            console.log('Botão de menu clicado');
            toggleMenu(e);
          }}
          aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-haspopup="true"
        >
          <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          {menuOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>

        {/* Navbar para desktop */}
        <nav className="Navbar">
          <a
            href="#Hero"
            onClick={(e) => handleNavClick(e, "Hero")}
            className={activeSection === "Hero" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#Sobre"
            onClick={(e) => handleNavClick(e, "Sobre")}
            className={activeSection === "Sobre" ? "active" : ""}
          >
            Sobre mim
          </a>
          <a
            href="#Servicos"
            onClick={(e) => handleNavClick(e, "Servicos")}
            className={activeSection === "Servicos" ? "active" : ""}
          >
            Serviços
          </a>
          <a
            href="#Projetos"
            onClick={(e) => handleNavClick(e, "Projetos")}
            className={activeSection === "Projetos" ? "active" : ""}
          >
            Projetos
          </a>
          <a
            href="#Contato"
            onClick={(e) => handleNavClick(e, "Contato")}
            className={activeSection === "Contato" ? "active" : ""}
          >
            Contato
          </a>
        </nav>
      </div>

      {/* Overlay e Menu Mobile */}
      <div 
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden={!menuOpen}
      />
          
      <div className={`mobile-menu-wrapper ${menuOpen ? 'open' : ''}`}>
        <nav 
          id="mobile-menu"
          className="mobile-menu"
          aria-hidden={!menuOpen}
          ref={menuRef}
          role="navigation"
          aria-label="Menu principal"
        >
          <h2 className="sr-only">Navegação Principal</h2>
          <a
            href="#Hero"
            onClick={(e) => handleNavClick(e, "Hero")}
            className={activeSection === "Hero" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#Sobre"
            onClick={(e) => handleNavClick(e, "Sobre")}
            className={activeSection === "Sobre" ? "active" : ""}
          >
            Sobre mim
          </a>
          <a
            href="#Projetos"
            onClick={(e) => handleNavClick(e, "Projetos")}
            className={activeSection === "Projetos" ? "active" : ""}
          >
            Projetos
          </a>
          <a
            href="#Servicos"
            onClick={(e) => handleNavClick(e, "Servicos")}
            className={activeSection === "Servicos" ? "active" : ""}
          >
            Serviços
          </a>
          <a
            href="#Contato"
            onClick={(e) => handleNavClick(e, "Contato")}
            className={activeSection === "Contato" ? "active" : ""}
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
