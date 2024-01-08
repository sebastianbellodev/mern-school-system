/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import { useFormat } from '../context/FormatContext.jsx';
import { useEffect } from 'react';
import FormatCard from '../components/FormatCard.jsx';

function AdminPage() {
  const { format, getFormat } = useFormat();

  useEffect(() => {
    getFormat();
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
          {format.map((format) => (
            <FormatCard key={format.id} format={format}></FormatCard>
          ))}
        </div>
      </section>
      <Footer></Footer>
    </main>
  );
}

export default AdminPage;
