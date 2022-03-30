import React, { useEffect } from "react";
import { DashComp } from "../page-components/dashboard/DashComp";
import Layout from "../reusable-components/Layout";

const dashboard = () => {
  return (
    <Layout>
      <DashComp />
    </Layout>
  );
};

export default dashboard;
