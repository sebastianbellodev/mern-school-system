/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Header from '../components/Header';
import { useSemester } from '../context/SemesterContext.jsx';
import { useNavigate } from 'react-router-dom';

function SemesterFormPage() {
  const { logSemester, semester } = useSemester();
  const navigate = useNavigate();

  const handleFormSubmit = (semester) => {
    logSemester(semester);
    navigate('/semester');
  };

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">
            Semestre<nav></nav>
          </h1>
          <h2 className="mb-3">Introduzca la fecha del semestre.</h2>
        </header>
        <Form>
          <section className="flex items-center gap-3 w-[65%]">
            <Form.Group md="3" controlId="dateValidation" className="w-[50%]">
              <FloatingLabel controlId="date" label="Fecha de inicio">
                <Form.Control
                  name="date"
                  type="date"
                  value="date"
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
            <Form.Group md="3" controlId="dateValidation" className="w-[50%]">
              <FloatingLabel controlId="date" label="Fecha de fin">
                <Form.Control
                  name="date"
                  type="date"
                  value="date"
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </section>
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-[25%]"
            onClick={handleFormSubmit}
          >
            Guardar
          </Button>
        </Form>
      </section>
    </main>
  );
}

export default SemesterFormPage;
