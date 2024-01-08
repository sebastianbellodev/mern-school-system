import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import CoursesPage from './pages/coursesPage.jsx';
import GradesPage from './pages/GradesPage.jsx';
import ProtectedRoute from './pages/security/ProtectedRoute.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { TypeProvider } from './context/TypeContext.jsx';
import { CoursesProvider } from './context/CoursesContext.jsx';
import { GradeProvider } from './context/GradesContext.jsx';

function App() {
  return (
    <UserProvider>
      <CoursesProvider>
        <GradeProvider>
          <NotificationProvider>
            <TypeProvider>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<LoginPage></LoginPage>}></Route>
                  <Route
                    path="/login"
                    element={<LoginPage></LoginPage>}
                  ></Route>

                  {/*
              Protected routes through token authentication
              */}
                  <Route element={<ProtectedRoute></ProtectedRoute>}>
                    <Route
                      path="/courses"
                      element={<CoursesPage></CoursesPage>}
                    ></Route>
                    <Route
                      path="/grades"
                      element={<GradesPage></GradesPage>}
                    ></Route>
                  </Route>
                </Routes>
              </BrowserRouter>
            </TypeProvider>
          </NotificationProvider>
        </GradeProvider>
      </CoursesProvider>
    </UserProvider>
  );
}

export default App;
