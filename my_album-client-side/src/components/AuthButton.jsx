import React from 'react';

const AuthButton = ({ color, content }) => {
  const buttonColor = `text-${color}-500`;
  const buttonBorder = `border-${color}-500`;
  const bgColor = `bg-${color}-500`;
  return (
    <div>
      <button
        className={`z-100 ${buttonBorder} group relative cursor-pointer overflow-hidden border px-8 py-2 font-semibold`}
      >
        <span
          className={`${buttonColor} relative z-10 text-xl duration-500 group-hover:text-white`}
        >
          {content}
        </span>
        <span
          className={`${bgColor} absolute -left-32 top-0 h-full w-full -rotate-45 duration-500 group-hover:left-0 group-hover:rotate-0`}
        ></span>
        <span
          className={`${bgColor} absolute -right-32 top-0 h-full w-full -rotate-45 duration-500 group-hover:right-0 group-hover:rotate-0`}
        ></span>
      </button>
    </div>
  );
};

export default AuthButton;
