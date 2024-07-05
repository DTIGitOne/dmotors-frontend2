import React from 'react';
import ReactDOM from 'react-dom/client';
import './CustomCSS/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./CustomCSS/svg.css"
import Main from "./Sites/Main";
import About from './Sites/About';
import Contact from './Sites/Contact';
import User from './Sites/Profile';
import CreateListing from './Sites/CreateListing';
import AdvancedSearch from './Sites/AdvancedSearch';
import SignUp from './Sites/SignUp';
import LogIn from './Sites/LogIn';
import ResetPassword from './Sites/ResetPassword';
import { Provider } from 'react-redux';
import store from './Redux/store';
import VerifyGmail from './Sites/VerifyGmail';
import GuestRoute from './Routes/Guest';
import AdminRoute from './Routes/Admin';
import ClientRoute from './Routes/Client';
import ForgotPassword from './Sites/ForgotPassword';
import Settings from './Sites/Settings';
import UserInformation from './Sites/UserInformation';
import DeleteUser from './Sites/DeleteUser';
import AdminMain from './Sites/Admin';
import AdminUsers from './Sites/AdminUsers';
import CarDetails from './Sites/CarDetails';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to="/Main" />} />
      <Route path="/Main" element={<Main />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/VerifyGmail/:userId" element={<VerifyGmail />} />
      <Route path="/AdvancedSearch" element={<AdvancedSearch />} />
      <Route path="/cars/:carId" element={<CarDetails />} />
      <Route path='*' element={<Navigate to="/" />} />
      <Route path="/Admin/Main" element={
          <AdminRoute>
            <AdminMain />
          </AdminRoute>
        } />
        <Route path="/Admin/Users" element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        } />
      <Route path="/userinformation/:id" element={
          <ClientRoute>
            <UserInformation />
          </ClientRoute>
        } />
        <Route path="/deleteuser/:id" element={
          <ClientRoute>
            <DeleteUser />
          </ClientRoute>
        } />
      <Route path="/Create/:id" element={
          <ClientRoute>
            <CreateListing />
          </ClientRoute>
        } />
      <Route path="/settings" element={
          <ClientRoute>
            <Settings />
          </ClientRoute>
        } />
      <Route path="/Signup" element={
          <GuestRoute>
            <SignUp />
          </GuestRoute>
        } />
      <Route path="/Login" element={
          <GuestRoute>
            <LogIn />
          </GuestRoute>
        } />
      <Route path="/reset-password" element={
          <GuestRoute>
            <ResetPassword />
          </GuestRoute>
        } />
      <Route path="/forgotpassword" element={
          <GuestRoute>
            <ForgotPassword />
          </GuestRoute>
        } />
    </Routes>
  </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
