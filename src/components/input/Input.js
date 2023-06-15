import React from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";

const InputStyled = styled.div`
  position: relative;
  width: 100%;
  input {
    outline: none;
    width: 100%;
    padding: ${(props) => (props.icon ? "20px 60px 20px 20px" : "20px")};
    background-color: ${(props) => (props.bgWhite ? "#ffffff" : "#e7ecf3")};
    font-weight: 500px;
    transition: all 0.2s linear;
    border: 1px solid transparent;
    border-radius: ${(props) => (props.search ? "9999px" : "10px")};
  }
  input:focus {
    background-color: white;
    border-color: ${(props) => (props.bgWhite ? "#ffffff" : "#2ebac1")};
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
    border-radius: 100rem;
  }
`;

const Input = ({
  name = "",
  type = "text",
  children,
  bgWhite,
  control,
  ...props
}) => {
  const { field } = useController({
    control,
    name,
    defaultValue: "",
  });
  return (
    <>
      {type === "file" ? (
        <div>
          <input
            id={name}
            type={type}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
            {...field}
            {...props}
          />
        </div>
      ) : (
        <InputStyled
          icon={children ? true : false}
          bgWhite={bgWhite ? true : false}
        >
          <input
            id={name}
            type={type}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            {...field}
            {...props}
          />
          {children ? (
            <div className="icon hover:bg-[#ababab]">{children}</div>
          ) : null}
        </InputStyled>
      )}
    </>
  );
};

export default Input;
