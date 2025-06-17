import './Style.css'
import Header from '../../pages/home/Header/Header.jsx'
import Footer from '../../pages/home/Footer/Footer.jsx'
import Hero from '../../pages/home/Hero/Hero.jsx'
import Tecnologias from '../../pages/home/Tecnlogia/Tecnologias.jsx'
import Projetos from '../../pages/home/Projetos/Projeto.jsx'
import Contato from '../../pages/home/Contato/Contato.jsx'
import Precos from '../../pages/home/Precos/Precos.jsx'
import Sobre from '../../pages/home/SobEu/SobEu.jsx'
import ParticleBackground from '../../components/ParticleBackground'
import Servicos from '../../pages/home/Servicos/Servicos.jsx'


function Home() {
  return (
    <>
      <div class="content">
        <ParticleBackground />
        <Header />
        <Hero />
        <Sobre id="Sobre" />
        <Servicos />
        <Projetos />
        <Precos />
        
        <Tecnologias />
        <Contato />
        <Footer />
      </div>
    </>
  )
}

export default Home
