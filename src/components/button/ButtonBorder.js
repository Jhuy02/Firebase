import React from "react";

const ButtonBorder = ({ onClick = () => {}, ...props }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`cursor-pointer flex items-center justify-center border border-dashed w-10 h-10 rounded-full relative overflow-hidden transition-all hover:bg-slate-200 hover:w-24 group`}
      {...props}
    >
      <div className="flex ml-3 items-center text-center pointer-events-none group-hover:m-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6 text-blue-600 absolute group-hover:relative"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
          />
        </svg>
        <span className="mx-1 translate-x-[120%] group-hover:translate-x-0">
          tag
        </span>
      </div>
    </button>
  );
};

export default ButtonBorder;
