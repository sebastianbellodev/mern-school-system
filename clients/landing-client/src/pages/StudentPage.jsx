import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function StudentPage() {
  return (
    <main className="flex flex-col h-screen w-screen z-auto">
      <Header></Header>
      <section className="flex flex-col bg-white w-[80%] h-fit mt-[22vh] p-20 m-32 mb-0 gap-4 justify-center items-center">
        <h1 className="font-black text-4xl uppercase self-start">Alumnos</h1>
        <h2 className="text-md text-justify">
          Desempeños un papel fundamental en la educación en sus más de{' '}
          <b className="text-green">600 alumnos</b>, ofreciendo un entorno
          académico enriquecedor que promueve el desarrollo integral de cada
          estudiante. La institución se destaca por su compromiso con la{' '}
          <b className="text-green">excelencia educativa</b>, proporcionando
          programas académicos sólidos y variados que abarcan diversas áreas del
          conocimiento. Además de fomentar el pensamiento crítico y la
          adquisición de habilidades prácticas, el bachillerato se esfuerza por
          inculcar <b className="text-green">valores éticos</b> y ciudadanos en
          sus alumnos. El cuerpo docente altamente calificado y comprometido
          juega un papel crucial al inspirar el amor por el aprendizaje y
          guiando a los estudiantes hacia el logro de sus metas educativas y
          profesionales. De esta manera, nosotros contribuimos contribuye de
          manera significativa al{' '}
          <b className="text-green">desarrollo académico y personal</b> de sus
          alumnos, preparándolos para enfrentar los desafíos futuros con
          confianza y habilidades sólidas.
        </h2>
      </section>
      <Footer></Footer>
    </main>
  );
}

export default StudentPage;
