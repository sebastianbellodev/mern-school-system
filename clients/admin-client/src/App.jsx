import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage.jsx';
import NotificationPage from './pages/NotificationPage.jsx';
import NotificationFormPage from './pages/NotificationFormPage.jsx';
import FormatPage from './pages/FormatPage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import StudentPage from './pages/StudentPage.jsx';
import ClassPage from './pages/ClassPage.jsx';
import SemesterPage from './pages/SemesterPage.jsx';
import { UserProvider } from './context/UserContext.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { TypeProvider } from './context/TypeContext.jsx';
import ProtectedRoute from './pages/security/ProtectedRoute.jsx';

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <TypeProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage></LoginPage>}></Route>
              <Route path="/login" element={<LoginPage></LoginPage>}></Route>

              {/*
            Protected routes through token authentication
            */}
              <Route element={<ProtectedRoute></ProtectedRoute>}>
                <Route
                  path="/notification"
                  element={<NotificationPage></NotificationPage>}
                ></Route>
                <Route
                  path="/notification/add"
                  element={<NotificationFormPage></NotificationFormPage>}
                ></Route>
                <Route
                  path="/notification/:id"
                  element={<NotificationFormPage></NotificationFormPage>}
                ></Route>
                <Route
                  path="/format"
                  element={<FormatPage></FormatPage>}
                ></Route>
                <Route
                  path="/teacher"
                  element={<TeacherPage></TeacherPage>}
                ></Route>
                <Route
                  path="/student"
                  element={<StudentPage></StudentPage>}
                ></Route>
                <Route path="/class" element={<ClassPage></ClassPage>}></Route>
                <Route
                  path="/semester"
                  element={<SemesterPage></SemesterPage>}
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </TypeProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;
