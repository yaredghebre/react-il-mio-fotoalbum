import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Pictures = () => {
  const [pictures, setPictures] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/pictures')
      .then((response) => {
        setPictures(response.data.data);
      })
      .catch((error) => {
        console.error('Something went wrong while fetching pictures:', error);
      });
  }, []);

  return (
    <div>
      <div className="bg-green-200 lg:min-h-screen">
        <div className="container mx-auto w-full py-11">
          <h1 className="text-center text-4xl font-bold">ALL Pictures</h1>
          <div className="flex flex-wrap justify-center">
            {pictures.map((picture) => (
              <Link
                to={`/pictures/${picture.id}`}
                key={picture.id}
                class="transtion m-4 max-w-sm transform cursor-pointer rounded-lg border border-gray-200 bg-white shadow duration-150 hover:scale-105 hover:border-gray-400 hover:shadow-lg hover:shadow-gray-500 dark:border-gray-700 dark:bg-gray-800"
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

                <div class="p-5">
                  <a href="#">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {picture.title}
                    </h5>
                  </a>
                  <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {picture.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pictures;
