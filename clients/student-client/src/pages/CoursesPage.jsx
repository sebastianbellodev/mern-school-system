/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars

import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import { useEffect, useState } from 'react';
import CourseCard from '../components/CourseCard.jsx';
import { useCourse } from '../context/CoursesContext.jsx';

function CoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const { getCoursesByStudent, filterCourses } = useCourse();

  useEffect(() => {
    getCoursesByStudent(/*GRUPO*/);
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg"> Cursos </h1>
          <h2 className="mb-3">Cursos activos actualmente.</h2>
        </header>
        <section className="flex flex-col w-fit">
          <section className="flex gap-4 mb-4">
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Buscar..."
                className="mr-sm-2"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              ></Form.Control>
            </Form>
          </section>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filterCourses.map((subject) => (
            <CourseCard key={subject.id} course={subject}></CourseCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default CoursesPage;
