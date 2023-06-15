import React from "react";
import Header from "./Header";
import HeaderSearch from "./HeaderSearch";

const Layout = ({ home, children, ...props }) => {
  return (
    <div className="layout flex justify-between w-full">
      <Header home={home} {...props}>
        {children}
      </Header>
      <HeaderSearch></HeaderSearch>
    </div>
  );
};

export default Layout;
