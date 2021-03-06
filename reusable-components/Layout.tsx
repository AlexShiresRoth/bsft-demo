import { useMutation } from "@apollo/client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { UPDATE_CUSTOMER } from "../graphql/mutations/customer.mutation";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { FormContext } from "../pages";
import { selectCustomer, signout } from "../redux/customer.reducer";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 5rem;
  background-color: ${(props) => props.color};
`;
const NavContent = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NavCol = styled.div`
  display: flex;
  align-items: center;
`;

const NavTitle = styled.h1`
  color: ${(props) => props.color};
`;

const Main = styled.main`
  width: 100%;
`;

const FakeLink = styled.p`
  &:hover {
    cursor: pointer;
  }
`;

const Footer = styled.footer`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 2rem 0;
`;
const FooterContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  & h1 {
    font-size: 1.5rem;
  }
  & a {
    margin: 0.5rem 0;
  }
`;

export type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  const { formRef } = useContext(FormContext);

  const router = useRouter();

  const handleScroll = () => {
    if (formRef?.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const customerState = useAppSelector(selectCustomer);

  const dispatch = useAppDispatch();

  const handleSignout = () => {
    //remove auth credentials
    dispatch(signout());
    //route back to landing
    router.push("/");
  };

  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const updateCustomerWithOSID = async (id: string) => {
    try {
      if (id) {
        const request = await updateCustomer({
          variables: {
            input: {
              custom_field_key: "onesignal_webpush_id",
              custom_field_value: id,
            },
          },
        });
        console.log("request", request.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("osId")) {
        const id = window.localStorage.getItem("osId") || "";
        if (id !== "") updateCustomerWithOSID(id);
      }
    }
  }, []);

  return (
    <Main>
      <Nav color={Colors.main}>
        <NavContent>
          <NavCol>
            <NavTitle color="#fefefe">
              <Link
                href={
                  customerState.customer.isAuthenticated ? "/dashboard" : "/"
                }
              >
                <a>Guitar Fix</a>
              </Link>
            </NavTitle>
          </NavCol>
          {!customerState.customer.isAuthenticated ? (
            <NavCol>
              <Link href="/login">
                <a style={{ color: "#fff", margin: "0 .5rem " }}>Login</a>
              </Link>
              <span style={{ color: "#fff", margin: "0 .5rem " }}>|</span>

              <FakeLink
                style={{ color: "#fff", margin: "0 .5rem " }}
                onClick={() => handleScroll()}
              >
                Signup
              </FakeLink>
            </NavCol>
          ) : (
            <NavCol>
              <Link href="/account">
                <a style={{ color: "#fff", margin: "0 .5rem " }}>Account</a>
              </Link>
              <span style={{ color: "#fff", margin: "0 .5rem " }}>|</span>

              <FakeLink
                style={{ color: "#fff", margin: "0 .5rem " }}
                onClick={() => handleSignout()}
              >
                Sign Out
              </FakeLink>
            </NavCol>
          )}
        </NavContent>
      </Nav>
      {children}
      <Footer>
        <FooterContent>
          <Column>
            <h2>GuitarFix.com</h2>
          </Column>
          <Column>
            <h1>RESOURCES</h1>
            <Link href={"/"}>
              <a>Privacy Policy</a>
            </Link>
            <Link href={"/"}>
              <a>Terms & Conditions</a>
            </Link>
            <Link href={"/"}>
              <a>Contact Us</a>
            </Link>
          </Column>
          <Column>
            <h1>OTHER RESOURCES</h1>
            <Link href={"/"}>
              <a>Privacy Policy</a>
            </Link>
            <Link href={"/"}>
              <a>Terms & Conditions</a>
            </Link>
            <Link href={"/"}>
              <a>Contact Us</a>
            </Link>
          </Column>
          <Column>
            <h1>RESOURCES?</h1>
            <Link href={"/"}>
              <a>Privacy Policy</a>
            </Link>
            <Link href={"/"}>
              <a>Terms & Conditions</a>
            </Link>
            <Link href={"/"}>
              <a>Contact Us</a>
            </Link>
          </Column>
        </FooterContent>
      </Footer>
    </Main>
  );
};

export default Layout;
