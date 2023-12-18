import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import fetchApi from '../utilities/fetchApi';

const SinglePicture = () => {
  const { id } = useParams();
  const [picture, setPicture] = useState(null);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(picture);

  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users');
      //   console.log(response);
      setUsers(response.data.users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  const getUserById = (userId) => {
    const user = users.find((user) => user.id === userId);
    console.log(user);
    return user ? user.name : '';
  };

  const getPicture = async (id) => {
    try {
      const resp = await fetchApi(`/admin/pictures/${id}`);
      setPicture(resp.data);
      console.log(resp.data);
    } catch (error) {
      console.log('Error fetching picture:', error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await Promise.all([getPictureById(), getUsers()]);
        await getUsers();
        await getPicture(id);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading || !picture) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center bg-blue-200 lg:min-h-screen">
      <div className="min-w-[500px] rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
        <div className="relative block w-full overflow-hidden rounded-t-lg">
          <img
            className="w-full rounded-t-lg object-cover"
            src={picture.image}
            alt={picture.title}
          />
        </div>
        <div className="p-10">
          <h1 className="text-5xl font-bold">{picture.title}</h1>
          <div className="p-5">
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Description: {picture.description}
            </p>
            <p>User: {getUserById(picture.userId)}</p>
            <ul>
              Categories:
              {picture.categories?.map((category, index) => (
                <span key={index}>
                  {category.name}
                  {index !== picture.categories.length - 1 ? ', ' : ''}
                </span>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePicture;
