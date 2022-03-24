import React from "react";
import styled from "styled-components";
import { VscAccount, VscCalendar } from "react-icons/vsc";
import { GiGuitar } from "react-icons/gi";
import Colors from "../../constants/Colors";
const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
`;

const Content = styled.div`
  width: 54%;
  display: grid;
  justify-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 1rem;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0.2rem 0;
  text-align: center;
  margin-top: 1rem;
`;
const Text = styled.p`
  margin: 0.2rem 0;
  text-align: center;
  color: #666;
`;

const Steps = () => {
  return (
    <Container>
      <Content>
        <Column>
          <VscAccount color={Colors.main} size={60} />

          <Title>Step 1</Title>
          <Text>Create an account & select your preferences</Text>
        </Column>
        <Column>
          <VscCalendar color={Colors.main} size={60} />
          <Title>Step 2</Title>
          <Text>Select frequency of subscription</Text>
        </Column>
        <Column>
          <GiGuitar color={Colors.main} size={60} />
          <Title>Step 3</Title>
          <Text>
            Play around with you new guitar, you have a week to return it
          </Text>
        </Column>
      </Content>
    </Container>
  );
};

export default Steps;
