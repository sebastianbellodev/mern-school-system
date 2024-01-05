import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../context/UserContext.jsx';

function ProtectedRoute() {
  // eslint-disable-next-line no-unused-vars
  const { loading, authenticated } = useUser();

  if (loading) {
    return <h1>Cargando...</h1>;
  }

  if (!loading && !authenticated) {
    return <Navigate to="/login" replace></Navigate>;
  }

  return <Outlet></Outlet>;
}

export default ProtectedRoute;
