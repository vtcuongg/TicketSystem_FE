import MyTicket from './Views/MyTicket';
import { React, useMemo, useEffect, useState } from 'react';
import CreateTicket from './Views/CreateTicket';
import UpdateTicket from './Views/UpdateTicket';
import Report from './Views/Report';
import Employee from './Views/Employee';
import Chat from './Views/Chat';
import Users from './Views/Users';
import Login from './Views/Login';
import CreateUser from './Views/CreateUser';
import Department from './Views/Department';
import CreateDepartment from './Views/CreateDepartment';
import Categories from './Views/Categories';
import CreateCategory from './Views/CreateCategory';
import Profile from './Views/Profile';
import ChangePass from './Views/ChangePass';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from './Stores/authSlice';
import NavBar from './Views/NavBar';
import { MdWysiwyg } from 'react-icons/md';
import { useRef } from 'react';
function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const connection = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        if (decodedToken.exp > currentTime) {
          setUser(JSON.parse(storedUser));
          setIsAdmin(JSON.parse(storedUser).roleName === 'Admin');
        } else {
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
        }
      } catch (err) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    }

    setLoading(false);
  }, []);
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (connection.current) {
        connection.current.stop();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [connection]);
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<Login setConnection={(conn) => (connection.current = conn)} />} />
        <Route
          path="/"
          element={
            user ? (
              isAdmin ? <Users /> : <CreateTicket />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/update-ticket/:id" element={<UpdateTicket />} />
        <Route path="/report" element={<Report />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/my-work" element={<MyTicket />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/users" element={<Users />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/update-user/:id" element={<CreateUser />} />
        <Route path="/department" element={<Department />} />
        <Route path="/create-department" element={<CreateDepartment />} />
        <Route path="/update-department/:id" element={<CreateDepartment />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/create-category" element={<CreateCategory />} />
        <Route path="/update-category/:id" element={<CreateCategory />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/change-pass/:id" element={<ChangePass />} />
      </Routes>

    </Router>
  );
}

export default App;
