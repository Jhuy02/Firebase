import React, { useEffect } from "react";
import Sidebar from "../components/layout/Sidebar";
import Layout from "../components/layout/Layout";
import PostAddNew from "../module/post/PostAddNew";
import HomeNew from "../module/home/HomeNew";

const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  });
  return (
    <div className="flex w-[1180px] m-auto">
      <Sidebar></Sidebar>
      <Layout home>
        <>
          <PostAddNew></PostAddNew>
          <HomeNew></HomeNew>
        </>
      </Layout>
      {/* <HomeBanner></HomeBanner>
      <HomeMenu></HomeMenu>
      <HomeFeature></HomeFeature>
      <HomeNewest></HomeNewest> */}
    </div>
  );
};

export default HomePage;
