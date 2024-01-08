import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import HomePage from './pages/HomePage.jsx';
import NoticePage from './pages/NoticePage.jsx';
import TeacherPage from './pages/TeacherPage.jsx';
import StudentPage from './pages/StudentPage.jsx';
import AdminPage from './pages/AdminPage.jsx';
import { NotificationProvider } from './context/NotificationContext.jsx';
import { FormatProvider } from './context/FormatContext.jsx';

function App() {
  return (
    <FormatProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/notice" element={<NoticePage></NoticePage>}></Route>
            <Route
              path="/teacher"
              element={<TeacherPage></TeacherPage>}
            ></Route>
            <Route
              path="/student"
              element={<StudentPage></StudentPage>}
            ></Route>
            <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
          </Routes>
        </BrowserRouter>
      </NotificationProvider>
    </FormatProvider>
  );
}

export default App;
