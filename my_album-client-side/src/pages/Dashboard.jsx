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
        <div className="container mx-auto flex w-2/5 justify-between py-11">
          <p className="text-3xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            distinctio accusantium error pariatur voluptatum modi. Et obcaecati
            sed ullam porro ad neque cum corporis, quisquam odit itaque
            consequuntur ut voluptates. Lorem ipsum dolor sit amet consectetur
            adipisicing elit.
          </p>
          <div className=" flex flex-col justify-between gap-5">
            <Link to="/pictures">
              <AuthButton color="red" content="Pictures" />
            </Link>
            <Link to="/pictures">
              <AuthButton color="green" content="Pictures" />
            </Link>
            <Link to="/pictures">
              <AuthButton color="red" content="Pictures" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
