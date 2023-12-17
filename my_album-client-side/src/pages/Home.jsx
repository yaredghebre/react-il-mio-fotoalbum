import React, { useState, useEffect } from 'react';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import homeCover1 from '../assets/placeHolders/homeCover1.jpg';
import homeCover6 from '../assets/placeHolders/homeCover6.jpg';
import homeCover7 from '../assets/placeHolders/homeCover7.jpg';
import '../css/styles.modules.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
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
      <Parallax pages={2}>
        <ParallaxLayer
          offset={0}
          speed={1}
          className="flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(${homeCover6})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
          }}
        >
          <h2 className="text-5xl font-bold text-white">
            Welcome to My Photo Album
          </h2>
        </ParallaxLayer>
        <ParallaxLayer
          offset={1}
          speed={1}
          className="flex items-center justify-center"
          style={{}}
        >
          <div className="h-screen w-full bg-black">
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
        </ParallaxLayer>
      </Parallax>

      <div className="h-screen w-full bg-black"></div>
    </div>
  );
};

export default Home;
