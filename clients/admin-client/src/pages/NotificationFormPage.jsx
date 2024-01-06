/* eslint-disable react-hooks/exhaustive-deps */
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
import { useType } from '../context/TypeContext.jsx';

function NotificationFormPage() {
  const { Formik } = formik;
  const { logNotification, notification } = useNotification();
  const { getType, type, errors: typeErrors } = useType();
  const navigate = useNavigate();

  useEffect(() => {
    getType();
  }, []);

  const log = (notification) => {
    notification.image = 'file5.png';
    logNotification(notification);
    navigate('/notification');
  };

  const schema = yup.object().shape({
    title: yup.string(errors.string).required(errors.title_required),
    type: yup.string(errors.string).required(errors.type_required),
    date: yup.string(errors.string).required(errors.date_required),
    description: yup
      .string(errors.string)
      .required(errors.description_required),
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
            onSubmit={log}
            initialValues={{
              title: '',
              type: '',
              date: '',
              isSpinner: false,
              description: '',
            }}
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
                      name="isSpinner"
                      value={values.isSpinner}
                      onChange={handleChange}
                      isInvalid={!!errors.isSpinner}
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
                      <Form.Select
                        name="type"
                        as="type"
                        value={values.type}
                        onChange={handleChange}
                        isInvalid={!!errors.type}
                      >
                        <option value="none">Seleccione una opción</option>
                        {type.map((type) => (
                          <option key={type.id} value={type.id}>
                            {type.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.type}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group
                    md="3"
                    controlId="dateValidation"
                    className="w-[50%]"
                  >
                    <FloatingLabel controlId="date" label="Fecha">
                      <Form.Control
                        name="date"
                        type="date"
                        value={values.date}
                        onChange={handleChange}
                        isInvalid={!!errors.date}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid">
                        {errors.date}
                      </Form.Control.Feedback>
                    </FloatingLabel>
                  </Form.Group>
                </section>
                <section className="flex items-center gap-3">
                  <Form.Group
                    md="3"
                    controlId="descriptionValidation"
                    className="w-[100%]"
                  >
                    <FloatingLabel controlId="description" label="Descripción">
                      <Form.Control
                        placeholder=""
                        name="description"
                        as="textarea"
                        value={values.description}
                        onChange={handleChange}
                        isInvalid={!!errors.description}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.description}
                      </Form.Control.Feedback>
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
