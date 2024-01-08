/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useNotification } from '../context/NotificationContext.jsx';
import { useEffect } from 'react';
import NotificationCard from '../components/NotificationCard.jsx';

function NoticePage() {
  const { notification, getNotification } = useNotification();

  useEffect(() => {
    getNotification();
  }, []);

  return (
    <main className="flex flex-col h-fit w-screen z-auto">
      <Header></Header>
      <section className="flex flex-col justify-center items-center bg-white w-screen h-fit mt-[22vh] p-14 gap-8">
        <h1 className="font-black text-4xl uppercase self-start">Avisos</h1>
        <div
          id="container"
          className="flex items-center h-fit w-[85vw] flex-wrap gap-6"
        >
          {notification.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
            ></NotificationCard>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}

export default NoticePage;
