import React from 'react';
import { Link } from 'react-router-dom';
import AdminPictures from './AdminPictures';

const Dashboard = () => {
  return (
    <div>
      <p className="text mx-auto w-1/4 text-center text-4xl font-bold">
        this is YOUR DASHBOARD where you can do...
      </p>
      <Link to={'admin/AdminPictures'}>Pictures</Link>
    </div>
  );
};

export default Dashboard;
