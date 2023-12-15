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

// Middlewares
import GuestRoutes from './middlewares/GuestRoutes';
import PrivateRoutes from './middlewares/PrivateRoutes';

// Contexts
import AuthProvider from './contexts/AuthProvider';

// Components
// import Header from './components/Header';
// import Footer from './components/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* PUBLIC ROUTE */}
            <Route element={<DefaultLayout />}>
              <Route path="/" element={<Home />}></Route>
              <Route
                path="/login"
                element={
                  <GuestRoutes>
                    <Login />
                  </GuestRoutes>
                }
              ></Route>
            </Route>

            {/* PRIVATE ROUTE */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoutes>
                  <DefaultLayout />
                </PrivateRoutes>
              }
            >
              <Route index element={<Dashboard />}></Route>
              <Route path="/dashboard/user" element={<Dashboard />}></Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
