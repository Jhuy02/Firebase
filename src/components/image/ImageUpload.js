import React from "react";
import PropTypes from "prop-types";
import IconImage from "../icons/IconImage";

const ImageUpload = (props) => {
  const { name, className = "", style, ...rest } = props;
  return (
    <label
      style={style}
      className={`cursor-pointer flex items-center justify-center border border-dashed w-10 h-10 rounded-full ${className} relative overflow-hidden transition-all hover:bg-slate-200 hover:w-24 group`}
    >
      <input
        type="file"
        name={name}
        className="hidden-input"
        onChange={() => {}}
        {...rest}
      />
      <div className="flex ml-4 items-center text-center pointer-events-none group-hover:m-0">
        <IconImage className="text-blue-600 absolute group-hover:relative"></IconImage>
        <span className="mx-1 translate-x-[120%] group-hover:translate-x-0">
          Ảnh
        </span>
      </div>
    </label>
  );
};
ImageUpload.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  progress: PropTypes.number,
  image: PropTypes.string,
};
export default ImageUpload;
