import { useEffect } from "react";
import { FaLaptopCode, FaServer } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const services = [
  {
    icon: <FaLaptopCode size={40} className="text-indigo-500 group-hover:scale-110 transition-transform duration-300" />,
    title: "Criação de Sites e Landing Pages",
    subtitle: "Transforme suas ideias em experiências digitais únicas",
    description: (
      <>
        <p className="mb-2">
          Você já teve uma ideia incrível, mas não sabia como colocá-la online de forma profissional e impactante? É aí que eu entro.
        </p>
        <p className="mb-2">
          <b>Sou Kayky Rugani</b>, freelancer especializado na criação de sites e landing pages pensadas para encantar seu público e entregar resultados. Mais do que apenas "colocar algo no ar", meu objetivo é criar experiências digitais que comuniquem sua essência com clareza, agilidade e design de qualidade.
        </p>
        <p className="mb-2">
          Um site bem construído é mais do que uma vitrine — ele é seu cartão de visita digital, disponível 24 horas por dia. E uma landing page bem planejada pode ser a chave para transformar visitantes em clientes.
        </p>
        <ul className="mb-2 space-y-1">
          <li>✔️ Você economiza tempo e evita dores de cabeça.</li>
          <li>✔️ Ganha um visual moderno e personalizado.</li>
          <li>✔️ Tem liberdade para focar no que realmente importa: seu negócio.</li>
        </ul>
        <p className="italic">A criatividade? É o único limite!<br/>Cada projeto é único e feito sob medida, com foco total nos seus objetivos.</p>
      </>
    ),
  },
  {
    icon: <FaServer size={40} className="text-green-500 group-hover:scale-110 transition-transform duration-300" />,
    title: "Hospedagem e Manutenção",
    subtitle: "Seu site no ar com segurança, velocidade e tranquilidade",
    description: (
      <>
        <p className="mb-2">
          Criar um site incrível é só o começo. Manter ele funcionando perfeitamente, seguro e sempre atualizado exige atenção constante — e é por isso que ofereço serviços completos de hospedagem e manutenção.
        </p>
        <p className="mb-2">
          Meu nome é Kayky Rugani e, como freelancer, cuido pessoalmente da estabilidade do seu site, para que ele continue sendo seu melhor aliado online. Nada de páginas lentas, fora do ar ou com erros: comigo, seu site está sempre pronto para receber visitantes.
        </p>
        <ul className="mb-2 space-y-1">
          <li>🔧 Atualizações regulares e suporte rápido.</li>
          <li>🔒 Proteção contra falhas e ameaças digitais.</li>
          <li>🚀 Performance otimizada, com carregamento ágil.</li>
          <li>🧠 Mente tranquila para focar no seu crescimento.</li>
        </ul>
        <p className="italic">Você pensou, eu crio. Você precisa de estabilidade, eu mantenho.<br/>Simples assim.</p>
      </>
    ),
  },
];

export default function ServicesSection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-indigo-100">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-900">Serviços</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-start transition-transform hover:-translate-y-2 hover:shadow-2xl duration-300 group"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-gray-800">{service.title}</h3>
              <h4 className="text-lg text-indigo-600 mb-4 font-medium">{service.subtitle}</h4>
              <div className="text-gray-700 mb-4 text-base leading-relaxed">{service.description}</div>
              <a
                href="#contato"
                className="mt-auto inline-block bg-indigo-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-indigo-600 transition"
              >
                Fale comigo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 