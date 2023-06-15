import React from "react";

const PostItem = (data) => {
  return (
    <div className="flex mb-1 items-center py-1 px-4 cursor-pointer hover:bg-slate-300">
      {data?.data?.image && (
        <img
          className="w-10 h-10 min-w-[40px] object-cover rounded-[50%]"
          src={data?.data?.image}
          alt="Hoaa"
        />
      )}
      <div className="flex ml-3">
        <h4 className="text-base font-medium flex">
          <span className="max-h-[50px] overflow-hidden">
            {data?.data?.content}
          </span>
        </h4>
      </div>
    </div>
  );
};

export default PostItem;
