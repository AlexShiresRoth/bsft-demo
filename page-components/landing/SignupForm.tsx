import React, { useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import { TextInput } from "../../reusable-components/Inputs";

const Container = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 0;
  background-color: #222;
  position: relative;
`;

const Content = styled.div`
  width: 54%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const Title = styled.h1`
  color: ${(props) => props.color};
  margin: 0.2rem 0;
  font-size: 2.5rem;
`;

const Space = styled.div`
  width: 100%;
  height: 50%;
  background-color: #eee;
  display: block;
  bottom: 0;
  left: 0;
  position: absolute;
  z-index: 1;
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url("/images/guits.jpg");
  z-index: 0;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0.5;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 1px 10px #22222220;
  padding: 2rem;
  position: relative;
  z-index: 1;
`;

const SubmitButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${(props) => props.color};
  border: 0;
  color: #fff;
  font-weight: 700;
  border-radius: 120px;
  font-size: 1.5rem;
  margin-top: 1rem;
  align-self: flex-end;
  box-shadow: 0 0 0 4px ${(props) => props.color + "30"};
  &:hover {
    cursor: pointer;
  }
`;

type formData = {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  passwordTwo: string;
};

type InputParams = {
  label: string;
  name: string;
  isRequired: boolean;
  style: any;
  value: string;
  placeholderText: string;
  labelStyle: any;
};

//TODO create submit event and mutation
const SignupForm = () => {
  const [data, setFormData] = useState<formData>({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    passwordTwo: "",
  });

  const { firstname, lastname, phone, email, password, passwordTwo } = data;

  const handleInputChangeEvent = (e: React.FormEvent<HTMLInputElement>) =>
    setFormData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

  const inputStyle = {
    border: 0,
    color: Colors.text,
    padding: "1rem .4rem",
    margin: ".2rem 0",
    fontStyle: "italic",
    backgroundColor: Colors.main + "15",
    borderRadius: "5px",
    textIndex: "10px",
  };

  const labelStyle = {
    color: Colors.text,
    margin: "1rem 0 .2rem 0",
    fontWeight: "700",
  };

  const DATA: Array<InputParams> = [
    {
      label: "Enter your first name",
      name: "firstname",
      value: firstname,
      isRequired: true,
      style: inputStyle,
      placeholderText: "Enter your first name",
      labelStyle,
    },
    {
      label: "Enter your last name",
      name: "lastname",
      value: lastname,
      isRequired: true,
      style: inputStyle,
      placeholderText: "Enter your last name",
      labelStyle,
    },
    {
      label: "Enter your email",
      name: "email",
      value: email,
      isRequired: true,
      style: inputStyle,
      placeholderText: "enter your email",
      labelStyle,
    },
    {
      label: "Enter your phone",
      name: "phone",
      value: phone,
      isRequired: true,
      style: inputStyle,
      placeholderText: "enter your phone",
      labelStyle,
    },
    {
      label: "Create a password",
      name: "password",
      value: password,
      isRequired: true,
      style: inputStyle,
      placeholderText: "Create a password",
      labelStyle,
    },
    {
      label: "Confirm a password",
      name: "passwordTwo",
      value: passwordTwo,
      isRequired: true,
      style: inputStyle,
      placeholderText: "Confirm your password",
      labelStyle,
    },
  ];

  return (
    <Container>
      <Space />
      <Background />
      <Content>
        <Form>
          <Title color={Colors.text}>Signup and get started today!</Title>
          <span
            style={{
              display: "block",
              height: "3px",
              width: "400px",
              backgroundColor: Colors.main,
              marginBottom: "1rem",
            }}
          ></span>
          {DATA.map((inputObj: InputParams, index: number) => {
            const {
              name,
              style,
              labelStyle,
              label,
              value,
              isRequired,
              placeholderText,
            } = inputObj;
            return (
              <TextInput
                name={name}
                style={style}
                labelStyle={labelStyle}
                label={label}
                value={value}
                isRequired={isRequired}
                placeholderText={placeholderText}
                callback={handleInputChangeEvent}
                key={index}
              />
            );
          })}
          <SubmitButton color={Colors.main}>Signup!</SubmitButton>
        </Form>
      </Content>
    </Container>
  );
};

export default SignupForm;
