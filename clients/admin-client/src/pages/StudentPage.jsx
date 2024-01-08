/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import StudentCard from '../components/StudentCard.jsx';
import { useType } from '../context/TypeContext.jsx';
import { useStudent } from '../context/StudentContext.jsx';

function StudentPage() {
  const { getStudent, student, filterStudent, setFilterStudent } = useStudent();
  const navigate = useNavigate();

  useEffect(() => {
    getStudent();
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Alumnos</h1>
          <h2 className="mb-3">
            Seleccione un alumno para editar o eliminar su información. Si desea
            agregar un alumno, haga clic en el botón inferior.
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-fit mb-4"
            onClick={() => navigate('/student/add')}
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
                    return setFilterStudent(
                      student.filter((student) =>
                        String(
                          `${student.name} ${student.paternalSurname} ${student.maternalSurname}`
                        ).startsWith(e.target.value)
                      )
                    );
                  }
                  setFilterStudent(student);
                }}
              ></Form.Control>
            </FloatingLabel>
          </aside>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filterStudent.map((student) => (
            <StudentCard key={student.id} student={student}></StudentCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default StudentPage;
