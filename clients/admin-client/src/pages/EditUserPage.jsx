/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import 'bootstrap/dist/css/bootstrap.min.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';

// Import your validation messages from the errors.js file
import { errors } from '../tools/errors/errors.js';
import { useUser } from '../context/UserContext.jsx';

function EditUserPage() {
    const { Formik } = formik;
    const { user, update, useEffect} = useUser();
    const navigate = useNavigate();

    const schema = yup.object().shape({
        password: yup.string(errors.string)
            .min(8, errors.password_min_length)
            .max(20, errors.password_max_length)
            .required(errors.password_required),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], errors.password_match)
            .required(errors.password_required),
    });

    return (
        <main className="flex flex-col justify-center items-center h-screen">
            <section className="flex flex-col justify-center items-center gap-4">
                <Formik
                    validationSchema={schema}
                    onSubmit={(values) => {
                        update(values.password);
                    }}
                    initialValues={{ password: '', confirmPassword: '' }}
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
                                    <Form.Label>Usuario: {user.username}</Form.Label>
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
                                <Form.Group
                                    as={Col}
                                    md="3"
                                    controlId="confirmPasswordValidation"
                                    className="w-[100%]"
                                >
                                    <FloatingLabel controlId="confirmPassword" label="Reingresar Contraseña">
                                        <Form.Control
                                            type="password"
                                            placeholder=""
                                            name="confirmPassword"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            isInvalid={!!errors.confirmPassword}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errors.confirmPassword}
                                        </Form.Control.Feedback>
                                    </FloatingLabel>
                                </Form.Group>
                            </Row>
                            <Row className="justify-content-end">
                                <Col md="3" className="w-[100%]">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base"
                                        disabled={Object.keys(errors).length !== 0}
                                    >
                                        Actualizar
                                    </Button>
                                </Col>
                                <Col md="3" className="w-[100%]">
                                    <Link to="/notification">
                                        <Button
                                            variant="secondary"
                                            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base"
                                        >
                                            Regresar
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>
            </section>
        </main>
    );
}

export default EditUserPage;