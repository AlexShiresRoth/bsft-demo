import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Column = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: visible;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  padding: 0.5rem;
`;

const OrderDropDown = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 1px 10px #22222230;
  border-radius: 5px;
  padding: 5px 15px;
`;
const OrdersList = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 2px 1px 10px #22222230;
  z-index: 3;
  border-radius: 5px;
`;

const NewOrderAlert = styled.div`
  position: absolute;
  top: -40%;
  left: -5%;
  padding: 0.5rem;
  background-color: red;
  z-index: 9;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
  & p {
    color: #fff;
    font-size: 12px;
    font-weight: 700;
    margin: 0;
  }
`;

const Orders = ({
  orderList,
  newOrder,
}: {
  orderList: Array<{
    price: string;
    name: string;
    bsft_id: string;
    image: string;
  }>;
  newOrder: boolean;
}) => {
  const [hovering, setHovering] = useState<boolean>(false);

  const [showAlert, handleAlert] = useState<boolean>(false);

  const handleAlertState = (val: boolean) => handleAlert(val);

  useEffect(() => {
    if (newOrder) handleAlertState(true);
  }, [newOrder]);

  return (
    <Column
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <OrderDropDown>
        {showAlert && (
          <NewOrderAlert onClick={() => handleAlertState(false)}>
            <p>New Order!</p>
          </NewOrderAlert>
        )}
        <Row style={{ padding: 0 }}>
          <h3
            style={{
              fontWeight: "300",
              color: "#555",
              display: "flex",
              alignItems: "center",
              margin: 0,
            }}
          >
            My Orders
          </h3>
          <span
            style={{
              padding: ".5rem",
              borderRadius: "10px",
              backgroundColor: "#222",
              color: "#fff",
              marginLeft: "10px",
            }}
          >
            {orderList.length}
          </span>
        </Row>
      </OrderDropDown>
      {hovering && (
        <OrdersList>
          {orderList.map(
            (
              order: {
                price: string;
                name: string;
                bsft_id: string;
                image: string;
              },
              index: number
            ) => {
              return (
                <Row key={index}>
                  <img
                    src={order.image}
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "100%",
                    }}
                  />
                  {order.name}
                </Row>
              );
            }
          )}
        </OrdersList>
      )}
    </Column>
  );
};

export default Orders;
