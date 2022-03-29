import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAppSelector } from "../hooks/reduxHook";
import { DashComp } from "../page-components/dashboard/DashComp";
import { selectCustomer } from "../redux/customer.reducer";
import Layout from "../reusable-components/Layout";

const dashboard = () => {
  const customerState = useAppSelector(selectCustomer);
  const router = useRouter();

  useEffect(() => {
    if (!customerState.customer.isAuthenticated) {
      router.push("/");
    }
  }, [customerState.customer.isAuthenticated]);
  return (
    <Layout>
      <DashComp />
    </Layout>
  );
};

export default dashboard;
