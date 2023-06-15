import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../components/layout/Layout";
import ThreadPost from "../module/home/ThreadPost";

const ThreadItem = () => {
  useEffect(() => {
    document.title = "Thread";
  });
  return (
    <div className="flex w-[1180px] m-auto">
      <Sidebar></Sidebar>
      <Layout title="Thread">
        <ThreadPost></ThreadPost>
      </Layout>
    </div>
  );
};

export default ThreadItem;
