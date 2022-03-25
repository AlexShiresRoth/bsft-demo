import Link from "next/link";
import React, { useContext } from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";
import { FormContext } from "../pages";

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
  const handleScroll = () => {
    if (formRef?.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Main>
      <Nav color={Colors.main}>
        <NavContent>
          <NavCol>
            <NavTitle color="#fefefe">
              <Link href="/">
                <a>Guitar Fix</a>
              </Link>
            </NavTitle>
          </NavCol>
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
