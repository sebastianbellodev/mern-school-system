import { FaFacebook as Facebook } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import logo from '../img/jrc-admin-logo.webp';

function Header() {
  const navigate = useNavigate();

  return (
    <header>
      <main className="bg-white py-2 fixed top-0 left-0 right-0 flex items-center mb-3 h-[11vh] z-20">
        <img
          src={logo}
          alt="Logotipo de la plataforma de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[30vh] ml-3"
        />
        <a
          href="https://www.facebook.com/JRCMatutino/"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto mr-7"
        >
          <section className="bg-grey_hover rounded-md">
            <Facebook
              size={40}
              style={{ flexShrink: 0, color: 'white', padding: '5px' }}
            ></Facebook>
          </section>
        </a>
      </main>
      <nav className="bg-light_grey py-2 fixed top-[11vh] left-0 right-0 flex justify-center items-center mb-3 h-[11vh] z-20">
        <ul className="flex justify-center items-center gap-8">
          <li
            className="hover:bg-grey_hover hover:text-white hover:font-bold p-2 rounded-md cursor-pointer"
            onClick={() => navigate('/')}
          >
            Inicio
          </li>
          <li
            className="hover:bg-grey_hover hover:text-white hover:font-bold p-2 rounded-md cursor-pointer"
            onClick={() => navigate('/notice')}
          >
            Avisos
          </li>
          <li
            className="hover:bg-grey_hover hover:text-white hover:font-bold p-2 rounded-md cursor-pointer"
            onClick={() => navigate('/teacher')}
          >
            Docentes
          </li>
          <li
            className="hover:bg-grey_hover hover:text-white hover:font-bold p-2 rounded-md cursor-pointer"
            onClick={() => navigate('/student')}
          >
            Alumnos
          </li>
          <li
            className="hover:bg-grey_hover hover:text-white hover:font-bold p-2 rounded-md cursor-pointer"
            onClick={() => navigate('/admin')}
          >
            Administración
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
