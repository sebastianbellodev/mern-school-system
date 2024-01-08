import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

function TeacherPage() {
  return (
    <main className="flex flex-col h-screen w-screen z-auto">
      <Header></Header>
      <section className="flex flex-col bg-white w-[80%] h-fit mt-[22vh] p-20 m-32 mb-0 gap-4 justify-center items-center">
        <h1 className="font-black text-4xl uppercase self-start">Docentes</h1>
      </section>
      <Footer></Footer>
    </main>
  );
}

export default TeacherPage;
