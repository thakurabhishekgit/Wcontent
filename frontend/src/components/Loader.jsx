// Loader.js
import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderContainer>
      <LoaderCircle />
      <LoaderText>Predicting... Giving best response</LoaderText>
      <LoaderText>Almost there... providing optimal careers</LoaderText>
    </LoaderContainer>
  );
};

// Styled components for Loader
const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const LoaderCircle = styled.div`
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 60px;
  height: 60px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoaderText = styled.p`
  font-size: 16px;
  color: #333;
  margin: 5px 0;
`;

export default Loader;
