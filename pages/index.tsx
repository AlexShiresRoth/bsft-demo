import type { NextPage } from "next";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import ClientOnly from "../components/ClientOnly";
import About from "../page-components/landing/About";
import Hero from "../page-components/landing/Hero";
import SignupForm from "../page-components/landing/SignupForm";
import Steps from "../page-components/landing/Steps";
import Layout from "../reusable-components/Layout";

export type FormType = {
  formRef: React.RefObject<HTMLElement> | null;
  setFormRef: (ref: any) => void;
};

export const FormContext = React.createContext<FormType>({
  formRef: null,
  setFormRef: (ref: any) => {},
});

const Home: NextPage = () => {
  const [formRef, setFormRef] = useState<React.RefObject<HTMLElement> | null>(
    null
  );

  return (
    <FormContext.Provider value={{ formRef, setFormRef }}>
      <Layout>
        <Hero />
        <About />
        <Steps />
        <ClientOnly>
          <SignupForm />
        </ClientOnly>
      </Layout>
    </FormContext.Provider>
  );
};

export default Home;
