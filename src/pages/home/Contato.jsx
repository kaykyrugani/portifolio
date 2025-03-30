import React, { useState } from 'react'
import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt } from 'react-icons/fa';

function Contato() {
    const [copySuccess, setCopySuccess] = useState(false);
    const email = "kayky.rugani@gmail.com"; // Substitua pelo seu email real
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(email)
            .then(() => {
                setCopySuccess(true);
                // Reset do estado após 2 segundos
                setTimeout(() => setCopySuccess(false), 2000);
            })
            .catch(err => {
                console.error('Erro ao copiar texto: ', err);
            });
    };

    return (
        <section id="Contato" className="Contato">
            <h3>Contato</h3>
            <ul className="Icons-Contato">
                <li className="contato-item">
                    <a href="https://github.com/kaykyrugani" target="_blank" rel="noopener noreferrer">
                        <FaGithub />
                        <span className="contato-text">Ir para GitHub</span>
                    </a>
                </li>
                <li className="contato-item">
                    <a href="https://linkedin.com/in/kaykyrugani" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin />
                        <span className="contato-text">Ir para LinkedIn</span>
                    </a>
                </li>
                <li className="contato-item">
                    <button 
                        onClick={copyToClipboard} 
                        className="email-copy-button"
                        aria-label="Copiar email para área de transferência"
                    >
                        <FaEnvelope />
                        <span className="contato-text">Copiar Email</span>
                        {copySuccess && <span className="tooltip">Email copiado!</span>}
                    </button>
                </li>
                <li className="contato-item">
                    <a 
                        href="/seu-curriculo.pdf" 
                        download="Seu_Nome_Curriculo.pdf"
                        className="cv-download-link"
                        aria-label="Baixar currículo"
                    >
                        <FaFileAlt />
                        <span className="contato-text">Baixar Currículo</span>
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Contato
