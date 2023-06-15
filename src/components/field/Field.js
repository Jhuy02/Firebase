import React from "react";
import styled from "styled-components";

const FieldStyled = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  row-gap: 20px;
  margin-bottom: 40px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const Field = ({ children, ...props }) => {
  return <FieldStyled {...props}>{children}</FieldStyled>;
};

export default Field;
