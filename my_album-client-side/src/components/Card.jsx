import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import fetchApi from '../utilities/fetchApi';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';

const Card = ({ title, description, image, id }) => {
  return (
    <div>
      <div className="flex w-full">
        <div className="group relative flex max-w-sm flex-col items-center overflow-hidden rounded-xl p-4 text-center shadow-xl transition-all duration-500 hover:shadow-2xl">
          <div className="text-gray-500 transition-all group-hover:scale-105"></div>
          <div className="min-w-[150px] transition-all delay-200 duration-500 group-hover:pb-10">
            <img src={image} alt={title} />
            <h1 className="font-semibold text-gray-700">{title}</h1>
          </div>
          <div className="absolute -bottom-full flex w-full items-center justify-evenly gap-2 transition-all delay-200 duration-500 group-hover:bottom-3">
            <div className="flex gap-3 rounded-full bg-gray-700 p-1 text-2xl text-white shadow-sm transition-all delay-200 duration-200 hover:p-2">
              <Link to={`/pictures/${id}`}>
                <SearchIcon />
              </Link>
              <Link to={'/editpicture'}>
                <ModeEditIcon />
              </Link>
              <Link>
                <DeleteIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
