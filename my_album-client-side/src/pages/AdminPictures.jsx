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
              ></Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPictures;
