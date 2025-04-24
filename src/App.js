// App.js
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './components/common/Navbar';
import LoginPage from './components/auth/LoginPage';
import RegistrationPage from './components/auth/RegistrationPage';
import FooterComponent from './components/common/Footer';
import UserService from './components/service/UserService';
import UpdateUser from './components/userspage/UpdateUser';
import UserManagementPage from './components/userspage/UserManagementPage';
import ProfilePage from './components/userspage/ProfilePage';

import ProtectedRoute from './components/common/ProtectedRoute';
import Home from './components/home/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';





function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ToastContainer />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} /> 
            <Route exact path="/login" element={<LoginPage />} />
            
            <Route path="/register" element={<RegistrationPage />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute >
                  <ProfilePage />
                </ProtectedRoute>
              } 
            />

            {/* Check if user is authenticated and admin before rendering admin-only routes */}
            {UserService.adminOnly() && (
              <>
                
                { <Route path="/admin/user-management" element={<UserManagementPage />} /> }
                <Route path="/update-user/:userId" element={<UpdateUser />} />
              </>
            )}
            <Route path="*" element={<Navigate to="/login" />} />‰
          </Routes>
        </div>
        <FooterComponent />
      </div>
    </BrowserRouter>
  );
}

export default App;
