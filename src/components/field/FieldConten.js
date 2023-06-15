import React from "react";

const FieldConten = ({ children, className, onClick = () => {} }) => {
  return (
    <span
      onClick={onClick}
      className={`${className} flex my-0 w-full cursor-pointer font-normal`}
    >
      {children}
    </span>
  );
};

export default FieldConten;
