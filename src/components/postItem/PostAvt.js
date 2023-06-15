import React from "react";

const PostAvt = ({ data }) => {
  return (
    <div className="w-12 h-12 mx-2 rounded-full object-cover">
      <img
        src={data?.imageUser?.imageAvt || "/user-avt.png"}
        alt=""
        className="w-full h-full rounded-full object-cover"
      />
    </div>
  );
};

export default PostAvt;
