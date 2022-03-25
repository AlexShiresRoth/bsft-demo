import React, { Dispatch, SetStateAction } from "react";
import styled, { keyframes } from "styled-components";
import Colors from "../constants/Colors";
import { MdErrorOutline } from "react-icons/md";
import { AiOutlineCheckCircle } from "react-icons/ai";

const slideIn = keyframes`
0%{
    transform:translateY(20vh);
}
80% {
    transform:translateY(-4vh);
}
100% {
    transform:translateY(0);
}`;

const AlertContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: transparent;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 0;
  z-index: 999;
  animation: ${slideIn} 0.5s linear forwards;
`;

const Content = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background-color: #222;
  border: 4px solid ${(props) => props.color};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Message = styled.h2`
  color: #fff;
  font-weight: 100;
  margin: 0.2rem 0;
`;

export type AlertParams = {
  message: string;
  status: "danger" | "success";
  callback: any;
};

export const Alert = ({ message, status, callback }: AlertParams) => {
  return (
    <AlertContainer>
      <Content
        color={status === "danger" ? "#EB5E55" : Colors.secondary}
        onClick={callback}
      >
        {status === "danger" ? (
          <MdErrorOutline
            color="#EB5E55"
            size={24}
            style={{ marginRight: "10px" }}
          />
        ) : (
          <AiOutlineCheckCircle
            color={Colors.secondary}
            size={24}
            style={{ marginRight: "10px" }}
          />
        )}
        <Message>{message}</Message>
      </Content>
    </AlertContainer>
  );
};
