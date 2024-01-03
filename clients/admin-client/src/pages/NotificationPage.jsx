import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import {
  FaBell as Notification,
  FaPencil as Edit,
  FaTrash as Delete,
} from 'react-icons/fa6';

import Header from '../components/Header';

function NotificationPage() {
  return (
    <main className="flex flex-col h-screen">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 z-1">
        <header>
          <h1 className="font-bold text-lg">Notificaciones</h1>
          <h2 className="mb-3">
            Seleccione una notificación para editarla o eliminarla. Si desea
            agregar una notificación, haga clic en el botón inferior.
          </h2>
        </header>
        <article>
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-[12vw] mb-4"
          >
            Agregar
          </Button>
        </article>
        <article className="flex gap-5 w-[45vw] mb-4">
          <FloatingLabel controlId="type" label="Tipo" className="w-[21vw]">
            <Form.Select>
              <option value="suspension">Suspensión</option>
              <option value="event">Evento</option>
              <option value="activity">Actividad</option>
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel
            controlId="date"
            label="Fecha"
            className="flex-grow flex-shrink flex-auto"
          >
            <Form.Control type="date"></Form.Control>
          </FloatingLabel>
        </article>
        <section className="flex h-[80vh] w-[90vw] shadow-lg mb-4 rounded-lg p-4">
          <article className="flex flex-col h-[19vh] w-[18vw] shadow-md overflow-hidden rounded-2xl">
            <aside className="flex items-center gap-2 p-3 bg-card_grey_hover">
              <Notification
                size={30}
                style={{ 'flex-shrink': '0' }}
              ></Notification>
              <section className="flex flex-col overflow-hidden">
                <h3 className="font-bold text-lg overflow-hidden break-no text-ellipsis">
                  Títulosssssssssssssssssssssssssssssssssssssssssssssssssssss
                </h3>
                <h4 className="text-sm">Fecha</h4>
              </section>
            </aside>
            <main className="flex flex-grow flex-shrink flex-auto content-between items-center gap-2 bg-white w-auto m-2">
              <Button
                variant="primary"
                type="submit"
                className="h-[5vh] bg-yellow border-none hover:bg-yellow_hover"
              >
                <Edit size={15}></Edit>
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="h-[5vh] bg-red border-none hover:bg-red_hover"
              >
                <Delete size={15}></Delete>
              </Button>
              <h5 className="bg-grey text-white p-[3%] rounded-md ml-auto">
                Suspension
              </h5>
            </main>
          </article>
        </section>
      </section>
    </main>
  );
}

export default NotificationPage;
