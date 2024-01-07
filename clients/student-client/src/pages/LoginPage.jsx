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

import { errors } from '../tools/errors/errors.js';
import adminLogo from '../img/jrc-admin-logo.webp';
import { useUser } from '../context/UserContext.jsx';

function LoginPage() {
  const { Formik } = formik;
  const { login, authenticated, errors: loginErrors } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (authenticated) {
      navigate('/courses');
    }
  }, [authenticated]);

  const schema = yup.object().shape({
    username: yup.string(errors.string).required(errors.username_required),
    password: yup.string(errors.string).required(errors.password_required),
  });

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex flex-col items-center gap-3 mb-5">
        <img
          src={adminLogo}
          alt="Logotipo de la plataforma para personal administrativo y docente de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[40%]"
        />
        <h1 className="text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-grey">
          Ingrese a su cuenta
        </h1>
      </header>
      <section className="flex flex-col justify-center items-center gap-4">
        {loginErrors.map((error, index) => {
          return (
            <div className="text-red_error text-center" key={index}>
              {error}
            </div>
          );
        })}
        <Formik
          validationSchema={schema}
          onSubmit={login}
          initialValues={{ username: '', password: '' }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form
              noValidate
              onSubmit={handleSubmit}
              className="flex flex-col mb-4 gap-[30px] w-[50%]"
            >
              <Row>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="userValidation"
                  className="w-[100%] mb-3"
                >
                  <FloatingLabel controlId="username" label="Usuario">
                    <Form.Control
                      required
                      type="text"
                      placeholder=""
                      name="username"
                      value={values.username}
                      onChange={handleChange}
                      isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.username}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="passwordValidation"
                  className="w-[100%]"
                >
                  <FloatingLabel controlId="password" label="Contraseña">
                    <Form.Control
                      type="password"
                      placeholder=""
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.password}
                    </Form.Control.Feedback>
                  </FloatingLabel>
                </Form.Group>
              </Row>
              <Button
                variant="primary"
                type="submit"
                className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base"
              >
                Ingresar
              </Button>
            </Form>
          )}
        </Formik>
      </section>
      <footer>
        <section className="flex gap-6 mt-5">
          <p className="text-grey">
            <a href="/">Términos</a>
          </p>
          <p className="text-grey">
            <a href="/">Privacidad</a>
          </p>
        </section>
      </footer>
    </main>
  );
}

export default LoginPage;
