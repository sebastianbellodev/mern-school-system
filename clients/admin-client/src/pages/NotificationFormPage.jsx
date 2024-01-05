/* eslint-disable no-unused-vars */
import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Header from '../components/Header';
import { errors } from '../tools/errors/errors.js';
import { useNotification } from '../context/NotificationContext.jsx';

function NotificationFormPage() {
  const { Formik } = formik;
  const { logNotification, notification } = useNotification();
  const navigate = useNavigate();

  const schema = yup.object().shape({
    title: yup.string(errors.string).required(errors.title_required),
    type: yup.string(errors.string).required(errors.password_required),
    date: yup.string(errors.string).required(errors.password_required),
  });

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">
            Notificación<nav></nav>
          </h1>
          <h2 className="mb-3">
            Introduzca los datos de la nueva notificación.
          </h2>
        </header>
        <section>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{ title: '', type: '', date: '' }}
          >
            {({ handleSubmit, handleChange, values, errors }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className="flex flex-col mb-4 gap-[30px] w-[80%]"
              >
                <section className="flex items-center gap-3">
                  <Form.Group
                    md="3"
                    controlId="titleValidation"
                    className="w-[60%]"
                  >
                    <FloatingLabel controlId="title" label="Titulo">
                      <Form.Control
                        required
                        type="text"
                        placeholder=""
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        isInvalid={!!errors.title}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.title}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="checkboxValidation">
                    <Form.Check
                      type="checkbox"
                      label="Incluir en la página institucional"
                    />
                  </Form.Group>
                </section>
                <section className="flex items-center gap-3 w-[65%]">
                  <Form.Group
                    md="3"
                    controlId="typeValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel label="Tipo">
                      <Form.Select name="type" as="type">
                        <option value="none">Seleccione una opción</option>
                        <option value="suspension">Suspensión</option>
                        <option value="event">Evento</option>
                        <option value="activity">Actividad</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    md="3"
                    controlId="dateValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel label="Fecha">
                      <Form.Control name="date" type="date"></Form.Control>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section className="flex items-center gap-3">
                  <Form.Group
                    md="3"
                    controlId="descriptionValidation"
                    className="w-[100%]"
                  >
                    <FloatingLabel label="Descripción">
                      <Form.Control as="textarea" />
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <Button
                  variant="primary"
                  type="submit"
                  className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base"
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

export default NotificationFormPage;
