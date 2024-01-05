import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import { useNotification } from '../context/NotificationContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard.jsx';
// import NotificationCard from '../components/NotificationCard.jsx';

function NotificationPage() {
  // eslint-disable-next-line no-unused-vars
  const { getNotification, notification } = useNotification();
  const [filter, setFilter] = useState({ type: '', date: '' });
  // eslint-disable-next-line no-unused-vars
  const [filteredNotification, setFilteredNotification] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotification();
  }, [getNotification]);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Notificaciones</h1>
          <h2 className="mb-3">
            Seleccione una notificación para editarla o eliminarla. Si desea
            agregar una notificación, haga clic en el botón inferior.
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-fit mb-4"
            onClick={() => navigate('/notification/add')}
          >
            Agregar
          </Button>
          <section className="flex gap-4 mb-4">
            <FloatingLabel label="Tipo">
              <Form.Select
                name="type"
                as="type"
                onChange={(e) => {
                  setFilter({ ...filter, type: e.target.value });
                  if (filter.date === '') {
                    setFilteredNotification(
                      notification.filter(
                        (notification) => notification.type === e.target.value
                      )
                    );
                    return;
                  }
                  setFilteredNotification(
                    notification.filter(
                      (notification) =>
                        notification.type === e.target.value &&
                        notification.date === filter.date
                    )
                  );
                }}
                value={filter.type}
              >
                <option value="none">Seleccione una opción</option>
                <option value="suspension">Suspensión</option>
                <option value="event">Evento</option>
                <option value="activity">Actividad</option>
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Fecha">
              <Form.Control
                name="date"
                type="date"
                onChange={(e) => {
                  setFilter({ ...filter, date: e.target.value });
                  if (filter.type === '' || filter.type === 'none') {
                    setFilteredNotification((prev) => [
                      ...prev,
                      notification.filter(
                        (notification) => notification.date === e.target.value
                      ),
                    ]);
                    return;
                  }
                  setFilteredNotification(
                    notification.filter(
                      (notification) =>
                        notification.date === e.target.value &&
                        notification.type === filter.type
                    )
                  );
                }}
                value={filter.date}
              ></Form.Control>
            </FloatingLabel>
          </section>
        </section>
        <section
          id="container"
          className="flex h-[80vh] w-[90vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filteredNotification.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            ></NotificationCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default NotificationPage;
