import { useState } from 'react';
import {
  FaBars as Bar,
  FaBell as Notification,
  FaFile as Format,
  FaChalkboardUser as Teacher,
  FaGraduationCap as Student,
  FaBook as Book,
  FaCalendar as Semester,
} from 'react-icons/fa6';

import adminLogo from '../img/jrc-admin-logo.webp';

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-light_grey py-2 relative top-0 left-0 right-0 flex items-center mb-3 h-[11vh]">
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
          alt="Logotipo de la Plataforma para Personal Administrativo y Docente de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[30vh] ml-3"
        />
      </main>
      <aside>
        <div
          className={`${
            !open && 'hidden'
          } bg-white/10 min-h-screen w-full absolute top-[11vh] left-0 right-0 backdrop-blur-sm overflow-x-hidden z-2`}
        ></div>
        <nav
          id="sidebar"
          className={`${
            open ? 'w-[22vw] md:w-[17] lg:w-[15vw] 2xl:w-[10vw]' : 'w-0'
          } bg-light_grey min-h-screen absolute top-[11vh] left-0 overflow-z-hidden transition-all duration-450 z-3`}
        >
          <ul
            className={`${
              !open && 'hidden'
            } mt-4 flex flex-col items-start gap-3`}
          >
            <li
              id="notification"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Notification size={20} className="ml-3"></Notification>
              Notificaciones
            </li>
            <li
              id="format"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Format size={20} className="ml-3"></Format> Formatos
            </li>
            <li
              id="teacher"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Teacher size={20} className="ml-3"></Teacher> Docentes
            </li>
            <li
              id="student"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Student size={20} className="ml-3"></Student> Estudiantes
            </li>
            <li
              id="class"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Book size={20} className="ml-3"></Book> Clases
            </li>
            <li
              id="semester"
              className="flex items-center gap-2 cursor-pointer w-[95%] h-[5vh] rounded-r-xl hover:bg-green/20
              hover:font-semibold"
            >
              <Semester size={20} className="ml-3"></Semester> Semestre
            </li>
          </ul>
        </nav>
      </aside>
    </header>
  );
}

export default Header;
