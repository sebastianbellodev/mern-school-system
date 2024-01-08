/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '../components/Header.jsx';
import NotificationSlider from '../components/NotificationSlider.jsx';
import Footer from '../components/Footer.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { useEffect } from 'react';

function HomePage() {
  const { notification, getNotification } = useNotification();

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <main className="flex flex-col h-fit w-screen z-auto">
      <Header></Header>
      <section className="mt-[22vh] h-fit"></section>
      <section className="flex bg-white w-screen h-fit">
        <main className="h-fit w-fit">
          <article className="bg-white w-[100%] h-fit flex flex-col items-center justify-center gap-5 p-20">
            <h1 className="uppercase text-6xl text-center font-black">
              Únete a nuestra comunidad
            </h1>
            <h2>
              Estamos comprometidos con brindarte la educación de calidad que
              necesitas para forjar un{' '}
              <b className="text-red_hover">futuro brillante</b>. Nuestro
              bachillerato es un espacio donde los{' '}
              <b className="text-red_hover">jóvenes encuentran inspiración</b>,
              <b className="text-red_hover"> aprenden</b>, y{' '}
              <b className="text-red_hover">crecen</b>, preparándose para
              enfrentar los desafíos del mundo actual y alcanzar sus{' '}
              <b className="text-red_hover">metas más ambiciosas</b>.
            </h2>
          </article>
          <article className="bg-grey text-white w-[100%] h-fit flex flex-col items-center justify-center gap-5 p-20">
            <h1 className="uppercase text-6xl text-center font-black">
              Nuestro compromiso es contigo
            </h1>
            <h2 className="text-yellow uppercase text-2xl text-start self-start font-black">
              Misión
            </h2>
            <h3 className="text-justify">
              Nuestra misión es proporcionar a nuestros estudiantes una
              educación de calidad que los inspire a alcanzar su{' '}
              <b className="text-yellow">máximo potencial académico</b>,
              personal y profesional. Nos comprometemos a fomentar un ambiente
              de{' '}
              <b className="text-yellow">
                aprendizaje inclusivo y colaborativo
              </b>
              , donde cada estudiante se sienta apoyado y motivado para crecer
              como <b className="text-yellow">individuo</b> y{' '}
              <b className="text-yellow">ciudadano responsable</b>.
            </h3>
            <h2 className="text-yellow uppercase text-2xl text-start self-end font-black">
              Visión
            </h2>
            <h3 className="text-justify">
              La visión de la institución es ser reconocidos como{' '}
              <b className="text-yellow">líderes</b> en la educación media
              superior, formando a jóvenes que son{' '}
              <b className="text-yellow">innovadores</b>,
              <b className="text-yellow"> críticos</b> y{' '}
              <b className="text-yellow">éticos</b>, listos para enfrentar los
              desafíos modernos. Buscamos ser una institución de referencia que
              se destaque por su excelencia académica, su compromiso con la
              diversidad y la inclusión, y su impacto positivo en la comunidad.
            </h3>
          </article>
        </main>
        <aside className="bg-yellow h-auto w-screen"></aside>
      </section>
      <Footer></Footer>
    </main>
  );
}

export default HomePage;
