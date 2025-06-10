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

      window.scrollTo({
        top: Math.max(offsetPosition, 0), // Garante que a posição não seja negativa
        behavior: 'smooth'
      });

      // Atualiza a URL sem recarregar a página
      if (window.history.pushState) {
        const newUrl = `${window.location.pathname}#${sectionId}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
      }
    } else {
      console.warn(`Section with id "${sectionId}" not found.`);
    }

    // Fechar o menu mobile após clicar em um link
    setMenuOpen(false);
  };

  // Função para alternar o estado do menu mobile
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    // Desabilita o scroll da página quando o menu está aberto
    if (newMenuState) {
      document.body.style.overflow = 'hidden';
      // Foca no primeiro item do menu quando aberto
      setTimeout(() => {
        const firstMenuItem = document.querySelector('.mobile-menu a');
        if (firstMenuItem) firstMenuItem.focus();
      }, 100);
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  };

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
          onClick={toggleMenu}
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

      {/* Menu mobile - Fora do container principal */}
      <div className="mobile-menu-wrapper">
        <nav 
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? 'open' : ''}`} 
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
            href="#About"
            onClick={(e) => handleNavClick(e, "About")}
            className={activeSection === "About" ? "active" : ""}
          >
            Sobre mim
          </a>
          <a
            href="#Projects"
            onClick={(e) => handleNavClick(e, "Projects")}
            className={activeSection === "Projects" ? "active" : ""}
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
            href="#Contact"
            onClick={(e) => handleNavClick(e, "Contact")}
            className={activeSection === "Contact" ? "active" : ""}
          >
            Contato
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
