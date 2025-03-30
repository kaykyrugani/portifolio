import React, { useState, useEffect } from 'react';
import Livros from '../../assets/imgs/Livros2.png';
import Vaso from '../../assets/imgs/Vaso.png';
import Caneca from '../../assets/imgs/Caneca.png';
import Computador from '../../assets/imgs/Computador.png';
import Lamp from './Lamp'; 
import { FaCode, FaCog, FaMoon, FaSun } from 'react-icons/fa'; // Ícones para o modo claro/escuro

function Hero() {
    // Começamos com darkMode true (modo escuro ativo)
    const [darkMode, setDarkMode] = useState(true);

    // Verificar se há uma preferência salva no localStorage ao carregar
    useEffect(() => {
        const savedMode = localStorage.getItem('darkMode');
        // Se não houver preferência salva, começamos com dark mode
        if (savedMode === null) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('darkMode', JSON.stringify(true));
        } else {
            const isDarkMode = JSON.parse(savedMode);
            setDarkMode(isDarkMode);
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
            } else {
                document.body.classList.remove('dark-mode');
            }
        }
    }, []);

    // Função para alternar entre os modos
const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
        // Ao mudar para o modo escuro, primeiro removemos a classe para resetar as animações
        document.body.classList.remove('dark-mode');
        
        // Usamos setTimeout com delay zero para forçar um reflow do DOM
        setTimeout(() => {
            document.body.classList.add('dark-mode');
        }, 0);
    } else {
        // Ao mudar para o modo claro, simplesmente removemos a classe
        document.body.classList.remove('dark-mode');
    }
    
    localStorage.setItem('darkMode', JSON.stringify(newMode));
};

    return (
        <section id="Hero" className="Hero">
            <div className='Container-hero'>
                <Lamp />
                <div className="hero-content-wrapper">
                    <div className="hero-left">
                        <div className="imagens-container">
                            {/* Prateleira corrigida */}
                            <div className="prateleira">
                                <div className="tampoPrateleira"></div>
                                <div className="sombraPrateleira"></div>
                            </div>
                            <div className='Vaso'>
                                <img src={Vaso} alt="Vaso" />
                            </div>
                            <div className='Livros'>
                                <img src={Livros} alt="Livros" />
                            </div>
                            <div className='Caneca'>
                                <img src={Caneca} alt="Caneca" />
                            </div>
                            
                            <div className='Computador'>
                                <img src={Computador} alt="Computador" />
                                
                                {/* Ícones flutuantes posicionados em relação ao computador */}
                                <div className="floating-icons">
                                    <div className="icon-code"><FaCode /></div>
                                    <div className="icon-gear"><FaCog /></div>
                                </div>
                            </div>
                           
                            {/* Mesa */}
                            <div className="mesa">
                                <div className="tampo"></div>
                                <div className="sombra"></div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="hero-right">
                        <div className='HeroTexto'>
                            <div className='texto-container'>
                                <h1><span>Olá!</span> sou Kayky Rugani</h1>
                                <div className="paragrafos-container">
                                    <p>Atualmente estou cursando Sistema de Informação <span>(SI)</span> na Universidade de Franca.</p>
                                    <p>Porém estudo mais por conta própria, focando em desenvolvimento <span>web</span></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Botão de alternar modo - mostra sol no modo escuro e lua no modo claro */}
                <button 
                    className="theme-toggle" 
                    onClick={toggleDarkMode}
                    aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>
        </section>
    )
}

export default Hero;
