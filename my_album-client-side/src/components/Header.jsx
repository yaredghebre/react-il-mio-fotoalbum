import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import AuthButton from './AuthButton';

const NavBarLink = ({ href, onClick, children }) => {
  return (
    <Link
      to={href}
      onClick={onClick}
      className="font-bold transition-all duration-300 hover:bg-gray-100 hover:text-red-500"
    >
      {children}
    </Link>
  );
};

const Header = () => {
  const { handleLogOut, isLogged } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogged) {
      // navigate('/dashboard');
    }
  }, [isLogged, navigate]);

  return (
    <div>
      <nav className="border-gray-200 bg-white dark:bg-gray-900">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white ">
              <button className="group relative z-10 h-12 w-32 cursor-pointer overflow-hidden rounded-md border-none bg-black p-2 text-xl font-bold text-white">
                My Album
                <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-1000 group-hover:scale-x-100 group-hover:duration-500"></span>
                <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-indigo-400 transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-700"></span>
                <span className="absolute -left-2 -top-8 h-32 w-36 origin-left rotate-12 scale-x-0 transform bg-indigo-600 transition-transform duration-500 group-hover:scale-x-50 group-hover:duration-1000"></span>
                <span className="absolute left-6 top-2.5 z-10 opacity-0 duration-100 group-hover:opacity-100 group-hover:duration-1000">
                  My Album
                </span>
              </button>
            </span>
          </Link>
          <button
            data-collapse-toggle="navbar-dropdown"
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-dropdown"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900">
              {isLogged ? (
                <li className="flex gap-3">
                  <NavBarLink onClick={handleLogOut}>
                    <AuthButton color="red" content="Log Out" />
                  </NavBarLink>

                  <NavBarLink onClick={() => navigate('/dashboard')}>
                    <AuthButton color="pink" content="Dashboard" />
                  </NavBarLink>
                </li>
              ) : (
                <Link to="/login">
                  <AuthButton color="green" content="Log In" />
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
