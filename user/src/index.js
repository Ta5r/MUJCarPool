import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './pages/App';
import LoginUser from './pages/LGuser';
import LoginAdmin from './pages/LGadmin';
import Footer from './components/layouts/Footer';
import AdminDashboard from './pages/admin-dashboard';
import RequestService from './pages/RequestService';
import UserDashBoard from './pages/UserDashBoard';
import RequestStatus from './pages/RequestStatus';
import Master from './pages/Master';
const container = document.getElementById('root');


const root = ReactDOM.createRoot(container);

const routing = (
  <Router>
    <div>
      <Routes>
        <Route path="/" component={App} element={<App />} exact />
        <Route path="/signup" component={LoginAdmin} element={<LoginAdmin />} />
        <Route
          path="/admin/dashboard"
          component={AdminDashboard}
          element={<AdminDashboard />}
        />

        <Route path="/user" component={LoginUser} element={<LoginUser />} />
        <Route
          path="/user/dashboard"
          component={UserDashBoard}
          element={<UserDashBoard />}
        />
        <Route
          path="/user/dashboard/request"
          component={RequestService}
          element={<RequestService />}
        />
        <Route
          path="/user/dashboard/status"
          component={RequestStatus}
          element={<RequestStatus />}
        />
        <Route
          path="/master"
          component={Master}
          element={<Master />}
        />
      </Routes>
    </div>
    <Footer />
  </Router>
);

root.render(routing);
