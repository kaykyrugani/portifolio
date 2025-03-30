import './Style.css'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Hero from './Hero.jsx'
import Servicos from './Servicos.jsx'
import Skills from './Skills.jsx'
import Tecnologias from './Tecnologias.jsx'
import Projetos from './Projeto.jsx'
import Contato from './Contato.jsx'



function Home() {
  return (
    <>
      <div class="content">
        <Header />

        <Hero />

        <Servicos />

        <Skills />

        <Tecnologias />

        <Projetos />

        <Contato />

        <Footer />
      </div>
    </>
  )
}

export default Home
