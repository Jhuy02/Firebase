import React from "react";
import Tippy from "@tippyjs/react";
import { useNavigate } from "react-router-dom";

const Header = ({ home, children, ...props }) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="Header w-[600px] max-w-[600px] border border-black-500">
      <div className="flex z-50 h-[55px] w-full grow items-center px-5 border border-black-500 fixed top-0 max-w-[599px] bg-[rgba(255, 255, 255, 0.85)] backdrop-blur-md">
        <h2 className="home leading-6 text-xl text-black font-bold">
          <span className="flex items-center cursor-pointer">
            {home && "Home"}
            {!home && (
              <Tippy content="Trở Về">
                <button
                  onClick={handleBack}
                  className="flex mr-2 w-[35px] h-[35px] items-center justify-center rounded-full hover:bg-slate-400"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
                    />
                  </svg>
                </button>
              </Tippy>
            )}
            {props.title}
          </span>
        </h2>
      </div>
      <div className="h-[55px]"></div>
      {children}
      {/* {home && (
        <>
          <PostAddNew></PostAddNew>
          <HomeNew></HomeNew>
        </>
      )}
      {props.title === "update" && <PostUpdate></PostUpdate>} */}
    </div>
  );
};

export default Header;
