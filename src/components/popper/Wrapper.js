import React from "react";

const Wrapper = ({ className, style, children }) => {
  return (
    <div
      style={style}
      className={`${className} w-full max-h-[50vh] pt-2 rounded-lg shadow-indigo-500/40`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
