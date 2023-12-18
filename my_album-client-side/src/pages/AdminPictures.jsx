import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import fetchApi from '../utilities/fetchApi';
import AddNewPicture from '../components/AddNewPicture';
import Card from '../components/Card';

const AdminPictures = () => {
  const [pictures, setPictures] = useState([]);

  const getPictures = async () => {
    try {
      const resp = await fetchApi('/admin/pictures');
      setPictures(resp.data);
      // console.log(resp);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPictures();
  }, []);

  return (
    <div>
      <div className="bg-slate-200 lg:min-h-screen">
        <div className="container mx-auto w-full py-11">
          <div className="flex w-full justify-between">
            <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
            <AddNewPicture></AddNewPicture>
          </div>
          <div className="flex flex-wrap justify-center">
            {pictures.map((picture) => (
              <Link
                to={`/pictures/${picture.id}`}
                key={picture.id}
                className="transtion m-4 max-w-sm transform cursor-pointer rounded-lg border border-gray-200 bg-white shadow duration-150 hover:scale-105 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500 dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative block max-h-[150px] w-full max-w-[250px] overflow-hidden rounded-t-lg">
                  {!picture.image && (
                    <p className="absolute left-1/2 top-1/2 z-10 w-full -translate-x-1/2 -translate-y-1/2 transform py-2 text-center text-xl font-bold uppercase text-red-500">
                      Image Unavailable
                    </p>
                  )}
                  <img
                    className="w-full rounded-t-lg object-cover"
                    src={picture.image}
                    alt={picture.title}
                  />
                </div>

                <div className="p-5">
                  <a href="#">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {picture.title}
                    </h5>
                  </a>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {picture.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
          <Card></Card>
        </div>
      </div>
    </div>
  );
};

export default AdminPictures;
