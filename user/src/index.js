import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import App from './pages/App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PublishRide from './pages/PublishRide';
import UserDashBoard from './pages/UserDashBoard';
import RidesSearch from './pages/RidesSearch';
import RideStatus from './pages/RideStatus';
import MyRequests from './pages/MyRequests';
import Profile from './pages/Profile';
import Payments from './pages/Payments';
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

const routing = (
  <Router>
    <div>
      <Routes>
        <Route path="/" component={App} element={<App />} exact />
        <Route path="/signup" component={Signup} element={<Signup />} />

        <Route path="/user/login" component={Login} element={<Login />} />
        <Route
          path="/user/dashboard"
          component={UserDashBoard}
          element={<UserDashBoard />}
        />
        <Route
          path="/user/dashboard/publish"
          component={PublishRide}
          element={<PublishRide />}
        />
        <Route
          path="/user/dashboard/search"
          component={RidesSearch}
          element={<RidesSearch />}
        />
        <Route
          path="/user/dashboard/myrequests"
          component={MyRequests}
          element={<MyRequests />}
        />
        <Route
          path="/user/dashboard/ridestatus/:slug"
          component={RideStatus}
          element={<RideStatus />}
        />
        <Route
          path="/user/profile"
          component={Profile}
          element={<Profile />}
        />
        <Route
          path="/user/payments"
          component={Payments}
          element={<Payments />}
        />
      </Routes>
    </div>
  </Router>
);

root.render(routing);
