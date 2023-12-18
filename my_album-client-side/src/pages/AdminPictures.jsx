import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
import fetchApi from '../utilities/fetchApi';
import AddNewPicture from '../components/AddNewPicture';
import Card from '../components/Card';

const AdminPictures = () => {
  const [pictures, setPictures] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPictures = async () => {
    try {
      const resp = await fetchApi('/admin/pictures');
      setPictures(resp.data);
      // console.log(resp);
    } catch (error) {
      console.log(error.message);
    }
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <div>
      <div className="bg-slate-200 lg:min-h-screen">
        <div className="container mx-auto w-full py-11">
          {isModalOpen && (
            <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
                {/* Contenuto del modale */}
                <div
                  id="default-modal"
                  tabIndex="-1"
                  aria-hidden="true"
                  className="relative max-h-full w-full max-w-2xl p-4"
                >
                  <button
                    onClick={closeModal}
                    type="button"
                    className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="default-modal"
                  >
                    <svg
                      class="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="flex w-full justify-between">
            <h1 className="text-center text-4xl font-bold">My Pictures</h1>
            <AddNewPicture></AddNewPicture>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {pictures.map((picture) => (
              <Card
                key={picture.id}
                title={picture.title}
                description={picture.description}
                image={picture.image}
                id={picture.id}
                openModal={openModal}
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPictures;
