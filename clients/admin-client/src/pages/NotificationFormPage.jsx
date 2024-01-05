import Header from '../components/Header';

function NotificationFormPage() {
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
      </section>
    </main>
  );
}

export default NotificationFormPage;
