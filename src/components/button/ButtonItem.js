import React from "react";
import styled, { css } from "styled-components";
import { Loading } from "../loading";
import { NavLink } from "react-router-dom";

const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 0 25px;
  line-height: 1;
  color: white;
  border-radius: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: rgb(14 165 233);
  font-weight: 600px;
  font-size: 18px;
  height: ${(props) => props.height || "70px"};
  ${(props) =>
    props.elementStyle === "b-white" &&
    css`
      color: #000000c2;
      background-color: white;
    `}
  ${(props) =>
    props.elementStyle === "primary" &&
    css`
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `}

  
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
  &:hover {
    background-color: #f0f2f5;
  }
`;

const ButtonItem = ({
  children,
  type = "button",
  onClick = () => {},
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to}>
        <ButtonStyled type={type} {...props}>
          {child}
        </ButtonStyled>
      </NavLink>
    );
  }
  return (
    <ButtonStyled type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyled>
  );
};

export default ButtonItem;
