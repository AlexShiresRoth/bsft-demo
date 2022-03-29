import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import { AUTHENTICATE } from "../../graphql/mutations/customer.mutation";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { authenticate, selectCustomer } from "../../redux/customer.reducer";
import { Alert } from "../../reusable-components/Alert";
import { TextInput } from "../../reusable-components/Inputs";
import { LoadingSpinner } from "../../reusable-components/LoadingSpinner";

const Section = styled.section`
  width: 100%;
  padding: 4rem 0;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Form = styled.form`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 0;
  background-color: #fff;
  box-shadow: 0 1px 20px #eeeeee20;
  padding: 2rem;
  border-radius: 5px;
`;

const FormContent = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
`;

const LoginButton = styled.button`
  padding: 1rem 2rem;
  background-color: ${(props) => props.color};
  border: 0;
  color: #fff;
  font-weight: 700;
  border-radius: 120px;
  font-size: 1.2rem;
  margin-top: 1rem;
  align-self: flex-end;
  box-shadow: 0 0 0 4px ${(props) => props.color + "30"};
  &:hover {
    cursor: pointer;
  }
`;

type InputParams = {
  label: string;
  name: string;
  isRequired: boolean;
  style: any;
  value: string;
  placeholderText: string;
  labelStyle: any;
  type: string;
};

export const LoginSection = () => {
  const [data, setFormData] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState<string>("");

  const router = useRouter();

  const customerState = useAppSelector(selectCustomer);

  const handleInputChangeEvent = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>
  ) => setFormData({ ...data, [e.currentTarget.name]: e.currentTarget.value });

  const { email, password } = data;

  const dispatch = useAppDispatch();

  const [login, { error, data: loginData, loading }] =
    useMutation(AUTHENTICATE);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLElement>
  ) => {
    e.preventDefault();

    try {
      const request = await login({
        variables: {
          input: {
            email,
            password,
          },
        },
      });

      console.log("request", request.data);
      if (request.data.login.token) {
        dispatch(authenticate({ token: request.data.login.token }));
      }
    } catch (error) {
      console.error(error);

      return error;
    }
  };

  //set an alert depending on error
  useEffect(() => {
    if (error) {
      setAlert(error.message);
    }
  }, [error]);

  //navigate user to dashboard if authentication is successful
  useEffect(() => {
    if (customerState.customer.isAuthenticated) {
      router.push("/dashboard");
    }
  }, [customerState.customer.isAuthenticated]);

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
    fontWeight: "400",
  };

  const DATA = [
    {
      label: "Enter your email",
      name: "email",
      value: email,
      isRequired: true,
      style: inputStyle,
      placeholderText: "enter your email",
      labelStyle,
      type: "text",
    },

    {
      label: "Enter your password",
      name: "password",
      value: password,
      isRequired: true,
      style: inputStyle,
      placeholderText: "Enter your password",
      labelStyle,
      type: "password",
    },
  ];

  return (
    <Section>
      {alert !== "" && (
        <Alert
          message={error?.message || ""}
          status="danger"
          callback={() => setAlert("")}
        />
      )}
      <Form onSubmit={(e) => handleSubmit(e)}>
        <h1>Welcome back, please login to continue</h1>
        <FormContent>
          {DATA.map((inputData: InputParams, index: number) => {
            const {
              name,
              style,
              labelStyle,
              label,
              value,
              isRequired,
              placeholderText,
              type,
            } = inputData;
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
                type={type}
              />
            );
          })}
        </FormContent>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <LoginButton
            color={Colors.main}
            onClick={(e) => handleSubmit(e)}
            onSubmit={(e) => handleSubmit(e)}
          >
            Login
          </LoginButton>
        )}
      </Form>
    </Section>
  );
};
