import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchApi from '../utilities/fetchApi';
import axios from 'axios';
import Confirmation from './Confirmation';

const AddNewPicture = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    categories: [],
    userId: '',
    visible: true,
  });

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Something went wrong while fetching Users', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Something went wrong while fetching Categories', error);
      }
    };

    fetchUsers();
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const file = type === 'file' ? files[0] : null;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : file || value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('userId', formData.userId);
    formDataToSend.append('visible', formData.visible);

    formData.categories.forEach((categoryId) => {
      formDataToSend.append('categories[]', categoryId);
    });

    formDataToSend.append('image', formData.image);

    try {
      const response = await axios.post(
        'http://localhost:3000/admin/pictures',
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(response.data);
      setShowConfirmation(true);

      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/pictures');
      }, 3000);
    } catch (error) {
      console.error('Something went wrong while submitting the form', error);
    }
  };

  const handleCatChange = (e) => {
    const { value, checked } = e.target;
    console.log(value, checked);
    setFormData((prevFormData) => {
      if (checked) {
        return {
          ...prevFormData,
          categories: [...prevFormData.categories, parseInt(value)],
        };
      } else {
        return {
          ...prevFormData,
          categories: prevFormData.categories.filter(
            (categoryId) => categoryId !== parseInt(value),
          ),
        };
      }
    });
  };

  return (
    <div>
      {/* OFFCANVA */}
      {/* button */}
      <div className="text-center">
        <button
          className="group cursor-pointer outline-none duration-300 hover:rotate-90"
          type="button"
          title="Add New"
          data-drawer-target="drawer-right-example"
          data-drawer-show="drawer-right-example"
          data-drawer-placement="right"
          aria-controls="drawer-right-example"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="fill-none stroke-green-400 duration-300 group-hover:fill-green-800 group-active:fill-green-600 group-active:stroke-green-200 group-active:duration-0"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            ></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </button>
      </div>

      {/* drawer component */}
      <div
        id="drawer-right-example"
        className="fixed right-0 top-0 z-40 h-screen w-80 translate-x-full overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800"
        tabIndex="-1"
        aria-labelledby="drawer-right-label"
      >
        <h5
          id="drawer-right-label"
          className="mb-4 inline-flex items-center text-2xl font-semibold text-gray-500 dark:text-gray-400"
        >
          NEW PICTURE
        </h5>
        <button
          type="button"
          data-drawer-hide="drawer-right-example"
          aria-controls="drawer-right-example"
          className="absolute end-2.5 top-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="h-3 w-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>

        <div>
          {/* Form Body */}
          <form onSubmit={handleSubmit} className="">
            {/* Title */}
            <div className="mb-5">
              <label
                htmlFor="text"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:shadow-sm-light dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Insert the title of your picture"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="message"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Insert a description..."
              ></textarea>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <label
                htmlFor="categories"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Categories
              </label>
              {categories?.map((category) => (
                <div key={category.id} className="flex gap-3">
                  <input
                    type="checkbox"
                    id={category.id}
                    name="categories"
                    value={category.id}
                    checked={formData.categories.includes(category.id)}
                    onChange={handleCatChange}
                    className="block"
                  />
                  <label htmlFor={category.id} className="text-sm">
                    {category.name}
                  </label>
                </div>
              ))}
            </div>

            {/* Image */}
            <div className="mb-5">
              <label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Image
              </label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
              />
            </div>

            {/* User */}
            <div className="mb-5">
              <label
                htmlFor="users"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                User
              </label>
              <select
                id="users"
                name="userId"
                value={formData.userId}
                onChange={handleInputChange}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Visible */}
            <div className="mb-5">
              <label
                htmlFor="visible"
                className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Visible
              </label>
              <input
                type="checkbox"
                id="visible"
                name="visible"
                checked={formData.visible}
                onChange={handleInputChange}
                className="form-checkbox ml-2"
              />
            </div>
            <button
              type="submit"
              className="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Save
            </button>
          </form>
        </div>
        {showConfirmation && <Confirmation />}
      </div>
    </div>
  );
};

export default AddNewPicture;
