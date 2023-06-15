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
  font-weight: 600px;
  font-size: 18px;
  width: 100%;
  height: ${(props) => props.height || "70px"};
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    props.elementStyle === "b-white" &&
    css`
      color: ${(props) => props.theme.primary};
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
  ${(props) =>
    props.elementStyle === "blue" &&
    css`
      margin: 20px 0;
      background-color: #1d9bf0;
      box-shadow: rgba(0, 0, 0, 0.08) 0px 8px 28px;
    `}
    
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;

const Button = ({
  children,
  type = "button",
  onClick = () => {},
  center,
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <Loading></Loading> : children;
  if (to !== "" && typeof to === "string") {
    return (
      <NavLink to={to} className={center ? "flex justify-center" : null}>
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

export default Button;
