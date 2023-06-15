import React from "react";

const ListTag = ({ data }) => {
  if (!data || !data.id) return null;
  return (
    <div className="px-3 py-4 text-sm font-normal hover:bg-[#00000008]">
      {data.tag}
    </div>
  );
};

export default ListTag;
