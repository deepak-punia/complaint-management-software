import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AdminDashboard from './components/admin/AdminDashboard';
import Dashboard from './components/Dashboard';
import ModDashboard from './components/mod/ModDashboard';
import NavbarMenu from './components/NavbarMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
//Redux
import {Provider} from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store = {store}>
    <BrowserRouter>
    <NavbarMenu />
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="admin" element={<AdminDashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="mod" element={<ModDashboard />} />
    </Routes>
  </BrowserRouter>
    </Provider>
);

