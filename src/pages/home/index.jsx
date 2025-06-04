import './Style.css'
import Header from '../../pages/home/Header/Header.jsx'
import Footer from '../../pages/home/Footer/Footer.jsx'
import Hero from '../../pages/home/Hero/Hero.jsx'
import Servicos from '../../pages/home/Servicos/Servicos.jsx'
import Tecnologias from '../../pages/home/Tecnlogia/Tecnologias.jsx'
import Projetos from '../../pages/home/Projetos/Projeto.jsx'
import Contato from '../../pages/home/Contato/Contato.jsx'
import Precos from '../../pages/home/Precos/Precos.jsx'
import Sobre from '../../pages/home/SobEu/SobEu.jsx'
import ConstellationCanvas from '../../components/BackgroundConstellation/ConstellationCanvas'



function Home() {
  return (
    <>
      <div class="content">
        <ConstellationCanvas />
        <Header />
        <Hero />
        <Sobre />
        <Servicos />
        <Tecnologias />
        <Precos />
        <Projetos />
        <Contato />
        <Footer />
      </div>
    </>
  )
}

export default Home
