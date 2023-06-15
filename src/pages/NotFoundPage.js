import React from "react";
import Icon404 from "../components/icons/Icon404";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyled = styled.div`
  .emoji-404 {
    position: relative;
    animation: mymove 2.5s infinite;
  }

  @keyframes mymove {
    33% {
      top: 0px;
    }
    66% {
      top: 20px;
    }
    100% {
      top: 0px;
    }
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyled>
      <div className="bg-gray-100 h-screen justify-center">
        <center className="m-auto">
          <Icon404></Icon404>
          <div className=" tracking-widest mt-4">
            <span className="text-gray-500 text-6xl block">
              <span>4 0 4</span>
            </span>
            <span className="text-gray-500 text-xl">
              Sorry, We couldn't find what you are looking for!
            </span>
          </div>
        </center>
        <center className="mt-6">
          <NavLink
            to="/"
            className="text-gray-500 font-mono text-xl bg-gray-200 p-3 rounded-md hover:shadow-md"
          >
            Go back
          </NavLink>
        </center>
      </div>
    </NotFoundPageStyled>
  );
};

export default NotFoundPage;
