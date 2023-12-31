// Tools
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Libraries
import 'flowbite';

// Pages
import DefaultLayout from './pages/DefaultLayout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';

// AdminPages
import AdminPictures from './pages/AdminPictures';

// Middlewares
import GuestRoutes from './middlewares/GuestRoutes';
import PrivateRoutes from './middlewares/PrivateRoutes';

// Contexts
import AuthProvider from './contexts/AuthProvider';
import SinglePicture from './pages/SinglePicture';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* PUBLIC ROUTE */}
            <Route
              element={
                <GuestRoutes>
                  <DefaultLayout />
                </GuestRoutes>
              }
            >
              <Route path="/" element={<Home />}></Route>
              <Route path="/login" element={<Login />}></Route>
            </Route>

            {/* PRIVATE ROUTE */}
            <Route
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route path="/dashboard" element={<Dashboard />}></Route>
              <Route path="/pictures" element={<AdminPictures />}></Route>
              <Route path="/pictures/:id" element={<SinglePicture />}></Route>
            </Route>
            <Route path="/*" element={<NotFound />}></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
