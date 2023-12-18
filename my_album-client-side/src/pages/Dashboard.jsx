import React from 'react';
import { Link } from 'react-router-dom';
import AuthButton from '../components/AuthButton';

const Dashboard = () => {
  return (
    <div>
      <div className="h-screen bg-red-100 py-11">
        <p className="text mx-auto w-1/4 text-center text-5xl font-bold">
          My Dashboard
        </p>
        <div className="container mx-auto  w-2/5 justify-between py-11">
          <p className="text-3xl font-bold">
            This is your personal space where you manage all of your features.
          </p>
          <p className="mt-5 text-3xl font-bold">
            Click on any of the links on the right and start your journey!
          </p>
          <div className="mt-5 flex justify-between gap-5">
            <Link to="/pictures">
              <AuthButton color="red" content="Pictures" />
            </Link>
            <Link>
              <AuthButton color="green" content="Messages" />
            </Link>
            <Link>
              <AuthButton color="yellow" content="Users" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
