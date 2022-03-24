import React from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";

const Container = styled.header`
  width: 100%;
  min-height: 50vh;
  display: flex;
  background-image: url("/images/guitar-hero.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  justify-content: center;
  padding: 4rem 0 6rem 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #fff;
  text-align: center;
  font-weight: 700;
  margin: 0.5rem 0;
`;

const Subheading = styled.h3`
  font-size: 1.5rem;
  color: #eee;
  text-align: center;
  font-weight: 400;
  margin: 0.5rem 0;
`;

const Btn = styled.button`
  padding: 1rem 2rem;
  border: 2px solid ${(props) => props.color};
  background: transparent;
  border-radius: 120px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  width: 200px;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 1rem 0;
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.color};
  }
`;

const Hero = () => {
  return (
    <Container>
      <Content>
        <Title>Welcome to Guitar Fix</Title>
        <Subheading>
          Signup to get a guitar or accessories mailed to you every month.
        </Subheading>
        <Btn color={Colors.main}>Signup</Btn>
      </Content>
    </Container>
  );
};

export default Hero;
