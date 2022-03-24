import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Colors from "../../constants/Colors";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Box = styled.div`
  width: 60%;
  background-color: #fff;
  padding: 2rem;
  margin-top: -3rem;
  box-shadow: 0 1px 10px #22222220;
  border-radius: 10px;
`;

const Title = styled.h2`
  color: ${(props) => props.color};
  font-weight: 700;
  font-size: 2rem;
  margin: 0.5rem 0;
`;

const Text = styled.p`
  color: ${(props) => props.color};
`;

const Divider = styled.span`
  height: 5px;
  background-color: ${(props) => props.color};
  width: 200px;
  display: block;
`;
const About = () => {
  return (
    <Container>
      <Content>
        <Box>
          <Title color={Colors.text}>How It Works</Title>
          <Divider color={Colors.main} />
          <Text>
            Every month we curate a personalized guitar or accessories based
            upon your preferences and mail it to you! You can either keep it or
            return it for no charge!
          </Text>
          <Text>Is It Expensive? You bet it is!</Text>
        </Box>
      </Content>
    </Container>
  );
};

export default About;
