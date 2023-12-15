import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <div>
      <Header></Header>
      <main className="min-h-[77vh] bg-slate-400 py-12">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default DefaultLayout;
