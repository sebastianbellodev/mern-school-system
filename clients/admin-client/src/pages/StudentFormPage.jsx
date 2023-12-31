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
import { useUser } from '../context/UserContext.jsx';
import { useStudent } from '../context/StudentContext.jsx';
import { useGroup } from '../context/GroupContext.jsx';

function TeacherFormPage() {
  const { Formik } = formik;
  const { logStudent, getStudentById, updateStudent, student } = useStudent();
  const { group, getGroup } = useGroup();
  const { signUp } = useUser();
  const navigate = useNavigate();
  const params = useParams();
  const formikRef = useRef();

  useEffect(() => {
    getGroup();
  }, []);

  useEffect(() => {
    async function loadStudent() {
      if (params.id) {
        const teacher = await getStudentById(params.id);
        formikRef.current.setFieldValue('niev', teacher.niev);
        formikRef.current.setFieldValue('curp', teacher.curp);
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
        formikRef.current.setFieldValue('phone', teacher.phone);
        if (teacher.groups.length > 0) {
          formikRef.current.setFieldValue('group', teacher.groups[0]._id);
        }
      }
    }
    loadStudent();
  }, []);

  const handleFormSubmit = (student) => {
    student.groups = [student.group];
    if (params.id) {
      student.id = params.id;
      console.log(student);
      updateStudent(student);
      return navigate('/student');
    }
    const password = import.meta.env.VITE_USER_PASSWORD;
    const user = {
      username: String(student.emailAddress).split('@')[0],
      password,
    };
    const data = signUp(user);
    student.user = data.id;
    logStudent(student);
    navigate('/student');
  };

  const schema = yup.object().shape({
    niev: yup.string(errors.string).required(errors.niev_required),
    curp: yup.string(errors.string).required(errors.curp_required),
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
    phone: yup.string(errors.string).required(errors.phone_required),
    group: yup.string(errors.string).required(errors.group_required),
  });

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">
            Alumno<nav></nav>
          </h1>
          <h2 className="mb-3">Introduzca la información del alumno.</h2>
        </header>
        <section>
          <Formik
            innerRef={formikRef}
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
              curp: '',
              niev: '',
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
                <section className="flex gap-4">
                  <Form.Group
                    md="3"
                    controlId="nievValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel controlId="niev" label="NIEV">
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="niev"
                        value={values.niev}
                        onChange={handleChange}
                        isInvalid={!!errors.niev}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.niev}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    md="3"
                    controlId="curpValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel controlId="curp" label="CURP">
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="curp"
                        value={values.curp}
                        onChange={handleChange}
                        isInvalid={!!errors.curp}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.curp}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section>
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
                <section>
                  <Form.Group md="3" controlId="phone" className="w-[60%]">
                    <FloatingLabel controlId="phone" label="Teléfono">
                      <Form.Control
                        required
                        type="tel"
                        placeholder=""
                        name="phone"
                        value={values.phone}
                        onChange={handleChange}
                        isInvalid={!!errors.phone}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.phone}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section>
                  <Form.Group>
                    <FloatingLabel label="Grupo">
                      <Form.Select
                        name="group"
                        as="type"
                        value={values.group}
                        onChange={handleChange}
                        className="w-[50%]"
                      >
                        <option value="none">Seleccione una opción</option>
                        {group.map((group) => (
                          <option key={group.id} value={group.id}>
                            {String(group.number)}
                          </option>
                        ))}
                      </Form.Select>
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
