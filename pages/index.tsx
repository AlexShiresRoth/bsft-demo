import type { NextPage } from "next";
import About from "../page-components/landing/About";

import Hero from "../page-components/landing/Hero";
import SignupForm from "../page-components/landing/SignupForm";
import Steps from "../page-components/landing/Steps";
import Layout from "../reusable-components/Layout";

const Home: NextPage = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Steps />
      <SignupForm />
    </Layout>
  );
};

export default Home;
