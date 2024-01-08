/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';

import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSemester } from '../context/SemesterContext.jsx';

function SemesterPage() {
  const {
    semester,
    filterSemester,
    errors,
    getSemester,
    getSemesterById,
    logSemester,
    setFilterSemester,
  } = useSemester();

  const navigate = useNavigate();

  useEffect(() => {
    getSemester();
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Semestre</h1>
          <h2 className="mb-3">
            Inicie o termine un semestre. En caso de iniciarlo, podrá editar las
            fechas de inicio y cierre, o bien, terminarlo en cualqueir momento
            para iniciar un nuevo semestre.
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-fit mb-4"
            onClick={() => navigate('/semester/add')}
          >
            Iniciar
          </Button>
        </section>
      </section>
    </main>
  );
}

export default SemesterPage;
