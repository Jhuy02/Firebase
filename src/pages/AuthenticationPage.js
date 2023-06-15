import React from "react";
import styled from "styled-components";

const AuthenticationPageStyled = styled.div`
  min-height: 100vh;
  padding: 40px;
  background-color: #ffffff;
  .logo {
    margin: 0 auto 20px;
  }
  .heading {
    text-align: center;
    color: ${(props) => props.theme.primary};
    font-weight: bold;
    font-size: 40px;
    margin-bottom: 60px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;

const AuthenticationPage = ({ children }) => {
  return (
    <AuthenticationPageStyled>
      <div className="container">
        <img srcSet="/logo-signup.png 2x" alt="logo" className="logo" />
        <h1 className="heading">New Bloging</h1>
      </div>
      {children}
    </AuthenticationPageStyled>
  );
};

export default AuthenticationPage;
