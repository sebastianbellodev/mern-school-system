/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars

import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

import Header from '../components/Header';
import { useEffect } from 'react';
import { useGrade } from '../context/GradesContext.jsx';
import GradeCard from '../components/GradeCard.jsx';

function GradesPage() {
  const { grade, getGradesByStudent, setFilterGrades, filterGrades } =
    useGrade();

  useEffect(() => {
    getGradesByStudent(/*Student*/);
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg"> Calificacaiones </h1>
          <h2 className="mb-3">Calificaciones del estudiante.</h2>
        </header>
        <section className="flex flex-col w-fit">
          <section className="flex gap-4 mb-4">
            <Form inline>
              <FloatingLabel label="Materia">
                <Form.Control
                  type="text"
                  placeholder=""
                  className="mr-sm-2"
                  onChange={(e) => {
                    if (e.target.value != '') {
                      return setFilterGrades(
                        grade.filter((grade) =>
                          String(`${grade.subject.name}`).startsWith(
                            e.target.value
                          )
                        )
                      );
                    }
                    setFilterGrades(grade);
                  }}
                ></Form.Control>
              </FloatingLabel>
            </Form>
          </section>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filterGrades.map((grade) => (
            <GradeCard key={grade.id} grade={grade}></GradeCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default GradesPage;
