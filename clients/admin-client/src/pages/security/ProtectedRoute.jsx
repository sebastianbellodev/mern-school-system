import { Navigate, Outlet } from 'react-router-dom';

import { useUser } from '../../context/UserContext.jsx';
import adminLogo from '../../img/jrc-admin-logo.webp';

function ProtectedRoute() {
  // eslint-disable-next-line no-unused-vars
  const { loading, authenticated } = useUser();

  if (loading) {
    return (
      <main className="flex flex-col justify-center items-center h-screen w-screen">
        <img
          src={adminLogo}
          alt="Logotipo de la plataforma para personal administrativo y docente de Bachilleres Joaquín Ramírez Cabañas"
          className="w-[40%]"
        />
      </main>
    );
  }

  if (!loading && !authenticated) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
}

export default ProtectedRoute;
