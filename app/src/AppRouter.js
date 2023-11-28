import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Workchat from './components/workchat';
import Register from './components/register';
import Logout from './components/logout';

const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return token
};

const PrivateRoute = ({ element, path }) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: path }} replace={true} />
  );
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
        path="/workchat"
        element={<PrivateRoute element={<Workchat />} path="/workchat" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;