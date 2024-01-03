import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import NotificationPage from './pages/NotificationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NotificationPage></NotificationPage>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route
          path="/notification"
          element={<NotificationPage></NotificationPage>}
        ></Route>
        <Route path="/format" element={<h1>Format</h1>}></Route>
        <Route path="/teacher" element={<h1>Teacher</h1>}></Route>
        <Route path="/student" element={<h1>Student</h1>}></Route>
        <Route path="/class" element={<h1>Class</h1>}></Route>
        <Route path="/semester" element={<h1>Semester</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
