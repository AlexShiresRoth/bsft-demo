import Link from "next/link";
import React from "react";
import styled from "styled-components";
import Colors from "../constants/Colors";

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
export type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <Main>
      <Nav color={Colors.main}>
        <NavContent>
          <NavCol>
            <NavTitle color="#fefefe">Guitar Fix</NavTitle>
          </NavCol>
          <NavCol>
            <Link href="/">
              <a style={{ color: "#fff", margin: "0 .5rem " }}>Login</a>
            </Link>
            <span style={{ color: "#fff", margin: "0 .5rem " }}>|</span>
            <Link href="/">
              <a style={{ color: "#fff", margin: "0 .5rem " }}>Signup</a>
            </Link>
          </NavCol>
        </NavContent>
      </Nav>
      {children}
    </Main>
  );
};

export default Layout;
