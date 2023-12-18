import React from 'react';
import checkImage from '../assets/check.gif';

const Confirmation = () => {
  return (
    <div className="fixed inset-0 mx-auto my-auto flex h-1/2 w-1/2 items-center justify-center bg-black/50">
      <div className="w-full rounded-xl border-4 border-gray-500 bg-white">
        <p className="text-center text-5xl font-bold text-green-500">
          POST CREATO CON SUCCESSO!
        </p>
        <img
          className="mx-auto max-w-full object-cover"
          src={checkImage}
          alt=""
        />
      </div>
    </div>
  );
};

export default Confirmation;
