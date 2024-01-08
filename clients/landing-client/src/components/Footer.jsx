import { FaFacebook as Facebook } from 'react-icons/fa6';

import logo from '../img/jrc-admin-logo.webp';

function Footer() {
  return (
    <footer className="bg-white h-fit w-screen flex flex-col items-center">
      <section className="flex h-[10vh] items-center justify-center m-8 gap-16">
        <img
          src={logo}
          alt="Logotipo de la plataforma de Bachilleres Joaquín Ramírez Cabañas"
          className="h-[100%]"
        />
        <article className="w-[25%]">
          <p className="leading-4">
            C. Zaragoza 121, Zona Dorada, CP. 91516 Coatepec, Ver.
          </p>
          <p>228-504-4858</p>
        </article>
        <article className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/JRCMatutino/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <section className="bg-grey_hover rounded-md">
              <Facebook
                size={40}
                style={{ flexShrink: 0, color: 'white', padding: '5px' }}
              ></Facebook>
            </section>
          </a>
          <p className="text-md">
            Joaquín Ramírez Cabañas <b>Matutino</b>
          </p>
        </article>
      </section>
      <aside className="mb-2">
        © 2023 Bachillerato Joaquín Ramírez Cabañas. Todos los derechos
        reservados.
      </aside>
    </footer>
  );
}

export default Footer;
