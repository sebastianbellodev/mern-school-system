/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import Header from '../components/Header';
import { errors } from '../tools/errors/errors.js';
import { useType } from '../context/TypeContext.jsx';
import { useTeacher } from '../context/TeacherContext.jsx';
import { useUser } from '../context/UserContext.jsx';

function TeacherFormPage() {
  const { Formik } = formik;
  const { logTeacher, getTeacherById, updateTeacher, teacher } = useTeacher();
  const { signUp } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const formikRef = useRef();

  useEffect(() => {
    async function loadTeacher() {
      if (params.id) {
        const teacher = await getTeacherById(params.id);
        formikRef.current.setFieldValue('name', teacher.name);
        formikRef.current.setFieldValue(
          'paternalSurname',
          teacher.paternalSurname
        );
        formikRef.current.setFieldValue(
          'maternalSurname',
          teacher.maternalSurname
        );
        formikRef.current.setFieldValue('emailAddress', teacher.emailAddress);
      }
    }
    loadTeacher();
  }, []);

  const handleFormSubmit = (teacher) => {
    if (params.id) {
      teacher.id = params.id;
      updateTeacher(teacher);
      return navigate('/teacher');
    }
    const password = import.meta.env.VITE_USER_PASSWORD;
    const user = {
      username: String(teacher.emailAddress).split('@')[0],
      password,
    };
    const data = signUp(user);
    teacher.user = data.id;
    logTeacher(teacher);
    navigate('/teacher');
  };

  const schema = yup.object().shape({
    name: yup.string(errors.string).required(errors.title_required),
    paternalSurname: yup
      .string(errors.string)
      .required(errors.lastname_required),
    maternalSurname: yup
      .string(errors.string)
      .required(errors.lastname_required),
    emailAddress: yup
      .string(errors.string)
      .email(errors.email_invalid)
      .required(errors.email_required),
  });

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">
            Docente<nav></nav>
          </h1>
          <h2 className="mb-3">Introduzca la información del docente.</h2>
        </header>
        <section>
          <Formik
            innerRef={formikRef}
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
              name: '',
              paternalSurname: '',
              maternalSurname: '',
              emailAddress: '',
            }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col mb-4 gap-[30px] w-[90%]"
              >
                <section className="flex items-center gap-3">
                  <Form.Group
                    md="3"
                    controlId="nameValidation"
                    className="w-[55%]"
                  >
                    <FloatingLabel controlId="name" label="Nombre">
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="name"
                        value={values.name}
                        onChange={handleChange}
                        isInvalid={!!errors.name}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.name}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section className="flex gap-4">
                  <Form.Group
                    md="3"
                    controlId="paternalSurnameValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel
                      controlId="paternalSurname"
                      label="Apellido paterno"
                    >
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="paternalSurname"
                        value={values.paternalSurname}
                        onChange={handleChange}
                        isInvalid={!!errors.paternalSurname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.paternalSurname}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    md="3"
                    controlId="maternalSurnameValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel
                      controlId="maternalSurname"
                      label="Apellido materno"
                    >
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="maternalSurname"
                        value={values.maternalSurname}
                        onChange={handleChange}
                        isInvalid={!!errors.maternalSurname}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.maternalSurname}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section>
                  <Form.Group
                    md="3"
                    controlId="emailValidation"
                    className="w-[60%]"
                  >
                    <FloatingLabel
                      controlId="emailAddress"
                      label="Correo electrónico"
                    >
                      <Form.Control
                        required
                        type="email"
                        placeholder=""
                        name="emailAddress"
                        value={values.emailAddress}
                        onChange={handleChange}
                        isInvalid={!!errors.emailAddress}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.emailAddress}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <Button
                  variant="primary"
                  type="submit"
                  className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-[25%]"
                >
                  Guardar
                </Button>
              </Form>
            )}
          </Formik>
        </section>
      </section>
    </main>
  );
}

export default TeacherFormPage;
