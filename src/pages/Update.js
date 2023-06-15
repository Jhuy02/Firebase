import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../components/layout/Layout";
import PostUpdate from "../module/post/PostUpdate";

const Update = () => {
  useEffect(() => {
    document.title = "Update";
  });
  return (
    <div className="flex w-[1180px] m-auto">
      <Sidebar></Sidebar>
      <Layout title="Update">
        <PostUpdate></PostUpdate>
      </Layout>
    </div>
  );
};

export default Update;
