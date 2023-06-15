import React from "react";
import styled from "styled-components";

const InputStyled = styled.div`
  position: relative;
  width: 100%;
  input {
    outline: none;
    width: 100%;
    padding: ${(props) => (props.icon ? "20px 60px 20px 20px" : "20px")};
    background-color: #e7ecf3;
    font-weight: 500px;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    border-radius: 9999px;
  }
  input:focus {
    background-color: white;
    border-color: #2ebac1;
  }

  input::-webkit-input-placeholder {
    color: #84878b;
  }
  input::-moz-input-placeholder {
    color: #84878b;
  }

  .icon {
    display: flex;
    position: absolute;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    height: 50px;
    width: 50px;
  }
`;

const InputSearch = ({
  name = "",
  type = "text",
  children,
  control,
  ...props
}) => {
  return (
    <>
      <InputStyled icon={children ? true : false}>
        <input
          id={name}
          type={type}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          {...props}
        />
        {children ? <div className="icon">{children}</div> : null}
      </InputStyled>
    </>
  );
};

export default InputSearch;
