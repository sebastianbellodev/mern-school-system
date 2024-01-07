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
import { useFormat } from '../context/FormatContext.jsx';

function NotificationFormPage() {
  const { Formik } = formik;
  const [file, setFile] = useState({});
  const { logFormat, getFormatById, updateFormat, format } = useFormat();
  const { getType, type, errors: typeErrors } = useType();
  const navigate = useNavigate();
  const params = useParams();
  const formikRef = useRef();

  useEffect(() => {
    async function loadNotification() {
      if (params.id) {
        const format = await getFormatById(params.id);
        formikRef.current.setFieldValue('title', format.title);
      }
    }
    loadNotification();
  }, []);

  useEffect(() => {
    getType();
  }, []);

  const handleFormSubmit = (format) => {
    format = { ...format, file };
    if (params.id) {
      format.id = params.id;
      updateFormat(format);
      return navigate('/format');
    }
    logFormat(format);
    navigate('/format');
  };

  const schema = yup.object().shape({
    title: yup.string(errors.string).required(errors.title_required),
  });

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">
            Formato<nav></nav>
          </h1>
          <h2 className="mb-3">
            Introduzca el título del nuevo formato y suba el archivo
            correspondiente.
          </h2>
        </header>
        <section>
          <Formik
            innerRef={formikRef}
            validationSchema={schema}
            onSubmit={handleFormSubmit}
            initialValues={{
              title: '',
            }}
          >
            {({
              handleSubmit,
              handleChange,
              setFieldValue,
              values,
              errors,
            }) => (
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
                </section>
                <section>
                  <header>
                    <h1 className="font-bold text-lg">
                      Archivo<nav></nav>
                    </h1>
                    <h2 className="mb-3">
                      Únicamente puede seleccionar un archivo con un tamaño con
                      un peso de 20 MB. El formato de archivo esperado es PDF.
                    </h2>
                  </header>
                  <article className="flex gap-3 items-center">
                    <Form.Group controlId="fileValidation" className="mb-3">
                      <Form.Control
                        type="file"
                        accept="application/pdf"
                        value={values.image}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.readAsDataURL(file);
                          setFile(file);
                        }}
                        isInvalid={!!errors.file}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.file}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </article>
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

export default NotificationFormPage;
