import React from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";

const Spin = keyframes`
0% {
    transform:rotate(0deg);
}
100% {
    transform:rotate(360deg);
}`;

const Spinner = styled.div`
  height: 30px;
  width: 30px;
  display: block;
  border: 5px solid #eee;
  border-bottom-color: ${(props) => props.color};
  animation: ${Spin} 0.5s linear infinite;
  border-radius: 900px;
  margin: 2rem 0;
`;

export const LoadingSpinner = () => <Spinner color={Colors.main} />;
