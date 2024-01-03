import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';

import { errors } from '../tools/errors/errors.js';
import adminLogo from '../img/jrc-admin-logo.webp';

function LoginPage() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(errors.email_invalid)
      .required(errors.email_required),
    password: yup.string().required(errors.password_required),
  });

  return (
    <main className="flex flex-col justify-center items-center h-screen">
      <header className="flex flex-col items-center gap-3 mb-5">
        <img
          src={adminLogo}
          alt="Logotipo de la Plataforma para Personal Administrativo y Docente de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[40%]"
        />
        <h1 className="text-2xl sm:text-xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-grey">
          Ingrese a su cuenta
        </h1>
      </header>
      <section className="flex flex-col justify-center items-center">
        <Formik
          validationSchema={schema}
          onSubmit={console.log}
          initialValues={{ email: '', password: '' }}
        >
          {({ handleSubmit, handleChange, values, errors }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Row className="flex flex-col mb-4 gap-[40px] w-[30vw]">
                <Form.Group
                  as={Col}
                  md="3"
                  controlId="emailValidation"
                  className="w-[100%]"
                >
                  <FloatingLabel controlId="email" label="Correo electrónico">
                    <Form.Control
                      required
                      type="email"
                      placeholder=""
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.email}
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
                className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-[100%]"
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
