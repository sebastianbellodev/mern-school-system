/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useClass } from '../context/ClassContext.jsx';
import { useSemester } from '../context/SemesterContext.jsx';

function ClassPage() {
  const { Formik } = formik;
  const { getClass, subject, filterSubjects, setFilterSubject, errors } =
    useClass();
  const { getSemester, semester, errors: semesterErrors } = useSemester();
  const navigate = useNavigate();

  useEffect(() => {
    getClass();
  }, []);

  const schema = yup.object().shape({
    name: yup.string(errors.string).required(errors.username_required),
  });

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Clase</h1>
          <h2 className="mb-3">
            Introduzca la informacion de la calse y seleccione al o los docente
            titulares. Si usted selcciona una área propedéutica, no podrá marcar
            la clase como capacitación para el trabajo
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Formik
            validationSchema={schema}
            initialValues={{
              name: '',
              isJobTraining: '',
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form className="flex flex-col mb-4 gap-[30px] w-[80%]">
                <FloatingLabel label="Nombre">
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder=""
                    className="w-[30vw]"
                    onChange={(e) => {
                      if (e.target.value != '') {
                        return setFilterSubject(
                          subject.filter((subject) => String())
                        );
                      }
                    }}
                  ></Form.Control>
                </FloatingLabel>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select
                      name="type"
                      as="type"
                      isInvalid={!!errors.type}
                    >
                      <option value="none">Seleccione una opcion</option>
                      {semester.map((semester) => (
                        <option key={semester.id} value={semester.id}>
                          {semester.startDate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Select
                      name="type"
                      as="type"
                      isInvalid={!!errors.type}
                    >
                      <option value="none">Seleccione una opcion</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} className="mb-3" id="formGridCheckbox">
                    <Form.Check
                      type="checkbox"
                      label="Capacitacion para el trabajo"
                    />
                  </Form.Group>
                </Row>
              </Form>
            )}
          </Formik>
        </section>
      </section>
    </main>
  );
}

export default ClassPage;
