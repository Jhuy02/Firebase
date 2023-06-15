import React from "react";
import styled from "styled-components";

const LabelStyled = styled.label`
  color: #000;
  font-weight: 600px;
  cursor: pointer;
`;

const Label = ({ htmlFor = "", children, ...props }) => {
  return (
    <LabelStyled htmlFor={htmlFor} {...props}>
      {children}
    </LabelStyled>
  );
};

export default Label;
