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
import NavBar from './Views/NavBar';
import { MdWysiwyg } from 'react-icons/md';
import { useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { setUser } from './Stores/authSlice';
function App() {
  const [loading, setLoading] = useState(true);
  const connection = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          const parsedUser = JSON.parse(storedUser);
          dispatch(setUser(parsedUser));
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
  }, [!!localStorage.getItem('user')]);

  const useLocalStorageUser = () => {
    const [user, setUser] = useState(() => {
      const raw = localStorage.getItem('user');
      return raw ? JSON.parse(raw) : null;
    });

    const [isAdmin, setIsAdmin] = useState(() => {
      const raw = localStorage.getItem('user');
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed?.roleName === 'Admin';
      }
      return false;
    });

    useEffect(() => {
      const interval = setInterval(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            setIsAdmin(parsed.roleName === 'Admin');
            setUser(parsed);
          } catch (e) {
            setIsAdmin(false);
            setUser(null);
          }
        } else {
          setIsAdmin(false);
          setUser(null);
        }
      }, 1000);

      return () => clearInterval(interval);
    }, []);

    return { user, isAdmin };
  };
  const { user, isAdmin } = useLocalStorageUser();

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
        <Route
          path="/"
          element={
            user ? (
              isAdmin ? <Users /> : <MyTicket />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/Login" element={<Login setConnection={(conn) => (connection.current = conn)} />} />
        <Route path="/create-ticket" element={user ? <CreateTicket /> : <Navigate to="/login" replace />} />
        <Route path="/update-ticket/:id" element={user ? <UpdateTicket /> : <Navigate to="/login" replace />} />
        <Route path="/report" element={user ? <Report /> : <Navigate to="/login" replace />} />
        <Route path="/employee" element={user ? <Employee /> : <Navigate to="/login" replace />} />
        <Route path="/my-work" element={user ? <MyTicket /> : <Navigate to="/login" replace />} />
        <Route path="/my-ticket" element={user ? <MyTicket /> : <Navigate to="/login" replace />} />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to="/login" replace />} />
        <Route path="/users" element={isAdmin ? <Users /> : <Navigate to="/login" replace />} />
        <Route path="/create-user" element={isAdmin ? <CreateUser /> : <Navigate to="/login" replace />} />
        <Route path="/update-user/:id" element={isAdmin ? <CreateUser /> : <Navigate to="/login" replace />} />
        <Route path="/department" element={isAdmin ? <Department /> : <Navigate to="/login" replace />} />
        <Route path="/create-department" element={isAdmin ? <CreateDepartment /> : <Navigate to="/login" replace />} />
        <Route path="/update-department/:id" element={isAdmin ? <CreateDepartment /> : <Navigate to="/login" replace />} />
        <Route path="/categories" element={isAdmin ? <Categories /> : <Navigate to="/login" replace />} />
        <Route path="/create-category" element={isAdmin ? <CreateCategory /> : <Navigate to="/login" replace />} />
        <Route path="/update-category/:id" element={isAdmin ? <CreateCategory /> : <Navigate to="/login" replace />} />
        <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/login" replace />} />
        <Route path="/change-pass/:id" element={user ? <ChangePass /> : <Navigate to="/login" replace />} />

      </Routes>

    </Router>
  );
}

export default App;
