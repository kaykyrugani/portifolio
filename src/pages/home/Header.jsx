import React, { useState, useEffect } from "react";
import LogoKK from '../../assets/imgs/LogoKK.png';
import { FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const [activeSection, setActiveSection] = useState("Hero");
  const [menuOpen, setMenuOpen] = useState(false);

  // Função para lidar com o clique nos links de navegação
  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      // Calcula a posição de rolagem com um fallback para 0
      const scrollToPosition = targetSection.offsetTop - 85;

      window.scrollTo({
        top: Math.max(scrollToPosition, 0), // Garante que a posição não seja negativa
        behavior: 'smooth'
      });
    } else {
      console.warn(`Section with id "${sectionId}" not found.`);
    }

    // Fechar o menu mobile após clicar em um link
    setMenuOpen(false);
  };

  // Função para alternar o estado do menu mobile
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para destacar o link ativo durante a rolagem
  useEffect(() => {
    const highlightActiveLink = () => {
      const sections = document.querySelectorAll('section[id]');
      let scrollPosition = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    // Adiciona o evento de rolagem
    window.addEventListener('scroll', highlightActiveLink);

    // Limpa o evento quando o componente é desmontado
    return () => {
      window.removeEventListener('scroll', highlightActiveLink);
    };
  }, []);

  return (
    <div>
      <div className="Header-container">
        <header className="Header">
          <div className="Logo">
            <img src={LogoKK} alt="Logo" />
          </div>

          {/* Ícone do menu mobile */}
          <div className="mobile-menu-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>

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
              href="#Servicos"
              onClick={(e) => handleNavClick(e, "Servicos")}
              className={activeSection === "Servicos" ? "active" : ""}
            >
              Servicos
            </a>
            <a
              href="#Skills"
              onClick={(e) => handleNavClick(e, "Skills")}
              className={activeSection === "Skills" ? "active" : ""}
            >
              Skills
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
        </header>

        {/* Menu mobile */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <a
            href="#Hero"
            onClick={(e) => handleNavClick(e, "Hero")}
            className={activeSection === "Hero" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#Servicos"
            onClick={(e) => handleNavClick(e, "Servicos")}
            className={activeSection === "Servicos" ? "active" : ""}
          >
            Servicos
          </a>
          <a
            href="#Skills"
            onClick={(e) => handleNavClick(e, "Skills")}
            className={activeSection === "Skills" ? "active" : ""}
          >
            Skills
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
        </div>
      </div>
    </div>
  );
}

export default Header;
