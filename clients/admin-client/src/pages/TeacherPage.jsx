/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TeacherCard from '../components/TeacherCard.jsx';
import { useType } from '../context/TypeContext.jsx';
import { useTeacher } from '../context/TeacherContext.jsx';

function TeacherPage() {
  const { getTeacher, teacher, filterTeacher, setFilterTeacher } = useTeacher();
  const navigate = useNavigate();

  useEffect(() => {
    getTeacher();
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Docentes</h1>
          <h2 className="mb-3">
            Seleccione un docente para editar o eliminar su información. Si
            desea agregar un docente, haga clic en el botón inferior.
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-fit mb-4"
            onClick={() => navigate('/teacher/add')}
          >
            Agregar
          </Button>
          <aside className="flex gap-4 mb-4">
            <FloatingLabel label="Nombre">
              <Form.Control
                name="name"
                type="text"
                placeholder=""
                className="w-[30vw]"
                onChange={(e) => {
                  if (e.target.value != '') {
                    return setFilterTeacher(
                      teacher.filter((teacher) =>
                        String(
                          `${teacher.name} ${teacher.paternalSurname} ${teacher.maternalSurname}`
                        ).startsWith(e.target.value)
                      )
                    );
                  }
                  setFilterTeacher(teacher);
                }}
              ></Form.Control>
            </FloatingLabel>
          </aside>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filterTeacher.map((teacher) => (
            <TeacherCard key={teacher.id} teacher={teacher}></TeacherCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default TeacherPage;
