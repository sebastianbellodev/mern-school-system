import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaBars as Bar,
  FaGraduationCap as Grades,
  FaBook as Book,
} from 'react-icons/fa6';

import adminLogo from '../img/jrc-admin-logo.webp';

function Header() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <header className="bg-light_grey py-2 fixed top-0 left-0 right-0 flex items-center mb-3 h-[11vh] z-20">
      <main className="flex items-center">
        <Bar
          className="ml-5 cursor-pointer"
          size={20}
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        ></Bar>
        <img
          src={adminLogo}
          alt="Logotipo de la plataforma para personal administrativo y docente de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[30vh] ml-3"
        />
      </main>
      <aside>
        <div
          className={`${
            !open && 'hidden'
          } bg-white/10 min-h-screen w-full fixed top-[11vh] left-0 right-0 backdrop-blur-sm overflow-x-hidden`}
          onClick={() => {
            open ? setOpen(false) : setOpen(true);
          }}
        ></div>
        <nav
          id="sidebar"
          className={`${
            open ? 'w-[23vw] md:w-[21vw] lg:w-[18vw] 2xl:w-[13vw]' : 'w-0'
          } bg-light_grey min-h-screen fixed top-[11vh] left-0  overflow-z-hidden transition-all duration-450`}
        >
          <ul
            className={`${
              !open && 'hidden'
            } mt-4 flex flex-col items-start gap-3`}
          >
            <li
              id="courses"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
              onClick={() => {
                navigate('/courses');
                setOpen(false);
              }}
            >
              <Book size={20} className="ml-3"></Book>
              Cursos
            </li>
            <li
              id="Grades"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
              onClick={() => {
                navigate('/grades');
                setOpen(false);
              }}
            >
              <Grades size={20} className="ml-3"></Grades> Calificaciones
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  );
}

export default Header;
