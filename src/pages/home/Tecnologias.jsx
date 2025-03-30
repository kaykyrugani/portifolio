import React, { useState } from 'react'
import { FaCss3Alt, FaHtml5, FaJs, FaReact, FaFigma, FaPython } from 'react-icons/fa'

function Tecnologias() {
    // Estado para controlar qual tecnologia está selecionada
    const [selectedTech, setSelectedTech] = useState(null);

    // Dados de experiência para cada tecnologia
    const techExperience = {
        css: "Conheci na faculdade a um ano, deids de então é a materia que mais venho estudado e me aprofundado. Me dispetando uma curiosidade de trabalhar com Front-End, com interação com o usuário, interfaces e responsividade.",
        html: "Conheci junto com o CSS, na faculdade, achei uma linguagem bacana de se trabalhar, ja que ela é de marcação, e não achei tão complexo aprender e dar os primeiros passos nela.",
        js: "Tabém tive meu primeiro contato com essa linguagem na faculdade, so que a dois anos, onde venho trabalhando e aprendendo mais osbre ela a cada dia, não só para programação web.",
        react: "A tecnologia que mais venho estudando recentemente, tentando trabalhar sempre com ela para aprender realmente, no começo achei um pouco dificil, porém me acostumei rapido, e agora acho que ja estou progrendindo com ela, porém ainda falta aprender muito.",
        figma: "Meus amigos Desing me apresentaram o Figma a um ano e meio, onde me facinei pela facilidade de contruir interfaces layoutss e prototipos, e a facilidade de compartilhar e trabalhar, senti faciliade por ja ter familiaridade com photoshop.",
        phyton:"Foi a primeira linguagem que aprendi, um pouco antes de entrar na faculdade, porém ainda não trabalhei muito com ela, vou me aprofundar mais com ela, assim que possivel."
    };

    // Função para alternar a seleção da tecnologia
    const toggleTech = (tech) => {
        if (selectedTech === tech) {
            setSelectedTech(null);
        } else {
            setSelectedTech(tech);
        }
    };

    return (
        <section className="Tecnologias">
            <h3>Tecnologias </h3>
            <h5 className="mobile-instruction">Clique nos ícones para saber +</h5>
            <div className="Container-Tec">
                <div className="Nome-Tec">
                    <span>CSS</span>
                    <span>HTML</span>
                    <span>JS</span>
                    <span>React</span>
                    <span>Figma</span>
                    <span>Python</span>
                </div>
                <div className="Icon-Tec">
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'css' ? 'active' : ''}`}
                            onClick={() => toggleTech('css')}
                            aria-label="CSS"
                        >
                            <FaCss3Alt />
                        </button>
                        <span className="tech-name-mobile">CSS</span>
                    </div>
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'html' ? 'active' : ''}`}
                            onClick={() => toggleTech('html')}
                            aria-label="HTML"
                        >
                            <FaHtml5 />
                        </button>
                        <span className="tech-name-mobile">HTML</span>
                    </div>
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'js' ? 'active' : ''}`}
                            onClick={() => toggleTech('js')}
                            aria-label="JavaScript"
                        >
                            <FaJs />
                        </button>
                        <span className="tech-name-mobile">JavaScript</span>
                    </div>
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'react' ? 'active' : ''}`}
                            onClick={() => toggleTech('react')}
                            aria-label="React"
                        >
                            <FaReact />
                        </button>
                        <span className="tech-name-mobile">React</span>
                    </div>
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'figma' ? 'active' : ''}`}
                            onClick={() => toggleTech('figma')}
                            aria-label="Figma"
                        >
                            <FaFigma />
                        </button>
                        <span className="tech-name-mobile">Figma</span>
                    </div>
                    <div>
                        <button
                            className={`tech-button ${selectedTech === 'phyton' ? 'active' : ''}`}
                            onClick={() => toggleTech('phyton')}
                            aria-label="Figma"
                        >
                            <FaPython />
                        </button>
                        <span className="tech-name-mobile">Python</span>

                    </div>
                </div>

                {/* Caixa de experiência que aparece quando uma tecnologia é selecionada */}
                {selectedTech && (
                    <div className="tech-experience-box">
                        <p>{techExperience[selectedTech]}</p>
                    </div>
                )}
            </div>
        </section>
    )
}

export default Tecnologias