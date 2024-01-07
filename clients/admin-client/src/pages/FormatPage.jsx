/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line no-unused-vars
import Button from 'react-bootstrap/Button';

import Header from '../components/Header';
import FormatCard from '../components/FormatCard.jsx';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormat } from '../context/FormatContext.jsx';

function FormatPage() {
  const { getFormat, format } = useFormat();
  const navigate = useNavigate();

  useEffect(() => {
    getFormat();
  }, []);

  return (
    <main className="flex flex-col h-screen z-auto">
      <Header></Header>
      <section className="flex-grow flex-shrink flex-auto bg-white m-10 mt-28">
        <header>
          <h1 className="font-bold text-lg">Formatos</h1>
          <h2 className="mb-3">
            Seleccione un formato para editarla o eliminarla. Si desea agregar
            un formato, haga clic en el botón inferior.
          </h2>
        </header>
        <section className="flex flex-col w-fit">
          <Button
            variant="primary"
            type="submit"
            className="h-14 bg-grey border-none hover:bg-grey_hover text-white font-bold text-base w-fit mb-4"
            onClick={() => navigate('/format/add')}
          >
            Agregar
          </Button>
        </section>
        <section
          id="container"
          className="flex flex-wrap h-fit w-[80vw] shadow-lg mb-4 rounded-lg p-4 gap-3"
        >
          {format.map((format) => (
            <FormatCard key={format.id} format={format}></FormatCard>
          ))}
        </section>
      </section>
    </main>
  );
}

export default FormatPage;
