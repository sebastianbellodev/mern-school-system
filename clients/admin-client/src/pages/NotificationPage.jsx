/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import Header from '../components/Header';
import { useNotification } from '../context/NotificationContext.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NotificationCard from '../components/NotificationCard.jsx';
import { useType } from '../context/TypeContext.jsx';

function NotificationPage() {
  const [filter, setFilter] = useState({ type: '', date: '' });
  const {
    getNotification,
    notification,
    filterNotification,
    setFilterNotification,
  } = useNotification();
  const { getType, type, errors: typeErrors } = useType();
  const navigate = useNavigate();

  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    getNotification();
  }, []);

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
                    return setFilterNotification(
                      notification.filter(
                        (notification) =>
                          notification.type._id === e.target.value
                      )
                    );
                  }
                  setFilterNotification(
                    notification.filter(
                      (notification) =>
                        notification.type._id === e.target.value &&
                        String(notification.date).startsWith(filter.date)
                    )
                  );
                }}
              >
                <option value="none">Seleccione una opción</option>
                {type.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Fecha">
              <Form.Control
                name="date"
                type="date"
                onChange={(e) => {
                  setFilter({ ...filter, date: e.target.value });
                  if (filter.type === '' || filter.type === 'none') {
                    return setFilterNotification(
                      notification.filter((notification) =>
                        String(notification.date).startsWith(e.target.value)
                      )
                    );
                  }
                  setFilterNotification(
                    notification.filter(
                      (notification) =>
                        String(notification.date).startsWith(e.target.value) &&
                        notification.type._id === filter.type
                    )
                  );
                }}
              ></Form.Control>
            </FloatingLabel>
          </section>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {filterNotification.map((notification) => (
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
