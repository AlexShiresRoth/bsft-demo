import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { LoadingSpinner } from "../../reusable-components/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import {
  authenticate,
  selectCustomer,
  setCustomerInfo,
} from "../../redux/customer.reducer";
import { LOAD_MY_ACCOUNT } from "../../graphql/queries/customer.queries";
import { io } from "socket.io-client";
import Orders from "./OrderComp";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  padding: 2rem 0;
`;

const HeadingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Avatar = styled.div`
  justify-content: center;
  border-radius: 900px;
  width: 50px;
  height: 50px;
`;

const socket = io("http://localhost:4000");

const HeadingComp = () => {
  const { error, loading, data, refetch } = useQuery(LOAD_MY_ACCOUNT);

  const customerState = useAppSelector(selectCustomer);

  const [newOrder, setNewOrder] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleNewOrder = (data: { email: string }) => {
    if (data.email === customerState.customer.email) {
      refetch();
      setNewOrder(true);
    }
  };

  socket.on("order", (data) => handleNewOrder(data));

  useEffect(() => {
    if (data) {
      dispatch(
        setCustomerInfo({
          name: `${data.getCustomerInfo.customer.firstname} ${data.getCustomerInfo.customer.lastname}`,
          email: data.getCustomerInfo.customer.email,
          orders: data.getCustomerInfo.customer.orders,
        })
      );
    }
  }, [data]);

  if (error) {
    return (
      <HeadingRow>
        <h1>{error.message}</h1>
      </HeadingRow>
    );
  }
  if (loading) {
    return (
      <HeadingRow>
        <LoadingSpinner />;
      </HeadingRow>
    );
  }
  return (
    <HeadingRow>
      <Row
        style={{
          padding: 0,
          overflow: "hidden",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Avatar>
          <img
            src="https://res.cloudinary.com/snackmanproductions/image/upload/v1642568968/budjit-app/02698d76-654f-4876-a8e9-41c8a0e9809e.jpg"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "900px",
              objectPosition: "center",
              border: "2px solid #fff",
              background: "#fff",
            }}
          />
        </Avatar>
        <p style={{ fontSize: "20px", fontWeight: "700", margin: ".2rem" }}>
          Welcome, {data.getCustomerInfo.customer.firstname}
        </p>
      </Row>
      <Orders orderList={customerState.customer.orders} newOrder={newOrder} />
    </HeadingRow>
  );
};

export default HeadingComp;
