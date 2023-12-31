import React from "react";
import styled from "styled-components";

const LoadingStyled = styled.div`
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  border: ${(props) => props.borderSize} solid white;
  border-top: ${(props) => props.borderSize} solid transparent;
  border-bottom: ${(props) => props.borderSize} solid transparent;
  border-radius: 100rem;
  display: inline-block;
  animation: sipnner 1s infinite linear;
  @keyframes sipnner {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loading = ({ size = "40px", borderSize = "5px" }) => {
  return <LoadingStyled size={size} borderSize={borderSize}></LoadingStyled>;
};

export default Loading;
